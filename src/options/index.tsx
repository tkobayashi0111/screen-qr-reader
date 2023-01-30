import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import '../i18n';

import Options from './Options';

import '@unocss/reset/tailwind.css';
import 'uno.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <HelmetProvider>
        <Options />
      </HelmetProvider>
    </Suspense>
  </React.StrictMode>,
);
