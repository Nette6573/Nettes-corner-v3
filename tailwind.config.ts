import type { Config } from 'tailwindcss';
export default { content: ['./src/**/*.{js,ts,jsx,tsx}'], theme: { extend: { colors: { plum: '#4b1835', wine: '#7b315b', blush: '#e9bdca', cream: '#fbf5ed', ivory: '#fffdf9' }, fontFamily: { display: ['var(--font-playfair)'], sans: ['var(--font-poppins)'] } } }, plugins: [] } satisfies Config;
