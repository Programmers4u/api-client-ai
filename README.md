# P4UClientAI Node API Library

A tool client for communicating with an AI model hub.
Thanks to the tasks you define in the administration panel, you can write your own backend for any application without knowing how to program.

You can access multiple AI models from different vendors in one API. The tool allows for easy and quick implementation of functions that are managed by artificial intelligence models, which we program by describing the task to be performed. The API interface allows you to automate and combine tasks. Thanks to this tool, you can easily create an AI agent that will answer your phone, answer e-mails, chat, write articles or posts on social media.

This library provides convenient access to the REST API from TypeScript or JavaScript.

## Installation

```sh
npm install --save p4u-client-ai
# or
yarn add p4u-client-ai
```

# Code Overview and Purpose
The provided code is a JavaScript module that exports a class `AIClient` along with several objects/constants. The purpose of this code is to create an AI client that interacts with an external API to perform various tasks related to AI operations. The `AIClient` class handles authentication, making requests to API endpoints, and error handling. The `requestObject`, `insertObject`, `GPTModels`, and `AudioModels` are objects/constants that store specific data related to AI tasks, such as request parameters, GPT models, and audio models.

# Usage and Functionality
- `requestObject`: An object used to store request parameters for AI tasks.
- `insertObject`: An object used to store data for inserting new AI tasks.
- `GPTModels`: An object that stores various GPT (Generative Pre-trained Transformer) models with their corresponding identifiers.
- `AudioModels`: An object that stores various audio models with their corresponding identifiers.
- `AIClient`: A class responsible for interacting with the AI API. It handles authentication and provides methods for interacting with the API endpoints.

# AIClient Class Methods
- `pingPong()`: Asynchronously sends a GET request to the `ping` API endpoint to check the connectivity and returns the response.
- `listTasks()`: Asynchronously sends a GET request to the `productstasks` API endpoint to retrieve a list of tasks and returns the response.
- `runTask(request)`: Asynchronously sends a POST request to the `productstasksquery` API endpoint with a request object to execute a task and returns the response.
- `deleteTask(request)`: Asynchronously sends a DELETE request to the `productstasks/{idTask}` API endpoint to delete a specific task based on the provided request object and returns the response.
- `createTask(request)`: Asynchronously sends a PUT request to the `productstasks` API endpoint with a request object to create a new task and returns the response.

# API Endpoints
- `ping`: Endpoint used for checking the connectivity to the API.
- `productstasks`: Endpoint used for retrieving a list of tasks.
- `productstasksquery`: Endpoint used for running a task or querying tasks.

# Error Handling Mechanism
The code uses `try-catch` blocks to handle errors that may occur during API requests. If an error occurs during the asynchronous requests, the `catch` block will handle the error by throwing it to be handled by the calling code.

Overall, this code provides a structured approach to interact with AI-related API endpoints, handle errors, and manage different types of AI models and tasks.