import { BasicAgent } from './Basic.agent';
import { CreateTaskRequest, CreateTaskResponse } from 'http/model/tasksAdd.model';

export class TasksAddAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  postNewTask = async (task: CreateTaskRequest): Promise<CreateTaskResponse> => {
    const { data } = await this._http.post<CreateTaskResponse>('/tasks', task);
    return data;
  };
}

export const TasksAddAgentInstance = new TasksAddAgent();
