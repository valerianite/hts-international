import data from '../data/subpages.json';

// Machine/component sub-pages ported from the old site (same URLs as before, e.g. /needle-grippers, /wensui/chillers).
export interface SubPage {
  slug: string;
  parent: string;
  heading: string;
  title: string;
  description: string;
  blocks: any[];
  pics: { file: string; alt: string }[];
}

export const subpages = data as SubPage[];
export const childrenOf = (parent: string) => subpages.filter((s) => s.parent === parent);

// Captions generated from file names (e.g. "7 hgp16 (1)") are not useful to visitors.
export const goodCaption = (c?: string) => !!c && c.length > 2 && !/\(\d+\)$/.test(c) && !/^\d+\s+[a-z]+\d+/i.test(c) && !/^(img|dsc|image|screenshot)/i.test(c);
