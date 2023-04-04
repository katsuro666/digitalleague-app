/* eslint-disable no-console */
import { action, makeObservable } from 'mobx';
import { delay } from 'helpers/index';
import { TasksAddEntity } from 'domains/TaskAdd.entity';

export class TasksAddStore {
  constructor() {
    makeObservable(this, {
      addNewTask: action,
    });
  }

  addNewTask = async (task: TasksAddEntity) => {
    await delay(1000);
    console.log(task);
    return true;
  };
}

export const TasksAddStoreInstance = new TasksAddStore();
