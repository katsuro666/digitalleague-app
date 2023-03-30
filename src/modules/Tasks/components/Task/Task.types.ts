import { TaskEntity } from 'domains/index';

export type TaskProps = {
  task: TaskEntity;
  changeTaskComplete: (taskId: TaskEntity['id']) => void;
  changeTaskImportance: (taskId: TaskEntity['id']) => void;
  deleteTask: (taskId: TaskEntity['id']) => void;
};
