import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
export const metadata: Metadata = { title: "Nette's Corner | Faith, growth & beautiful things", description: 'Thoughtful goods for your everyday becoming.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${playfair.variable} ${poppins.variable}`}>{children}</body></html>; }
