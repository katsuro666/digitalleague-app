import React from 'react';
import { TaskListProps } from './TasksList.types';
import { Task } from 'modules/Tasks/components/Task/index';

export function TasksList({ tasks }: TaskListProps) {
  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <ul className="list-group todo-list mb-3">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <Task key={task.id} task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}
