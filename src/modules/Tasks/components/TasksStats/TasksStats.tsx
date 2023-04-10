import React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography } from '@mui/material';
import { StatsBadge, StatsText, StatsWrapper } from './TasksStats.styles';
import { Loader } from 'components/index';
import { TasksStoreInstance } from 'modules/Tasks/store';

function TasksStatsProto() {
  const { isTasksLoading, tasksStats } = TasksStoreInstance;
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {tasksStats ? (
        <>
          <StatsWrapper>
            <StatsText variant="body1">Total:</StatsText>
            <Loader isLoading={isTasksLoading} variant="dot">
              <StatsBadge variant="body2">{tasksStats.total}</StatsBadge>
            </Loader>
          </StatsWrapper>

          <StatsWrapper>
            <StatsText variant="body1">Important:</StatsText>
            <Loader isLoading={isTasksLoading} variant="dot">
              <StatsBadge variant="body2">{tasksStats.important}</StatsBadge>
            </Loader>
          </StatsWrapper>

          <StatsWrapper>
            <StatsText variant="body1">Done:</StatsText>
            <Loader isLoading={isTasksLoading} variant="dot">
              <StatsBadge variant="body2">{tasksStats.done}</StatsBadge>
            </Loader>
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
