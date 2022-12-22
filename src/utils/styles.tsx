import { createTheme, ThemeOptions, styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


const DUCKDB_YELLOW: string = "#fff100"

export const theme: ThemeOptions = createTheme({
  palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: DUCKDB_YELLOW,
      },
      error: {
        main: "#d32f2f",
      },
      background: {
        default: "#ebebeb",
      },
      action: {
        hover: DUCKDB_YELLOW,
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));