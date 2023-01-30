import { presetIcons, presetUno } from 'unocss';
import { defineConfig } from 'unocss/vite';

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  rules: [['whitespace-nowrap', { 'white-space': 'nowrap' }]],
});
