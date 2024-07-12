import axios from "axios";
import { IRequest } from "./interfaces/request.interface";
import { IInsert } from "./interfaces/insert.interface";
import { IDelete } from "./interfaces/delete.interface";

/**
 * AIClient class for interacting with the API at https://api.programmers4u.com.
 * @constructor
 * @param apiKey - The API key required for authentication.
 */
class AIClient {
  private headers: { "x-api-key": string; "content-type": string };
  private apiUrl = "https://api.programmers4u.com";

  constructor(private apiKey: string) {
    if (!apiKey) {
      throw new Error("[AIClient] apiKey is mandatory");
    }
    this.headers = {
      "x-api-key": this.apiKey,
      "content-type": "application/json",
    };
  }

  private async makeRequest(method: string, endpoint: string, data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.apiUrl}${endpoint}`,
        headers: this.headers,
        data: data ? JSON.stringify(data) : undefined,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async pingPong() {
    return this.makeRequest("GET", "/ping");
  }

  async listTasks() {
    return this.makeRequest("GET", "/products/tasks");
  }

  async runTask(request: IRequest) {
    return this.makeRequest("POST", "/products/tasks/query", request);
  }

  async deleteTask(request: IDelete) {
    const { idTask } = request;
    return this.makeRequest("DELETE", `/products/tasks/${idTask}`);
  }

  async createTask(request: IInsert) {
    return this.makeRequest("PUT", "/products/tasks/", request);
  }
}

module.exports = {
  AIClient,
};
