/* eslint-disable no-console */
import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TasksAddStoreInstance } from './store';
import { DEFAULT_VALUES } from './TasksAdd.utils';
import { validationScheme } from './TasksAdd.validation';
import { TextField, Checkbox } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { TasksAddEntity } from 'domains/index';

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
    <form>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              inputType="text"
              label="Task name"
              placeholder="Clean room"
              value={field.value}
              onChange={setTaskName}
              errorText={error?.message}
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
              inputType="text"
              label="What to do (description)"
              placeholder="Clean my room"
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
        render={() => {
          return <Checkbox label="Important" onChange={setTaskImportance} />;
        }}
      />

      <button type="submit" className="btn btn-secondary d-block w-100" onClick={onSubmit}>
        Add task
      </button>
    </form>
  );
}

export const TasksAdd = observer(TasksAddProto);
