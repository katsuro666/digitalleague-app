import { Box, Stack, styled } from '@mui/material';

export const PageContainer = styled(Box)({
  padding: '40px 0',
  margin: '0 auto',
  maxWidth: '600px',
});

export const StyledForm = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  margin: '20px 0',
  input: {
    color: 'rgb(119, 122, 146)',
    backgroundColor: 'rgb(37, 39, 60)',
    fontWeight: '700',
  },
});
