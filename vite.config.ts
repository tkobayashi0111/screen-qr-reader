import { crx } from '@crxjs/vite-plugin';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

import manifest from './src/manifest';

export default defineConfig({
  plugins: [ViteYaml(), react(), UnoCSS(), crx({ manifest })],
});
