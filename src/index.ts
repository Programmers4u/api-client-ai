import axios, { AxiosResponse } from 'axios';

// Interfaces
export interface IRequest {
  ask: string;
  context: string;
  idTask: string;
}

export interface IInsert {
  name: string;
  context: string;
  model: string;
  instruction: string;
}

export interface IDelete {
  idTask: string;
}

// Enums
export enum GPTModelsEnum {
  OAIGPT4 = 'gpt-4',
  OAIGPT4o = 'gpt-4o',
  OAIGPT4VisionPreview = 'gpt-4-vision-preview',
  OAIGPT41106Preview = 'gpt-4-1106-preview',
  Claude3Opus = 'claude-3-opus-20240229',
  Claude3Sonet = 'claude-3-sonnet-20240229',
  Claude3Haiku = 'claude-3-haiku-20240307',
  OAIGPT41 = 'gpt-4.1-2025-04-14',
  OAIGPT41mini = 'gpt-4.1-mini-2025-04-14',
  OAIGPT41nano = 'gpt-4.1-nano-2025-04-14',
  OAIGPT4omini = 'gpt-4o-mini',
  OAIGPTo1Preview = 'o1-preview',
  OAIGPTo1Mini = 'o1-mini',
  OAIGPTo3Mini = 'o3-mini-2025-01-31',
  Claude35Sonet = 'claude-3-5-sonnet-20241022',
  Claude35Haiku = 'claude-3-5-haiku-20241022',
}

export enum AudioModelsEnum {
  OAIWHISPER1 = 'whisper-1',
  OAITTS1 = 'tts-1',
  OAITTS1HD = 'tts-1-hd',
}

/**
 * AIClient class for interacting with the API at https://app.apihub4ai.com/doc
 * Manages user authentication, task operations requests.
 */
export default class AIClient {
  private headers = {
    'content-type': 'application/json',
    Authorization: '',
  };
  private apiUrl = 'https://api.programmers4u.com';
  private debugUrl: string | undefined;

  constructor() {}

  /**
   * Asynchronous method to log in with the provided username and password.
   *
   * @param userName The username of the user.
   * @param password The password of the user.
   * @returns A Promise that resolves with void.
   * @throws Error if the login request fails with a status other than 200.
   */
  async login(userName: string, password: string): Promise<void> {
    const data = { username: userName, password: password };
    const res = await this.makeRequest('POST', '/auth/login', data);
    if (res.status >= 300) throw new Error(res.statusText);
    this.headers.Authorization = `Bearer ${res.data.access_token}` || '';
  }

  /**
   * Asynchronous method to make a request to a specified endpoint with optional data.
   *
   * @param method The HTTP method for the request.
   * @param endpoint The endpoint to send the request to.
   * @param data Optional data to be sent with the request.
   * @returns A Promise that resolves with the AxiosResponse containing the response data.
   * @throws Error if the request fails.
   */
  private async makeRequest(method: string, endpoint: string, data?: any): Promise<AxiosResponse<any>> {
    try {
      return await axios({
        method,
        url: `${this.debugUrl ? this.debugUrl : this.apiUrl}${endpoint}`,
        headers: this.headers,
        data: data ? JSON.stringify(data) : undefined,
      });
    } catch (err) {
      throw err;
    }
  }

  async pingPong(): Promise<AxiosResponse<any>> {
    return this.makeRequest('GET', '/ping');
  }

  async listTasks(): Promise<AxiosResponse<any>> {
    return this.makeRequest('GET', '/products/tasks');
  }

  async runTask(request: IRequest): Promise<AxiosResponse<any>> {
    return this.makeRequest('POST', '/products/tasks/query', request);
  }

  async deleteTask(request: IDelete): Promise<AxiosResponse<any>> {
    const { idTask } = request;
    return this.makeRequest('DELETE', `/products/tasks/${idTask}`);
  }

  async createTask(request: IInsert): Promise<AxiosResponse<any>> {
    return this.makeRequest('PUT', '/products/tasks/', request);
  }

  setLocalUrl(url: string): void {
    this.debugUrl = url;
  }
}