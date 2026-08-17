import { getBlogPosts } from "@/lib/blog-service";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
