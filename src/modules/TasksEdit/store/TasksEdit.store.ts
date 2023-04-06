/* eslint-disable no-console */
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { TaskEntity, TasksEditEntity } from 'domains/index';
import { TasksEditAgentInstance } from 'http/agent/index';
import { mapToInternalTask, taskEditToExternal } from 'helpers/mappers';
import { UpdateTaskResponse } from 'http/index';

type PrivateFields = '_isLoading' | '_task';

export class TasksEditStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _task: observable,
      taskId: observable,

      isLoading: computed,
      task: computed,

      loadTask: action,
      editTask: action,
      setIsLoading: action,
      setTaskId: action,
      setTask: action,
    });

    reaction(
      () => this.taskId,
      () => this.loadTask(this.taskId)
    );
  }

  private _isLoading = false;

  private _task: TaskEntity | undefined = undefined;

  taskId: string | undefined = undefined;

  get isLoading() {
    return this._isLoading;
  }

  get task() {
    return this._task;
  }

  setIsLoading = (status: boolean) => {
    this._isLoading = status;
  };

  setTaskId = (id: string | undefined) => {
    this.taskId = id;
  };

  setTask = (task: TaskEntity | undefined) => {
    this._task = task;
  };

  loadTask = async (taskId: TaskEntity['id'] | undefined) => {
    this.setIsLoading(true);

    try {
      const res = await TasksEditAgentInstance.getTask(taskId as string);
      const mappedRes = mapToInternalTask(res);
      this.setTask(mappedRes);
    } catch (error) {
      this.setTask(undefined);
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  editTask = async (task: TasksEditEntity): Promise<UpdateTaskResponse | void> => {
    this.setIsLoading(true);

    try {
      const externalTask = taskEditToExternal(task);
      const res = await TasksEditAgentInstance.updateTask(this.taskId as string, externalTask);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export const TasksEditStoreInstance = new TasksEditStore();
