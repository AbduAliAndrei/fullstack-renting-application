import { ThemeOptions } from '@mui/material';
import appColors from "./kaifstoreColors";


// TODO Abdulla put our theme theme
const kaifstoreTheme: ThemeOptions = {
  palette: {
    primary: {
      light: appColors.violetLight,
      main: appColors.violetDark,
      dark: appColors.violetDark,
      contrastText: appColors.white,
    },
    grey: {
      50: appColors.whiteAlmost,
      100: appColors.whiteGray,
      500: appColors.gray,
      700: appColors.grayBackground,
      800: appColors.blackAlmost,
    },
    success: {
      light: appColors.greenDark,
      main: appColors.greenDark,
      dark: appColors.greenDark,
      contrastText: appColors.black,
    },
    error: {
      light: appColors.roseLight,
      main: appColors.roseDark,
    },
  },
  typography: {
    allVariants: {
      letterSpacing: 'normal',
    },
    fontFamily: ['Coolvetica', 'sans-serif'].join(','),
    h1: {
      fontWeight: 'bold',
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: appColors.white,
      letterSpacing: '0.2rem',
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '2.25rem',
      lineHeight: 1.3,
      color: appColors.white,
    },
    h3: {
      fontWeight: 'normal',
      fontSize: '1.875rem',
      lineHeight: 1.5,
      color: appColors.white,
    },
    h4: {
      fontWeight: 'normal',
      fontSize: '1.5rem',
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 'normal',
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 'bold',
      fontSize: '0.874rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 'normal',
      fontSize: '0.5rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh',
          color: appColors.white,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: ['Coolvetica', 'sans-serif'].join(','),
        },
      },
    },
  },
};

export default kaifstoreTheme;
