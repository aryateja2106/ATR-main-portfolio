// utils/blog.ts
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  getAllCategories,
  getAllTags,
  getRelatedBlogPosts,
  getFeaturedBlogPosts,
  getPublishedBlogPosts,
} from '@/lib/mdx/mdx-utils';
import type { BlogPost, Author } from '../_utils/types/blog-types';

// Get all blog posts (published only)
export function getAllBlogs(): BlogPost[] {
  return getPublishedBlogPosts();
}

// Get blog post by ID
export function getBlogById(id: string): BlogPost | undefined {
  const allPosts = getAllBlogPosts();
  return allPosts.find((post) => post.id === id);
}

// Get blog post by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  const post = getBlogPostBySlug(slug);
  return post || undefined;
}

// Get all authors (extract unique authors from blog posts)
export function getAllAuthors(): Author[] {
  const authorsMap = new Map<string, Author>();
  const allPosts = getAllBlogPosts();

  for (const post of allPosts) {
    if (!authorsMap.has(post.author.id)) {
      authorsMap.set(post.author.id, post.author);
    }
  }

  return Array.from(authorsMap.values());
}

// Get author by ID
export function getAuthorById(id: string): Author | undefined {
  return getAllAuthors().find((author) => author.id === id);
}

// Get all categories (extract unique categories from blog posts)
export { getAllCategories };

// Get blogs by category
export function getBlogsByCategory(categoryName: string): BlogPost[] {
  return getBlogPostsByCategory(categoryName);
}

// Get blogs by tag
export function getBlogsByTag(tag: string): BlogPost[] {
  return getBlogPostsByTag(tag);
}

// Get blogs by author
export function getBlogsByAuthor(authorId: string): BlogPost[] {
  return getAllBlogs().filter((post) => post.author.id === authorId);
}

// Get related blogs for a specific blog post
export function getRelatedBlogs(postId: string): BlogPost[] {
  return getRelatedBlogPosts(postId);
}

// Get featured blogs
export function getFeaturedBlogs(): BlogPost[] {
  return getFeaturedBlogPosts();
}

// Get all tags
export { getAllTags };

// Sort blogs by date (newest first)
export function sortBlogsByDate(blogs: BlogPost[]): BlogPost[] {
  return [...blogs].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}