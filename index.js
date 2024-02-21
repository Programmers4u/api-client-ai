const axios = require("axios")

const requestObject = {
    ask: "", 
    context: "", 
    idTask: ""
}

class AIClient {
    constructor(apiKey) {
        this.apiKey = apiKey
        this.apiUrl = 'https://api.programmers4u.com'
        this.headers = {
            'Authorization' : `Bearer ${this.apiKey}`,
            'content-type' : 'application/json'
        } 
    }

    async pingPong() {
        const { headers, apiUrl } = this
        const response = await axios.get(`${apiUrl}/ping`, { headers })
        return response
    }

    async listTasks() {
        const { headers, apiUrl } = this
        const response = await axios.get(`${apiUrl}/products/tasks`, { headers })
        return response
    }

    async runTask(request) {
        const { headers, apiUrl } = this
        const response = await axios.post(`${apiUrl}/products/tasks/query`, JSON.stringify(request), { headers })
        return response
    }
    
    async deleteTask(request) {
        const { headers, apiUrl } = this
        const { idTask } = request
        const response =  axios.delete(`${apiUrl}/tasks/remove/${idTask}`, { headers })
        return response
    }
}

module.exports = { AIClient, requestObject }
