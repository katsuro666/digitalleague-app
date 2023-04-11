/* eslint-disable no-console */
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { TaskEntity, TasksEditEntity } from 'domains/index';
import { TasksEditAgentInstance } from 'http/agent/index';
import { mapToInternalTask, taskEditToExternal } from 'helpers/mappers';
import { UpdateTaskResponse } from 'http/index';

type PrivateFields = '_isLoading' | '_task' | '_editSuccessful' | '_editFailed';

export class TasksEditStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _task: observable,
      taskId: observable,
      _editSuccessful: observable,
      _editFailed: observable,

      isLoading: computed,
      task: computed,
      isEditSuccessful: computed,
      isEditFailed: computed,

      loadTask: action,
      editTask: action,
      setTaskId: action,
      setEditSuccessful: action,
      setEditFailed: action,
    });

    reaction(
      () => this.taskId,
      () => this.loadTask(this.taskId)
    );
  }

  private _isLoading = false;

  private _task: TaskEntity | undefined = undefined;

  get task() {
    return this._task;
  }

  set task(task: TaskEntity | undefined) {
    this._task = task;
  }

  taskId: string | undefined = undefined;

  setTaskId = (id: string | undefined) => {
    this.taskId = id;
  };

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(status: boolean) {
    this._isLoading = status;
  }

  private _editSuccessful = false;

  get isEditSuccessful() {
    return this._editSuccessful;
  }

  setEditSuccessful = (status: boolean) => {
    this._editSuccessful = status;
  };

  private _editFailed = false;

  get isEditFailed() {
    return this._editFailed;
  }

  setEditFailed = (status: boolean) => {
    this._editFailed = status;
  };

  loadTask = async (taskId: TaskEntity['id'] | undefined) => {
    this.isLoading = true;
  setTaskId = (id: string | undefined) => {
    this.taskId = id;
  };

  loadTask = async (taskId: TaskEntity['id'] | undefined) => {
    runInAction(() => {
      this._isLoading = true;
    });

    try {
      const res = await TasksEditAgentInstance.getTask(taskId as string);
      const mappedRes = mapToInternalTask(res);
      this.task = mappedRes;
    } catch (error) {
      this.task = undefined;
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  };

  editTask = async (task: TasksEditEntity): Promise<UpdateTaskResponse | void> => {
    this.isLoading = true;


    try {
      const externalTask = taskEditToExternal(task);
      const res = await TasksEditAgentInstance.updateTask(this.taskId as string, externalTask);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  };
}

export const TasksEditStoreInstance = new TasksEditStore();
