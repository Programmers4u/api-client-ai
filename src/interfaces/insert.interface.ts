import type { GPTModelsEnum } from '../enums/gptModels.enum.js';

export interface IInsert {
  name: string;
  context: string;
  model: GPTModelsEnum;
  instruction: string;
}
