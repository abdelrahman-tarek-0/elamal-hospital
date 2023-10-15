import * as React from 'react'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import moment from 'moment'
import 'moment/locale/ar'
import Swal from 'sweetalert2'
import useLocalStorage from '../../hooks/useLocalStorage'

import { getAllBills } from './apiBills'

function Row(props) {
   const { row } = props
   const [open, setOpen] = React.useState(false)

   return (
      <React.Fragment>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell
               component="th"
               scope="row"
               sx={{
                  direction: 'rtl',
                  fontSize: '1.2rem',
               }}
            >
               {row?.id}
            </TableCell>
            <TableCell
               //    align="right"
               sx={{
                  direction: 'rtl',
                  fontSize: '1.2rem',
               }}
            >
               {row?.type}
            </TableCell>
            <TableCell
               align="right"
               sx={{
                  fontSize: '1.1rem',
               }}
            >
               {`${moment(row?.createdAt)
                  .locale('ar')
                  .format('Do MMM YYYY')} ( ${moment(row?.createdAt)
                  .locale('ar')
                  .fromNow()} )`}
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Table size="medium" aria-label="purchases">
                        <TableHead>
                           <TableRow>
                              <TableCell
                                 sx={{
                                    direction: 'rtl',
                                 }}
                              >
                                 الرقم
                              </TableCell>
                              <TableCell
                                 sx={{
                                    direction: 'rtl',
                                 }}
                              >
                                 الأسم
                              </TableCell>

                              <TableCell align="right">سعر الشراء</TableCell>
                              <TableCell align="right">سعر البيع</TableCell>
                              <TableCell align="right">
                                 {row.type === 'مبيعات' ? 'صافي ربح' : 'مدفوع'}
                              </TableCell>
                              {row.type === 'مبيعات' ? (
                                 <TableCell align="right">
                                    سعر كلي بيع
                                 </TableCell>
                              ) : null}
                              <TableCell align="right">الكمية</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {row?.billDetails?.map((supply) => (
                              <TableRow key={supply.supplyId}>
                                 <TableCell component="th" scope="row">
                                    {supply?.supplyId}
                                 </TableCell>
                                 <TableCell>{supply?.supplyName}</TableCell>
                                 <TableCell align="right">
                                    $ {supply?.supplyBuyingPrice}
                                 </TableCell>
                                 <TableCell align="right">
                                    $ {supply?.supplySellingPrice}
                                 </TableCell>
                                 <TableCell
                                    align="right"
                                    sx={{
                                       fontWeight: 'bold',
                                    }}
                                 >
                                    ${' '}
                                    {row.type === 'مبيعات'
                                       ? (supply?.supplySellingPrice -
                                            supply?.supplyBuyingPrice) *
                                         supply?.quantity
                                       : supply?.supplyBuyingPrice *
                                         supply?.quantity}
                                 </TableCell>
                                 {row.type === 'مبيعات' ? (
                                    <TableCell
                                       align="right"
                                       sx={{
                                          fontWeight: 'bold',
                                       }}
                                    >
                                       ${' '}
                                       {supply?.supplySellingPrice *
                                          supply?.quantity}
                                    </TableCell>
                                 ) : null}
                                 <TableCell
                                    align="right"
                                    sx={{
                                       fontWeight: 'bold',
                                    }}
                                 >
                                    {supply?.quantity}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   )
}

function CollapsibleTable({ rows }) {
   return (
      <TableContainer
         component={Paper}
         sx={{
            direction: 'ltr',
         }}
      >
         <Table aria-label="collapsible table">
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell
                     sx={{
                        direction: 'rtl',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                     }}
                  >
                     رقم الفاتورة
                  </TableCell>
                  <TableCell
                     sx={{
                        direction: 'rtl',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                     }}
                  >
                     النوع
                  </TableCell>
                  <TableCell
                     align="right"
                     sx={{
                        direction: 'rtl',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                     }}
                  >
                     تاريخ التحرير
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows?.map((row) => <Row key={row.id} row={row} />) || null}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default function Bills() {
   const [bills, setBills] = useLocalStorage('bills', [])

   React.useEffect(() => {
      getAllBills().then((res) => {
         let resBills = []

         if (res?.data && res?.data?.length > 0) {
            resBills = res?.data.map((bill) => {
               return {
                  ...bill,
                  type: bill?.type === 'bill' ? 'مبيعات' : 'اعادة تعبئة',
               }
            })
         }

         setBills(resBills || [])
         console.log(resBills)
      })
   }, [])
   return (
      <Container
         variant="main"
         component="main"
         sx={{
            marginTop: '20px',
            paddingBottom: 'calc(10% + 60px)',
         }}
      >
         <Paper
            sx={{
               width: '100%',
               mb: 2,
               p: 2,
               fontWeight: 'bold',
               fontSize: '1.5rem',
               color: '#365c00',
            }}
            elevation={8}
         >
            <Typography variant="h4" component="h1" gutterBottom>
               الفواتير
            </Typography>
            <CollapsibleTable rows={bills} />
         </Paper>
      </Container>
   )
}
