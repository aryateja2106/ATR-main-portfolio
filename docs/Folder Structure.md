# Folder Structure

This document provides an overview of the project's folder structure and organization. Understanding the structure will help you navigate the codebase and locate specific components or functionality.

## Root Directory

```
/
├── app/                    # Next.js App Router directory
├── artifacts/              # Generated content storage
├── components/             # Shared React components
├── docs/                   # Project documentation
├── hooks/                  # Custom React hooks
├── lib/                    # Shared utilities and business logic
├── public/                 # Static assets
├── tests/                  # Test files
├── .env.local              # Environment variables (local development)
├── .gitignore              # Git ignore configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── README.md               # Project overview and setup instructions
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## App Directory

The `app` directory uses Next.js App Router pattern with route groups:

```
app/
├── (auth)/                 # Authentication-related routes
│   ├── api/                # Authentication API routes
│   │   └── auth/           # NextAuth.js API routes
│   │       └── [...nextauth]/
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── actions.ts          # Authentication server actions
│   ├── auth.config.ts      # Auth.js configuration
│   └── auth.ts             # Main authentication setup
│
├── (chat)/                 # Chat-related routes
│   ├── api/                # Chat API routes
│   │   ├── chat/           # Chat interaction API
│   │   ├── document/       # Document management API
│   │   ├── files/          # File upload API
│   │   ├── history/        # Chat history API
│   │   ├── suggestions/    # Content suggestions API
│   │   └── vote/           # Feedback collection API
│   ├── chat/               # Chat UI pages
│   │   ├── [id]/           # Individual chat page
│   │   ├── layout.tsx      # Chat layout component
│   │   └── page.tsx        # Main chat page
│   ├── actions.ts          # Chat-related server actions
│   └── opengraph-image.png # Social media preview image
│
└── (portfolio)/            # Portfolio section
    ├── _components/        # Portfolio-specific components
    ├── _hooks/             # Portfolio-specific hooks
    ├── _utils/             # Portfolio-specific utilities
    ├── blog/               # Blog pages
    │   ├── [blogId]/       # Individual blog post page
    │   └── page.tsx        # Blog listing page
    ├── layout.tsx          # Portfolio layout component
    └── page.tsx            # Portfolio main page
