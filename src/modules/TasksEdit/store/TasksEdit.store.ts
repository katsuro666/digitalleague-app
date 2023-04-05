/* eslint-disable no-console */
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { TaskEntity, TasksEditEntity } from 'domains/index';
import { TasksMock } from '__mocks__/index';
import { delay } from 'helpers/index';

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

  loadTask = async (taskId: string | undefined) => {
    this._isLoading = true;

    console.log(`Загружаю таск ${taskId}`);
    this._task = TasksMock.find((item) => item.id === taskId) as TaskEntity;
    await delay(1000);
    console.log(`Таск ${taskId} загружен.`);

    this._isLoading = false;
  };

  editTask = async (task: TasksEditEntity) => {
    await delay(1000);
    console.log(task);
    return true;
  };
}

export const TasksEditStoreInstance = new TasksEditStore();
