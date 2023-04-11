import styled from '@emotion/styled';
import { Container } from '@mui/system';
import { Button } from '@mui/material';

export const StyledSearchForm = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  input: {
    color: 'white',
    backgroundColor: 'rgb(37, 39, 60)',
  },
});

export const SearchWrapper = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const FindButton = styled(Button)({
  width: '20%',
  height: '32px',
  marginTop: '16px',
  marginLeft: '16px',
  backgroundColor: 'rgb(37, 39, 60)',
  color: 'rgb(72, 202, 228)',
  border: '1px solid rgb(37, 39, 60)',
});

export const ResetButton = styled(Button)({
  minWidth: '32px',
  height: '32px',
  marginTop: '16px',
  marginLeft: '16px',
  backgroundColor: 'rgb(37, 39, 60)',
  color: 'rgb(72, 202, 228)',
  border: '1px solid rgb(37, 39, 60)',
});
