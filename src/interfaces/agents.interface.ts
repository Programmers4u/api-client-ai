import type { GPTModelsEnum } from '../enums/gptModels.enum.js';

export interface IAgentBase {
  name: string;
  model: GPTModelsEnum | string;
  instruction?: string;
  context?: string;
  charactersOutputCounts?: number;
  temperature?: number;
  outputFormat?: string;
  mcpTools?: unknown;
  isActive?: boolean;
}

export interface IInsertAgent extends IAgentBase {}

export interface IUpdateAgent extends Partial<IAgentBase> {
  id: string;
}

export interface IAgent extends IAgentBase {
  id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAgentQueryRequest {
  idAgent: string;
  ask: string;
  context?: string;
  // Additional optional fields are allowed without strict typing
  [key: string]: unknown;
}

export interface IQueryResponse {
  answer: any;
  contentType?: string;
  error?: number;
}
