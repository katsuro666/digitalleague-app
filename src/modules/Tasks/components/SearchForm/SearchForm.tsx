import React, { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { StatusFilter } from 'modules/Tasks/components/StatusFilter';
import { SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';
import './SearchForm.css';
import { TasksStoreInstance } from 'modules/Tasks/store';

function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;
  const [filterType, setFilterType] = useState<FiltersType>(FILTER_TYPES.ALL);
  const [searchValue, setSearchValue] = useState('');

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const onFilterChange = (type: FiltersType) => {
    setFilterType(type);
  };

  const onSearchInputReset = () => {
    setSearchValue('');
  };

  const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchValue('');
    setFilterType(FILTER_TYPES.ALL);
    await loadTasks({
      searchName: searchValue,
      filter: filterType,
    });
    // eslint-disable-next-line no-console
    console.log('search:', filterType, searchValue);
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <SearchInput
        value={searchValue}
        onChange={onSearchInputChange}
        onReset={onSearchInputReset}
        disabled={isTasksLoading}
      />
      <StatusFilter tasksType={filterType} onChange={onFilterChange} disabled={isTasksLoading} />
      <button type="submit" className="btn btn-primary" onClick={onSubmit} disabled={isTasksLoading}>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
