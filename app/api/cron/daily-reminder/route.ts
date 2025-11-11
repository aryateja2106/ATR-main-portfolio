import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Send daily reminder email
    const data = await resend.emails.send({
      from: 'Blog Reminder <onboarding@resend.dev>', // Replace with your verified domain
      to: ['aryateja2106@gmail.com'],
      subject: `Daily Blog Reminder - ${today}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 30px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 20px;
              }
              .prompt {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
                color: #14b8a6;
              }
              .suggestions {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #14b8a6;
              }
              .suggestions h3 {
                margin-top: 0;
                color: #0d9488;
              }
              .suggestions ul {
                padding-left: 20px;
              }
              .suggestions li {
                margin-bottom: 10px;
              }
              .cta {
                text-align: center;
                margin-top: 30px;
              }
              .cta a {
                display: inline-block;
                background: #14b8a6;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
              }
              .footer {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">📝 Daily Blog Writing Reminder</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">${today}</p>
            </div>

            <div class="content">
              <div class="prompt">
                What are you writing about today?
              </div>

              <p>
                Good morning! It's time to create valuable content for your audience.
                Today is a great day to share your insights on AI, Product Management, or emerging technologies.
              </p>

              <div class="suggestions">
                <h3>📊 Trending Topics for AI PMs:</h3>
                <ul>
                  <li><strong>AI Agents & Agentic Systems</strong> - Multi-agent orchestration, autonomous workflows</li>
                  <li><strong>MCP (Model Context Protocol)</strong> - Tool interoperability, enterprise integrations</li>
                  <li><strong>GraphRAG & Knowledge Graphs</strong> - Relationship-aware retrieval systems</li>
                  <li><strong>RAG Implementation Patterns</strong> - Production RAG, chunking strategies, evaluation</li>
                  <li><strong>Web Scraping & Data Pipelines</strong> - AI-powered scrapers, knowledge builders</li>
                </ul>
              </div>

              <div class="suggestions" style="margin-top: 20px;">
                <h3>💡 Content Ideas:</h3>
                <ul>
                  <li>Write about a real company case study (Perplexity, Anthropic, Microsoft)</li>
                  <li>Share technical implementation details with code examples</li>
                  <li>Document an open source contribution you're making</li>
                  <li>Create a PM decision framework for an AI technology</li>
                  <li>Analyze cost/complexity tradeoffs for AI systems</li>
                </ul>
              </div>
            </div>

            <div class="cta">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">
                Go to Admin Dashboard
              </a>
            </div>

            <div class="footer">
              <p>This is your daily reminder to create valuable content.</p>
              <p>Keep building, keep learning, keep sharing! 🚀</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Daily reminder sent successfully',
      data,
    });
  } catch (error) {
    console.error('Error sending daily reminder:', error);
    return NextResponse.json(
      { error: 'Failed to send daily reminder' },
      { status: 500 }
    );
  }
}