```

## Components Directory

The `components` directory contains reusable React components:

```
components/
├── ui/                     # Base UI components
│   ├── button.tsx          # Button component
│   ├── dialog.tsx          # Dialog component
│   ├── dropdown-menu.tsx   # Dropdown menu component
│   ├── input.tsx           # Input component
│   ├── select.tsx          # Select component
│   ├── textarea.tsx        # Textarea component
│   └── ...                 # Other UI components
│
├── artifact-renderer.tsx   # Renders different artifact types
├── chat.tsx                # Main chat component
├── chat-header.tsx         # Chat header with controls
├── chat-message.tsx        # Individual message component
├── chat-messages.tsx       # Message list component
├── empty-screen.tsx        # Empty state component
├── footer.tsx              # Footer component
├── header.tsx              # Header component
├── model-selector.tsx      # AI model selection component
├── multimodal-input.tsx    # Advanced input component
├── sidebar.tsx             # Sidebar navigation component
├── visibility-selector.tsx # Chat visibility control
└── ...                     # Other shared components
```

## Lib Directory

The `lib` directory contains shared utilities and business logic:

```
lib/
├── ai/                     # AI-related code
│   ├── tools/              # Tool implementations
│   │   ├── create-document.ts  # Document creation tool
│   │   ├── get-weather.ts      # Weather information tool
│   │   ├── request-suggestions.ts # Suggestions tool
│   │   └── update-document.ts  # Document update tool
│   ├── prompts.ts          # System prompts for AI models
│   └── providers.ts        # AI provider configuration
│
├── artifacts/              # Artifact management utilities
│   ├── code.ts             # Code artifact handling
│   ├── document.ts         # Document artifact handling
│   ├── image.ts            # Image artifact handling
│   └── sheet.ts            # Sheet artifact handling
│
├── db/                     # Database-related code
│   ├── helpers/            # Database helper functions
│   ├── migrations/         # Database migration files
│   │   └── meta/           # Migration metadata
│   ├── migrate.ts          # Migration script
│   ├── queries.ts          # Database query functions
│   └── schema.ts           # Database schema definition
│
├── editor/                 # Text editor utilities
│
├── portfolio/              # Portfolio-specific utilities
│
├── constants.ts            # Application constants
├── types.ts                # TypeScript type definitions
└── utils.ts                # General utility functions
```

## Artifacts Directory

The `artifacts` directory stores generated content:

```
artifacts/
├── code/                   # Generated code snippets
├── image/                  # Generated images
├── sheet/                  # Generated spreadsheets
└── text/                   # Generated text documents
```

## Public Directory

The `public` directory contains static assets:

```
public/
├── assets/                 # General assets
├── images/                 # Image assets
└── ...                     # Other static files
```

## Hooks Directory

The `hooks` directory contains custom React hooks:

```
hooks/
├── use-chat.ts             # Chat functionality hook
├── use-copy-to-clipboard.ts # Clipboard functionality
├── use-local-storage.ts    # Local storage hook
├── use-media-query.ts      # Media query hook
└── ...                     # Other custom hooks
```

## Tests Directory

The `tests` directory contains test files:

```
tests/
├── e2e/                    # End-to-end tests
└── ...                     # Other test files
```

## Docs Directory

The `docs` directory contains project documentation:

```
docs/
├── Architecture.md         # System architecture documentation
├── Database Schema.md      # Database schema documentation
├── Deployment Guide.md     # Deployment instructions
├── Folder Structure.md     # This file
├── Installation.md         # Installation guide
├── Module Documentation.md # Module-specific documentation
├── Product-Requirements-Document.md # PRD
├── Prompt Library.md       # AI prompt documentation
└── Security.md             # Security documentation
```

## Key Files

### Configuration Files

- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `.env.local`: Environment variables for local development

### Package Management

- `package.json`: Project dependencies and scripts
- `pnpm-lock.yaml`: Lock file for pnpm

### Documentation

- `README.md`: Project overview and setup instructions

## Directory Structure Rationale

### App Router Organization

The project uses route groups (parentheses notation) to organize related routes:

- `(auth)`: Authentication-related routes
- `(chat)`: Chat functionality routes
- `(portfolio)`: Portfolio section routes

This approach keeps related functionality together while maintaining clean URLs.

### Component Organization

Components are organized into:

- Base UI components in `components/ui/`
- Feature-specific components at the root of `components/`
- Section-specific components in their respective route groups

### Code Modularity

The codebase follows these principles:

1. **Separation of Concerns**: Each directory has a specific purpose
2. **Feature Encapsulation**: Related code is grouped together
3. **Reusability**: Common utilities and components are shared
4. **Scalability**: Structure allows for easy addition of new features

## Navigation Guidelines

### Finding Specific Functionality

- **Authentication Logic**: Look in `app/(auth)/`
- **Chat API Endpoints**: Look in `app/(chat)/api/`
- **UI Components**: Look in `components/`
- **Database Operations**: Look in `lib/db/`
- **AI Configuration**: Look in `lib/ai/`

### Adding New Features

When adding new features:

1. **UI Components**: Add to `components/` or create feature-specific components
2. **API Endpoints**: Add to appropriate section in `app/*/api/`
3. **Database Changes**: Update schema in `lib/db/schema.ts` and create migrations
4. **AI Capabilities**: Extend prompts in `lib/ai/prompts.ts` or add tools in `lib/ai/tools/`

## Best Practices

### File Naming Conventions

- React components: PascalCase (e.g., `ChatMessage.tsx`)
- Utilities and hooks: camelCase (e.g., `useChat.ts`)
- Route handlers: `route.ts`
- Page components: `page.tsx`
- Layout components: `layout.tsx`

### Import Conventions

- Use absolute imports with `@/` prefix for project files
- Group imports by:
  1. External libraries
  2. Internal components
  3. Utilities and hooks
  4. Types and constants

### Code Organization

- Keep files focused on a single responsibility
- Extract reusable logic to separate utilities or hooks
- Use consistent patterns for similar functionality
