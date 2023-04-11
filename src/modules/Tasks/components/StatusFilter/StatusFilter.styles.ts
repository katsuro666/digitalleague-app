import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';

export const FilterContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
});

export const FilterButton = styled(Button)({
  width: '20%',
  margin: '16px 8px',
  // backgroundColor: 'rgb(37, 39, 60)',
  color: 'rgb(72, 202, 228)',
  border: '1px solid rgb(37, 39, 60)',
});
