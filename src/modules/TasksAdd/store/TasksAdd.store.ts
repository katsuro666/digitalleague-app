/* eslint-disable no-console */
import { action, observable, computed, makeObservable } from 'mobx';
import { TasksAddEntity } from 'domains/TaskAdd.entity';
import { mapTaskAddToExternal } from 'helpers/mappers';
import { TasksAddAgentInstance } from 'http/agent/index';
import { CreateTaskResponse } from 'http/model/tasksAdd.model';

type PrivateFields = '_addSuccessful' | '_addFailed';
export class TasksAddStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _addSuccessful: observable,
      _addFailed: observable,

      isAddSuccessful: computed,
      isAddFailed: computed,

      addNewTask: action,
      setAddSuccessful: action,
      setAddFailed: action,
    });
  }

  private _addSuccessful = false;

  get isAddSuccessful() {
    return this._addSuccessful;
  }

  setAddSuccessful = (status: boolean) => {
    this._addSuccessful = status;
  };

  private _addFailed = false;

  get isAddFailed() {
    return this._addFailed;
  }

  setAddFailed = (status: boolean) => {
    this._addFailed = status;
  };

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
