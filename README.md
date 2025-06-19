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

### Available Models

#### GPT Models
- `GPTModelsEnum.OAIGPT4` - GPT-4
- `GPTModelsEnum.OAIGPT4o` - GPT-4o
- `GPTModelsEnum.OAIGPT4omini` - GPT-4o Mini
- `GPTModelsEnum.OAIGPTo1Preview` - o1-preview
- `GPTModelsEnum.Claude35Sonet` - Claude 3.5 Sonnet
- And many more...

#### Audio Models
- `AudioModelsEnum.OAIWHISPER1` - Whisper-1
- `AudioModelsEnum.OAITTS1` - TTS-1
- `AudioModelsEnum.OAITTS1HD` - TTS-1 HD

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