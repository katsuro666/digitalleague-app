import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DEFAULT_VALUES } from './SearchForm.utils';
import { StyledSearchForm, SearchWrapper, FindButton, ResetButton } from './SearchForm.styles';
import { StatusFilter } from 'modules/Tasks/components/StatusFilter';
import { FiltersType } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store';

function SearchFormProto() {
  const { isTasksLoading, updateTasks } = TasksStoreInstance;
  const { control, handleSubmit, setValue } = useForm({
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
      await updateTasks(data);
    })();
  };

  return (
    <StyledSearchForm>
      <SearchWrapper>
        <Controller
          control={control}
          name="searchName"
          render={({ field }) => {
            return (
              <TextField
                placeholder="Clear room"
                label="Search"
                variant="standard"
                fullWidth={true}
                value={field.value}
                color="primary"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onSearchInputChange(event.target.value);
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
              />
            );
          }}
        />

        <ResetButton onClick={onSearchInputReset} disabled={isTasksLoading}>
          <ClearIcon />
        </ResetButton>

        <FindButton type="submit" onClick={onSubmit} disabled={isTasksLoading}>
          Find
        </FindButton>
      </SearchWrapper>

      <Controller
        control={control}
        name="filter"
        render={({ field }) => {
          return <StatusFilter tasksType={field.value} onChange={onFilterChange} disabled={isTasksLoading} />;
        }}
      />
    </StyledSearchForm>
  );
}

export const SearchForm = observer(SearchFormProto);
