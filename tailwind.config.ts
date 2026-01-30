import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#d946ef',
        'neon-dark': '#2e0233',
        'cyber-black': '#09090b',
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(217, 70, 239, 0.6), 0 0 20px rgba(217, 70, 239, 0.3)',
        glow: '0 0 15px rgba(217, 70, 239, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
