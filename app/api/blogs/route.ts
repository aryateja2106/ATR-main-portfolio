import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/mdx/mdx-utils';

export async function GET() {
  try {
    const blogs = getAllBlogPosts();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
