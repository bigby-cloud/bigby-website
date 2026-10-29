// Navigation tree for the Help section. Drives the help sidebar so adding a
// new page only needs an entry here.

export interface HelpNavLink {
  label: string;
  href: string;
}

export interface HelpNavSection {
  heading: string;
  links: HelpNavLink[];
}

// TODO: expand as more help sections land.
export const helpNav: HelpNavSection[] = [
  {
    heading: 'Getting started',
    links: [{ label: 'Help home', href: '/help/' }],
  },
  {
    heading: 'Accessing Bigby.drive',
    links: [
      { label: 'Browser (all platforms)', href: '/help/browser/' },
      { label: 'Desktop (Windows, Mac, Linux)', href: '/help/desktop/' },
      { label: 'Mobile (iOS, Android)', href: '/help/mobile/' },
      { label: 'AI Assistants/Agents (MCP)', href: '/help/ai-assistants-agents/' },
      { label: 'WebDAV', href: '/help/webdav/' },
      { label: 'WebDAV setup wizard', href: '/help/webdav/setup/' },
    ],
  },
];
