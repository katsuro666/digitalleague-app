import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { StyledContainer } from './TasksPage.styles';
import { Tasks } from 'modules/index';
import { PATH_LIST } from 'constants/index';

export function TasksPage() {
  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h3" component="h1" letterSpacing="10px">
        TODO
      </Typography>
      <Tasks />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ADD}>
        <Button variant="contained" color="primary" fullWidth={true}>
          Add task
        </Button>
      </Link>
    </StyledContainer>
  );
}
