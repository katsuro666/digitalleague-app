/* eslint-disable no-console */
import { action, makeObservable } from 'mobx';
import { TasksAddEntity } from 'domains/TaskAdd.entity';
import { mapTaskAddToExternal } from 'helpers/mappers';
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
      const externalTask = mapTaskAddToExternal(task);
      const res = await TasksAddAgentInstance.postNewTask(externalTask);
      return res;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      console.log(String(error));
    }
  };
}

export const TasksAddStoreInstance = new TasksAddStore();
