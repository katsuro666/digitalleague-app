import React from 'react';
import { PageContainer, StyledHeading } from 'components/index';
import { TasksAdd } from 'modules/index';

export function TasksAddPage() {
  return (
    <PageContainer>
      <StyledHeading variant="h4">TODO LIST | ADD TASK</StyledHeading>
      <TasksAdd />
    </PageContainer>
  );
}
