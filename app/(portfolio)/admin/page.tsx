'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../_components/header';
import { getAllBlogs } from '../_hooks/blog';
import type { BlogPost } from '../_utils/types/blog-types';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publishingStates, setPublishingStates] = useState<{
    [key: string]: { substack: boolean; medium: boolean };
  }>({});
  const [publishResults, setPublishResults] = useState<{
    [key: string]: { platform: string; success: boolean; message: string };
  }>({});

  useEffect(() => {
    const allBlogs = getAllBlogs();
    setBlogs(allBlogs);
    setIsLoading(false);
  }, []);

  const handlePublishToSubstack = async (post: BlogPost) => {
    setPublishingStates((prev) => ({
      ...prev,
      [post.id]: { ...prev[post.id], substack: true },
    }));

    try {
      const response = await fetch('/api/publish/substack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug }),
      });

      const data = await response.json();

      setPublishResults((prev) => ({
        ...prev,
        [post.id]: {
          platform: 'Substack',
          success: response.ok,
          message: data.message || 'Published successfully!',
        },
      }));
    } catch (error) {
      setPublishResults((prev) => ({
        ...prev,
        [post.id]: {
          platform: 'Substack',
          success: false,
          message: 'Failed to publish',
        },
      }));
    } finally {
      setPublishingStates((prev) => ({
        ...prev,
        [post.id]: { ...prev[post.id], substack: false },
      }));
    }
  };

  const handlePublishToMedium = async (post: BlogPost) => {
    setPublishingStates((prev) => ({
      ...prev,
      [post.id]: { ...prev[post.id], medium: true },
    }));

    try {
      const response = await fetch('/api/publish/medium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug }),
      });

      const data = await response.json();

      setPublishResults((prev) => ({
        ...prev,
        [post.id]: {
          platform: 'Medium',
          success: response.ok,
          message: data.message || 'Published successfully!',
        },
      }));
    } catch (error) {
      setPublishResults((prev) => ({
        ...prev,
        [post.id]: {
          platform: 'Medium',
          success: false,
          message: 'Failed to publish',
        },
      }));
    } finally {
      setPublishingStates((prev) => ({
        ...prev,
        [post.id]: { ...prev[post.id], medium: false },
      }));
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Header />
        <div className="w-full px-4 max-w-6xl mx-auto pt-32 pb-20">
          <div className="animate-pulse">Loading...</div>
        </div>
      </main>
    );
  }

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
        <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {blogs.map((post) => (
                  <tr key={post.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-medium text-teal-500 hover:text-teal-600"
                          >
                            {post.title}
                          </Link>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            {post.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      {post.formattedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {post.published && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Published
                          </span>
                        )}
                        {post.featured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handlePublishToSubstack(post)}
                          disabled={publishingStates[post.id]?.substack}
                          className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {publishingStates[post.id]?.substack
                            ? 'Publishing...'
                            : 'Publish to Substack'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePublishToMedium(post)}
                          disabled={publishingStates[post.id]?.medium}
                          className="px-3 py-1 text-xs bg-neutral-900 text-white rounded hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
                        >
                          {publishingStates[post.id]?.medium
                            ? 'Publishing...'
                            : 'Publish to Medium'}
                        </button>
                      </div>
                      {publishResults[post.id] && (
                        <div
                          className={`mt-2 text-xs ${
                            publishResults[post.id].success
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {publishResults[post.id].platform}: {publishResults[post.id].message}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feed Links */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">RSS Feeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/api/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="font-medium">RSS 2.0</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">/api/rss</div>
            </a>
            <a
              href="/api/atom.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="font-medium">Atom 1.0</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">/api/atom.xml</div>
            </a>
            <a
              href="/api/feed.json"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="font-medium">JSON Feed</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">/api/feed.json</div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
