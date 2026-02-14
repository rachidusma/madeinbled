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
        'primary': '#FE6B01', // Updated to match brand orange
        'background-light': '#f8f7f5',
        'background-dark': '#050a14', // Slightly darker blue-tinged background
        'navy-deep': '#013765', // Updated to match brand blue (bled-blue)
        'navy-card': '#0a2342', // Adjusted card color to harmonize with blue theme
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
  plugins: [],
}
export default config
