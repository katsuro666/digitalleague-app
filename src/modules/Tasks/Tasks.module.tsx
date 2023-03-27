import { TasksStats, TasksList, SearchForm } from 'modules/Tasks/components';
import { TasksMock, TasksStatsMock } from '__mocks__/index';

export function Tasks() {
  return (
    <>
      <SearchForm />
      <TasksStats {...TasksStatsMock} />
      <TasksList tasks={TasksMock} />
    </>
  );
}
