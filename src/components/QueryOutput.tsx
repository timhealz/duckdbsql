import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import * as arrow from 'apache-arrow'

import { StyledTableCell } from './styles'


interface OutputTableProps {
  queryResult: arrow.Table<any> | undefined
}
export default function OutputTable({ queryResult }: OutputTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {queryResult?.schema.fields.map((column) => (
                <StyledTableCell
                  key={column.name}
                  align="left"
                  style={{ minWidth: 170 }}
                >
                  {column.name}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {queryResult?.toArray()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?.rowIndex}>
                    {
                      row?.toArray().map((value, index) => {
                        return (
                          <StyledTableCell
                            key={queryResult.schema.fields[index].toString()}
                            align="left"
                            style={{ minWidth: 170 }}
                          >
                            {value.toString()}
                          </StyledTableCell>
                        );
                      })
                    }
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}