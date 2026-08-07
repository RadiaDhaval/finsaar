"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getBlogPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Globe, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [contactOpen, setContactOpen] = useState(false);
  const { slug } = React.use(params);
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1 pt-[72px] bg-white">
        
        {/* Post Header */}
        <section className="bg-white py-12 md:py-20 border-b border-sand/40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 font-body text-sm text-navy/50 hover:text-copper transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Insights
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-copper/10 text-copper rounded-full text-xs font-heading font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-body text-navy/50">
                <Clock size={14} /> {post.readTime} read
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-navy leading-tight mb-6">
              {post.title}
            </h1>
            
            <p className="font-body text-lg text-navy/60 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-6 border-y border-sand/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-copper/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-navy">
                    {post.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-navy">{post.author}</p>
                  <p className="font-body text-xs text-navy/50">{post.authorRole}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="flex items-center gap-1.5 font-body text-xs text-navy/50 justify-end mb-2">
                  <Calendar size={14} /> Published
                </p>
                <p className="font-body text-sm font-medium text-navy">{post.date}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image && (
          <section className="py-8 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-sand/30">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
            </div>
          </section>
        )}

        {/* Post Content */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
            
            {/* Social Share sidebar - sticky */}
            <div className="md:w-16 shrink-0 order-2 md:order-1">
              <div className="sticky top-24 flex md:flex-col gap-4 items-center">
                <p className="font-heading font-semibold text-xs text-navy/40 uppercase tracking-widest md:[writing-mode:vertical-rl] md:mb-4">Share</p>
                <button className="w-10 h-10 rounded-full bg-sand-light/50 flex items-center justify-center text-navy/60 hover:bg-copper hover:text-white transition-all">
                  <Globe size={16} />
                </button>
                <button className="w-10 h-10 rounded-full bg-sand-light/50 flex items-center justify-center text-navy/60 hover:bg-copper hover:text-white transition-all">
                  <MessageCircle size={16} />
                </button>
                <button className="w-10 h-10 rounded-full bg-sand-light/50 flex items-center justify-center text-navy/60 hover:bg-copper hover:text-white transition-all">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Markdown Body */}
            <article className="order-1 md:order-2 flex-1 prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy prose-p:font-body prose-p:text-navy/70 prose-p:leading-relaxed prose-a:text-copper prose-a:no-underline hover:prose-a:underline prose-li:text-navy/70 prose-strong:text-navy prose-strong:font-semibold">
              <ReactMarkdown>{post.content}</ReactMarkdown>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-sand/40 not-prose">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-sand-light/50 text-navy/60 text-xs font-body rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>

          </div>
        </section>

      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
