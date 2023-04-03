import { FILTER_TYPES } from 'constants/index';
import { SearchTaskEntity } from 'domains/index';

export const DEFAULT_VALUES: SearchTaskEntity = {
  searchName: '',
  filter: FILTER_TYPES.ALL,
};
