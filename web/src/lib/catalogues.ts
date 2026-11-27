import data from '../data/catalogues.json';

// Approved catalogues only. Files live in public/catalogues and are checked at build time
// by scripts/check-catalogues.mjs (no price lists, no unapproved files).
export interface Cat {
  slug: string;
  label: string;
  supplier: string;
  product: string;
  href: string;
  external: boolean;
  bytes?: number;
  pages?: number;
}

const hosted: Cat[] = data.hosted.map((h) => ({
  slug: h.slug, label: h.label, supplier: h.supplier, product: h.product,
  href: h.file, external: false, bytes: h.bytes, pages: h.pages,
}));
const external: Cat[] = data.external.map((e: any) => ({
  slug: e.slug, label: e.label, supplier: e.supplier, product: e.product,
  href: e.href ?? '', external: !!e.href,
}));

export const catalogues: Cat[] = [...hosted, ...external];

// Client rules: "coming soon" catalogues are never shown (leave them off until the file exists),
// and pallet lines / pallet moulding must never be shown as a product or catalogue.
export const forProduct = (product: string) => catalogues.filter((c) => c.product === product);

export const supplierOrder = ['Borche', 'Wensui', 'CRG', 'Anhyup', 'HALS', 'MACO', 'Hengfei', 'Linear potentiometers'];
export const bySupplier = () =>
  supplierOrder.map((s) => ({ supplier: s, items: catalogues.filter((c) => c.supplier === s) })).filter((g) => g.items.length > 0);

export const size = (b?: number) => (b ? (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`) : '');
