import React from 'react';
import { observer } from 'mobx-react';
import { Task } from '../Task';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';
import './TasksList.css';

function TasksListProto() {
  const { tasks, isTasksLoading, changeTaskImportance, changeTaskComplete, deleteTask } = TasksStoreInstance;

  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <Loader isLoading={isTasksLoading}>
        {tasks?.length ? (
          <ul className="list-group todo-list mb-3">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <Task
                  key={task.id}
                  task={task}
                  changeTaskImportance={changeTaskImportance}
                  deleteTask={deleteTask}
                  changeTaskComplete={changeTaskComplete}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Задач пока нет</p>
        )}
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
