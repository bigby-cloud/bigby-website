// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Pages that pass noindex to Base.astro. Keep this list in step with them so we
// never ask search engines to crawl a page we have told them to ignore.
const noindexPaths = [
  '/report-an-issue/',
  '/report-an-issue/thanks/',
  '/waiting-list/thanks/',
  '/alpha-signup/',
  '/alpha-signup/thanks/',
  '/404/',
  '/help/webdav/setup/',
  '/help/webdav/setup/before-you-start/',
  '/help/webdav/setup/generate-credentials/',
  '/help/webdav/setup/choose-your-app/',
  '/help/webdav/setup/connect/',
  '/help/webdav/setup/verify/'
];

// https://astro.build/config
export default defineConfig({
  site: 'https://bigby.cloud',
  integrations: [sitemap({ filter: (page) => !noindexPaths.includes(new URL(page).pathname) })]
});
