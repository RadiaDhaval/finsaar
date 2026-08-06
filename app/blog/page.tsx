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
                className="mb-20 group"
              >
                <Link href={`/blog/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-navy to-navy-light rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-10 lg:p-14 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-heading font-semibold text-copper tracking-wider uppercase w-max mb-6">
                      Featured
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 leading-tight group-hover:text-copper transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-white/60 mb-8 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-copper/20 flex items-center justify-center">
                          <span className="font-heading font-bold text-sm text-white">
                            {featuredPost.author.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-sm text-white">{featuredPost.author}</p>
                          <p className="font-body text-xs text-white/50">{featuredPost.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-64 lg:h-auto bg-copper/10 overflow-hidden">
                     {/* Placeholder for featured image */}
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-navy to-transparent" />
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
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full bg-white border border-sand/40 rounded-2xl p-6 hover:shadow-xl hover:border-copper/30 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading font-semibold text-xs text-copper uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-body text-navy/40">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-navy mb-3 group-hover:text-copper transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-navy/60 mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand/30">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-navy/30" />
                        <span className="font-body text-xs text-navy/50">{post.date}</span>
                      </div>
                      <ArrowRight size={16} className="text-copper opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
