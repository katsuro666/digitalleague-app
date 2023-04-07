/* eslint-disable no-console */
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
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
      setTaskId: action,
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
      runInAction(() => {
        this._task = mappedRes;
      });
    } catch (error) {
      runInAction(() => {
        this._task = undefined;
      });
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };

  editTask = async (task: TasksEditEntity): Promise<UpdateTaskResponse | void> => {
    runInAction(() => {
      this._isLoading = true;
    });

    try {
      const externalTask = taskEditToExternal(task);
      const res = await TasksEditAgentInstance.updateTask(this.taskId as string, externalTask);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };
}

export const TasksEditStoreInstance = new TasksEditStore();
