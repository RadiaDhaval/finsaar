-- ==============================================================================
-- FINSAAR BLOG SYSTEM - SUPABASE DATABASE & STORAGE SCHEMA
-- ==============================================================================
-- Run this entire script in your Supabase project's SQL Editor (supabase.com -> SQL Editor)

-- 1. Create Posts Table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null default 'Strategy',
  author text not null default 'Finsaar Team',
  author_role text not null default 'CFO Advisory',
  date date not null default current_date,
  read_time text not null default '5 min',
  featured boolean not null default false,
  published boolean not null default true,
  tags text[] default '{}',
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast lookup by slug and category
create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_category on public.posts (category);
create index if not exists idx_posts_published on public.posts (published);

-- Auto-update updated_at timestamp trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at();

-- 2. Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Policies for posts table:
-- Public can read all published posts
drop policy if exists "Allow public read access to published posts" on public.posts;
create policy "Allow public read access to published posts" 
on public.posts for select 
using (published = true);

-- Authenticated users (admin) have full CRUD access to all posts (including drafts)
drop policy if exists "Allow authenticated users full access to posts" on public.posts;
create policy "Allow authenticated users full access to posts" 
on public.posts for all 
to authenticated 
using (true) 
with check (true);

-- 3. Storage Bucket for Blog Images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  10485760, -- 10MB limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set public = true;

-- Storage Policies:
-- Allow anyone to view/download images
drop policy if exists "Public Access for blog-images" on storage.objects;
create policy "Public Access for blog-images"
on storage.objects for select
using (bucket_id = 'blog-images');

-- Allow anyone / anon to upload images to blog-images bucket
drop policy if exists "Allow upload for blog-images" on storage.objects;
create policy "Allow upload for blog-images"
on storage.objects for insert
with check (bucket_id = 'blog-images');

-- Allow update and delete on blog-images
drop policy if exists "Allow update on blog-images" on storage.objects;
create policy "Allow update on blog-images"
on storage.objects for update
using (bucket_id = 'blog-images');

drop policy if exists "Allow delete on blog-images" on storage.objects;
create policy "Allow delete on blog-images"
on storage.objects for delete
using (bucket_id = 'blog-images');
