export type Product = { id: string; slug: string; title: string; description: string; price: number; category: 'Apparel' | 'Home & Living' | 'Accessories'; image: string; badge?: string; colors: string[] };
export const products: Product[] = [
  { id: 'p1', slug: 'grace-over-grind-tee', title: 'Grace Over Grind Tee', description: 'A gentle reminder for the woman building a life she loves. Soft, relaxed and made for everyday courage.', price: 28, category: 'Apparel', image: '/images/Faith2.png', badge: 'Bestseller', colors: ['Ivory', 'Blush', 'Plum'] },
  { id: 'p2', slug: 'becoming-her-crewneck', title: 'Becoming Her Crewneck', description: 'Cozy layers for slow mornings, brave steps and all the becoming in between.', price: 48, category: 'Apparel', image: '/images/Growth_banner.png', badge: 'New', colors: ['Cream', 'Mauve'] },
  { id: 'p3', slug: 'soft-life-tote', title: 'Soft Life Market Tote', description: 'Roomy, strong and designed for your books, blooms and beautiful everyday essentials.', price: 24, category: 'Accessories', image: '/images/Lifestyle.png', colors: ['Natural'] },
  { id: 'p4', slug: 'healing-is-holy-mug', title: 'Healing Is Holy Mug', description: 'Your quiet moment deserves a beautiful cup. A daily ritual in a lasting ceramic mug.', price: 19, category: 'Home & Living', image: '/images/Healing.png', colors: ['Ivory'] },
  { id: 'p5', slug: 'chosen-and-chic-tee', title: 'Chosen & Chic Tee', description: 'Faith-forward style with a feminine, confident point of view.', price: 28, category: 'Apparel', image: '/images/Nette.png', colors: ['Blush', 'Ivory'] },
  { id: 'p6', slug: 'bloom-anyway-journal', title: 'Bloom Anyway Journal', description: 'A lovely place to hold your prayers, plans and the things you are growing into.', price: 22, category: 'Home & Living', image: '/images/Quotes.png', badge: 'Limited', colors: ['Blush'] }
];
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
