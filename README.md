# P4U Client AI

Empower Your Apps with AI: Access Multiple Models, Automate Tasks, Create AI Agents Easily

## Installation

```bash
yarn add p4u-client-ai
# or
npm install p4u-client-ai
```

## Usage

### Basic Usage

```typescript
import AIClient, { GPTModelsEnum, IRequest, IInsert } from 'p4u-client-ai';

const client = new AIClient();

// Login
await client.login('your-username', 'your-password');

// List available tasks
const tasks = await client.listTasks();

// Run a task
const request: IRequest = {
  ask: 'What is the weather today?',
  context: 'Weather inquiry',
  idTask: 'task-id'
};
const result = await client.runTask(request);

// Create a new task
const newTask: IInsert = {
  name: 'Weather Assistant',
  context: 'Provides weather information',
  model: GPTModelsEnum.OAIGPT4o,
  instruction: 'You are a helpful weather assistant'
};
await client.createTask(newTask);
```

### Types and enums

You can import all types and enums directly from the package root:

```ts
import AIClient, {
  IRequest,
  IInsert,
  IDelete,
  GPTModelsEnum,
  AudioModelsEnum,
  ImageModelsEnum,
  VideoModelsEnum,
} from 'p4u-client-ai';
```

### Available Models

#### GPT Models
- `GPTModelsEnum.OAIGPT5` - GPT-5
- `GPTModelsEnum.OAIGPT5mini` - GPT-5 mini
- `GPTModelsEnum.OAIGPT5nano` - GPT-5 nano
- `GPTModelsEnum.OAIGPT41` - GPT-4.1 (2025-04-14)
- `GPTModelsEnum.OAIGPT41mini` - GPT-4.1 mini (2025-04-14)
- `GPTModelsEnum.OAIGPT41nano` - GPT-4.1 nano (2025-04-14)
- `GPTModelsEnum.OAIGPT4o` - GPT-4o (2024-11-20)
- `GPTModelsEnum.OAIGPT4omini` - GPT-4o Mini
- `GPTModelsEnum.OAIGPTo1Preview` - o1-preview
- `GPTModelsEnum.OAIGPTo1Mini` - o1-mini
- `GPTModelsEnum.OAIGPTo3Mini` - o3-mini (2025-01-31)
- `GPTModelsEnum.Claude4Sonet` - Claude Sonnet 4 (2025-05-14)
- `GPTModelsEnum.Claude3Haiku` - Claude 3 Haiku (2024-03-07)
- `GPTModelsEnum.Claude35Haiku` - Claude 3.5 Haiku (2024-10-22)

#### Audio Models
- `AudioModelsEnum.OAIWHISPER1` - Whisper-1
- `AudioModelsEnum.OAITTS1` - TTS-1
- `AudioModelsEnum.OAITTS1HD` - TTS-1 HD
- `AudioModelsEnum.OAITTS4oMINI` - GPT-4o Mini TTS
- `AudioModelsEnum.OAI4oMiniTranscribe` - GPT-4o Mini Transcribe

#### Image Models
- `ImageModelsEnum.SDV3` - Stable Diffusion v3
- `ImageModelsEnum.SDV3_CORE` - Stable Diffusion v3 Core
- `ImageModelsEnum.SDV3_ULTRA` - Stable Diffusion v3 Ultra
- `ImageModelsEnum.SDV3_TURBO_LARGE` - Stable Diffusion v3 Turbo Large
- `ImageModelsEnum.SDV3_LARGE` - Stable Diffusion v3 Large
- `ImageModelsEnum.SDV3_MEDIUM` - Stable Diffusion v3 Medium
- `ImageModelsEnum.SDV1_6` - Stable Diffusion v1.6
- `ImageModelsEnum.SDV1XL` - Stable Diffusion XL 1024 v1.0
- `ImageModelsEnum.SDV2XLBeta` - Stable Diffusion XL Beta v2.2.2
- `ImageModelsEnum.SDV1_VIDEO` - Stable Diffusion v1 Video

#### Video Models
- `VideoModelsEnum.VSDV2Beta` - Stable Diffusion Video v2 Beta

### API Methods

- `login(userName: string, password: string)` - Authenticate with the API
- `pingPong()` - Test API connectivity
- `listTasks()` - Get all available tasks
- `runTask(request: IRequest)` - Execute a task
- `createTask(request: IInsert)` - Create a new task
- `deleteTask(request: IDelete)` - Delete a task
- `setLocalUrl(url: string)` - Set custom API URL for development

### TypeScript Support

This package includes full TypeScript definitions with interfaces:

- `IRequest` - For task execution requests
- `IInsert` - For creating new tasks
- `IDelete` - For deleting tasks

## License

Apache-2.0

## Homepage

[https://www.valar-ai.com](https://www.valar-ai.com)