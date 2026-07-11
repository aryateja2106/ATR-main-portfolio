'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types';

interface BlogListProps {
  initialBlogs: BlogPost[];
  allCategories: string[];
}

export function BlogList({ initialBlogs, allCategories }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [activeCategory, setActiveCategory] = useState('all');

  // We can still use the helper to sort/filter if it's available client-side,
  // OR we can just implement simple filtering here to avoid importing the hook if it has heavy deps.
  // The original hook likely reads from JSON, which we might not want to bundle if we can avoid it,
  // but since it's a small JSON, it's fine.
  // Actually, better to just filter the `initialBlogs` prop to avoid re-fetching or importing data logic.

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setBlogs(initialBlogs);
    } else {
      const filtered = initialBlogs.filter(
        (blog) => blog.category === category,
      );
      setBlogs(filtered);
    }
  };

  return (
    <div className="w-full">
      <div
        className="flex flex-wrap gap-3 mb-10"
        role="tablist"
        aria-label="Blog categories"
      >
        <button
          type="button"
          role="tab"
          aria-controls="blog-posts"
          id="tab-all"
          className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
            activeCategory === 'all'
              ? 'border-[#f7f2e8] bg-[#f7f2e8] text-[#12110f]'
              : 'border-[#f7f2e8]/15 text-[#b9b0a2] hover:border-[#f7f2e8]/50 hover:text-[#f7f2e8]'
          }`}
          onClick={() => handleCategoryFilter('all')}
        >
          All
        </button>

        {allCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-controls="blog-posts"
            id={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
            className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
              activeCategory === category
                ? 'border-[#f7f2e8] bg-[#f7f2e8] text-[#12110f]'
                : 'border-[#f7f2e8]/15 text-[#b9b0a2] hover:border-[#f7f2e8]/50 hover:text-[#f7f2e8]'
            }`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {blogs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#b9b0a2] mb-4">
            No blog posts found in this category.
          </p>
          <button
            type="button"
            onClick={() => handleCategoryFilter('all')}
            className="rounded-sm bg-[#f7f2e8] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#12110f] transition-colors hover:bg-white"
          >
            View All Posts
          </button>
        </div>
      )}

      {/* Blog posts grid */}
      {blogs.length > 0 && (
        <div
          id="blog-posts"
          role="tabpanel"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {blogs.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group flex flex-col overflow-hidden border border-[#f7f2e8]/15 bg-[#1c1a17] transition-colors hover:border-[#f7f2e8]/45"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {post.coverImage ? (
                  <div className="relative size-full">
                    <Image
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="object-cover size-full saturate-0 transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                      priority={Number.parseInt(post.id) <= 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12110f]/80 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[#12110f] flex items-center justify-center">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#b9b0a2]">
                      Source note
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 border border-[#f7f2e8]/20 bg-[#12110f]/75 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f7f2e8]">
                  {post.category}
                </div>
              </div>

              <div className="p-5 grow flex flex-col">
                <div className="mb-3 flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#b9b0a2]">
                  <span>{post.formattedDate}</span>
                  <span className="mx-2" aria-hidden="true">
                    •
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="mb-3 font-serif text-2xl leading-tight text-[#f7f2e8] transition-colors group-hover:text-white">
                  {post.title}
                </h2>

                <p className="text-sm leading-6 text-[#d8d0c3]/80 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center font-mono text-xs uppercase tracking-[0.18em] text-[#f7f2e8]">
                  Read article
                  <svg
                    className="ml-1 size-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>Arrow right</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
