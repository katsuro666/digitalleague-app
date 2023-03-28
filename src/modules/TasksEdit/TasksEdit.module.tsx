/* eslint-disable no-console */
import React, { useState, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PATH_LIST } from 'constants/index';
import { TasksMock } from '__mocks__/index';

export function TasksEdit() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [taskName, setTaskName] = useState(findTask()?.name || '');
  const [taskDesc, setTaskDesc] = useState(findTask()?.info || '');
  // eslint-disable-next-line prefer-const
  let [isImportant, setIsImportant] = useState(findTask()?.isImportant || false);
  // eslint-disable-next-line prefer-const
  let [isCompleted, setIsCompleted] = useState(findTask()?.isDone || false);

  function findTask() {
    return TasksMock.find((item) => item.id === taskId);
  }

  function setIsImportantState() {
    if (isImportant === false) {
      setIsImportant((isImportant = true));
    } else {
      setIsImportant((isImportant = false));
    }
  }
  function setIsCompletedState() {
    if (isCompleted === false) {
      setIsCompleted((isCompleted = true));
    } else {
      setIsCompleted((isCompleted = false));
    }
  }

  function editTask(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (taskName === '') {
      console.log('Задай название таску');
    }
    if (taskDesc === '') {
      console.log('Задай описание таску');
    } else {
      console.log(
        `Таск отредактирован.\nНовый заголовок: ${taskName}\nНовое описание: ${taskDesc}\nВажное: ${isImportant}\nЗавершённое: ${isCompleted}`
      );
      navigate(PATH_LIST.ROOT);
    }
  }

  return (
    <>
      <form>
        <TextField label="Task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <TextField label="What to do (description)" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
        <Checkbox label="Important" disabled={isCompleted} checked={isImportant} onChange={setIsImportantState} />
        <Checkbox label="Completed" checked={isCompleted} onChange={setIsCompletedState} />
        <button type="submit" className="btn btn-secondary d-block w-100" onClick={editTask}>
          Edit task
        </button>
      </form>
    </>
  );
}
