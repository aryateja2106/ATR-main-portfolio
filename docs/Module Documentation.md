# Module Documentation

This document provides detailed information about the key modules and components of the AI Chatbot application.

## Table of Contents

1. [AI Module](#ai-module)
2. [Authentication Module](#authentication-module)
3. [Chat Module](#chat-module)
4. [Database Module](#database-module)
5. [UI Components](#ui-components)
6. [Tools Integration](#tools-integration)
7. [Artifact Handling](#artifact-handling)

## AI Module

The AI module handles integration with Azure OpenAI services and manages different AI models.

### Key Files

- `lib/ai/providers.ts`: Configures AI providers and models
- `lib/ai/prompts.ts`: Defines system prompts for different models
- `lib/ai/tools/`: Contains implementations for various AI tools

### Models Configuration

The application supports multiple AI models through a flexible provider architecture:

```typescript
// lib/ai/providers.ts
export const myProvider = customProvider({
  languageModels: {
    'chat-model': azure(process.env.AZURE_OPENAI_CHAT_DEPLOYMENT || "gpt-4o"),
    'chat-model-reasoning': reasoningModel,
    'title-model': azure(process.env.AZURE_OPENAI_TITLE_DEPLOYMENT || "gpt-4o-mini"),
    'artifact-model': azure(process.env.AZURE_OPENAI_ARTIFACT_DEPLOYMENT || "gpt-4o"),
  },
  imageModels: {
    'small-model': azureImageModel(process.env.AZURE_IMAGE_DEPLOYMENT_NAME || "dall-e-3"),
  },
});
```

### Model Capabilities

| Model ID | Base Model | Special Capabilities |
|----------|------------|----------------------|
| chat-model | GPT-4o | General chat, tool access |
| chat-model-reasoning | GPT-4o Mini | Explicit reasoning steps |
| title-model | GPT-4o Mini | Optimized for title generation |
| artifact-model | GPT-4o | Document and code generation |
| small-model | DALL-E 3 | Image generation |

### Usage Example

```typescript
// Using a language model
const result = streamText({
  model: myProvider.languageModel('chat-model'),
  system: systemPrompt({ selectedChatModel: 'chat-model' }),
  messages,
  // Additional options...
});

// Using an image model
const image = await generateImage({
  model: myProvider.imageModel('small-model'),
  prompt: userPrompt,
});
```

## Authentication Module

The authentication module handles user registration, login, and session management.

### Key Files

- `app/(auth)/auth.ts`: Main authentication configuration
- `app/(auth)/auth.config.ts`: Auth.js configuration
- `app/(auth)/actions.ts`: Server actions for authentication
- `app/(auth)/api/auth/[...nextauth]/route.ts`: NextAuth API route

### Authentication Flow

1. User submits credentials via login form
2. Credentials are validated against the database
3. On successful validation, a session is created
4. Session token is returned to the client
5. Subsequent requests include the session token for authentication

### Usage Example

```typescript
// Protecting a route
import { auth } from '@/app/(auth)/auth';

export async function GET(request: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Process authenticated request
}
```

## Chat Module

The chat module handles conversation management, message processing, and interaction with AI models.

### Key Files

- `app/(chat)/api/chat/route.ts`: API endpoint for chat interactions
- `app/(chat)/chat/[id]/page.tsx`: Chat interface page
- `components/chat.tsx`: Main chat component
- `components/chat-messages.tsx`: Message display component
- `components/multimodal-input.tsx`: Input component for text and files

### Chat Flow

1. User sends a message via the chat interface
2. Message is sent to the chat API endpoint
3. API endpoint processes the message and forwards to the AI provider
4. AI generates a response, potentially using tools
5. Response is streamed back to the client
6. Messages are saved to the database

### Message Structure

```typescript
interface UIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: Array<{
    type: 'text' | 'image' | 'code' | 'document';
    content: string;
  }>;
  experimental_attachments?: Array<{
    type: string;
    title?: string;
    data: any;
  }>;
  createdAt?: Date;
}
```

## Database Module

The database module handles data persistence using PostgreSQL and Drizzle ORM.

### Key Files

- `lib/db/schema.ts`: Database schema definition
- `lib/db/queries.ts`: Database query functions
- `lib/db/migrate.ts`: Database migration script
- `lib/db/migrations/`: Migration files

### Schema Overview

The database schema includes the following main tables:

- `users`: User accounts and profile information
- `chats`: Chat sessions and metadata
- `messages`: Individual messages within chats
- `artifacts`: Generated content like images and documents

### Migration Commands

```bash
# Generate migration files based on schema changes
npm run db:generate

# Apply migrations to the database
npm run db:migrate

# View database schema in web UI
npm run db:studio
```

### Usage Example

```typescript
// Saving a chat message
import { saveMessages } from '@/lib/db/queries';

await saveMessages({
  messages: [
    {
      chatId: id,
      id: messageId,
      role: 'user',
      parts: messageParts,
      attachments: messageAttachments,
      createdAt: new Date(),
    },
  ],
});
```

## UI Components

The application uses a component-based UI architecture with React and Tailwind CSS.

### Key Components

- `components/ui/`: Base UI components (buttons, inputs, etc.)
- `components/chat*.tsx`: Chat-specific components
- `components/model-selector.tsx`: AI model selection component
- `components/visibility-selector.tsx`: Chat visibility control
- `components/multimodal-input.tsx`: Advanced input component

### Component Hierarchy

```
Chat
├── ChatHeader
│   ├── ModelSelector
│   └── VisibilitySelector
├── ChatMessages
│   ├── ChatMessage
│   │   ├── MessageContent
│   │   └── MessageAttachments
│   └── ChatLoader
└── MultimodalInput
    ├── TextArea
    ├── FileUpload
    └── SubmitButton
```

### Styling Approach

The application uses Tailwind CSS with the following organization:

- Base styles in `app/globals.css`
- Component-specific styles using Tailwind classes
- Dark/light mode support via `next-themes`
- Animations with Framer Motion

## Tools Integration

The application integrates various tools that can be used by the AI models.

### Available Tools

- `lib/ai/tools/create-document.ts`: Document creation tool
- `lib/ai/tools/update-document.ts`: Document update tool
- `lib/ai/tools/request-suggestions.ts`: Content suggestion tool
- `lib/ai/tools/get-weather.ts`: Weather information tool

### Tool Registration

Tools are registered in the chat API route:

```typescript
// app/(chat)/api/chat/route.ts
experimental_activeTools:
  selectedChatModel === 'chat-model-reasoning'
    ? []
    : [
        'getWeather',
        'createDocument',
        'updateDocument',
        'requestSuggestions',
      ],
tools: {
  getWeather,
  createDocument: createDocument({ session, dataStream }),
  updateDocument: updateDocument({ session, dataStream }),
  requestSuggestions: requestSuggestions({
    session,
    dataStream,
  }),
},
```

### Tool Implementation Example

```typescript
// lib/ai/tools/get-weather.ts
export async function getWeather({
  location,
}: {
  location: string;
}): Promise<WeatherResponse> {
  // Implementation details...
  return {
    temperature: 72,
    description: 'Sunny',
    location: 'San Francisco, CA',
    unit: 'F',
  };
}
```

## Artifact Handling

The artifact module manages generated content like images, code, and documents.

### Key Files

- `lib/artifacts/`: Artifact management utilities
- `artifacts/`: Storage for generated artifacts
- `components/artifact-renderer.tsx`: Component for displaying artifacts

### Artifact Types

The application supports various artifact types:

- **Text**: Formatted text content
- **Code**: Syntax-highlighted code snippets
- **Images**: AI-generated images
- **Documents**: Structured documents with formatting
- **Sheets**: Tabular data representations

### Storage Strategy

Artifacts are stored using a combination of:

- Database references for metadata
- File system storage for content
- Vercel Blob for production environments

### Rendering Approach

Artifacts are rendered using specialized components based on their type:

```tsx
// Simplified example
function ArtifactRenderer({ artifact }) {
  switch (artifact.type) {
    case 'code':
      return <CodeRenderer code={artifact.content} language={artifact.language} />;
    case 'image':
      return <ImageRenderer src={artifact.url} alt={artifact.alt} />;
    case 'document':
      return <DocumentRenderer content={artifact.content} />;
    // Other types...
    default:
      return <div>Unsupported artifact type</div>;
  }
}
```

## Integration Points

### External Services

- **Azure OpenAI**: AI model provider
- **Supabase PostgreSQL**: Database service
- **Vercel Blob**: File storage service

### Internal APIs

- `/api/chat`: Chat interaction endpoint
- `/api/history`: Chat history management
- `/api/document`: Document creation and management
- `/api/files/upload`: File upload handling
- `/api/suggestions`: Content suggestion service
- `/api/vote`: Feedback collection for responses

## Extension Points

The application is designed with several extension points:

### Adding New Models

To add a new AI model:

1. Update `lib/ai/providers.ts` with the new model configuration
2. Add appropriate system prompts in `lib/ai/prompts.ts`
3. Update the model selector component to include the new option

### Adding New Tools

To add a new tool:

1. Create a new tool implementation in `lib/ai/tools/`
2. Register the tool in the chat API route
3. Update system prompts to inform the AI about the new tool

### Custom UI Components

To add custom UI components:

1. Create new components in the `components/` directory
2. Use Tailwind CSS for styling
3. Import and use the components in the appropriate pages or layouts
