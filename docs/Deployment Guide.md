# Deployment Guide

This guide provides detailed instructions for deploying the AI Chatbot application to various environments. Follow these steps to successfully deploy your application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Alternative Deployment Options](#alternative-deployment-options)
6. [Post-Deployment Steps](#post-deployment-steps)
7. [Troubleshooting](#troubleshooting)
8. [Continuous Integration/Deployment](#continuous-integrationdeployment)

## Prerequisites

Before deploying the application, ensure you have:

- A GitHub account (for repository hosting)
- A Vercel account (for primary deployment)
- Access to a PostgreSQL database (Supabase recommended)
- Azure OpenAI API access with appropriate models deployed
- Node.js and pnpm installed locally for testing

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file for local testing and configure these variables in your deployment platform:

```
# Authentication
AUTH_SECRET=<your-auth-secret>
AUTH_URL=<your-auth-url>
AUTH_TRUST_HOST=true

# Database
POSTGRES_URL=<your-postgres-connection-string>

# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=<your-api-key>
AZURE_OPENAI_API_VERSION=<api-version>
AZURE_RESOURCE_NAME=<your-resource-name>

# Model Deployments
AZURE_OPENAI_CHAT_DEPLOYMENT=<chat-model-deployment-name>
AZURE_OPENAI_REASONING_DEPLOYMENT=<reasoning-model-deployment-name>
AZURE_OPENAI_TITLE_DEPLOYMENT=<title-model-deployment-name>
AZURE_OPENAI_ARTIFACT_DEPLOYMENT=<artifact-model-deployment-name>

# Image Generation
AZURE_IMAGE_API_KEY=<your-image-api-key>
AZURE_IMAGE_API_VERSION=<api-version>
AZURE_IMAGE_RESOURCE_NAME=<your-image-resource-name>
```

### Generating Auth Secret

Generate a secure random string for `AUTH_SECRET`:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or use an online generator
# https://generate-secret.vercel.app/32
```

### Setting Environment Variables in Vercel

1. Go to your Vercel project
2. Navigate to "Settings" > "Environment Variables"
3. Add each variable from your `.env.local` file
4. Click "Save" to apply the changes

## Database Setup

### Supabase Setup (Recommended)

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to "Project Settings" > "Database"
4. Find your connection string under "Connection Pooling"
5. Replace the password placeholder with your database password
6. Use this connection string as your `POSTGRES_URL` environment variable

### Database Migration

Before deployment, ensure your database schema is up-to-date:

```bash
# Run locally to test migrations
npm run db:migrate

# Migrations will also run automatically during the build process
# as configured in package.json: "build": "tsx lib/db/migrate && next build"
```

## Vercel Deployment

### Deploying to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com)
3. Click "Add New" > "Project"
4. Select your repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: `pnpm build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `pnpm install --force` (to handle dependency conflicts)
6. Add all environment variables from your `.env.local` file
7. Click "Deploy"

### Custom Domain Configuration

1. Go to your Vercel project
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings

## Alternative Deployment Options

### Self-Hosting with Docker

1. Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies with force flag
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

2. Build and run the Docker container:

```bash
# Build the Docker image
docker build -t ai-chatbot .

# Run the container
docker run -p 3000:3000 --env-file .env.production ai-chatbot
```

### Deploying to AWS Elastic Beanstalk

1. Install the AWS CLI and EB CLI
2. Initialize your EB application:

```bash
eb init
```

3. Create an environment:

```bash
eb create production-environment
```

4. Set environment variables:

```bash
eb setenv AUTH_SECRET=<value> AUTH_URL=<value> POSTGRES_URL=<value> ...
```

5. Deploy your application:

```bash
eb deploy
```

## Post-Deployment Steps

### Verify Deployment

1. Visit your deployed application URL
2. Test user registration and login
3. Test chat functionality with different models
4. Verify database connections by checking chat history persistence

### Performance Monitoring

Set up monitoring using Vercel Analytics:

1. Go to your Vercel project
2. Navigate to "Analytics"
3. Enable "Web Vitals" and "Real User Monitoring"

### Security Checks

1. Verify HTTPS is enabled
2. Check that environment variables are properly set
3. Test authentication flows
4. Ensure database connection is secure

## Troubleshooting

### Common Deployment Issues

#### Database Connection Errors

**Symptoms**: Application fails to start or errors when accessing chat history

**Solutions**:
- Verify your `POSTGRES_URL` is correct
- Check if your IP is allowed in database firewall settings
- Ensure the database user has appropriate permissions
- Try running migrations manually:
  ```bash
  npx tsx lib/db/migrate.ts
  ```

#### Authentication Issues

**Symptoms**: Unable to log in or register

**Solutions**:
- Verify `AUTH_SECRET` is set correctly
- Check `AUTH_URL` matches your deployment URL
- Ensure `AUTH_TRUST_HOST` is set to `true`
- Check for CORS issues if using a custom domain

#### Azure OpenAI Connection Issues

**Symptoms**: Chat works but AI responses fail

**Solutions**:
- Verify all Azure OpenAI environment variables
- Check if API keys are valid and not expired
- Ensure model deployments exist with the specified names
- Verify API version is compatible

#### Build Failures

**Symptoms**: Deployment fails during build step

**Solutions**:
- Use `--force` or `--legacy-peer-deps` flag for installation
- Check for TypeScript errors in your code
- Ensure all dependencies are compatible
- Check build logs for specific error messages

## Continuous Integration/Deployment

### GitHub Actions Setup

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9.12.3
      
      - name: Install dependencies
        run: pnpm install --force
      
      - name: Run linting
        run: pnpm lint
      
      - name: Build application
        run: pnpm build
        env:
          # Add dummy environment variables for build
          AUTH_SECRET: ${{ secrets.AUTH_SECRET }}
          POSTGRES_URL: ${{ secrets.POSTGRES_URL }}
          # Add other required environment variables
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Vercel GitHub Integration

For simpler deployment:

1. Connect your GitHub repository in Vercel
2. Enable "GitHub Integration"
3. Configure automatic deployments for your main branch
4. Set up Preview Deployments for pull requests

## Scaling Considerations

### Database Scaling

- Use connection pooling for efficient database connections
- Consider read replicas for high-traffic deployments
- Implement caching for frequently accessed data

### Application Scaling

- Vercel automatically scales based on traffic
- For self-hosted deployments, consider container orchestration with Kubernetes
- Implement proper caching strategies for static content

### Cost Optimization

- Use Vercel's Hobby plan for personal projects
- Scale database resources based on actual usage
- Monitor Azure OpenAI usage to stay within budget
- Implement rate limiting for public-facing deployments
