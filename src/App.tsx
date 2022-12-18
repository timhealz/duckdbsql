import * as React from 'react';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'

import TopBar from './components/TopBar';
import QueryEditor from './components/QueryEditor';
import BottomPanel from "./components/BottomPanel";
import { defaultQuery, DrawerHeader } from './constants'
import { DuckDBProvider } from './lib/DuckDBProvider';


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

  const [query, setQuery] = React.useState(defaultQuery);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
  }

  const dbProvider = new DuckDBProvider();

  return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TopBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Stack
                direction="column"
                justifyContent="space-evenly"
                spacing={1}
            >
                <QueryEditor query={query} handleChange={handleChange} />
                <BottomPanel query={query} dbProvider={dbProvider} />
            </Stack>
        </Box>
      </Box>
      </ThemeProvider>
  );
}