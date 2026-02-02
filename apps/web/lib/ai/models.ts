export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Gemini 2.0 Flash',
    description: 'Google AI Studio primary chat model',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Gemini 2.0 Flash Thinking',
    description: 'Gemini model with explicit reasoning',
  },
];
