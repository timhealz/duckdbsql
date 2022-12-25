import React from 'react';
import * as ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { DUCKDB_YELLOW } from './utils/styles';
import { ColorModeContext } from './components/ColorModeContext';
import QueryEnvironment from './components/QueryEnvironment';
import reportWebVitals from './reportWebVitals';


function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }), [],
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
            primary: {
                main: "#000000",
            },
            secondary: {
                main: DUCKDB_YELLOW,
            },
            error: {
                main: "#d32f2f",
            },
            action: {
                hover: DUCKDB_YELLOW,
            },
            },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryEnvironment />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

const element = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    element
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
