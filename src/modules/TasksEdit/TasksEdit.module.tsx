/* eslint-disable no-console */
import React, { ChangeEvent, MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TasksEditStoreInstance } from './store';
import { DEFAULT_VALUES } from './TasksEdit.utils';
import { validationScheme } from './TasksEdit.validation';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PATH_LIST } from 'constants/index';
import { Loader } from 'components/index';
import { TasksEditEntity } from 'domains/index';

function TasksEditProto() {
  const { taskId } = useParams();

  const navigate = useNavigate();

  const { isLoading, task, editTask } = TasksEditStoreInstance;

  const { control, reset, handleSubmit, setValue, getValues, watch } = useForm<TasksEditEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationScheme),
  });

  const isDisabledIsImportant = watch('isDone');

  useEffect(() => {
    TasksEditStoreInstance.taskId = taskId;
    // loadTask(taskId);
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
        console.log('Таск отредактирован');
        reset();
        navigate(PATH_LIST.ROOT);
      } else {
        console.log('При редактировании таска произошла ошибка');
      }
    })();
  }

  return (
    <>
      <form>
        <Loader isLoading={isLoading}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField label="Task name" value={field.value} onChange={setTaskName} errorText={error?.message} />
              );
            }}
          />
          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  label="What to do (description)"
                  value={field.value}
                  onChange={setTaskDesc}
                  errorText={error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="isImportant"
            render={({ field: { value } }) => {
              return (
                <Checkbox
                  label="Important"
                  disabled={isDisabledIsImportant}
                  checked={value}
                  onChange={setIsImportant}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="isDone"
            render={({ field: { value } }) => {
              return <Checkbox label="Completed" checked={value} onChange={setIsDone} />;
            }}
          />
          <button type="submit" className="btn btn-secondary d-block w-100" onClick={onSubmit}>
            Edit task
          </button>
        </Loader>
      </form>
    </>
  );
}

export const TasksEdit = observer(TasksEditProto);
