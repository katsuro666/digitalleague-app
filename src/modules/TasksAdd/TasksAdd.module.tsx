import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Snackbar, Checkbox, FormControlLabel, TextField, Alert } from '@mui/material';
import { TasksAddStoreInstance } from './store';
import { DEFAULT_VALUES } from './TasksAdd.utils';
import { validationScheme } from './TasksAdd.validation';
import { PATH_LIST } from 'constants/index';
import { TasksAddEntity } from 'domains/index';
import { TaskButton, StyledForm } from 'components/mui';

function TasksAddProto() {
  const navigate = useNavigate();

  const { addNewTask, isAddSuccessful, isAddFailed, setAddFailed, setAddSuccessful } = TasksAddStoreInstance;

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
        setAddFailed(false);
        setAddSuccessful(true);
        setTimeout(() => {
          setAddSuccessful(false);
          reset();
          navigate(PATH_LIST.ROOT);
        }, 1000);
      } else {
        setAddFailed(true);
      }
    })();
  };

  return (
    <StyledForm spacing={3}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              required
              label="Task name"
              placeholder="Clean room"
              value={field.value}
              onChange={setTaskName}
              helperText={error?.message}
              InputLabelProps={{
                style: {
                  color: 'rgb(119, 122, 146)',
                },
              }}
              FormHelperTextProps={{
                style: {
                  color: 'red',
                },
              }}
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
              label="Task description"
              placeholder="Clean my room"
              value={field.value}
              onChange={setTaskDesc}
              helperText={error?.message}
              InputLabelProps={{
                style: {
                  color: 'rgb(119, 122, 146)',
                },
              }}
              FormHelperTextProps={{
                style: {
                  color: 'red',
                },
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

      <Snackbar open={isAddSuccessful} autoHideDuration={3000}>
        <Alert severity="success">Задание успешно добавлено.</Alert>
      </Snackbar>

      <Snackbar open={isAddFailed} autoHideDuration={3000}>
        <Alert severity="error">При добавлении задания произошла ошибка.</Alert>
      </Snackbar>
    </StyledForm>
  );
}

export const TasksAdd = observer(TasksAddProto);
