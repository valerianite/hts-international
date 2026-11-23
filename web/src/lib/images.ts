import type { ImageMetadata } from 'astro';

// All WebP images converted from the old Wix site. See src/data/images.json for the manifest
// (original IDs, roles, usage notes and known problems).
const all = import.meta.glob<{ default: ImageMetadata }>('../assets/wix/*.webp', { eager: true });

export function img(name: string): ImageMetadata {
  const m = all[`../assets/wix/${name}.webp`];
  if (!m) throw new Error(`Missing image: ${name}.webp (check src/assets/wix)`);
  return m.default;
}
