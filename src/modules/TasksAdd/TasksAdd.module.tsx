/* eslint-disable no-console */
import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { TasksAddStoreInstance } from './store';
import { DEFAULT_VALUES } from './TasksAdd.utils';
import { validationScheme } from './TasksAdd.validation';
import { StyledAddForm } from './TasksAdd.styles';
import { PATH_LIST } from 'constants/index';
import { TasksAddEntity } from 'domains/index';
import { TaskButton } from 'components/mui';

function TasksAddProto() {
  const navigate = useNavigate();

  const { addNewTask } = TasksAddStoreInstance;

  const { control, handleSubmit, reset, setValue } = useForm<TasksAddEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationScheme),
  });

  const setTaskImportance = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', e.target.checked);
  };

  const setTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value);
  };
  const setTaskDesc = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('description', e.target.value);
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      const isSuccess = await addNewTask(data);
      if (isSuccess) {
        reset();
        navigate(PATH_LIST.ROOT);
      } else {
        console.log('Здесь должна быть нотификация о неудачном запросе');
      }
    })();
  };

  return (
    <StyledAddForm>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              required
              id="outlined-required"
              label="Task name"
              placeholder="Clean room"
              value={field.value}
              onChange={setTaskName}
              helperText={error?.message}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              required
              id="outlined-required"
              label="Task description"
              placeholder="Clean my room"
              value={field.value}
              onChange={setTaskDesc}
              helperText={error?.message}
              style={{
                backgroundColor: 'rgb(72, 202, 228',
                margin: '10px 0',
              }}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="isImportant"
        render={() => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={setTaskImportance}
                  style={{
                    color: 'rgb(72, 202, 228',
                    margin: '10px 0 20px',
                  }}
                />
              }
              label="Important"
              style={{
                color: 'rgb(119, 122, 146)',
                width: 'min-content',
              }}
            />
          );
        }}
      />

      <TaskButton type="submit" onClick={onSubmit}>
        Add task
      </TaskButton>
    </StyledAddForm>
  );
}

export const TasksAdd = observer(TasksAddProto);
