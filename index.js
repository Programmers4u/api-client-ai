const axios = require("axios");

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

const GPTModels = {
  OAIGPT35Turbo: "gpt-3.5-turbo",
  OAIGPT35Turbo1106: "gpt-3.5-turbo-1106",
  OAIGPT35Turbo16k: "gpt-3.5-turbo-16k",
  OAIGPT35TurboInstruct: "gpt-3.5-turbo-instruct",
  OAIGPT4: "gpt-4",
  OAIGPT432k: "gpt-4-32k",
  OAIGPT4VisionPreview: "gpt-4-vision-preview",
  OAIGPT41106Preview: "gpt-4-1106-preview",
  // Mistral7BV1 : 'mistral_7b_v1'
};

const AudioModels = {
  OAIWHISPER1: "whisper-1",
  OAITTS1: "tts-1",
};

class AIClient {
  constructor(apiKey) {
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

  async runTask(request) {
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

  async deleteTask(request) {
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

  async createTask(request) {
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
  GPTModels,
  AudioModels,
};
