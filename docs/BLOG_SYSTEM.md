# Blog System Documentation

## Overview

This blog system is built with MDX (Markdown + JSX) for maximum flexibility, featuring enhanced content capabilities, RSS feeds, admin dashboard, and cross-platform publishing workflows.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Creating a New Blog Post](#creating-a-new-blog-post)
3. [MDX Features](#mdx-features)
4. [Admin Dashboard](#admin-dashboard)
5. [RSS Feeds](#rss-feeds)
6. [Daily Email Reminders](#daily-email-reminders)
7. [Cross-Platform Publishing](#cross-platform-publishing)
8. [Environment Variables](#environment-variables)
9. [Deployment](#deployment)

---

## Architecture

### File Structure

```
ATR-main-portfolio/
├── content/
│   └── blogs/              # MDX blog posts
│       ├── post-slug.mdx
│       └── ...
├── app/
│   ├── (portfolio)/
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog listing
│   │   │   └── [slug]/page.tsx    # Individual blog post
│   │   ├── admin/
│   │   │   └── page.tsx           # Admin dashboard
│   │   ├── _components/
│   │   │   └── mdx-renderer.tsx   # MDX renderer with custom components
│   │   └── _hooks/
│   │       └── blog.ts            # Blog utilities
│   └── api/
│       ├── rss/route.ts           # RSS 2.0 feed
│       ├── atom.xml/route.ts      # Atom feed
│       ├── feed.json/route.ts     # JSON feed
│       ├── publish/
│       │   ├── substack/route.ts  # Substack publishing
│       │   └── medium/route.ts    # Medium publishing
│       └── cron/
│           └── daily-reminder/    # Daily email cron job
├── lib/
│   ├── mdx/
│   │   └── mdx-utils.ts           # MDX file reading/parsing
│   └── prompts/
│       └── research-prompt.md     # Research template
└── vercel.json                    # Cron configuration
```

---

## Creating a New Blog Post

### Step 1: Create MDX File

Create a new file in `content/blogs/` with the slug as filename: `your-post-slug.mdx`

### Step 2: Add Frontmatter

```mdx
---
id: "4"
title: "Your Blog Post Title"
description: "A compelling description for SEO and social sharing"
excerpt: "A brief excerpt that appears in blog listings"
date: "2025-01-11"
category: "AI Engineering"
tags: ["AI", "ProductManagement", "MCP", "RAG"]
coverImage: "/assets/cover-image.jpg"
author:
  id: "1"
  name: "Arya Teja Rudraraju"
  avatar: "/images/avatar-arya.jpg"
  bio: "AI Engineer & Product Manager"
  twitter: "@r_aryateja"
relatedArticles: ["1", "2"]
featured: true
published: true
seoKeywords: ["AI Agents", "Product Management", "Technical Leadership"]
canonicalUrl: "https://yoursite.com/blog/your-post-slug"
youtubeVideos:
  - id: "dQw4w9WgXcQ"
    title: "Relevant Video Title"
    timestamp: "150"
---
```

### Step 3: Write Content

```mdx
Your MDX content goes here. You can use:

## Headings

Regular **markdown** syntax with *formatting*.

### Code Blocks

\```python
def hello_world():
    print("Hello, world!")
\```

### Lists

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item

### Blockquotes

> This is a quote

### Tables

| Feature | Description |
|---------|-------------|
| MDX | Markdown + JSX |
| RSS | Syndication |

### Custom Components

<YouTubeEmbed videoId="dQw4w9WgXcQ" title="Video Title" />

<CodeSandbox sandboxId="your-sandbox-id" title="Live Code Example" />
```

### Step 4: Test Locally

```bash
pnpm dev
```

Navigate to `http://localhost:3000/blog/your-post-slug`

---

## MDX Features

### 1. YouTube Embeds

```mdx
<YouTubeEmbed
  videoId="dQw4w9WgXcQ"
  title="Video Title"
  startTime="150"
/>
```

### 2. Code Sandboxes

```mdx
<CodeSandbox
  sandboxId="your-sandbox-id"
  title="Live Code Example"
/>
```

### 3. Syntax Highlighting

Supports all major languages with automatic detection:

\```typescript
const greeting: string = "Hello, world!";
\```

### 4. Images

Images are automatically optimized using Next.js Image component:

```mdx
![Alt text](https://example.com/image.jpg)
```

### 5. Custom Styling

All MDX components have custom dark mode support and responsive design.

---

## Admin Dashboard

Access: `http://localhost:3000/admin` (or `/admin` in production)

### Features:

1. **Blog Statistics**
   - Total posts
   - Published posts
   - Featured posts

2. **Blog Management Table**
   - View all blog posts
   - See publication status
   - Quick preview links

3. **Cross-Platform Publishing**
   - Publish to Substack with one click
   - Publish to Medium with one click
   - View publishing results

4. **RSS Feed Links**
   - Quick access to all feed formats
   - Test feeds before sharing

---

## RSS Feeds

### Available Formats:

1. **RSS 2.0**: `/api/rss`
2. **Atom 1.0**: `/api/atom.xml`
3. **JSON Feed**: `/api/feed.json`

### Subscribe URLs:

- RSS: `https://yoursite.com/api/rss`
- Atom: `https://yoursite.com/api/atom.xml`
- JSON: `https://yoursite.com/api/feed.json`

### Features:

- Automatic generation from MDX files
- Published posts only
- Full content in feeds
- Proper categorization
- Canonical URLs
- Cached for performance (1 hour)

---

## Daily Email Reminders

### How It Works:

1. Vercel Cron runs daily at **7:00 AM EST** (12:00 PM UTC)
2. Sends email to `aryateja2106@gmail.com`
3. Includes:
   - Trending topic suggestions
   - Content ideas
   - Link to admin dashboard

### Setup Required:

1. **Get Resend API Key**:
   - Sign up at [resend.com](https://resend.com)
   - Get API key from dashboard
   - Add to Vercel environment variables

2. **Configure Cron Secret**:
   - Generate random string: `openssl rand -hex 32`
   - Add as `CRON_SECRET` in Vercel

3. **Verify Domain** (for production):
   - Add your domain to Resend
   - Update `from` email in `/app/api/cron/daily-reminder/route.ts`

### Manual Trigger (for testing):

```bash
curl -X GET "http://localhost:3000/api/cron/daily-reminder" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## Cross-Platform Publishing

### Substack Integration

**Status**: API structure ready, needs API credentials

**Setup**:
1. Get Substack API token (when available)
2. Add to environment variables:
   ```
   SUBSTACK_API_TOKEN=your_token
   SUBSTACK_URL=your_substack_url
   ```
3. Uncomment implementation in `/app/api/publish/substack/route.ts`

**Features**:
- Converts MDX to HTML
- Preserves canonical URL
- Supports draft/publish modes

### Medium Integration

**Status**: API structure ready, needs API credentials

**Setup**:
1. Get Medium integration token:
   - Go to [Medium Settings](https://medium.com/me/settings)
   - Integration tokens → Generate new token
2. Get your Medium user ID
3. Add to environment variables:
   ```
   MEDIUM_API_TOKEN=your_token
   MEDIUM_USER_ID=your_user_id
   ```
4. Uncomment implementation in `/app/api/publish/medium/route.ts`

**Features**:
- Converts MDX to markdown
- Preserves canonical URL
- Auto-tags (max 5 tags)
- Draft mode for review

---

## Environment Variables

### Required for Production:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yoursite.com

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Cron Security
CRON_SECRET=your_random_secret_string

# Substack (optional)
SUBSTACK_API_TOKEN=your_token
SUBSTACK_URL=https://yoursubstack.substack.com

# Medium (optional)
MEDIUM_API_TOKEN=your_token
MEDIUM_USER_ID=your_user_id
```

### Setting in Vercel:

1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save and redeploy

---

## Deployment

### Prerequisites:

1. **Vercel Account**: [vercel.com](https://vercel.com)
2. **Resend Account**: [resend.com](https://resend.com)
3. **Environment Variables** configured

### Deploy Steps:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: Complete blog system with MDX and admin dashboard"
   git push origin your-branch
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Configure Cron**:
   - `vercel.json` is automatically detected
   - Cron runs after deployment
   - Check logs: `vercel logs --follow`

4. **Test Everything**:
   - ✅ Blog listing page
   - ✅ Individual blog posts
   - ✅ Admin dashboard
   - ✅ RSS feeds
   - ✅ Daily email (wait for 7am EST or manual trigger)

---

## Content Workflow

### Daily Routine:

1. **7:00 AM**: Receive email reminder
2. **7:15 AM**: Choose topic (use research prompt if needed)
3. **8:00 AM - 10:00 AM**: Research and write
4. **10:00 AM - 11:00 AM**: Add code examples, diagrams, videos
5. **11:00 AM - 11:30 AM**: Edit and polish
6. **11:30 AM**: Create MDX file, test locally
7. **12:00 PM**: Deploy and publish
8. **12:30 PM**: Cross-post to Substack/Medium (if applicable)

### Weekly Goals:

- **Mon/Wed/Fri**: Deep technical posts (2000-3000 words)
- **Tue/Thu**: Quick tactical posts (800-1000 words)
- **Sat**: Open source contribution + blog post
- **Sun**: Plan next week's topics

---

## Troubleshooting

### MDX Not Rendering:

1. Check frontmatter syntax (YAML)
2. Ensure file is in `content/blogs/`
3. Restart dev server
4. Check browser console for errors

### Emails Not Sending:

1. Verify `RESEND_API_KEY` is set
2. Check Resend dashboard for logs
3. Verify cron is running: `vercel logs`
4. Check email spam folder

### Publishing Failed:

1. Check API credentials in environment variables
2. Verify blog post exists (slug is correct)
3. Check API route logs
4. Test with curl command

---

## Future Enhancements

- [ ] Image upload to Cloudflare R2
- [ ] Draft mode preview
- [ ] Scheduled publishing
- [ ] Analytics integration
- [ ] Comment system
- [ ] Newsletter signup
- [ ] Search functionality
- [ ] Related posts algorithm improvement

---

## Support

For issues or questions:
- Check this documentation first
- Review environment variables
- Check Vercel logs
- Test locally before deploying

---

Last Updated: 2025-01-11
