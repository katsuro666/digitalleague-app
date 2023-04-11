import styled from '@emotion/styled';
import { Container } from '@mui/material';

export const StyledAddForm = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  margin: '20px 0',
  input: {
    color: 'white',
    backgroundColor: 'rgb(37, 39, 60)',
  },
});
