// types/blog.ts

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  timestamp?: string;
}

export interface CodeExample {
  language: string;
  file: string;
  runnable?: boolean;
  sandboxUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: Author;
  relatedArticles: string[];
  content: string;
  // MDX-specific fields
  featured?: boolean;
  published?: boolean;
  youtubeVideos?: YouTubeVideo[];
  codeExamples?: CodeExample[];
  seoKeywords?: string[];
  canonicalUrl?: string;
}

export interface BlogFrontmatter {
  id?: string;
  title: string;
  description: string;
  excerpt?: string;
  date: string;
  category: string;
  tags?: string[];
  coverImage: string;
  author: Author;
  relatedArticles?: string[];
  readTime?: string;
  featured?: boolean;
  published?: boolean;
  youtubeVideos?: YouTubeVideo[];
  codeExamples?: CodeExample[];
  seoKeywords?: string[];
  canonicalUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}