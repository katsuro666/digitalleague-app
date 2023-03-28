/* eslint-disable no-console */
import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox } from 'components/index';
import { PATH_LIST } from 'constants/index';

export function TasksAdd() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  // eslint-disable-next-line prefer-const
  let [isImportant, setIsImportant] = useState(false);

  function addNewTask(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (taskName === '') {
      console.log('У тебя нет названия таски');
    }
    if (taskDesc === '') {
      console.log('У тебя нет описания таски');
    } else {
      console.log(`Вот вам новый таск:\nНазвание: ${taskName}\nОписание: ${taskDesc}\nВажно: ${isImportant}`);
      navigate(PATH_LIST.ROOT);
    }
  }

  function setCheckboxValue() {
    if (isImportant === false) {
      setIsImportant((isImportant = true));
    } else {
      setIsImportant((isImportant = false));
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
      <Checkbox label="Important" onChange={setCheckboxValue} />
      <button type="submit" className="btn btn-secondary d-block w-100" onClick={addNewTask}>
        Add task
      </button>
    </form>
  );
}
