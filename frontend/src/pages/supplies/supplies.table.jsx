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
import { visuallyHidden } from '@mui/utils'
import useLocalStorage from '../../hooks/useLocalStorage'
import {
   Button,
   Divider,
   Stack,
   TextField,
   Typography,
   Autocomplete,
} from '@mui/material'
import Swal from 'sweetalert2'

import { AddCircle, Delete, Edit } from '@mui/icons-material'

import HtmlTooltip from '../../components/HtmlToolTip'

import AddNewSupplyModal from './AddNewSupplyModal'
import EditSupplyModal from './EditSupplyModal'


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

   console.log(stabilizedThis)

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
                  <HtmlTooltip
                     arrow
                     placement="top"
                     title={
                        <React.Fragment>
                           {`ترتيب حسب ${headCell.label}`}
                        </React.Fragment>
                     }
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
                  </HtmlTooltip>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   )
}

export default function EnhancedTable({
   data,
   headCells,
   toggleMaxWidth,
   handelAddSupply,
   handelDeleteSupply,
   handelChangeSupplyStock,
   openAdd,
   setOpenAdd,
   openEdit,
   setOpenEdit,
   handelEditSupply
}) {
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

   const [editRow, setEditRow] = useLocalStorage('EditSupplyForm_supply', {})

   const handleOpenAdd = () => setOpenAdd(true)
   const handleCloseAdd = () => setOpenAdd(false)

   const handleOpenEdit = () => setOpenEdit(true)
   const handleCloseEdit = () => setOpenEdit(false)

   const [searchData, setSearchData] = React.useState([])

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
      if (event.target.value === (data?.length || 0)) {
         setIsFull(true)
      } else {
         setIsFull(false)
      }

      setRowsPerPage(parseInt(event?.target?.value || '0' ,10))
      setPage(0)
   }

   const handleChangeDense = (event) => {
      toggleMaxWidth(event.target.checked)
      setDense(event.target.checked)
   }

   const handelDelete = (name, id) => {
      Swal.fire({
         title: `هل أنت متأكد من حذف '${name}' رقم ${id} ؟`,
         text: 'لن تتمكن من التراجع عن هذا الإجراء!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'نعم، احذفها!',
         cancelButtonText: 'لا، ألغِ الأمر',
      }).then((result) => {
         if (!result?.isConfirmed) return

         if (searchData.find((supply) => supply.id === id) !== undefined)
            setSearchData([])

         handelDeleteSupply(id)
      })
   }

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

   const visibleRows = React.useMemo(
      () =>
         stableSort(
            searchData.length ? searchData : data,
            getComparator(order, orderBy)
         ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [order, orderBy, page, rowsPerPage, data, searchData]
   )

   return (
      <Box sx={{ width: '100%', direction: 'ltr' }}>
         <AddNewSupplyModal
            open={openAdd}
            handleClose={handleCloseAdd}
            handelAddSupply={handelAddSupply}
         />
         <EditSupplyModal
            open={openEdit}
            handleClose={handleCloseEdit}
            handelChangeSupplyStock={handelChangeSupplyStock}
            supply={editRow}
            handelEditSupply={handelEditSupply}
         />

         <Paper sx={{ width: '100%', mb: 2, p: 2 }} elevation={8}>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 10px',
                  mb: 2,
                  flexDirection: 'row-reverse',
               }}
            >
               <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                     fontWeight: 'bold',
                     fontSize: '1.5rem',
                     color: '#365c00',
                  }}
               >
                  المستلزمات
               </Typography>
               <Stack direction="row" spacing={2}>
                  <Autocomplete
                     disablePortal
                     id="combo-box-demo"
                     options={data}
                     getOptionLabel={(option) =>
                        `${option.name} (${option.id})`
                     }
                     sx={{
                        width: '300px',
                     }}
                     renderInput={(params) => (
                        <TextField {...params} label="بحث" variant="outlined" />
                     )}
                     onChange={(event, value) => {
                        if (value) {
                           setSearchData([value])
                        } else {
                           setSearchData([])
                        }
                     }}
                  />
                  <HtmlTooltip
                     arrow
                     title={
                        <React.Fragment>
                           <Typography
                              color="inherit"
                              sx={{
                                 fontSize: '1.2rem',
                                 fontWeight: 'bold',
                              }}
                           >
                              اضافة مستلزم جديد
                           </Typography>
                           {'سيتم اضافة مستلزم جديد في المستودع'}
                        </React.Fragment>
                     }
                  >
                     <Button
                        variant="contained"
                        sx={{
                           backgroundColor: '#6AAD01',
                           // color: '#200100',
                           borderRadius: '5px',
                           '&:hover': {
                              // backgroundColor: '#200100',
                              backgroundColor: '#3D6300',
                           },
                        }}
                        onClick={handleOpenAdd}
                     >
                        <AddCircle sx={{ mr: 1 }} />
                        إضافة
                     </Button>
                  </HtmlTooltip>
               </Stack>
            </Box>
            <Divider />

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
                              <TableCell sx={{ fontSize: '1.5em' }}>
                                 {row.id}
                              </TableCell>
                              <TableCell
                                 //  component="th"
                                 //  id={labelId}
                                 //  scope="row"
                                 //  padding="none"
                                 sx={{ fontSize: '1.5em' }}
                              >
                                 {row.name}
                              </TableCell>
                              <TableCell sx={{ fontSize: '1em' }}>
                                 {row.description}
                              </TableCell>
                              <TableCell align="right" sx={{ fontSize: '1em' }}>
                                 {row.stock}
                              </TableCell>

                              <TableCell
                                 align="right"
                                 sx={{ fontSize: '1.5em' }}
                              >
                                 $ {row.sellingPrice}
                              </TableCell>

                              <TableCell>
                                 <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                       justifyContent: 'right',
                                    }}
                                 >
                                    <HtmlTooltip
                                       arrow
                                       title={
                                          <React.Fragment>
                                             {`تعديل بيانات ${row.name} ${row.id}`}
                                          </React.Fragment>
                                       }
                                    >
                                       <Edit
                                          color="success"
                                          sx={{
                                             cursor: 'pointer',
                                             fontSize: '1rem',
                                          }}
                                          onClick={() => {
                                             setEditRow(row)
                                             handleOpenEdit()
                                          }}
                                       />
                                    </HtmlTooltip>

                                    <HtmlTooltip
                                       arrow
                                       placement="right"
                                       title={
                                          <React.Fragment>
                                             {`حذف ${row.name} ${row.id}`}
                                          </React.Fragment>
                                       }
                                    >
                                       <Delete
                                          color="error"
                                          sx={{
                                             cursor: 'pointer',
                                             fontSize: '1rem',
                                          }}
                                          onClick={() =>
                                             handelDelete(row.name, row.id)
                                          }
                                       />
                                    </HtmlTooltip>
                                 </Stack>
                              </TableCell>
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
                     value: (data?.length || 0),
                  },
               ]}
               component="div"
               count={(data?.length || 0)}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
               labelRowsPerPage="الصفوف لكل صفحة"
            />
         </Paper>
         {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="تصغير الحجم"
         /> */}
      </Box>
   )
}
