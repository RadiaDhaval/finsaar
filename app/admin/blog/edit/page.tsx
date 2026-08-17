"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import { getPostById, getBlogPostBySlug } from "@/lib/blog-service";
import { BlogPost } from "@/lib/blog-data";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

function EditPostContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [post, setPost] = useState<(Partial<BlogPost> & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // First try fetching by database UUID
        let data: any = await getPostById(id);

        // If not found, try fetching by slug
        if (!data) {
          const bySlug = await getBlogPostBySlug(id);
          if (bySlug) {
            data = bySlug;
          }
        }

        if (data) {
          setPost({
            id: data.id || id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            author: data.author,
            authorRole: data.author_role || data.authorRole,
            date: data.date,
            readTime: data.read_time || data.readTime,
            featured: data.featured,
            published: data.published !== undefined ? data.published : true,
            tags: data.tags || [],
            image: data.image || "",
          });
        }
      } catch (err) {
        console.error("Failed to load post for editing:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
        <RefreshCw size={24} className="animate-spin text-[#B5723B]" />
        <p className="text-sm text-[#7A7F8C]">Loading article details...</p>
      </div>
    );
  }

  if (!id || !post) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-[#E7E4DC]">
        <h2 className="font-heading font-bold text-xl text-[#14213A]">
          Article Not Found
        </h2>
        <p className="text-sm text-[#7A7F8C] mt-2">
          Could not find the article you requested to edit.
        </p>
        <Link
          href="/admin/blog"
          className="inline-block mt-4 px-4 py-2 bg-[#14213A] text-white rounded-xl text-xs font-semibold"
        >
          Return to Blog Dashboard
        </Link>
      </div>
    );
  }

  return <BlogEditor initialPost={post} isEdit={true} />;
}

export default function EditBlogPostPage() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
          <RefreshCw size={24} className="animate-spin text-[#B5723B]" />
          <p className="text-sm text-[#7A7F8C]">Loading editor...</p>
        </div>
      }
    >
      <EditPostContent />
    </Suspense>
  );
}
