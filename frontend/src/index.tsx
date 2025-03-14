import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './@main-layout';

const container = document.getElementById('outlet');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);