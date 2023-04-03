/* eslint-disable no-console */
import { action, computed, makeObservable, observable } from 'mobx';
import { SearchTaskEntity, TaskEntity, TasksStatsEntity } from 'domains/Task.entity';
import { TasksMock, TasksStatsMock } from '__mocks__/Tasks.mock';
import { delay } from 'helpers/delay';

type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading';

export class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,

      tasks: computed,
      isTasksLoading: computed,

      loadTasks: action,
      changeTaskImportance: action,
      changeTaskComplete: action,
      deleteTask: action,
    });
  }

  private _tasks: TaskEntity[] = [];

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity {
    return this._tasksStats;
  }

  private _isTasksLoading = false;

  get isTasksLoading() {
    return this._isTasksLoading;
  }

  loadTasks = async (searchParams?: SearchTaskEntity) => {
    this._isTasksLoading = true;

    // Имитация работы с бэком

    console.log('reloading tasks list with params: ', searchParams);
    this._tasks = TasksMock;
    this._tasksStats = TasksStatsMock;
    await delay(1000);

    this._isTasksLoading = false;
  };

  changeTaskImportance = (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;

    // Имитация работы с бэком

    const task = this._tasks.find((item) => item.id === taskId);
    if (task === undefined) {
      console.log(`Таск ${taskId} не найден`);
    } else {
      console.log(`Импортанс таска ${taskId} изменён, теперь он ${!task.isImportant}`);
    }
    this.loadTasks();
  };

  changeTaskComplete = (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;

    // Имитация работы с бэком

    const task = this._tasks.find((item) => item.id === taskId);
    if (task === undefined) {
      console.log(`Таск ${taskId} не найден`);
    } else {
      console.log(`Таск комплит таска ${taskId} изменён, теперь он ${!task.isDone}`);
    }
    this.loadTasks();
  };

  deleteTask = (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;

    // Имитация работы с бэком

    const task = this._tasks.find((item) => item.id === taskId);
    if (task === undefined) {
      console.log(`Таск ${taskId} не найден`);
    } else {
      console.log(`Таск ${taskId} удалён`);
    }
    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
