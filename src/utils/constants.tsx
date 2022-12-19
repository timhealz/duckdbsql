import { styled } from '@mui/material/styles';


export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const defaultQuery = `/* Quack */

SELECT
  num
FROM generate_series(1, 100) AS _(num)
;`;