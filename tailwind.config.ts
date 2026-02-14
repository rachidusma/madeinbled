import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bled-orange': '#FE6B01',
        'bled-blue': '#013765',
        'primary': '#f37120', // Updated to match brand orange from reference
        'background-light': '#f8f7f5',
        'background-dark': '#0a192f', // Updated to match reference exactly (#0a192f instead of #0f172a)
        'navy-deep': '#0a192f', // Updated to match background-dark
        'navy-card': '#1e293b', // Updated to match neutral-dark
        'navy-muted': '#162a4a', // Added from Contact Page reference
        'navy-border': '#1e3a61', // Added from Contact Page reference
        'neutral-dark': '#1e293b', // Refined from reference
        'border-dark': '#334155', // Refined from reference
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
