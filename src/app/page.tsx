'use client';
import { store } from '@/store';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';
import { Provider } from 'react-redux';
import Authentication from './_authentication';
import '../styles/globals.css';

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <Stack
        sx={{ height: '100vh' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <div className="nav">
          <Typography variant="h5">CRUD Frontend example</Typography>
        </div>
        <main>
          <Authentication />
        </main>
        <footer className="footer">
          <Typography variant="subtitle1">
            Made by Giovany Santos, to see more access
          </Typography>
          <a target="_blank" href="https://giovany.com.br" className="url">
            <Typography variant="subtitle1">giovany.com.br</Typography>
          </a>
        </footer>
      </Stack>
    </Provider>
  );
};

export default Home;
