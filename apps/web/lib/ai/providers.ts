import {
	customProvider,
	extractReasoningMiddleware,
	wrapLanguageModel,
} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { createOpenRouter } from '@openrouter/ai-sdk-provider';

interface OpenRouterHeaders {
	"HTTP-Referer"?: string;
	"X-Title"?: string;
}

const google = createGoogleGenerativeAI({
	apiKey:
		process.env.GOOGLE_AI_API_KEY || "AIzaSyB6j8bJ54i8PlDG114t0ulkKbnwW3ScAi4",
});

const openRouterHeaders: Record<string, string> = {};

if (process.env.OPENROUTER_SITE_URL) {
	openRouterHeaders["HTTP-Referer"] = process.env.OPENROUTER_SITE_URL;
}

if (process.env.OPENROUTER_SITE_NAME) {
	openRouterHeaders["X-Title"] = process.env.OPENROUTER_SITE_NAME;
}

// const openrouter = createOpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   headers: Object.keys(openRouterHeaders).length
//     ? openRouterHeaders
//     : undefined,
// });

const reasoningModel = wrapLanguageModel({
	model: google("gemini-2.0-flash-thinking-exp" as any) as any,
	middleware: extractReasoningMiddleware({ tagName: "think" }),
});

export const myProvider = customProvider({
	languageModels: {
		"chat-model": google("gemini-2.0-flash-exp" as any) as any,
		"chat-model-reasoning": reasoningModel as any,
		"title-model": google("gemini-1.5-flash" as any) as any,
		"artifact-model": google("gemini-2.0-flash-exp" as any) as any,
		// 'openrouter-gpt-4o': openrouter.chat(
		//   process.env.OPENROUTER_CHAT_MODEL || 'openai/gpt-4o',
		// ),
	},
});
