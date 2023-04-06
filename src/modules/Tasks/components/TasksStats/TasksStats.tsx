import React from 'react';
import { observer } from 'mobx-react';
import { Loader } from 'components/index';
import { TasksStoreInstance } from 'modules/Tasks/store';

function TasksStatsProto() {
  const { isTasksLoading, tasksStats } = TasksStoreInstance;
  return (
    <div className="d-flex w-100 justify-content-between">
      {tasksStats ? (
        <>
          <p>
            Total:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{tasksStats.total}</span>
            </Loader>
          </p>
          <p>
            Important:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{tasksStats.important}</span>
            </Loader>
          </p>
          <p>
            Done:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{tasksStats.done}</span>
            </Loader>
          </p>
        </>
      ) : (
        <p className="d-flex justify-content-center w-100">Статистика недоступна</p>
      )}
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);
