import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
          // text
          't-black': '#1a202c',
          't-green': '#00757b',
          't-orange': '#f68b1f',
          't-white': '#ffffff',
          't-gray': '#d1cfcf',
          't-primary': '#f36f21',

          // background
          'b-black': '#1a202c',
          'b-green': '#00757b',
          'b-orange': '#f68b1f',
          'b-white': '#ffffff',
          'b-blue': '#044da2',
          'b-gray': '#DCDCDC',
          'b-primary': '#f5f5f5',
          'b-primary-second': '#f5f5f5',
          'b-button': '#f36f21',
          'b-success-opcity': '#cdf7ec',
          'b-success': '#71be44',

          // border
          success: '#06d6a0',
          primary: '#ced4da',
          error: '#E53E3E',
      },
  },
  fontSize: {
      xs: '0.6rem',
      sm: '0.75rem',
      md: '0.9rem',
      lg: '1rem',
      xl: '1.2rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2rem',
  },
  },
  plugins: [

  ],
}
export default config
