import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { DEFAULT_VALUES } from './SearchForm.utils';
import { StatusFilter } from 'modules/Tasks/components/StatusFilter';
import { SearchInput } from 'components/index';
import { FiltersType } from 'domains/index';
import './SearchForm.css';
import { TasksStoreInstance } from 'modules/Tasks/store';

function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;
  const { control, reset, handleSubmit, setValue } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const onSearchInputChange = (value: string) => {
    setValue('searchName', value);
  };

  const onSearchInputReset = () => {
    setValue('searchName', '');
  };
  const onFilterChange = (type: FiltersType) => {
    setValue('filter', type);
  };

  const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSubmit(async (data) => {
      await loadTasks(data);
      reset();
    })();
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <Controller
        control={control}
        name="searchName"
        render={({ field }) => {
          return (
            <SearchInput
              value={field.value}
              onChange={onSearchInputChange}
              onReset={onSearchInputReset}
              disabled={isTasksLoading}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="filter"
        render={({ field }) => {
          return <StatusFilter tasksType={field.value} onChange={onFilterChange} disabled={isTasksLoading} />;
        }}
      />

      <button type="submit" className="btn btn-primary" onClick={onSubmit} disabled={isTasksLoading}>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
