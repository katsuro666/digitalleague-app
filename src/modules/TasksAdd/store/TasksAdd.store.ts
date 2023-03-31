/* eslint-disable no-console */
import { MouseEvent } from 'react';
import { action, computed, makeObservable, observable } from 'mobx';
import { delay } from 'helpers/index';

type PrivateFields = '_taskName' | '_taskDesc' | '_taskIsImportant';

export class TasksAddStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _taskName: observable,
      _taskDesc: observable,
      _taskIsImportant: observable,

      taskName: computed,
      taskDesc: computed,
      taskIsImportant: computed,

      setTaskName: action,
      setTaskDesc: action,
      setTaskImportance: action,
      newTaskPreload: action,
      // addNewTask: action,
    });
  }

  private _taskName = '';
  private _taskDesc = '';
  private _taskIsImportant = false;

  get taskName() {
    return this._taskName;
  }

  get taskDesc() {
    return this._taskDesc;
  }

  get taskIsImportant() {
    return this._taskIsImportant;
  }

  setTaskName = (value: string) => {
    this._taskName = value;
  };

  setTaskDesc = (value: string) => {
    this._taskDesc = value;
  };

  setTaskImportance = () => {
    if (this._taskIsImportant === false) {
      this._taskIsImportant = true;
      console.log('taskImportance изменён на true');
    } else {
      this._taskIsImportant = false;
      console.log('taskImportance изменён на false');
    }
  };

  newTaskPreload = () => {
    this._taskName = '';
    this._taskDesc = '';
    this._taskIsImportant = false;
    console.log('Загружена чистая страница');
  };

  // addNewTask = async (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log('zaza');

  //   // if (this._taskName === '') {
  //   //   console.log('У тебя нет названия таски');
  //   // }
  //   // if (this._taskDesc === '') {
  //   //   console.log('У тебя нет описания таски');
  //   // } else {
  //   //   console.log(
  //   //     `Вот вам новый таск:\nНазвание: ${this._taskName}\nОписание: ${this._taskDesc}\nВажно: ${this._taskIsImportant}`
  //   //   );
  //   //   // Пушим данные на бэк

  //   //   this.loadTasks();
  //   //   await delay(1000);
  //   // добавить навигацию
  //   // }
  // };
}

export const TasksAddStoreInstance = new TasksAddStore();
