import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { TasksEdit } from 'modules/index';

export function TasksEditPage() {
  const { taskId } = useParams();
  return (
    <PageContainer>
      <h1>TODO LIST | EDIT TASK {taskId}</h1>
      <TasksEdit />
    </PageContainer>
  );
}
