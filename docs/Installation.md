# Installation Guide

This document provides detailed instructions for setting up the AI Chatbot application for development and testing. Follow these steps to get your environment up and running.

## Prerequisites

Before beginning the installation process, ensure you have the following prerequisites:

- **Node.js**: Version 18.x or later (LTS recommended)
- **Package Manager**: pnpm 9.12.3 or later (recommended)
- **Database**: PostgreSQL database (Supabase recommended)
- **Azure OpenAI**: Access to Azure OpenAI services with appropriate models deployed
- **Git**: For cloning the repository

## Step 1: Clone the Repository

```bash
git clone https://github.com/AryaTejaRudraraju/portfoliov1.git
cd portfoliov1
```

## Step 2: Install Dependencies

Due to the project using React 19 (RC) and Next.js 15 (Canary), you may encounter dependency conflicts. Use one of the following installation methods:

```bash
# Using pnpm (recommended)
pnpm install --force

# OR using npm
npm install --legacy-peer-deps
```

> ⚠️ **Note**: The `--force` or `--legacy-peer-deps` flags are necessary to resolve potential dependency conflicts with the newer versions of React and Next.js.

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

2. Update the `.env.local` file with your configuration values:

```
# Authentication
AUTH_SECRET=<generate-a-random-secret>
AUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true

# Database
POSTGRES_URL="postgresql://postgres.username:password@hostname:port/postgres"

# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=<your-api-key>
AZURE_OPENAI_API_VERSION=2025-01-01-preview
AZURE_RESOURCE_NAME=<your-resource-name>

# Azure OpenAI Model Deployments
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_REASONING_DEPLOYMENT=o4-mini
AZURE_OPENAI_TITLE_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_ARTIFACT_DEPLOYMENT=gpt-4o

# Azure OpenAI Image Deployment
AZURE_IMAGE_API_KEY=<your-image-api-key>
AZURE_IMAGE_API_VERSION=2024-04-01-preview
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

## Step 4: Database Setup

### Supabase Setup (Recommended)

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to "Project Settings" > "Database"
4. Find your connection string under "Connection Pooling"
5. Replace the password placeholder with your database password
6. Use this connection string as your `POSTGRES_URL` environment variable

### Alternative Database Options

- [Neon Serverless Postgres](https://neon.tech)
- [Vercel Postgres](https://vercel.com/storage/postgres)
- Local PostgreSQL instance

## Step 5: Run Database Migrations

Before starting the application, run the database migrations to create the required schema:

```bash
# Using pnpm
pnpm db:migrate

# OR using npm
npm run db:migrate
```

This command will create all necessary tables in your PostgreSQL database.

## Step 6: Azure OpenAI Setup

1. Create an Azure OpenAI resource in the Azure portal
2. Deploy the following models in your Azure OpenAI resource:
   - GPT-4o (or equivalent) for the main chat model
   - GPT-4o Mini (or equivalent) for reasoning and title generation
   - DALL-E 3 (or equivalent) for image generation
3. Note the API keys, resource name, and deployment names
4. Update your `.env.local` file with these values

## Step 7: Start the Development Server

```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

> ⚠️ **Note**: The development server uses Turbo mode, which may be slower due to hot reloading.

## Step 8: Create a User Account

1. Navigate to [http://localhost:3000/register](http://localhost:3000/register)
2. Create a new user account
3. Log in with your credentials

## Additional Configuration

### Database Management

The project includes several database management commands:

```bash
# Generate migration files based on schema changes
pnpm db:generate

# View database schema in web UI
pnpm db:studio

# Check for schema drift
pnpm db:check

# Push schema changes without migrations
pnpm db:push
```

### Production Build

To create a production build:

```bash
# Using pnpm
pnpm build

# OR using npm
npm run build
```

To start the production server:

```bash
# Using pnpm
pnpm start

# OR using npm
npm start
```

## Troubleshooting

### Common Installation Issues

#### Dependency Conflicts

**Issue**: Errors during dependency installation related to peer dependencies

**Solution**: Use the `--force` flag with pnpm or `--legacy-peer-deps` with npm:

```bash
pnpm install --force
# OR
npm install --legacy-peer-deps
```

#### Database Connection Errors

**Issue**: Unable to connect to the database

**Solutions**:
- Verify your `POSTGRES_URL` is correct
- Check if your IP is allowed in database firewall settings
- Ensure the database user has appropriate permissions
- Try running migrations manually:
  ```bash
  npx tsx lib/db/migrate.ts
  ```

#### Azure OpenAI Connection Issues

**Issue**: Unable to connect to Azure OpenAI services

**Solutions**:
- Verify all Azure OpenAI environment variables
- Check if API keys are valid and not expired
- Ensure model deployments exist with the specified names
- Verify API version is compatible

#### Next.js Build Errors

**Issue**: Errors during the build process

**Solutions**:
- Check for TypeScript errors in your code
- Ensure all dependencies are compatible
- Update to the latest versions of packages
- Clear the `.next` directory and rebuild:
  ```bash
  rm -rf .next
  pnpm build
  ```

## Development Workflow

1. Make changes to the codebase
2. Test changes locally
3. Run linting and formatting:
   ```bash
   pnpm lint
   pnpm format
   ```
4. Commit changes
5. Push to your repository
6. Deploy to your preferred hosting platform

## Next Steps

After successful installation, refer to these additional documentation files:

- [Architecture.md](./Architecture.md) - System architecture overview
- [Product-Requirements-Document.md](./Product-Requirements-Document.md) - Product requirements
- [Database Schema.md](./Database%20Schema.md) - Database structure
- [Module Documentation.md](./Module%20Documentation.md) - Module details
- [Deployment Guide.md](./Deployment%20Guide.md) - Deployment instructions
