import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      // TODO: update
      main: '#556cd6',
    },
    secondary: {
      // TODO: update
      main: '#19857b',
    },
    error: {
      // TODO: update
      main: red.A400,
    },
    background: {
      // TODO: update
      default: '#fff',
    },
    text: {
      // TODO: update
      secondary: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeightRegular: 'normal',
    allVariants: {
      lineHeight: 1.15,
      WebkitTextSizeAdjust: '100%',
    },
    body1: {
      fontSize: 'inherit',
    },
    body2: {
      fontSize: '16px',
    },
  },
});

export default theme;
