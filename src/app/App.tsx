import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { StyledContainer } from './App.styles';
import { Router } from 'router/index';

export function App() {
  return (
    <StyledContainer>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StyledContainer>
  );
}
