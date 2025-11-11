import React from 'react';
import { Header } from '../_components/header';
import BlogListClient from '../_components/blog-list-client';
import { getPublishedBlogPosts, getAllCategories } from '@/lib/mdx/mdx-utils';

export default function BlogsPage() {
  const blogs = getPublishedBlogPosts();
  const categories = getAllCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <BlogListClient initialBlogs={blogs} categories={categories} />
    </main>
  );
}
