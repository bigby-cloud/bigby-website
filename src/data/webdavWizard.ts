// Single source of truth for the WebDAV setup wizard. The ordered step list
// lives here so the wizard layout, progress indicator and prev/next links all
// read from one place — reordering or renaming a step only needs doing once.

export interface WizardStep {
  /** URL segment under the wizard base path, and the page filename. */
  slug: string;
  /** Short label shown in the progress indicator. */
  title: string;
  /** One-line summary shown on the wizard start page. */
  summary: string;
}

export const webdavWizardBasePath = '/help/webdav/setup';

// TODO: refine step list, slugs and copy as the real flow takes shape.
export const webdavWizardSteps: WizardStep[] = [
  {
    slug: 'before-you-start',
    title: 'Before you start',
    summary: 'What you need to hand before setting up WebDAV.',
  },
  {
    slug: 'generate-credentials',
    title: 'Generate credentials',
    summary: 'Create a dedicated WebDAV username and app password.',
  },
  {
    slug: 'choose-your-app',
    title: 'Choose your app',
    summary: 'Pick the client for your device or operating system.',
  },
  {
    slug: 'connect',
    title: 'Connect',
    summary: 'Enter your server URL and credentials to connect.',
  },
  {
    slug: 'verify',
    title: 'Verify',
    summary: 'Confirm the connection works and files sync.',
  },
];

export interface WizardContext {
  step: WizardStep;
  index: number;
  stepNumber: number;
  total: number;
  prev: WizardStep | null;
  next: WizardStep | null;
  href: (step: WizardStep) => string;
}

/** Resolve the position and neighbours of a wizard step by its slug. */
export function getWizardContext(slug: string): WizardContext {
  const index = webdavWizardSteps.findIndex((step) => step.slug === slug);
  if (index === -1) {
    throw new Error(`Unknown WebDAV wizard step: "${slug}"`);
  }

  return {
    step: webdavWizardSteps[index],
    index,
    stepNumber: index + 1,
    total: webdavWizardSteps.length,
    prev: index > 0 ? webdavWizardSteps[index - 1] : null,
    next: index < webdavWizardSteps.length - 1 ? webdavWizardSteps[index + 1] : null,
    href: (step) => `${webdavWizardBasePath}/${step.slug}/`,
  };
}
