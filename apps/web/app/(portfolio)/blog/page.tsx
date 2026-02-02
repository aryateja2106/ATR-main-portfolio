import React from 'react';
import { Header } from '../_components/header';
import { getAllBlogs, getAllCategories, sortBlogsByDate } from '../_hooks/blog';
import { BlogList } from '@/components/blog-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Arya Teja',
  description:
    'Thoughts, stories, and ideas about web development, design, and technology.',
};

export default function BlogsPage() {
  const allBlogs = sortBlogsByDate(getAllBlogs());
  const allCategories = getAllCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Thoughts, stories, and ideas about web development, design, and
            technology.
          </p>
        </div>

        <BlogList initialBlogs={allBlogs} allCategories={allCategories} />
      </div>
    </main>
  );
}
