export interface IAgentRagBase {
  name: string;
  description?: string;
  category?: string;
  isActive?: boolean;
  agentId: string;
  // file-related fields are optional (when creating without file)
  originalFileName?: string;
  fileSize?: number;
  fileType?: string;
}

export interface IAgentRag extends IAgentRagBase {
  id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGetAgentRagResponse {
  data: IAgentRag[];
  total: number;
}

export interface IDeleteAgentRagReturn {
  success: boolean;
}

export interface IAgentKnowledgeMeta {
  originalFileName?: string;
  fileSize?: number;
  mimeType?: string;
  [key: string]: any;
}

export interface IAgentKnowledge {
  id: string;
  agentRagId: string;
  content: string;
  tokens?: number;
  metadata?: IAgentKnowledgeMeta;
}

export interface ISearchKnowledgeResult {
  items: IAgentKnowledge[];
  total: number;
}

export interface IAddKnowledgeRequest {
  agentRagId: string;
  content: string;
  metadata?: IAgentKnowledgeMeta;
}

export interface IAddKnowledgeBatchRequest {
  items: IAddKnowledgeRequest[];
}

export interface ISearchKnowledgeRequest {
  agentRagId: string;
  query: string;
  limit?: number;
}

export interface IExcludeKnowledgeRequest {
  agentRagId: string;
  ids: string[];
}

export interface ISearchKnowledgeByMetadataRequest {
  agentRagId: string;
  metadataFilters: Record<string, any>;
  limit?: number;
}
