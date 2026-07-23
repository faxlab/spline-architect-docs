import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const redirects: Record<string, string[]> = {
  '/getting-started/installation': ['/1.Intro/1.installation', '/lt/1.Intro/1.installation'],
  '/getting-started/overview': ['/1.Intro/2.how-it-works', '/lt/', '/lt/1.Intro/2.how-it-works'],
  '/core-actors/wall': ['/2.Overview/Components/1.Spline-Architect-Wall', '/lt/2.Overview/Components/1.Spline-Architect-Wall'],
  '/core-actors/custom-piece': ['/2.Overview/Components/2.Spline-Architect-Custom-Piece', '/lt/2.Overview/Components/2.Spline-Architect-Custom-Piece'],
  '/core-actors/boolean': ['/2.Overview/Components/3.Spline-Architect-Boolean', '/lt/2.Overview/Components/3.Spline-Architect-Boolean'],
  '/authoring/wall-presets': ['/2.Overview/Components/4.Wall-preset', '/lt/2.Overview/Components/4.Wall-preset'],
  '/authoring/preset-library': ['/2.Overview/Components/5.Widgets', '/lt/2.Overview/Components/5.Widgets'],
  '/reference/project-settings': ['/2.Overview/Components/6.Project-Settings', '/lt/2.Overview/Components/6.Project-Settings'],
  '/production/editor-tools': ['/2.Overview/Components/7.Pivot-tool', '/lt/2.Overview/Components/7.Pivot-tool', '/4.Tips&Tricks/SnapSplinePoints', '/lt/4.Tips&Tricks/SnapSplinePoints'],
  '/production/baking': ['/2.Overview/Concepts/baking', '/lt/2.Overview/Concepts/baking', '/4.Tips&Tricks/InteriorExterior', '/lt/4.Tips&Tricks/InteriorExterior', '/4.Tips&Tricks/Nanite', '/lt/4.Tips&Tricks/Nanite'],
  '/production/conversion-export': ['/2.Overview/Concepts/converting', '/lt/2.Overview/Concepts/converting'],
  '/authoring/floors-roofs': ['/4.Tips&Tricks/Randomization', '/lt/4.Tips&Tricks/Randomization'],
};

const config: Config = {
  title: 'Spline Architect',
  tagline: 'Procedural architecture and streets for Unreal Engine',
  favicon: 'img/favicon.png',
  url: 'https://faxlab.github.io',
  baseUrl: '/spline-architect-docs/',
  organizationName: 'faxlab',
  projectName: 'spline-architect-docs',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {onBrokenMarkdownLinks: 'throw'},
  },
  i18n: {defaultLocale: 'en', locales: ['en']},
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/faxlab/spline-architect-docs/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        gtag: {trackingID: 'G-YV8FLGPN35', anonymizeIP: true},
        sitemap: {changefreq: 'weekly', priority: 0.5},
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@cmfcmf/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        language: 'en',
        indexDocSidebarParentCategories: 2,
        includeParentCategoriesInPageTitle: true,
        maxSearchResults: 12,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath: string) {
          const normalizedPath = existingPath === '/' ? existingPath : existingPath.replace(/\/$/, '');
          return redirects[normalizedPath] ?? undefined;
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {respectPrefersColorScheme: true},
    navbar: {
      title: 'Spline Architect',
      logo: {alt: 'Spline Architect', src: 'img/favicon.png'},
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Guide'},
        {to: '/pcg/overview', label: 'UE 5.8 PCG', position: 'left'},
        {to: '/reference/compatibility', label: 'Compatibility', position: 'right'},
        {href: 'https://www.fab.com/listings/356b1d13-5080-4418-893d-5a39546bc276', label: 'Get on Fab', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Start', items: [
          {label: 'Install', to: '/getting-started/installation'},
          {label: 'Build your first building', to: '/getting-started/first-building'},
          {label: 'Baking workflow', to: '/production/baking'},
        ]},
        {title: 'Reference', items: [
          {label: 'Core actors', to: '/core-actors/wall'},
          {label: 'SA PCG nodes', to: '/pcg/node-reference'},
          {label: 'Troubleshooting', to: '/reference/troubleshooting'},
        ]},
        {title: 'Spline Architect', items: [
          {label: 'Fab listing', href: 'https://www.fab.com/listings/356b1d13-5080-4418-893d-5a39546bc276'},
          {label: 'FaxLab3D on Fab', href: 'https://www.fab.com/sellers/FaxLab3D'},
        ]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FaxLab3D. Built with Docusaurus.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
