import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

import { createAzure } from "@ai-sdk/azure";

// Azure OpenAI configuration
const azureConfig = {
  apiKey: process.env.AZURE_OPENAI_API_KEY || "",
  resourceName: process.env.AZURE_RESOURCE_NAME || "aryat-m3dnuvzf-eastus2",
  apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2025-01-01-preview",
};

// Azure OpenAI Image configuration
const azureImageConfig = {
  apiKey: process.env.AZURE_IMAGE_API_KEY || "",
  resourceName: process.env.AZURE_IMAGE_RESOURCE_NAME || "TestPilot",
  apiVersion: process.env.AZURE_IMAGE_API_VERSION || "2024-04-01-preview",
};

// Create Azure OpenAI provider
const azure = createAzure({
  apiKey: azureConfig.apiKey,
  resourceName: azureConfig.resourceName,
  apiVersion: azureConfig.apiVersion,
});

// Create Azure OpenAI Image provider
const azureImage = createAzure({
  apiKey: azureImageConfig.apiKey,
  resourceName: azureImageConfig.resourceName,
  apiVersion: azureImageConfig.apiVersion,
});



const azureImageModel = (deploymentName: string) => {
  return azureImage.imageModel(deploymentName);
}


const reasoningModel = wrapLanguageModel({
  model: azure("o4-mini"),
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});

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