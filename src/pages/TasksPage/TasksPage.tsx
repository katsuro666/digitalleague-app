import React from 'react';
import { Link } from 'react-router-dom';
import { Tasks } from 'modules/index';
import { PATH_LIST } from 'constants/index';
import { TaskButton, StyledHeading, PageContainer } from 'components/mui/index';

export function TasksPage() {
  return (
    <PageContainer>
      <StyledHeading variant="h3">TODO</StyledHeading>
      <Tasks />
      <Link to={PATH_LIST.ADD}>
        <TaskButton variant="outlined">Add task</TaskButton>
      </Link>
    </PageContainer>
  );
}
