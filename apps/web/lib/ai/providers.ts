import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
	customProvider,
	extractReasoningMiddleware,
	wrapLanguageModel,
} from "ai";

const google = createGoogleGenerativeAI();

const reasoningModel = wrapLanguageModel({
	// biome-ignore lint/suspicious/noExplicitAny: AI SDK v4 and the Google provider expose incompatible model type revisions.
	model: google("gemini-2.0-flash-thinking-exp" as any) as any,
	middleware: extractReasoningMiddleware({ tagName: "think" }),
});

export const myProvider = customProvider({
	languageModels: {
		// biome-ignore lint/suspicious/noExplicitAny: AI SDK v4 and the Google provider expose incompatible model type revisions.
		"chat-model": google("gemini-2.0-flash-exp" as any) as any,
		// biome-ignore lint/suspicious/noExplicitAny: AI SDK v4 and the Google provider expose incompatible model type revisions.
		"chat-model-reasoning": reasoningModel as any,
		// biome-ignore lint/suspicious/noExplicitAny: AI SDK v4 and the Google provider expose incompatible model type revisions.
		"title-model": google("gemini-1.5-flash" as any) as any,
		// biome-ignore lint/suspicious/noExplicitAny: AI SDK v4 and the Google provider expose incompatible model type revisions.
		"artifact-model": google("gemini-2.0-flash-exp" as any) as any,
	},
});
