import React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography, List } from '@mui/material';
import { Task } from '../Task';
import { StyledListItem } from './TasksList.styles';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';
import './TasksList.css';

function TasksListProto() {
  const { tasks, isTasksLoading, changeTaskImportance, changeTaskComplete, deleteTask } = TasksStoreInstance;

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Loader isLoading={isTasksLoading}>
        {tasks?.length ? (
          <List>
            {tasks.map((task) => (
              <StyledListItem key={task.id}>
                <Task
                  key={task.id}
                  task={task}
                  changeTaskImportance={changeTaskImportance}
                  deleteTask={deleteTask}
                  changeTaskComplete={changeTaskComplete}
                />
              </StyledListItem>
            ))}
          </List>
        ) : (
          <Typography display="flex" justifyContent="center" color="primary">
            Задач пока нет
          </Typography>
        )}
      </Loader>
    </Box>
  );
}

export const TasksList = observer(TasksListProto);
