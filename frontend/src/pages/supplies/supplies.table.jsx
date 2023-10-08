import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { visuallyHidden } from '@mui/utils'
import useLocalStorage from '../../hooks/useLocalStorage'

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1
   }
   if (b[orderBy] > a[orderBy]) {
      return 1
   }
   return 0
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
   const stabilizedThis = array.map((el, index) => [el, index])
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
         return order
      }
      return a[1] - b[1]
   })
   return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead(props) {
   const { order, orderBy, onRequestSort, headCells } = props
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
   }

   return (
      <TableHead>
         <TableRow>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                     sx={{
                        ':hover': {
                           color: '#365c00',
                        },
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                     }}
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                           {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                        </Box>
                     ) : null}
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   )
}

export default function EnhancedTable({ data, headCells }) {
   const [order, setOrder] = useLocalStorage('EnhancedTable_order', 'asc')
   const [orderBy, setOrderBy] = useLocalStorage(
      'EnhancedTable_orderBy',
      'calories'
   )

   const [page, setPage] = useLocalStorage('EnhancedTable_page', 0)
   const [dense, setDense] = useLocalStorage('EnhancedTable_dense', false)
   const [rowsPerPage, setRowsPerPage] = useLocalStorage(
      'EnhancedTable_rowsPerPage',
      5
   )
   const [isFull, setIsFull] = useLocalStorage(
      'EnhancedTable_rowsPerPage_isFull',
      false
   )

   React.useEffect(() => {
      if (isFull) {
         setRowsPerPage(data.length)
      }
   })

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      if (event.target.value === data.length) {
         setIsFull(true)
      } else {
         setIsFull(false)
      }

      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
   }

   const handleChangeDense = (event) => {
      setDense(event.target.checked)
   }

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

   const visibleRows = React.useMemo(
      () =>
         stableSort(data, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
         ),
      [order, orderBy, page, rowsPerPage,data]
   )



   return (
      <Box sx={{ width: '100%', direction: 'ltr' }}>
         <Paper sx={{ width: '100%', mb: 2 }} elevation={8}>
            <TableContainer>
               <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
               >
                  <EnhancedTableHead
                     order={order}
                     orderBy={orderBy}
                     onRequestSort={handleRequestSort}
                     headCells={headCells}
                  />
                  <TableBody>
                     {visibleRows.map((row, index) => {
                        return (
                           <TableRow
                              hover
                              // onClick={(event) => handleClick(event, row.name)}
                              // role="checkbox"
                              tabIndex={-1}
                              key={`${row.name}-${index}`}
                              // sx={{ cursor: 'pointer' }}
                           >
                              <TableCell>{row.id}</TableCell>
                              <TableCell
                              //  component="th"
                              //  id={labelId}
                              //  scope="row"
                              //  padding="none"
                              >
                                 {row.name}
                              </TableCell>
                              <TableCell>{row.description}</TableCell>
                              <TableCell align="right">{row.stock}</TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                           </TableRow>
                        )
                     })}
                     {emptyRows > 0 && (
                        <TableRow
                           style={{
                              height: (dense ? 33 : 53) * emptyRows,
                           }}
                        >
                           <TableCell colSpan={6} />
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  {
                     label: 'الكل',
                     value: data.length,
                  },
               ]}
               component="div"
               count={data.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
               labelRowsPerPage="الصفوف لكل صفحة"
            />
         </Paper>
         <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="تصغير الحجم"
         />
      </Box>
   )
}
