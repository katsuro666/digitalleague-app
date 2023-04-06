import { action, makeObservable } from 'mobx';
import { TasksAddEntity } from 'domains/TaskAdd.entity';
import { mapToExternalTask } from 'helpers/mappers';
import { TasksAddAgentInstance } from 'http/agent/index';
import { CreateTaskResponse } from 'http/model/tasksAdd.model';

export class TasksAddStore {
  constructor() {
    makeObservable(this, {
      addNewTask: action,
    });
  }

  addNewTask = async (task: TasksAddEntity): Promise<CreateTaskResponse | void> => {
    try {
      const externalTask = mapToExternalTask(task);
      const res = await TasksAddAgentInstance.postNewTask(externalTask);
      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
}

export const TasksAddStoreInstance = new TasksAddStore();
