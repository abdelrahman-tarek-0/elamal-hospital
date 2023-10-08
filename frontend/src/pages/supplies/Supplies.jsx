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

function createData(name, description, stock, price) {
   return {
      name,
      description,
      stock,
      price,
   }
}

const rows = [
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),
   createData('حقنة 3شصي سانتي', 'حقنةي', 99, 11),
   createData('حقنة 3 سانتي', 'حقنة وريدي 3 سانتي', 100, 5),

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
      id: 'name',
      numeric: false,
      disablePadding: true,
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
   const [order, setOrder] = React.useState('asc')
   const [orderBy, setOrderBy] = React.useState('calories')
   const [selected, setSelected] = React.useState([])
   const [page, setPage] = React.useState(0)
   const [dense, setDense] = React.useState(false)
   const [rowsPerPage, setRowsPerPage] = React.useState(5)

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const handleClick = (event, name) => {
      console.log('event', name)
      const selectedIndex = selected.indexOf(name)
      let newSelected = []

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, name)
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
         )
      }

      setSelected(newSelected)
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

   const isSelected = (name) => selected.indexOf(name) !== -1

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
                        const isItemSelected = isSelected(row.name)
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                           <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.name)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={`${row.name}-${index}`}
                              selected={isItemSelected}
                              sx={{ cursor: 'pointer' }}
                           >
                              <TableCell
                                 component="th"
                                 id={labelId}
                                 scope="row"
                                 padding="none"
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
               rowsPerPageOptions={[5, 10, 25,rows.length]}
               component="div"
               count={rows.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
         <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
         />
      </Box>
   )
}
