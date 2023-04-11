import React from 'react';
import { useParams } from 'react-router-dom';
import { TasksEdit } from 'modules/index';
import { StyledHeading, PageContainer } from 'components/mui/index';

export function TasksEditPage() {
  const { taskId } = useParams();
  return (
    <PageContainer>
      <StyledHeading variant="h3">TODO LIST | EDIT TASK {taskId}</StyledHeading>
      <TasksEdit />
    </PageContainer>
  );
}
