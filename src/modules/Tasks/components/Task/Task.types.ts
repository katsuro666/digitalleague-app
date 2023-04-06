import { TaskEntity } from 'domains/index';

export type TaskProps = {
  task: TaskEntity;
  changeTaskComplete: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  changeTaskImportance: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  deleteTask: (taskId: TaskEntity['id']) => void;
};
