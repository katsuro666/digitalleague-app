import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TaskProps } from './Task.types';
import './Task.css';
import { LineThroughText, ImportantText, BtnTrue, BtnFalse } from './Task.styles';
import { EDIT, ROOT } from 'constants/index';

export function Task({ task, changeTaskComplete, changeTaskImportance, deleteTask }: TaskProps) {
  const { name, info, isImportant, isDone, id } = task;

  const onBtnTaskComplete = () => changeTaskComplete(id, isDone);
  const onBtnTaskImportance = () => changeTaskImportance(id, isImportant);
  const onBtnTaskDelete = () => deleteTask(id);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {isDone ? (
          <LineThroughText>{name}</LineThroughText>
        ) : isImportant ? (
          <ImportantText>{name}</ImportantText>
        ) : (
          <Typography m="16px 0">{name}</Typography>
        )}
        <Box display="flex" justifyContent="space-between" minWidth="140px">
          {isImportant ? (
            <BtnTrue disabled={isDone} onClick={onBtnTaskImportance}>
              <StarsIcon />
            </BtnTrue>
          ) : (
            <BtnFalse disabled={isDone} onClick={onBtnTaskImportance}>
              <StarsIcon />
            </BtnFalse>
          )}

          {isDone ? (
            <BtnTrue onClick={onBtnTaskComplete}>
              <CheckCircleIcon />
            </BtnTrue>
          ) : (
            <BtnFalse onClick={onBtnTaskComplete}>
              <CheckCircleIcon />
            </BtnFalse>
          )}

          <BtnFalse onClick={onBtnTaskDelete}>
            <DeleteForeverIcon />
          </BtnFalse>

          <Link to={`${ROOT}${EDIT}/${id}`}>
            <BtnFalse>
              <EditIcon />
            </BtnFalse>
          </Link>
        </Box>
      </Box>

      {isDone ? (
        <LineThroughText>{info}</LineThroughText>
      ) : isImportant ? (
        <ImportantText>{info}</ImportantText>
      ) : (
        <Typography m="16px 0">{info}</Typography>
      )}
    </Container>
  );
}
