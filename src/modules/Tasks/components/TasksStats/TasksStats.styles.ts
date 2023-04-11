import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';

export const StatsBadge = styled(Typography)({
  backgroundColor: 'rgb(37, 39, 60)',
  color: 'rgb(72, 202, 228)',
  border: '1px solid rgb(37, 39, 60)',
  padding: '10px 0.65em',
  fontWeight: 700,
  fontSize: '.75em',
  borderRadius: '.25rem',
  marginLeft: '5px',
});

export const StatsText = styled(Typography)({
  color: 'rgb(119, 122, 146)',
  border: '1px solid rgb(37, 39, 60)',
  padding: '0.35em 0.65em',
  borderRadius: '.25rem',
  width: '100%',
});

export const StatsWrapper = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
});
