"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { blogPosts, blogCategories } from "@/lib/blog-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import BlogAnimation from "@/components/ui/BlogAnimation";

export default function BlogPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((p) => p.featured);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="Finsaar Insights"
          title={<>Financial intelligence for <span className="text-copper">scaling startups</span></>}
          subtitle="Expert insights, compliance updates, and strategic advice from our team of Founder CFOs."
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-colors duration-300 ${
                    activeCategory === category
                      ? "bg-navy text-white"
                      : "bg-sand-light/40 text-navy/70 hover:bg-sand-light hover:text-navy"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Post (only show on 'All') */}
            {activeCategory === "All" && featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 group relative"
              >
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-copper/20 via-sand/20 to-emerald/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <Link href={`/blog/${featuredPost.slug}`} className="relative grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-navy to-[#0f192b] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(20,33,58,0.2)] border border-white/5">
                  <div className="p-10 lg:p-14 flex flex-col justify-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-copper/20 border border-copper/30 rounded-full text-xs font-heading font-semibold text-copper-light tracking-wider uppercase w-max mb-8 shadow-[0_4px_12px_rgba(181,114,59,0.1)] backdrop-blur-md">
                      Featured Insight
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-copper-light transition-all duration-500">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-white/60 mb-10 leading-relaxed text-lg max-w-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-copper/40 to-copper/10 border border-copper/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <span className="font-heading font-bold text-sm text-white drop-shadow-md">
                            {featuredPost.author.split(" ").map((n: string) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-sm text-white">{featuredPost.author}</p>
                          <p className="font-body text-xs text-copper-light/80 mt-0.5">{featuredPost.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-72 lg:h-auto bg-navy overflow-hidden">
                     {/* The new custom animation in the background */}
                     <BlogAnimation />
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#0f192b] via-navy/80 to-transparent" />
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid of Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full bg-white border border-sand/40 rounded-3xl p-8 hover:shadow-[0_20px_40px_-15px_rgba(20,33,58,0.1)] hover:-translate-y-1 hover:border-copper/30 transition-all duration-500 group relative overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-copper/0 to-copper/0 group-hover:from-copper/5 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className="font-heading font-semibold text-xs bg-copper/10 text-copper px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-body text-navy/40 font-medium">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-navy mb-4 group-hover:text-copper transition-colors line-clamp-2 relative z-10">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-navy/60 mb-8 line-clamp-3 flex-1 leading-relaxed relative z-10">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-sand/20 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <Calendar size={14} className="text-navy/30" />
                        <span className="font-body text-xs font-medium text-navy/50">{post.date}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-sand-light/50 flex items-center justify-center group-hover:bg-copper group-hover:shadow-[0_4px_12px_rgba(181,114,59,0.3)] transition-all duration-300">
                        <ArrowRight size={14} className="text-navy/40 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
