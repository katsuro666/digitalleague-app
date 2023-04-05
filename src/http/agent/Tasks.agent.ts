import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  // GetTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from '../index';
import { BasicAgent } from './Basic.agent';

export class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get('/tasks', {
      params,
    });
    return data;
  }

  async updateTask(taskId: string, newTaskBody: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch(`/tasks/${taskId}`, newTaskBody);
    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }

  // async getTask(taskId: string): Promise<GetTaskResponse> {
  //   const { data } = await this._http.get(`/tasks/${taskId}`);
  //   return data;
  // }
}

export const TaskAgentInstance = new TasksAgent();
