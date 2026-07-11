import { BlogList } from '@/components/blog-list';
import type { Metadata } from 'next';
import React from 'react';
import { SiteNav } from '../_components/field-notes';
import { getAllBlogs, getAllCategories, sortBlogsByDate } from '../_hooks/blog';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Writing | Arya Teja Rudraraju',
    description:
      'Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.',
    type: 'website',
    url: 'https://aryateja.com/blog',
  },
};

export default function BlogsPage() {
  const allBlogs = sortBlogsByDate(getAllBlogs());
  const allCategories = getAllCategories();

  return (
    <main className="min-h-screen bg-[#12110f] text-[#f7f2e8]">
      <SiteNav />

      <div className="w-full px-5 max-w-5xl mx-auto pt-36 pb-24 md:px-8">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
            Essays, case studies, build logs
          </p>
          <h1 className="mt-3 font-serif text-[clamp(44px,8vw,92px)] leading-none">
            Writing
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8d0c3]/80">
            Practical notes from the work: agent workflows, product decisions,
            open-source tools, and the tradeoffs behind them.
          </p>
        </div>

        <BlogList initialBlogs={allBlogs} allCategories={allCategories} />
      </div>
    </main>
  );
}
