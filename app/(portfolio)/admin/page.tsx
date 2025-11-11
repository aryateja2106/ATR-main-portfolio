import React from 'react';
import Link from 'next/link';
import { Header } from '../_components/header';
import AdminBlogTable from '../_components/admin-blog-table';
import { getAllBlogPosts } from '@/lib/mdx/mdx-utils';

export default function AdminDashboard() {
  const blogs = getAllBlogPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="w-full px-4 max-w-6xl mx-auto pt-32 pb-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Blog Admin Dashboard</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Manage your blog posts and publish to external platforms
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-teal-500 mb-2">{blogs.length}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Posts</div>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-teal-500 mb-2">
              {blogs.filter((b) => b.published).length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Published</div>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-teal-500 mb-2">
              {blogs.filter((b) => b.featured).length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Featured</div>
          </div>
        </div>

        {/* Blog posts table */}
        <AdminBlogTable blogs={blogs} />

        {/* Feed Links */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">RSS Feeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/api/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="font-medium">RSS 2.0</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">/api/rss</div>
            </Link>
            <Link
              href="/api/atom.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="font-medium">Atom 1.0</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">/api/atom.xml</div>
            </Link>
            <Link
              href="/api/feed.json"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="font-medium">JSON Feed</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">/api/feed.json</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
