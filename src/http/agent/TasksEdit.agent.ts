import { GetTaskResponse, UpdateTaskRequest, UpdateTaskResponse } from '../index';
import { BasicAgent } from './Basic.agent';
import { TaskEntity } from 'domains/index';

export class TasksEditAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getTask(taskID: TaskEntity['id']): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskID}`);
    return data;
  }

  async updateTask(taskId: string, newTaskBody: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newTaskBody);
    return data;
  }
}

export const TasksEditAgentInstance = new TasksEditAgent();
