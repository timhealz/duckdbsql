import * as React from 'react';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Editor from "@monaco-editor/react";

import TopBar from './TopBar';
import BottomPanel from "./BottomPanel";
import { defaultQuery, DrawerHeader } from '../utils/constants';


export default function QueryEnvironment() {
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
  function handleEditorChange(value: any, event:any) {
    setQuery(value);
  }

  const editorOptions = {
    "scrollBeyondLastLine": false,
  };


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
              <Box>
                  <Editor
                      value={query}
                      onChange={handleEditorChange}
                      language="sql"
                      /*theme="vs-dark"*/
                      height="50vh"
                      options={editorOptions}
                  />
              </Box>
              <BottomPanel query={query} />
            </Stack>
        </Box>
      </Box>
      </ThemeProvider>
  );
}