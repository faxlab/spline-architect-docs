import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'getting-started/overview', label: 'Overview'},
    {type: 'category', label: 'Getting Started', collapsed: false, items: [
      'getting-started/installation',
      'getting-started/architect-mode-fundamentals',
      'getting-started/first-building',
      'getting-started/baked-first-workflow',
      'getting-started/preparing-meshes',
    ]},
    {type: 'category', label: 'Walls and Buildings', items: [
      'core-actors/wall',
      'authoring/wall-presets',
      'authoring/floors-roofs',
      'core-actors/custom-piece',
      'core-actors/boolean',
      'core-actors/building',
    ]},
    {type: 'doc', id: 'core-actors/curve', label: 'Curve'},
    {type: 'category', label: 'Streets', items: [
      'core-actors/streets-network',
      'core-actors/lot-zone',
    ]},
    {type: 'category', label: 'Editor Tools', items: [
      'authoring/architect-mode',
      'authoring/preset-library',
      'authoring/shapes-spline-tools',
      'production/editor-tools',
    ]},
    {type: 'category', label: 'Production', items: [
      'production/baking',
      'production/conversion-export',
    ]},
    {type: 'category', label: 'UE 5.8 PCG', collapsed: false, items: [
      'pcg/overview', 'pcg/streets-city-tutorial', 'pcg/landscape-patch',
      'pcg/recipes', 'pcg/node-reference', 'pcg/metadata-reference',
    ]},
    {type: 'category', label: 'Reference', items: [
      'reference/compatibility', 'reference/project-settings',
      'reference/troubleshooting', 'reference/migration-v6', 'reference/credits',
    ]},
  ],
};

export default sidebars;
