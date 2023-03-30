import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { TasksStoreInstance } from './store';
import { TasksStats, TasksList, SearchForm } from 'modules/Tasks/components';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks();
  }, []);

  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
