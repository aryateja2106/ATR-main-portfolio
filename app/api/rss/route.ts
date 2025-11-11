import { Feed } from 'feed';
import { getPublishedBlogPosts } from '@/lib/mdx/mdx-utils';

export async function GET() {
  const posts = getPublishedBlogPosts();

  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  const date = new Date();

  const feed = new Feed({
    title: 'Arya Teja Rudraraju - AI & Product Management Blog',
    description: 'Insights on AI Agents, RAG Systems, MCP, and Product Management for AI-first companies',
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/assets/logo.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Arya Teja Rudraraju`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/api/rss`,
      json: `${siteURL}/api/feed.json`,
      atom: `${siteURL}/api/atom.xml`,
    },
    author: {
      name: 'Arya Teja Rudraraju',
      email: 'aryateja2106@gmail.com',
      link: siteURL,
    },
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.excerpt,
      author: [
        {
          name: post.author.name,
          email: 'aryateja2106@gmail.com',
          link: siteURL,
        },
      ],
      date: new Date(post.date),
      image: post.coverImage.startsWith('http')
        ? post.coverImage
        : `${siteURL}${post.coverImage}`,
      category: [
        {
          name: post.category,
        },
      ],
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
