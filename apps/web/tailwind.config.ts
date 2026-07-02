import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f0f9ff', 500: '#0ea5e9', 600: '#0284c7', 900: '#0c4a6e' },
        slate: { 850: '#1e293b' },
      },
    },
  },
  plugins: [],
};
export default config;
