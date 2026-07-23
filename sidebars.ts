import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'getting-started/overview', label: 'Overview'},
    {type: 'category', label: 'Getting Started', collapsed: false, items: [
      'getting-started/installation',
      'getting-started/preparing-meshes',
      'getting-started/architect-mode-fundamentals',
      'getting-started/first-building',
      'getting-started/baked-first-workflow',
    ]},
    {type: 'category', label: 'Core Actors', items: [
      'core-actors/wall', 'core-actors/building', 'core-actors/curve',
      'core-actors/streets-network', 'core-actors/lot-zone',
      'core-actors/custom-piece', 'core-actors/boolean',
    ]},
    {type: 'category', label: 'Authoring Systems', items: [
      'authoring/architect-mode', 'authoring/preset-library',
      'authoring/wall-presets', 'authoring/floors-roofs',
      'authoring/shapes-spline-tools',
    ]},
    {type: 'category', label: 'Production Output', items: [
      'production/baking', 'production/conversion-export', 'production/editor-tools',
    ]},
    {type: 'category', label: 'UE 5.8 PCG', collapsed: false, items: [
      'pcg/overview', 'pcg/streets-city-tutorial', 'pcg/recipes',
      'pcg/node-reference', 'pcg/metadata-reference',
    ]},
    {type: 'category', label: 'Reference', items: [
      'reference/compatibility', 'reference/project-settings',
      'reference/troubleshooting', 'reference/migration-v6',
    ]},
  ],
};

export default sidebars;
