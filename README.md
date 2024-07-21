# P4U Client AI Node API Package

[Task automation system home](https://app.apihub4ai.com)

[Documentation: API](https://app.apihub4ai.com/doc)

A tool client for communicating with an AI models hub.
Thanks to the tasks you define in the administration panel, you can write your own backend for any application without knowing how to program.

You can access multiple AI models from different vendors in one API. The tool allows for easy and quick implementation of functions that are managed by artificial intelligence models, which we program by describing the task to be performed. The API interface allows you to automate and combine tasks. Thanks to this tool, you can easily create an AI agent that will answer your phone, answer e-mails, chat, write articles or posts on social media.

This library provides convenient access to the REST API from TypeScript or JavaScript.

# AIClient User Documentation

## Installation

```sh
npm install --save p4u-client-ai
# or
yarn add p4u-client-ai
```

The AIClient class is designed for interacting with the API at [task automation system](https://app.apihub4ai.com/doc). It manages user authentication, task operations requests.

## Overview

The `AIClient` class provides an interface to interact with the API at `https://api.programmers4u.com`. This client supports user authentication, task operations such as creating, listing, running, and deleting tasks. It also provides some utility methods for basic API interactions.

## Enums

### `AudioModelsEnum`
- **OAIWHISPER1**: `whisper-1`
- **OAITTS1**: `tts-1`
- **OAITTS1HD**: `tts-1-hd`

### `GPTModelsEnum`
- **OAIGPT35Turbo**: `gpt-3.5-turbo`
- **OAIGPT35Turbo1106**: `gpt-3.5-turbo-1106`
- **OAIGPT35Turbo16k**: `gpt-3.5-turbo-16k`
- **OAIGPT35TurboInstruct**: `gpt-3.5-turbo-instruct`
- **OAIGPT4**: `gpt-4`
- **OAIGPT4o**: `gpt-4o`
- **OAIGPT432k**: `gpt-4-32k`
- **OAIGPT4VisionPreview**: `gpt-4-vision-preview`
- **OAIGPT41106Preview**: `gpt-4-1106-preview`
- **Claude3Opus**: `claude-3-opus-20240229`
- **Claude3Sonet**: `claude-3-sonnet-20240229`
- **Claude3Haiku**: `claude-3-haiku-20240307`

## Interfaces

### `IDelete`
```typescript
interface IDelete {
    idTask: string;
}
```

### `IInsert`
```typescript
interface IInsert {
    name: string;
    context: string;
    model: string;
    instruction: string;
}
```

### `IRequest`
```typescript
interface IRequest {
    ask: string;
    context: string;
    idTask: string;
}
```

## Methods

### `login(userName: string, password: string): Promise<void>`
Logs in the user with the provided `username` and `password`.

### `makeRequest(method: string, endpoint: string, data?: any): Promise<AxiosResponse<any>>`
Makes an HTTP request to the specified `endpoint` using the given HTTP `method` and optional `data`.

### `pingPong(): Promise<AxiosResponse<any>>`
Pings the API to check if the connection is alive.

### `listTasks(): Promise<AxiosResponse<any>>`
Lists all tasks available for the user.

### `runTask(request: IRequest): Promise<AxiosResponse<any>>`
Runs a specific task based on the given `request`.

### `deleteTask(request: IDelete): Promise<AxiosResponse<any>>`
Deletes a task specified by the `request`.

### `createTask(request: IInsert): Promise<AxiosResponse<any>>`
Creates a new task with the provided `request`.

## Error Handling Mechanism

The code uses `try-catch` blocks to handle errors that may occur during API requests. If an error occurs during the asynchronous requests, the `catch` block will handle the error by throwing it to be handled by the calling code.

Overall, this code provides a structured approach to interact with AI-related API endpoints, handle errors, and manage different types of AI models and tasks.

## Usage Example

Start test

```sh
npm run test
or
yarn test
```

```typescript
import { IRequest } from "../interfaces/request.interface";
import AIClient from "../index";

const userName = "XXX@XXX";
const password = "XXXXXXX";

const startTest = async () => {
    const client = new AIClient();
    await client.login(userName, password);
    const listOfTasks = await client.listTasks();
    console.log(listOfTasks);

    const testText = "Your task description here.";
    const taskRequest: IRequest = {
        idTask: "52468971-a06e-413d-9b3a-212b53aad693",
        ask: testText,
        context: " ",
    };

    const taskRun = await client.runTask(taskRequest);
    console.log(taskRun);
};

startTest();
```

# CURL Usage Documentation
This documentation provides a comprehensive guide to using the `AIClient` class and making API requests using `curl`.

## Authentication

### Login
```sh
curl -X POST https://api.programmers4u.com/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "your_username", "password": "your_password"}'
```

## Tasks

### List Tasks
```sh
curl -X GET https://api.programmers4u.com/products/tasks \
     -H "Authorization: Bearer your_access_token"
```

### Run Task
```sh
curl -X POST https://api.programmers4u.com/products/tasks/query \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_access_token" \
     -d '{
           "idTask": "52468971-a06e-413d-9b3a-212b53aad693",
           "ask": "Your task description here.",
           "context": " "
         }'
```

### Create Task
```sh
curl -X PUT https://api.programmers4u.com/products/tasks \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_access_token" \
     -d '{
           "name": "Task Name",
           "context": "Task Context",
           "model": "Model Name",
           "instruction": "Task Instructions"
         }'
```

### Delete Task
```sh
curl -X DELETE https://api.programmers4u.com/products/tasks/52468971-a06e-413d-9b3a-212b53aad693 \
     -H "Authorization: Bearer your_access_token"
```

### Ping API
```sh
curl -X GET https://api.programmers4u.com/ping
```