import { FILTER_TYPES } from 'constants/index';

export interface TaskEntity {
  name: string;
  id: string;
  info: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface TasksStatsEntity {
  total: number;
  important: number;
  done: number;
}

export interface SearchTaskEntity {
  searchName: string;
  filter: FiltersType;
}

export type FiltersType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];
