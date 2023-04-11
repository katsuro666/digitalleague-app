import React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { StatsBadge, StatsText, StatsWrapper } from './TasksStats.styles';
import { TasksStoreInstance } from 'modules/Tasks/store';

function TasksStatsProto() {
  const { isTasksLoading, tasksStats } = TasksStoreInstance;
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {tasksStats ? (
        <>
          <StatsWrapper>
            <StatsText variant="body1">Total:</StatsText>
            {isTasksLoading ? <CircularProgress /> : <StatsBadge variant="body2">{tasksStats.total}</StatsBadge>}
          </StatsWrapper>

          <StatsWrapper>
            <StatsText variant="body1">Important:</StatsText>
            {isTasksLoading ? <CircularProgress /> : <StatsBadge variant="body2">{tasksStats.important}</StatsBadge>}
          </StatsWrapper>

          <StatsWrapper>
            <StatsText variant="body1">Done:</StatsText>
            {isTasksLoading ? <CircularProgress /> : <StatsBadge variant="body2">{tasksStats.done}</StatsBadge>}
          </StatsWrapper>
        </>
      ) : (
        <Typography display="flex" justifyContent="center">
          Статистика недоступна
        </Typography>
      )}
    </Box>
  );
}

export const TasksStats = observer(TasksStatsProto);
