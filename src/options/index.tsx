import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import '../i18n';

import Options from './Options';

import '@unocss/reset/tailwind.css';
import 'uno.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <Options />
    </Suspense>
  </React.StrictMode>,
);
