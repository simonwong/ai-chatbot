import { customProvider } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const vertex = createVertex({
  project: process.env.GOOGLE_PROJECT_ID,
  location: 'us-central1',
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': vertex('gemini-2.5-flash-preview-05-20'),
        'chat-model-reasoning': vertex('gemini-2.5-pro-preview-05-06'),
        'title-model': openrouter.chat('deepseek/deepseek-chat-v3-0324:free'),
        'artifact-model': vertex('gemini-2.5-pro-preview-05-06'),
      },
      imageModels: {
        'small-model': vertex.image('imagen-3.0-generate-002'),
      },
    });
