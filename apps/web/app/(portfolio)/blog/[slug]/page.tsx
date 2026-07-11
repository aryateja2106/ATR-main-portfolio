import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { SiteNav } from '../../_components/field-notes';
import MarkdownRenderer from '../../_components/markdowmRender';
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from '../../_hooks/blog';

const siteUrl = 'https://aryateja.com';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: 'Writing' };
  }

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = new URL(post.coverImage, siteUrl).toString();

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ['Arya Teja Rudraraju'],
      tags: post.tags,
      images: [{ url: imageUrl, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogs(post.id);
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: new URL(post.coverImage, siteUrl).toString(),
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: canonicalUrl,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Arya Teja Rudraraju',
      url: siteUrl,
      sameAs: [
        'https://linkedin.com/in/arya-teja-rudraraju',
        'https://github.com/aryateja2106',
        'https://x.com/r_aryateja',
      ],
    },
  };

  return (
    <main className="min-h-screen bg-[#12110f] text-[#f7f2e8]">
      <SiteNav />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD generated from local blog data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full px-5 max-w-4xl mx-auto pt-36 pb-20 md:px-8">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center font-mono text-xs uppercase tracking-[0.2em] text-[#b9b0a2] transition-colors hover:text-[#f7f2e8]"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to notes
        </Link>

        <div className="mb-8">
          <div className="mb-5 inline-block border border-[#f7f2e8]/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#b9b0a2]">
            {post.category}
          </div>

          <h1 className="font-serif text-[clamp(42px,8vw,84px)] leading-none">
            {post.title}
          </h1>

          <div className="mt-6 mb-8 flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#b9b0a2]">
            <span>{post.formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#f7f2e8]/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2] transition-colors hover:border-[#f7f2e8]/45 hover:text-[#f7f2e8]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center py-6 border-y border-[#f7f2e8]/15">
            <div className="relative mr-4 size-12 overflow-hidden border border-[#f7f2e8]/15">
              <div className="size-full flex items-center justify-center font-mono text-[10px] uppercase text-[#b9b0a2]">
                ATR
              </div>
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-[#b9b0a2]">{post.author.bio}</div>
            </div>
          </div>
        </div>

        {post.coverImage ? (
          <div className="relative mb-10 h-64 w-full overflow-hidden border border-[#f7f2e8]/15 bg-[#1c1a17] md:h-96">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover opacity-70 saturate-0"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 bg-[#1c1a17] border border-[#f7f2e8]/15 mb-10 overflow-hidden">
            <div className="size-full flex items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-[#b9b0a2]">
              Source note
            </div>
          </div>
        )}

        <MarkdownRenderer
          content={post.content}
          className="prose-headings:font-serif prose-headings:text-[#f7f2e8] prose-p:text-[#d8d0c3]/85 prose-a:text-[#f7f2e8] prose-strong:text-[#f7f2e8] prose-li:text-[#d8d0c3]/85"
        />
      </article>

      {relatedPosts.length > 0 && (
        <div className="w-full border-t border-[#f7f2e8]/15 bg-[#1c1a17] py-16">
          <div className="w-full px-4 max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl mb-8">Related notes</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="relative h-40 bg-[#12110f] border border-[#f7f2e8]/15 mb-4 overflow-hidden">
                    <Image
                      className="object-cover saturate-0"
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-serif text-xl group-hover:text-white transition-colors mb-1">
                    {relatedPost.title}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2]">
                    {relatedPost.formattedDate}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
