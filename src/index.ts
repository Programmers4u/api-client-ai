import axios from "axios";
import { IRequest } from "./interfaces/request.interface";
import { IInsert } from "./interfaces/insert.interface";
import { IDelete } from "./interfaces/delete.interface";

class AIClient {
  private apiKey: string;
  private apiUrl: string;
  private headers: { "x-api-key": any; "content-type": string; };
  constructor(apiKey: string) {
    if(apiKey === '') throw new Error('[AIClient] apiKey is mandatory');
    this.apiKey = apiKey;
    this.apiUrl = "https://api.programmers4u.com";
    this.headers = {
      "x-api-key": this.apiKey,
      "content-type": "application/json",
    };
  }

  async pingPong() {
    try {
      const { headers, apiUrl } = this;
      const response = await axios.get(`${apiUrl}/ping`, { headers });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async listTasks() {
    const { headers, apiUrl } = this;
    try {
      const response = await axios.get(`${apiUrl}/products/tasks`, { headers });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async runTask(request:IRequest) {
    const { headers, apiUrl } = this;
    try {
      const response = await axios.post(
        `${apiUrl}/products/tasks/query`,
        JSON.stringify(request),
        { headers }
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteTask(request:IDelete) {
    const { headers, apiUrl } = this;
    const { idTask } = request;
    try {
      const response = await axios.delete(
        `${apiUrl}/products/tasks/${idTask}`,
        {
          headers,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async createTask(request:IInsert) {
    const { headers, apiUrl } = this;
    try {
      const response = await axios.put(
        `${apiUrl}/products/tasks/`,
        JSON.stringify(request),
        { headers }
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  AIClient
};
