import {createTheme, ThemeOptions} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';

import TopBar from './components/TopBar';

import QueryEnvironment from './components/QueryEnvironment';


export default function App() {
  const theme: ThemeOptions = createTheme({
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

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar />
            <QueryEnvironment />
        </Box>
        </ThemeProvider>
    );
}