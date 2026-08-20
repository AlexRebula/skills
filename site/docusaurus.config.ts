import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AlexRebula Skills',
  tagline: 'Agent skills for Claude Code — install, reference, and extend',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://skills-two-cyan.vercel.app',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          include: [
            'engineering/**/*.{md,mdx}',
            'productivity/**/*.{md,mdx}',
            'git/**/*.{md,mdx}',
            'framework/**/*.{md,mdx}',
            'org/**/*.{md,mdx}',
            'personal/**/*.{md,mdx}',
            'misc/**/*.{md,mdx}',
          ],
          exclude: ['roadmap.md', 'generalization.md', 'pr-messages/**'],
          // No landing page exists at "/" (routeBasePath above), so disable
          // breadcrumbs' "Home" link — it would otherwise point at a route
          // with no page and fail the onBrokenLinks: 'throw' check.
          breadcrumbs: false,
          // Docs live at repo-root `docs/` (configured above via `path: '../docs'`),
          // not `site/docs/`, so the edit link must point at the real file location.
          editUrl: 'https://github.com/AlexRebula/skills/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AlexRebula Skills',
      logo: {
        alt: 'AlexRebula Skills Logo',
        src: 'img/logo.svg',
        // The navbar brand always links somewhere (Docusaurus falls back to
        // "/" otherwise), and there's no landing page at "/" — routeBasePath
        // sends the root straight into the docs sidebar with no page of its
        // own. Point the brand at the GitHub repo instead of an internal
        // route so it doesn't trip onBrokenLinks: 'throw'.
        href: 'https://github.com/AlexRebula/skills',
      },
      items: [
        {
          href: 'https://github.com/AlexRebula/skills',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/AlexRebula/skills',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alex Rebula.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
