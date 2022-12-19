import { createTheme, ThemeOptions, styled } from '@mui/material/styles';


export const theme: ThemeOptions = createTheme({
  palette: {
      primary: {
      main: '#000000',
      },
      secondary: {
      main: '#fff100',
      },
      background: {
      default: '#ebebeb',
      },
      action: {
      hover: '#fff100',
      },
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
