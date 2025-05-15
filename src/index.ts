import axios, { AxiosResponse } from 'axios';
import { IRequest } from './interfaces/request.interface';
import { IInsert } from './interfaces/insert.interface';
import { IDelete } from './interfaces/delete.interface';

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
    const data = {
      username: userName,
      password: password,
    };
    const res = await this.makeRequest('POST', '/auth/login', data);
    if (res.status >= 300) {
      throw new Error(res.statusText);
    }
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
  private async makeRequest(
    method: string,
    endpoint: string,
    data?: any,
  ): Promise<AxiosResponse<any>> {
    try {
      const response = await axios({
        method,
        url: `${this.debugUrl ? this.debugUrl : this.apiUrl}${endpoint}`,
        headers: this.headers,
        data: data ? JSON.stringify(data) : undefined,
      });
      return response;
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
