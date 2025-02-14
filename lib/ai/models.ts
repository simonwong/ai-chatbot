import { createOpenAI } from '@ai-sdk/openai';
import { createFireworks } from '@ai-sdk/fireworks';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const bailian = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: process.env.FIREWORKS_BASE_URL,
});

const bailianDeepseek = createFireworks({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: process.env.FIREWORKS_BASE_URL,
});

export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': openai('gpt-4o-mini'),
    'chat-model-large': openai('gpt-4o'),
    'chat-model-reasoning': wrapLanguageModel({
      model: bailianDeepseek('deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    // 'title-model': openai('gpt-4-turbo'),
    'title-model': bailian('deepseek-v3'),
    // 'artifact-model': openai('gpt-4o-mini'),
    'artifact-model': bailian('deepseek-v3'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    // name: 'Small model',
    name: '小模型（gpt-4o-mini）',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    // name: 'Large model',
    name: '大模型（gpt-4o）',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    // name: 'Reasoning model',
    name: '推理模型（deepseek-r1）',
    description: 'Uses advanced reasoning',
  },
];
