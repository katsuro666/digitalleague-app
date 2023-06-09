import { FILTER_TYPES } from 'constants/statusFilterTypes';
import { SearchTaskEntity, TaskEntity, TasksAddEntity, TasksEditEntity, TasksStatsEntity } from 'domains/index';
import { GetAllTasksQuery, GetAllTasksResponse, GetTaskResponse, UpdateTaskRequest } from 'http/index';
import { CreateTaskRequest } from 'http/model/tasksAdd.model';

export const mapToExternalParams = (params?: SearchTaskEntity): GetAllTasksQuery | undefined => {
  if (!params) return undefined;

  const { searchName, filter } = params;

  let isCompleted = undefined;

  if (filter === FILTER_TYPES.DONE) {
    isCompleted = true;
  } else if (filter === FILTER_TYPES.ACTIVE) {
    isCompleted = false;
  }

  return {
    name_like: searchName ?? undefined,
    isImportant: filter === FILTER_TYPES.IMPORTANT ? true : undefined,
    isCompleted,
  };
};

export const mapToInternalTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];

  tasks.forEach((item) => {
    internalTasks.push({
      name: item.name || 'Название не задано',
      id: String(item.id),
      info: item.info || 'Описание не задано',
      isImportant: item.isImportant || false,
      isDone: item.isCompleted || false,
    });
  });
  return internalTasks;
};

export const mapTaskAddToExternal = (task: TasksAddEntity): CreateTaskRequest => {
  return {
    isImportant: task.isImportant,
    name: task.name,
    info: task.description,
  };
};

export const mapToInternalTask = (task: GetTaskResponse): TaskEntity => {
  return {
    name: task.name || 'Название не задано',
    info: task.info || 'Описание не задано',
    isImportant: task.isImportant || false,
    isDone: task.isCompleted || false,
    id: String(task.id),
  };
};

export const taskEditToExternal = (task: TasksEditEntity): UpdateTaskRequest => {
  return {
    isImportant: task.isImportant,
    name: task.name,
    info: task.info,
    isCompleted: task.isDone,
  };
};

// export const mapTaskToTaskEdit = (task: TaskEntity): TasksEditEntity => {
//   return {
//     name: task.name,
//     info: task.info,
//     isImportant: task.isImportant,
//     isDone: task.isDone,
//   };
// };

export const getInternalInfo = (tasks: GetAllTasksResponse): TasksStatsEntity => {
  const total = tasks.length;
  const stats = tasks.reduce(
    (acc, task) => {
      return {
        important: task.isImportant ? acc.important + 1 : acc.important,
        done: task.isCompleted ? acc.done + 1 : acc.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...stats,
  };
};
