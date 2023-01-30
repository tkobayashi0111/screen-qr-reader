import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import Popup from './Popup';

import '@unocss/reset/tailwind.css';
import 'uno.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <HelmetProvider>
      <Popup />
    </HelmetProvider>
  </React.StrictMode>,
);
