import axios, { AxiosResponse } from 'axios';
import type {
  IRequest,
  IInsert,
  IDelete,
  IAgent,
  IInsertAgent,
  IUpdateAgent,
  IAgentQueryRequest,
  IQueryResponse,
  IAgentRag,
  IGetAgentRagResponse,
  IDeleteAgentRagReturn,
  IAddKnowledgeRequest,
  IAddKnowledgeBatchRequest,
  ISearchKnowledgeRequest,
  IAgentKnowledge,
  ISearchKnowledgeResult,
  IExcludeKnowledgeRequest,
  ISearchKnowledgeByMetadataRequest,
} from './interfaces/index.js';
export type {
  IRequest,
  IInsert,
  IDelete,
  IAgent,
  IInsertAgent,
  IUpdateAgent,
  IAgentQueryRequest,
  IQueryResponse,
  IAgentRag,
  IGetAgentRagResponse,
  IDeleteAgentRagReturn,
  IAddKnowledgeRequest,
  IAddKnowledgeBatchRequest,
  ISearchKnowledgeRequest,
  IAgentKnowledge,
  ISearchKnowledgeResult,
  IExcludeKnowledgeRequest,
  ISearchKnowledgeByMetadataRequest,
} from './interfaces/index.js';
export { GPTModelsEnum } from './enums/gptModels.enum.js';
export { AudioModelsEnum } from './enums/audioModels.enum.js';
export { ImageModelsEnum } from './enums/imageModels.enum.js';
export { VideoModelsEnum } from './enums/videoModels.enum.js';

/**
 * AIClient class for interacting with the API at https://www.valar-ai.com/doc
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
      const isFormData = data && typeof (data as any).append === 'function';
      const headers: Record<string, string> = { ...this.headers };
      if (isFormData) {
        // Let axios set the multipart boundary automatically
        delete headers['content-type'];
      }
      return await axios({
        method,
        url: `${this.debugUrl ? this.debugUrl : this.apiUrl}${endpoint}`,
        headers,
        data: isFormData ? data : data ? JSON.stringify(data) : undefined,
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

  // Agents API
  async listAgents(): Promise<AxiosResponse<IAgent[]>> {
    return this.makeRequest('GET', '/products/agents');
  }

  async getAgent(id: string): Promise<AxiosResponse<IAgent>> {
    return this.makeRequest('GET', `/products/agents/one/${id}`);
  }

  async createAgent(request: IInsertAgent): Promise<AxiosResponse<IAgent>> {
    return this.makeRequest('PUT', '/products/agents', request);
  }

  async updateAgent(request: IUpdateAgent): Promise<AxiosResponse<IAgent>> {
    return this.makeRequest('PATCH', '/products/agents', request);
  }

  async deleteAgent(id: string): Promise<AxiosResponse<IAgent>> {
    return this.makeRequest('DELETE', `/products/agents/${id}`);
  }

  async queryAgent(body: IAgentQueryRequest): Promise<AxiosResponse<IQueryResponse>> {
    return this.makeRequest('POST', '/products/agents/query', body);
  }

  // Agent RAG API
  async getAllAgentRag(query?: Record<string, any>): Promise<AxiosResponse<IGetAgentRagResponse>> {
    const qs = query ? `?${new URLSearchParams(query as any).toString()}` : '';
    return this.makeRequest('GET', `/agent-rag${qs}`);
  }

  async getAgentRag(id: string): Promise<AxiosResponse<IAgentRag>> {
    return this.makeRequest('GET', `/agent-rag/${id}`);
  }

  async createAgentRag(data: IAgentRag): Promise<AxiosResponse<IAgentRag>> {
    // multipart/form-data: create entry with optional file
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, String(v));
    });
    return this.makeRequest('POST', '/agent-rag', form);
  }

  async deleteAgentRag(id: string): Promise<AxiosResponse<IDeleteAgentRagReturn>> {
    return this.makeRequest('DELETE', `/agent-rag/${id}`);
  }

  async addKnowledge(data: IAddKnowledgeRequest): Promise<AxiosResponse<IAgentKnowledge[]>> {
    return this.makeRequest('POST', '/agent-rag/knowledge', data);
  }

  async addKnowledgeBatch(data: IAddKnowledgeBatchRequest): Promise<AxiosResponse<IAgentKnowledge[]>> {
    return this.makeRequest('POST', '/agent-rag/knowledge/batch', data);
  }

  async addKnowledgeFromFile(agentRagId: string, file: Blob, metadata?: Record<string, any>): Promise<AxiosResponse<IAgentKnowledge[]>> {
    const form = new FormData();
    form.append('file', file);
    if (metadata) form.append('metadata', JSON.stringify(metadata));
    return this.makeRequest('POST', `/agent-rag/knowledge/file/${agentRagId}`, form);
  }

  async searchKnowledge(data: ISearchKnowledgeRequest): Promise<AxiosResponse<ISearchKnowledgeResult>> {
    return this.makeRequest('POST', '/agent-rag/knowledge/search', data);
  }

  async getKnowledgeById(id: string): Promise<AxiosResponse<IAgentKnowledge>> {
    return this.makeRequest('GET', `/agent-rag/knowledge/item/${id}`);
    }

  async getKnowledgeStatistics(agentRagId: string): Promise<AxiosResponse<any>> {
    return this.makeRequest('GET', `/agent-rag/knowledge/statistics/${agentRagId}`);
  }

  async getKnowledgeByAgentRagId(agentRagId: string): Promise<AxiosResponse<IAgentKnowledge[]>> {
    return this.makeRequest('GET', `/agent-rag/knowledge/${agentRagId}`);
  }

  async excludeKnowledge(data: IExcludeKnowledgeRequest): Promise<AxiosResponse<IDeleteAgentRagReturn>> {
    return this.makeRequest('DELETE', '/agent-rag/knowledge', data);
  }

  async searchKnowledgeByMetadata(data: ISearchKnowledgeByMetadataRequest): Promise<AxiosResponse<IAgentKnowledge[]>> {
    return this.makeRequest('POST', '/agent-rag/knowledge/search-by-metadata', data);
  }
}