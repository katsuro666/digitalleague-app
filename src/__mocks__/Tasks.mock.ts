import { TaskEntity, TasksStatsEntity } from 'domains/index';

export const TasksMock: TaskEntity[] = [
  {
    name: 'Wash dishes',
    id: '1',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    isImportant: false,
    isDone: true,
  },
  {
    name: 'Watch YouTube',
    id: '3',
    info: 'chill & relax',
    isImportant: false,
    isDone: false,
  },
  {
    name: 'Cook dinner',
    id: '5',
    info: 'cook something',
    isImportant: true,
    isDone: false,
  },
  {
    name: 'Clean my room',
    id: '66',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    isImportant: false,
    isDone: false,
  },
  {
    name: 'Buy groceries',
    id: '20',
    info: 'Buy groceries',
    isImportant: true,
    isDone: false,
  },
  {
    name: '',
    id: '22',
    info: '',
    isImportant: false,
    isDone: false,
  },
];

const importantTasksMock = TasksMock.filter((task) => task.isImportant === true);
const doneTasksMock = TasksMock.filter((task) => task.isDone === true);

export const TasksStatsMock: TasksStatsEntity = {
  total: TasksMock.length,
  important: importantTasksMock.length,
  done: doneTasksMock.length,
};
