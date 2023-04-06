/* eslint-disable no-console */
import { action, computed, makeObservable, observable } from 'mobx';
import { SearchTaskEntity, TaskEntity, TasksStatsEntity } from 'domains/Task.entity';
import { TaskAgentInstance } from 'http/agent';
import { getInternalInfo, mapToExternalParams, mapToInternalTasks } from 'helpers/mappers';

type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading' | '_searchForm';

export class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,
      _searchForm: observable,

      tasks: computed,
      isTasksLoading: computed,

      loadTasks: action,
      changeTaskImportance: action,
      changeTaskComplete: action,
      deleteTask: action,
      setTasksLoading: action,
      setTasks: action,
      setTasksStats: action,
    });
  }

  private _tasks: TaskEntity[] | null = [];

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  private _isTasksLoading = false;

  private _searchForm?: SearchTaskEntity = {
    searchName: '',
    filter: 'All',
  };

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  get isTasksLoading() {
    return this._isTasksLoading;
  }

  setTasksLoading = (status: boolean) => {
    this._isTasksLoading = status;
  };

  setTasks = (tasks: TaskEntity[]) => {
    this._tasks = tasks;
  };

  setTasksStats = (tasksStats: TasksStatsEntity) => {
    this._tasksStats = tasksStats;
  };

  loadTasks = async (searchParams?: SearchTaskEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const res = await TaskAgentInstance.getAllTasks(externalSearchParams);

    return {
      tasks: mapToInternalTasks(res),
      tasksStats: getInternalInfo(res),
    };
  };

  updateTasks = async (searchParams?: SearchTaskEntity) => {
    this.setTasksLoading(true);

    try {
      if (searchParams) this._searchForm = searchParams;

      const { tasks, tasksStats } = await this.loadTasks(searchParams);

      this.setTasks(tasks);
      this.setTasksStats(tasksStats);
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.setTasksLoading(false);
    }
  };

  changeTaskImportance = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.setTasksLoading(true);

    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });

      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);

      this.setTasks(tasks);
      this.setTasksStats(tasksStats);
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.setTasksLoading(false);
    }
  };

  changeTaskComplete = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.setTasksLoading(true);

    try {
      await TaskAgentInstance.updateTask(taskId, {
        isCompleted: !currentStatus,
        isImportant: currentStatus ? undefined : false,
      });

      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);

      this.setTasks(tasks);
      this.setTasksStats(tasksStats);
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.setTasksLoading(false);
    }
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this.setTasksLoading(true);

    try {
      await TaskAgentInstance.deleteTask(taskId);
      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);

      this.setTasks(tasks);
      this.setTasksStats(tasksStats);
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.setTasksLoading(false);
    }
  };
}

export const TasksStoreInstance = new TasksStore();
