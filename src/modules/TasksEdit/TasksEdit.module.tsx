/* eslint-disable no-console */
import React, { MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { TasksEditStoreInstance } from './store';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PATH_LIST } from 'constants/index';
import { Loader } from 'components/index';

function TasksEditProto() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TasksEditStoreInstance.loadTask(taskId);
  }, []);

  const {
    taskName,
    taskDesc,
    isImportant,
    isCompleted,
    isLoading,
    setTaskName,
    setTaskDesc,
    setIsImportant,
    setIsCompleted,
  } = TasksEditStoreInstance;

  function editTask(e: MouseEvent<HTMLButtonElement>) {
    /* TODO: Перенести в методы стора когда настроишь навигацию */
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
        <Loader isLoading={isLoading}>
          <TextField label="Task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          <TextField label="What to do (description)" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
          <Checkbox label="Important" disabled={isCompleted} checked={isImportant} onChange={setIsImportant} />
          <Checkbox label="Completed" checked={isCompleted} onChange={setIsCompleted} />
          <button type="submit" className="btn btn-secondary d-block w-100" onClick={editTask}>
            Edit task
          </button>
        </Loader>
      </form>
    </>
  );
}

export const TasksEdit = observer(TasksEditProto);
