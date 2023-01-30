import { defineManifest } from '@crxjs/vite-plugin';

import { displayName, version } from '../package.json';

export default defineManifest({
  manifest_version: 3,
  name: displayName,
  default_locale: 'en',
  description: '__MSG_Description__',
  version: version,
  version_name: version,
  icons: {
    16: 'icon16.png',
    32: 'icon32.png',
    48: 'icon48.png',
    128: 'icon128.png',
  },
  action: {
    default_popup: 'src/popup/popup.html',
  },
  options_ui: {
    page: 'src/options/options.html',
    open_in_tab: true,
  },
  permissions: ['storage'],
});
