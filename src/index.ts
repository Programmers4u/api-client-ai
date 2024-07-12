import axios from "axios";
import { EGPTModels } from "./enums/gptModels.enum";

const requestObject = {
  ask: "",
  context: "",
  idTask: "",
};

const insertObject = {
  name: "",
  context: "",
  model: "",
  instruction: "",
};


const AudioModels = {
  OAIWHISPER1: "whisper-1",
  OAITTS1: "tts-1",
};

class AIClient {
  apiKey: string;
  apiUrl: string;
  headers: { "x-api-key": any; "content-type": string; };
  constructor(apiKey: string) {
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

  async runTask(request: any) {
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

  async deleteTask(request: { idTask: any; }) {
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

  async createTask(request: axios.AxiosRequestConfig<{ headers: { "x-api-key": any; "content-type": string; }; }> | undefined) {
    const { headers, apiUrl } = this;
    try {
      const response = await axios.put(
        `${apiUrl}/products/tasks/`,
        { headers },
        request
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  AIClient,
  requestObject,
  insertObject,
  AudioModels,
};
