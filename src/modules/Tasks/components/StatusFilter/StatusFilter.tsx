import React, { MouseEvent } from 'react';
import { StatusFilterProps } from './StatusFilter.types';
import { FilterButton, FilterContainer } from './StatusFilter.styles';
import { FiltersType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

export function StatusFilter({ onChange, tasksType }: StatusFilterProps) {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    onChange(evt.target.textContent as FiltersType);
  };

  return (
    <FilterContainer onClick={onFilterChange}>
      <FilterButton size="small" type="button" variant={tasksType === FILTER_TYPES.ALL ? 'contained' : 'outlined'}>
        {FILTER_TYPES.ALL}
      </FilterButton>
      <FilterButton size="small" type="button" variant={tasksType === FILTER_TYPES.ACTIVE ? 'contained' : 'outlined'}>
        {FILTER_TYPES.ACTIVE}
      </FilterButton>
      <FilterButton size="small" type="button" variant={tasksType === FILTER_TYPES.DONE ? 'contained' : 'outlined'}>
        {FILTER_TYPES.DONE}
      </FilterButton>
      <FilterButton
        size="small"
        type="button"
        variant={tasksType === FILTER_TYPES.IMPORTANT ? 'contained' : 'outlined'}>
        {FILTER_TYPES.IMPORTANT}
      </FilterButton>
    </FilterContainer>
  );
}
