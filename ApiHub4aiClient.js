import axios from "axios";

class ApiHub4aiClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.programmers4u.com'
    }

    async pingPong() {
        const { apiKey, apiUrl } = this;
        const headers = {
            apikey: apiKey,
            'content-type': 'application/json'
        };
        const response = await axios.get(`${apiUrl}/ping`, { headers });
        return response;
    }

    async listTasks() {
        const { apiKey, apiUrl } = this;
        const headers = {
            apikey: apiKey,
            'content-type': 'application/json'
        };
        const response = await axios.get(`${apiUrl}/tasks/list`, { headers });
        return response;
    }
    async runTask(request) {
        const { apiKey, apiUrl } = this;
        const { ask, context, taskID } = request;
        const headers = {
            apikey: apiKey,
            'content-type': 'application/json'
        };
        const response = await axios.post(`${apiUrl}/tasks/run`, JSON.stringify(request), { headers });
        return response;
    }
    async deleteTask(request) {
        const { apiKey, apiUrl } = this;
        const { taskID } = request;
        const headers = {
            apikey: apiKey,
            'content-type': 'application/json'
        };
        const response =  await axios.delete(`${apiUrl}/tasks/remove/${taskID}`, { headers })
        return response;
    }
}

export default ApiHub4aiClient