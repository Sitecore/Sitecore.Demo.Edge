module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#f7f7f7',
        light: '#ffffff',
        dark: '#efefef',
      },
      black: {
        DEFAULT: '#232323',
        light: '#3c3c3c',
        dark: '#0a0a0a',
        darkest: '#000000',
      },
      gray: {
        DEFAULT: '#cccccc',
        light: '#e5e5e5',
        dark: '#b3b3b3',
      },
      blue: {
        DEFAULT: '#006ef9',
        light: '#3e93ff',
        lightest: '#82b9ff',
        dark: '#0050b5',
        darkest: '#003271',
      },
      yellow: {
        DEFAULT: '#ffd31c',
        light: '#ffe060',
        lightest: '#ffeda4',
        dark: '#d7ad00',
        darkest: '#937700',
      },
      orange: {
        DEFAULT: '#ff8c00',
        light: '#ffab44',
        lightest: '#ffc988',
        dark: '#cc7000',
        darkest: '#884b00',
      },
      pink: {
        DEFAULT: '#ff1886',
        light: '#ff5caa',
        lightest: '#ffa0ce',
        dark: '#d30065',
        darkest: '#8f0044',
      }
    },
    fontFamily: {
      'sans': 'Saira, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
