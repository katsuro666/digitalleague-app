import { paths } from './todo.swagger';

export type CreateTaskRequest = paths['/tasks']['post']['requestBody']['content']['application/json'];
export type CreateTaskResponse = paths['/tasks']['post']['responses']['200']['content']['application/json'];
