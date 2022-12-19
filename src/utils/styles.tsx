import { createTheme, ThemeOptions } from '@mui/material/styles';

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