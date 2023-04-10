import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const LineThroughText = styled.p`
  text-decoration: line-through;
  color: #81a4ab;
`;

export const ImportantText = styled.p`
  color: rgb(72, 202, 228);
  font-size: 18px;
  font-weight: 700;
`;

export const BtnFalse = styled(IconButton)({
  backgroundColor: 'rgba(119, 122, 146, 0.1)',
  color: 'rgb(119, 122, 146)',
  marginRight: '5px',
  borderRadius: '10%',
});

export const BtnTrue = styled(IconButton)({
  backgroundColor: 'rgba(72, 202, 228, 0.1)',
  color: 'rgb(72, 202, 228)',
  marginRight: '5px',
  borderRadius: '10%',
});
