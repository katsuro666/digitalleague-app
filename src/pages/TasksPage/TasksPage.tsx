import React from 'react';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledTypography } from './TasksPage.styles';
import { Tasks } from 'modules/index';
import { PATH_LIST } from 'constants/index';
import { TaskButton } from 'components/mui/index';

export function TasksPage() {
  return (
    <StyledContainer>
      <StyledTypography variant="h3">TODO</StyledTypography>
      <Tasks />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ADD}>
        <TaskButton variant="outlined">Add task</TaskButton>
      </Link>
    </StyledContainer>
  );
}
