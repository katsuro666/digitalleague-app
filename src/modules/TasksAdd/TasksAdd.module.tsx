/* eslint-disable no-console */
import React, { MouseEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { TasksAddStoreInstance } from './store';
import { TextField, Checkbox } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { delay } from 'helpers/index';

function TasksAddProto() {
  useEffect(() => {
    TasksAddStoreInstance.newTaskPreload();
  }, []);

  const navigate = useNavigate();

  const { taskName, taskDesc, taskIsImportant, setTaskName, setTaskDesc, setTaskImportance } = TasksAddStoreInstance;

  async function addNewTask(e: MouseEvent<HTMLButtonElement>) {
    /* TODO: определить способ реализации роутинга и переместить этот метод в стор */

    e.preventDefault();

    if (taskName === '') {
      console.log('У тебя нет названия таски');
    }
    if (taskDesc === '') {
      console.log('У тебя нет описания таски');
    } else {
      console.log(`Вот вам новый таск:\nНазвание: ${taskName}\nОписание: ${taskDesc}\nВажно: ${taskIsImportant}`);

      await delay(500);
      navigate(PATH_LIST.ROOT);
    }
  }

  return (
    <form>
      <TextField
        label="Task name"
        placeholder="Clean room"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <TextField
        label="What to do (description)"
        placeholder="Clean my room"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
      />
      <Checkbox label="Important" onChange={setTaskImportance} />
      <button type="submit" className="btn btn-secondary d-block w-100" onClick={addNewTask}>
        Add task
      </button>
    </form>
  );
}

export const TasksAdd = observer(TasksAddProto);
