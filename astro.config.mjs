// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Pages that pass noindex to Base.astro. Keep this list in step with them so we
// never ask search engines to crawl a page we have told them to ignore.
const noindexPaths = ['/report-an-issue/', '/report-an-issue/thanks/', '/waiting-list/thanks/', '/404/'];

// https://astro.build/config
export default defineConfig({
  site: 'https://bigby.cloud',
  integrations: [sitemap({ filter: (page) => !noindexPaths.includes(new URL(page).pathname) })]
});
