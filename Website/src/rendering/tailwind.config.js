const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'scChromeData',
    'scpm',
    'bg-blue', // For CategoryBreadcrumb.stories.tsx
    'hidden'
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#f7f7f7',
        lighter: '#fafafa',
        light: '#ffffff',
        dark: '#efefef',
      },
      black: {
        DEFAULT: '#232323',
        light: '#3c3c3c',
        lightest: '#666666',
        dark: '#0a0a0a',
        darkest: '#000000',
      },
      gray: {
        DEFAULT: '#cccccc',
        light: '#e5e5e5',
        lighter: '#d5d5d5',
        dark: '#b3b3b3',
      },
      blue: {
        DEFAULT: '#006ef9',
        light: '#3e93ff',
        lighter: '#1c80ff',
        lightest: '#85bfff',
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
        DEFAULT: '#ff8d00',
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
    extend: {
      maxWidth: {
        '30': '30rem',
      },
      width: {
        '45': '45%',
        '55': '55%',
      },
      backgroundImage: {
        'pattern-light': "url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1200'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bopacity:0.1;%7D.cls-2%7Bfill:%230092ff;%7D.cls-3%7Bfill:%2369c9ff;%7D.cls-4%7Bfill:%23ff8d00;%7D.cls-5%7Bfill:%23ffc280;%7D%3C/style%3E%3C/defs%3E%3Cg class='cls-1'%3E%3Cpolygon class='cls-2' points='462.45 210.51 386.45 390.14 2.85 0 251.95 0.01 462.45 210.51'/%3E%3Cpolygon class='cls-3' points='0 553.45 0 356.53 250.57 251.95 386.45 390.14 0 553.45'/%3E%3C/g%3E%3Cg class='cls-1'%3E%3Cpolygon class='cls-4' points='1457.55 989.49 1533.55 809.86 1917.15 1200 1668.05 1199.99 1457.55 989.49'/%3E%3Cpolygon class='cls-5' points='1920 646.55 1920 843.47 1669.43 948.05 1533.55 809.86 1920 646.55'/%3E%3C/g%3E%3C/svg%3E\")",
        'pattern-dark': "url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1920 1200'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:url(%23linear-gradient);%7D.cls-2%7Bopacity:0.1;%7D.cls-3%7Bfill:%23ccc;%7D.cls-4%7Bfill:%23f2f2f2;%7D%3C/style%3E%3ClinearGradient id='linear-gradient' x1='167.5' y1='-193.5' x2='1760.5' y2='1399.5' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23232323'/%3E%3Cstop offset='1' stop-color='%23232323'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect class='cls-1' x='-11' y='-15' width='1950' height='1236'/%3E%3Cg class='cls-2'%3E%3Cpolygon class='cls-3' points='462.45 210.51 386.45 390.14 2.85 0 251.95 0.01 462.45 210.51'/%3E%3Cpolygon class='cls-4' points='0 553.45 0 356.53 250.57 251.95 386.45 390.14 0 553.45'/%3E%3C/g%3E%3Cg class='cls-2'%3E%3Cpolygon class='cls-3' points='1457.55 989.49 1533.55 809.86 1917.15 1200 1668.05 1199.99 1457.55 989.49'/%3E%3Cpolygon class='cls-4' points='1920 646.55 1920 843.47 1669.43 948.05 1533.55 809.86 1920 646.55'/%3E%3C/g%3E%3C/svg%3E\")",
        'element': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='266' height='207.525' viewBox='0 0 266 207.525'%3E%3Cpath id='profile-pic-element' d='M624.407,396.146V260.606l172.473-71.986,93.527,95.121Z' transform='translate(-624.407 -188.621)' fill='%23f4f4f4' opacity='0.4'/%3E%3C/svg%3E%0A\")",
        'select-arrow': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18.649' height='11.318' viewBox='0 0 18.649 11.318'%3E%3Cpath id='chevron-down-solid' d='M14.256,134.512l-8.3-8.3a1.025,1.025,0,0,1,0-1.45l.968-.968a1.025,1.025,0,0,1,1.448,0l6.609,6.578,6.609-6.578a1.025,1.025,0,0,1,1.448,0l.968.968a1.025,1.025,0,0,1,0,1.45l-8.3,8.3A1.025,1.025,0,0,1,14.256,134.512Z' transform='translate(-5.656 -123.494)'/%3E%3C/svg%3E%0A\")",
        'checkbox-check': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17.121' height='13.121' viewBox='0 0 17.121 13.121'%3E%3Cg id='Group_277' data-name='Group 277' transform='translate(1.061 1.061)'%3E%3Cg id='Group_276' data-name='Group 276'%3E%3Cline id='Line_3' data-name='Line 3' x1='6' y1='6' transform='translate(0 5)' fill='none' stroke='%23707070' stroke-width='3'/%3E%3Cline id='Line_4' data-name='Line 4' x1='11' y2='11' transform='translate(4)' fill='none' stroke='%23707070' stroke-width='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\")",
        'play-element-gray': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='291.333' height='347.475' viewBox='0 0 291.333 347.475'%3E%3Cg id='featured-section-element-right' opacity='0.3'%3E%3Cpath id='Path_53' data-name='Path 53' d='M703.844,136.166,462.176,381.111,414.3,268.33,546.913,136.173Z' transform='translate(-414.299 -136.166)' fill='%23ccc'/%3E%3Cpath id='Path_54' data-name='Path 54' d='M656.01,282.9v123.63L413.382,304.005l85.31-86.761Z' transform='translate(-364.677 -59.059)' fill='%23efefef'/%3E%3C/g%3E%3C/svg%3E%0A\")",
        'play-element-color': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='290.333' height='347.475' viewBox='0 0 290.333 347.475'%3E%3Cg id='featured-section-element-right' transform='translate(-1)' opacity='0.3'%3E%3Cpath id='Path_53' data-name='Path 53' d='M703.844,136.166,462.176,381.111,414.3,268.33,546.913,136.173Z' transform='translate(-413.299 -136.166)' fill='%23ffb059'/%3E%3Cpath id='Path_54' data-name='Path 54' d='M656.01,282.9v123.63L413.382,304.005l85.31-86.761Z' transform='translate(-364.677 -59.059)' fill='%233d94ff'/%3E%3C/g%3E%3C/svg%3E%0A\")",
      }
    },
  },
  plugins: [],
}
