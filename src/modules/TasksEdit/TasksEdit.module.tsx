/* eslint-disable no-console */
import React, { ChangeEvent, MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { TasksEditStoreInstance } from './store';
import { DEFAULT_VALUES } from './TasksEdit.utils';
import { validationScheme } from './TasksEdit.validation';
import { PATH_LIST } from 'constants/index';
import { StyledForm, TaskButton } from 'components/index';
import { TasksEditEntity } from 'domains/index';

function TasksEditProto() {
  const { taskId } = useParams();

  const navigate = useNavigate();

  const { isLoading, task, editTask, setTaskId } = TasksEditStoreInstance;

  const { control, reset, handleSubmit, setValue, getValues, watch } = useForm<TasksEditEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationScheme),
  });

  const isDisabledIsImportant = watch('isDone');

  useEffect(() => {
    setTaskId(taskId);
  }, [TasksEditStoreInstance, taskId]);

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task]);

  function setTaskName(e: ChangeEvent<HTMLInputElement>) {
    setValue('name', e.target.value);
  }

  function setTaskDesc(e: ChangeEvent<HTMLInputElement>) {
    setValue('info', e.target.value);
  }

  function setIsDone(e: ChangeEvent<HTMLInputElement>) {
    setValue('isDone', e.target.checked);
    if (getValues('isDone')) {
      setValue('isImportant', false);
    }
  }

  function setIsImportant(e: ChangeEvent<HTMLInputElement>) {
    setValue('isImportant', e.target.checked);
  }

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleSubmit(async (data) => {
      const isSuccess = await editTask(data);
      if (isSuccess) {
        reset();
        navigate(PATH_LIST.ROOT);
      } else {
        console.log('Нотификация ошибки при редактировании');
      }
    })();
  }

  return (
    <StyledForm spacing={3}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  required
                  label="Task name"
                  value={field.value}
                  onChange={setTaskName}
                  helperText={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  required
                  label="What to do (description)"
                  value={field.value}
                  onChange={setTaskDesc}
                  helperText={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="isImportant"
            render={({ field: { value } }) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={setIsImportant}
                      checked={value}
                      disabled={isDisabledIsImportant}
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

          <Controller
            control={control}
            name="isDone"
            render={({ field: { value } }) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={setIsDone}
                      checked={value}
                      style={{
                        color: 'rgb(72, 202, 228',
                      }}
                    />
                  }
                  label="Completed"
                  style={{
                    color: 'rgb(119, 122, 146)',
                    width: 'min-content',
                  }}
                />
              );
            }}
          />
          <TaskButton type="submit" onClick={onSubmit}>
            Edit task
          </TaskButton>
        </>
      )}
    </StyledForm>
  );
}

export const TasksEdit = observer(TasksEditProto);
