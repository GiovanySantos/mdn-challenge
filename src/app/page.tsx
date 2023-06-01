'use client';
import { store } from '@/store';
import React from 'react';
import { Provider } from 'react-redux';
import Authentication from './_authentication';
import { Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen flex-col justify-between bg-zinc-100">
        <nav className="flex flex-none items-center justify-center bg-teal-900 px-10 py-5 text-zinc-100">
          <Typography variant="h5">MDN Company Registration</Typography>
        </nav>
        <main className="flex items-center justify-center overflow-y-auto">
          <Authentication />
        </main>
        <footer className="flex flex-none items-center justify-center gap-4 bg-teal-900 px-10 py-5 font-light text-zinc-100">
          <Typography variant="subtitle1">
            Made by Giovany Santos, to see more click here {'->'}
          </Typography>
          <a
            target="_blank"
            href="https://giovany.com.br"
            className="hover:text-green-400"
          >
            giovany.com.br
          </a>
        </footer>
      </div>
    </Provider>
  );
};

export default Home;
