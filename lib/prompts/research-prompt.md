# AI/PM Blog Topic Research Prompt

Use this prompt with AI research assistants (Claude, GPT-4, Perplexity, etc.) that have web search capabilities.

---

## Main Prompt

```
You are an AI/PM content research assistant. Today is {DATE}.

I'm looking for trending, high-value blog topics for a Product Manager targeting AI-first companies. I focus on:
- AI agents and agentic systems
- MCP (Model Context Protocol) and tool integrations
- Memory systems and context management
- RAG (Retrieval Augmented Generation) systems
- Knowledge graphs and GraphRAG
- Web scraping and knowledge builders
- Production AI system architecture

Research and suggest 3-5 blog topics with the following criteria:

## Research Sources
1. Hacker News (news.ycombinator.com) - Check top stories and "Show HN" from the last 7 days
2. Reddit:
   - r/MachineLearning
   - r/LocalLLaMA
   - r/artificial
   - r/ProductManagement
3. Twitter/X - Search for:
   - #AIAgents
   - #ProductManagement
   - #LLM
   - #MCP
4. Company Engineering Blogs:
   - Anthropic (anthropic.com/research)
   - OpenAI (openai.com/blog)
   - Perplexity (blog.perplexity.ai)
   - Microsoft Research
   - Google DeepMind
5. arXiv papers (recent AI/ML publications)
6. Product Hunt - AI tools launched recently

## For Each Topic, Provide:

1. **Title Suggestion** (compelling, SEO-friendly)
2. **Why It's Trending** (what's driving interest right now)
3. **Target Audience Pain Points** (what problems does this solve for AI PMs)
4. **Key Points to Cover**:
   - Technical depth required
   - Real company examples/case studies
   - Code examples or architecture diagrams needed
   - PM decision frameworks
5. **Competitive Analysis**:
   - Has this been covered elsewhere?
   - What unique angle can I take?
6. **Resources & References**:
   - Key papers, blog posts, or discussions
   - GitHub repos or tools to reference
   - YouTube videos or talks to embed
7. **SEO Keywords** (5-10 keywords for search optimization)
8. **Estimated Read Time** (target: 8-12 min for deep dives, 4-6 min for tactical posts)

## Content Types to Consider:
- Deep technical case studies (2000-3000 words)
- PM decision frameworks ("When to use X vs Y")
- Open source contribution blogs (with PR links)
- Tool comparisons with actual testing results
- Architecture breakdowns with diagrams
- Cost/complexity/benefit analyses

## Filter Criteria:
- Published in the last 30 days (for trending topics)
- Has technical depth (not just high-level overviews)
- Relevant to AI Product Management
- Has practical implementation details or real-world examples
- Aligns with my expertise: AI agents, MCP, RAG, knowledge systems

## Output Format:
For each topic, use this structure:

---

### Topic {NUMBER}: {TITLE}

**Trending Score**: {1-10}
**Difficulty**: {Beginner/Intermediate/Advanced}
**Type**: {Case Study/Technical Deep Dive/Tool Comparison/Framework}

**Why It's Hot Right Now**:
{Explanation with sources}

**Target Audience**:
{Who needs this information and why}

**Outline**:
1. {Section 1}
2. {Section 2}
3. {Section 3}
...

**Must-Have Elements**:
- [ ] {Element 1}
- [ ] {Element 2}
...

**Key Resources**:
- {Link 1} - {Description}
- {Link 2} - {Description}
...

**Unique Angle**:
{What makes this different from existing content}

**SEO Keywords**:
{keyword1, keyword2, keyword3, ...}

---

Please provide comprehensive research with clickable links and specific examples.
```

## Example Usage

1. **With Perplexity Pro**:
   - Copy the prompt above
   - Replace {DATE} with today's date
   - Run the prompt
   - Perplexity will search across sources and provide comprehensive research

2. **With Claude + MCP (if you have web search enabled)**:
   - Use this prompt directly
   - Claude will search and synthesize results

3. **Manual Research**:
   - Use the sources list as a checklist
   - Look for patterns across multiple sources
   - Identify emerging discussions

## Weekly Research Routine

**Monday**: Run this prompt to get the week's trending topics
**Tuesday**: Deep dive into one topic, gather resources
**Wednesday**: Write the blog post
**Thursday**: Edit, add code examples and diagrams
**Friday**: Publish and cross-post

## Trending Topic Indicators

Topics are "hot" when:
- Multiple independent sources discussing it within 48 hours
- High upvote/engagement on HN or Reddit
- New tool/paper release with significant traction
- Company announcements or case studies
- Shift in industry best practices

## Red Flags (Skip These Topics):

- Overly theoretical with no practical application
- Already extensively covered by major publications
- Too niche (< 100 potential readers)
- Requires proprietary access or NDA information
- Purely promotional content

---

## Customization Notes

Modify the focus areas based on your current interests:
- Add/remove specific technologies
- Adjust target audience (e.g., "AI Engineers" vs "Product Managers")
- Change content type preferences (e.g., more tutorials, fewer case studies)
- Update company blog sources based on your target employers

## Integration with Daily Workflow

1. Receive daily email reminder at 7am EST
2. Run this research prompt if you don't have a topic
3. Choose the highest-scoring topic
4. Gather resources and start writing
5. Aim to publish within 24-48 hours

---

Last Updated: 2025-01-11
