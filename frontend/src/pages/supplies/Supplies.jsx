import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import useLocalStorage from '../../hooks/useLocalStorage'

function createData(id, name, description, stock, price) {
   return {
      id,
      name,
      description,
      stock,
      price,
   }
}

const rows = [
   createData(55,'حقنةشصيشصيشصي 3 سانتي', 'حقنة وشصيشصيريدي 3 سانتي', 110, 4),
   createData(3,'حقنشصيشصية 3 سانتي', 'حقنة شصي 3 سانتي', 60, 7),
   createData(14,'حقنةشصيشصي 3 سانتي', 'حقنة ششيصشيشي 3 سانتي', 364, 41),
   createData(30,'حقنةشصيشصي 3 سانتي', 'حقنة شششش 3 سانتي', 114, 15),
   createData(35,'حقنةشصيشصيشصييص 3 سانتي', 'حقنة شصي 3 سانتي', 414, 77),
   createData(90,'حقنشصيشصيشصية 3 سانتي', 'حقنة شصيشصي 3 سانتي', 14, 1),

]

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

const headCells = [
   {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'رقم تعريفي',
   },
   {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'الأسم',
   },
   {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'الوصف',
   },
   {
      id: 'stock',
      numeric: true,
      disablePadding: false,
      label: 'الكمية',
   },
   {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'السعر',
   },
]

function EnhancedTableHead(props) {
   const { order, orderBy, onRequestSort } = props
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

export default function EnhancedTable() {
   const [order, setOrder] = useLocalStorage('order', 'asc')
   const [orderBy, setOrderBy] = useLocalStorage('orderBy', 'calories')

   const [page, setPage] = useLocalStorage('page', 0)
   const [dense, setDense] = useLocalStorage('dense', false)
   const [rowsPerPage, setRowsPerPage] = useLocalStorage('rowsPerPage', 5)

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
   }

   const handleChangeDense = (event) => {
      setDense(event.target.checked)
   }

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

   const visibleRows = React.useMemo(
      () =>
         stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
         ),
      [order, orderBy, page, rowsPerPage]
   )

   return (
      <Box sx={{ width: '100%', direction: 'ltr' }}>
         <Paper sx={{ width: '100%', mb: 2 }}>
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
                  />
                  <TableBody>
                     {visibleRows.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                           <TableRow
                              hover
                              // onClick={(event) => handleClick(event, row.name)}
                              // role="checkbox"
                              tabIndex={-1}
                              key={`${row.name}-${index}`}
                              // sx={{ cursor: 'pointer' }}
                           >
                              <TableCell>
                                 {row.id}
                              </TableCell>
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
               rowsPerPageOptions={[5, 10, 25, {
                label: 'الكل',
                value: rows.length,
               }]}
               component="div"
               count={rows.length}
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
