# 🤖 AI Chatbot with Portfolio

<div align="center">
  <img src="app/(portfolio)/portfolio-preview.png" alt="Portfolio Preview" width="800">
</div>

<p align="center">
  <b>A powerful AI chatbot with multiple models, reasoning capabilities, and artifact generation</b>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-environment-setup">Environment Setup</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-development">Development</a> •
  <a href="#-documentation">Documentation</a>
</p>

## ✨ Features

- **Multiple AI Models**: Support for various Azure OpenAI models with different capabilities
- **Reasoning Visualization**: See how the AI thinks through complex problems
- **Artifact Generation**: Create code, documents, images, and more
- **Tool Integration**: Weather information, document creation, and content suggestions
- **Portfolio Integration**: Showcase your work alongside the AI assistant

## 📸 Screenshots

### Chat Dashboard
<div align="center">
  <img src="./app/(chat)/chat-dashboard-preview.png" alt="Chat Dashboard" width="800">
  <p><i>Main chat interface with history sidebar, model selector, and input suggestions</i></p>
</div>

### Reasoning Capabilities
<div align="center">
  <img src="./app/(chat)/chat-reasoning.png" alt="Reasoning UI" width="800">
  <p><i>See how the model thinks before responding to complex questions</i></p>
</div>

### Code Generation
<div align="center">
  <img src="./app/(chat)/chat-artifacts.png" alt="Code Artifacts" width="800">
  <p><i>Generate runnable code with syntax highlighting</i></p>
</div>

### Document Creation
<div align="center">
  <img src="./app/(chat)/chat-markdown.png" alt="Markdown Documents" width="800">
  <p><i>Create and edit documents in markdown format</i></p>
</div>

## 🚀 Installation

For detailed guide : [Installation Guide](docs/Installation.md)

## Clone the Repository

```bash
git clone https://github.com/AryaTejaRudraraju/portfoliov1.git
cd portfoliov1
```

## Install Dependencies

This project uses React 19 (RC) and Next.js 15 (Canary). Due to potential dependency conflicts, use one of the following installation methods:

```bash
# Using pnpm (recommended)
pnpm install --force

# OR using npm
npm install --legacy-peer-deps
```

## 🔑 Environment Setup

1. Create a `.env.local` file in the project root with the following variables:

```
# Authentication
AUTH_SECRET=<your-auth-secret>
AUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true

# Database (Supabase PostgreSQL)
POSTGRES_URL="postgresql://postgres.username:password@hostname:port/postgres"

# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=<your-api-key>
AZURE_OPENAI_API_VERSION=2025-01-01-preview
AZURE_RESOURCE_NAME=<your-resource-name>

# Model Deployments
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_REASONING_DEPLOYMENT=o4-mini
AZURE_OPENAI_TITLE_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_ARTIFACT_DEPLOYMENT=gpt-4o

# Image Generation
AZURE_IMAGE_API_KEY=<your-image-api-key>
AZURE_IMAGE_API_VERSION=2024-04-01-preview
AZURE_IMAGE_RESOURCE_NAME=<your-image-resource-name>
```

## 💾 Database Setup

After setting up your database connection, run the migration command to create the required schema:

```bash
# Using pnpm
pnpm db:migrate

# OR using npm
npm run db:migrate
```

## 🧪 Development

Start the development server:

```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev
```

> ⚠️ Note: Development mode uses Turbo and may be slower due to hot reloading.

## 🏗️ Production

Build and start the production server:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 📚 Documentation

Comprehensive documentation is available in the `docs` folder:

- [Installation Guide](docs/Installation.md)
- [Product Requirements Document](docs/Product-Requirements-Document.md)
- [Architecture Documentation](docs/Architecture.md)
- [Security Documentation](docs/Security.md)
- [Module Documentation](docs/Module%20Documentation.md)
- [Prompt Library](docs/Prompt%20Library.md)
- [Folder Structure](docs/Folder%20Structure.md)
- [Deployment Guide](docs/Deployment%20Guide.md)
- [Database Schema](docs/Database%20Schema.md)

## 🔧 Troubleshooting

### Common Issues

- **Dependency Conflicts**: Use `--force` or `--legacy-peer-deps` flags during installation
- **Database Connection Issues**: Verify your connection string and network access
- **Migration Failures**: Check database permissions and try running `db:generate` before `db:migrate`
- **Azure OpenAI Errors**: Confirm API keys and deployment names match your Azure resources

## 🛡️ Security

This application implements several security measures:

- JWT-based authentication with Auth.js
- Secure session management
- Input validation and sanitization
- API key protection

For more details, see the [Security Documentation](docs/Security.md).


## 🔄 Continuous Integration

The project includes configuration for:

- Linting: `pnpm lint`
- Formatting: `pnpm format`
- Database checks: `pnpm db:check`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ using Next.js, React, and Azure OpenAI
</p>
