/* eslint-disable no-console */
import { action, computed, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { TasksMock } from '__mocks__/index';
import { delay } from 'helpers/index';

type PrivateFields = '_taskName' | '_taskDesc' | '_isImportant' | '_isCompleted' | '_isLoading';

export class TasksEditStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _taskName: observable,
      _taskDesc: observable,
      _isImportant: observable,
      _isCompleted: observable,
      _isLoading: observable,

      taskName: computed,
      taskDesc: computed,
      isImportant: computed,
      isCompleted: computed,
      isLoading: computed,

      setTaskName: action,
      setTaskDesc: action,
      setIsImportant: action,
      setIsCompleted: action,
      loadTask: action,
    });
  }

  private _taskName = '';
  private _taskDesc = '';
  private _isImportant = false;
  private _isCompleted = false;
  private _isLoading = false;

  get taskName() {
    return this._taskName;
  }

  get taskDesc() {
    return this._taskDesc;
  }

  get isImportant() {
    if (this._isCompleted === true) {
      return false;
    } else {
      return this._isImportant;
    }
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get isLoading() {
    return this._isLoading;
  }

  setTaskName = (value: string) => {
    this._taskName = value;
  };

  setTaskDesc = (value: string) => {
    this._taskDesc = value;
  };

  setIsImportant = () => {
    this._isImportant = !this.isImportant;
    console.log(`Ипортанс изменен на ${this._isImportant}`);
  };

  setIsCompleted = () => {
    if (this._isCompleted === false) {
      this._isImportant = false;
      this._isCompleted = true;
    } else {
      this._isCompleted = false;
    }
    console.log(`Комплитанс изменен на ${this._isCompleted}`);
  };

  loadTask = async (taskId: string | undefined) => {
    this._isLoading = true;

    if (taskId === undefined) {
      console.log(`task ${taskId} не найден`);
    } else {
      console.log(`Загружаю таск ${taskId}`);
      const task = TasksMock.find((item) => item.id === taskId) as TaskEntity;
      await delay(1000);
      this._isLoading = false;
      this._taskName = task.name;
      this._taskDesc = task.info;
      this._isImportant = task.isImportant;
      this._isCompleted = task.isDone;
      console.log(`Таск ${taskId} загружен.`);
    }
  };
}

export const TasksEditStoreInstance = new TasksEditStore();
