import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogFrontmatter } from '@/app/(portfolio)/_utils/types/blog-types';

const contentDirectory = path.join(process.cwd(), 'content/blogs');

/**
 * Get all MDX blog files from the content directory
 */
export function getAllMDXFiles(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files.filter((file) => file.endsWith('.mdx'));
}

/**
 * Read and parse an MDX file
 */
export function getMDXContent(slug: string): { frontmatter: BlogFrontmatter; content: string } | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as BlogFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX file ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts with metadata
 */
export function getAllBlogPosts(): BlogPost[] {
  const files = getAllMDXFiles();

  const posts = files
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const mdxData = getMDXContent(slug);

      if (!mdxData) return null;

      const { frontmatter, content } = mdxData;
      const stats = readingTime(content);

      // Format date
      const date = new Date(frontmatter.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const post: BlogPost = {
        id: frontmatter.id || slug,
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        excerpt: frontmatter.excerpt || frontmatter.description,
        date: frontmatter.date,
        formattedDate,
        readTime: frontmatter.readTime || `${Math.ceil(stats.minutes)} min read`,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        coverImage: frontmatter.coverImage,
        author: frontmatter.author,
        relatedArticles: frontmatter.relatedArticles || [],
        content,
        // New MDX-specific fields
        featured: frontmatter.featured || false,
        published: frontmatter.published !== false, // Default to true
        youtubeVideos: frontmatter.youtubeVideos || [],
        seoKeywords: frontmatter.seoKeywords || [],
        canonicalUrl: frontmatter.canonicalUrl,
      };

      return post;
    })
    .filter((post): post is BlogPost => post !== null);

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const mdxData = getMDXContent(slug);

  if (!mdxData) return null;

  const { frontmatter, content } = mdxData;
  const stats = readingTime(content);

  const date = new Date(frontmatter.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    id: frontmatter.id || slug,
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    excerpt: frontmatter.excerpt || frontmatter.description,
    date: frontmatter.date,
    formattedDate,
    readTime: frontmatter.readTime || `${Math.ceil(stats.minutes)} min read`,
    category: frontmatter.category,
    tags: frontmatter.tags || [],
    coverImage: frontmatter.coverImage,
    author: frontmatter.author,
    relatedArticles: frontmatter.relatedArticles || [],
    content,
    featured: frontmatter.featured || false,
    published: frontmatter.published !== false,
    youtubeVideos: frontmatter.youtubeVideos || [],
    seoKeywords: frontmatter.seoKeywords || [],
    canonicalUrl: frontmatter.canonicalUrl,
  };
}

/**
 * Get all published blog posts
 */
export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.published);
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getPublishedBlogPosts().filter((post) => post.category === category);
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getPublishedBlogPosts().filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getPublishedBlogPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getPublishedBlogPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags);
}

/**
 * Get related blog posts
 */
export function getRelatedBlogPosts(postId: string, limit = 3): BlogPost[] {
  const currentPost = getPublishedBlogPosts().find((post) => post.id === postId);

  if (!currentPost) return [];

  // Get posts with similar tags or category
  const relatedPosts = getPublishedBlogPosts()
    .filter((post) => post.id !== postId)
    .map((post) => {
      let score = 0;

      // Same category
      if (post.category === currentPost.category) score += 3;

      // Shared tags
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += sharedTags.length * 2;

      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);

  return relatedPosts;
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPost[] {
  return getPublishedBlogPosts().filter((post) => post.featured);
}
