import React from 'react';
import { PageContainer } from 'components/index';
import { TasksAdd } from 'modules/index';

export function TasksAddPage() {
  return (
    <PageContainer>
      <h1>TODO LIST | ADD TASK</h1>
      <TasksAdd />
    </PageContainer>
  );
}
