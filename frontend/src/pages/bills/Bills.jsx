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
                     <Paper
                        elevation={4}
                        sx={{
                           width: '100%',
                           mb: 2,
                           p: 2,
                        }}
                     >
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
                                    {row.type === 'مبيعات'
                                       ? 'صافي ربح'
                                       : 'مدفوع'}
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
                                 <TableRow key={supply.supplyId} sx={{
                                   
                                    backgroundColor: row?.billDetails?.length === 1 ? '#EEEEEE' : null,
                             
                                 }}>
                                    <TableCell component="th" scope="row">
                                       {supply?.supplyId}
                                    </TableCell>
                                    <TableCell
                                       sx={{
                                          direction: 'rtl',
                                          fontSize: row?.billDetails?.length === 1 ? '1.2rem' : null,
                                       }}
                                    >
                                       {supply?.supplyName}
                                    </TableCell>
                                    <TableCell align="right">
                                       $ {supply?.supplyBuyingPrice}
                                    </TableCell>
                                    <TableCell align="right">
                                       $ {supply?.supplySellingPrice}
                                    </TableCell>
                                    <TableCell
                                       align="right"
                                       sx={{
                                          fontWeight: row?.billDetails?.length === 1 ? 'bold' : null,
                                          fontSize: row?.billDetails?.length === 1 ? '1.2rem' : null,
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
                                             fontWeight: row?.billDetails?.length === 1 ? 'bold' : null,
                                             fontSize: row?.billDetails?.length ===1 ? '1.2rem' : null,
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
                                          fontWeight: row?.billDetails?.length === 1 ? 'bold' : null,
                                          fontSize: row?.billDetails?.length ===1 ? '1.2rem' : null,
                                       }}
                                    >
                                       {supply?.quantity}
                                    </TableCell>
                                 </TableRow>
                              ))}

                              {row.type === 'مبيعات' &&
                              row?.billDetails?.length > 1 ? (
                                 <TableRow
                                    sx={{
                                    
                                       mt: 2,
                                      backgroundColor: '#EEEEEE',
                                    }}
                                 >
                                    <TableCell
                                       component="th"
                                       scope="row"
                                       sx={{
                                          // fontSize: '1.2rem',
                                          color: '#B1B3B9', 
                                       }}
                                    >
                                       {/* الكل */}
                                    </TableCell>
                                    <TableCell
                                       sx={{
                                          direction: 'rtl',
                                          fontSize: '1.2rem',
                                       }}
                                       
                                    >
                                       المجموع
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell
                                       align="right"
                                       sx={{
                                          fontWeight: 'bold',
                                         fontSize: '1.2rem',
                                       }}
                                    >
                                       $ {row?.totalProfit}
                                    </TableCell>

                                    <TableCell
                                       align="right"
                                       sx={{
                                          fontWeight: 'bold',
                                          fontSize: '1.2rem',
                                       }}
                                    >
                                       $ {row?.totalSell}
                                    </TableCell>

                                    <TableCell
                                       align="right"
                                       sx={{
                                          fontWeight: 'bold',
                                          fontSize: '1.2rem',
                                       }}
                                    >
                                       {row?.totalSupply}
                                    </TableCell>
                                 </TableRow>
                              ) : null}
                           </TableBody>
                        </Table>
                     </Paper>
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
               let totalProfit = 0
               let totalSell = 0
               let totalSupply = 0

               bill?.billDetails?.forEach((supply) => {
                  if (bill?.type === 'bill') {
                     totalProfit =
                        totalProfit +
                        (supply?.supplySellingPrice -
                           supply?.supplyBuyingPrice) *
                           supply?.quantity

                     totalSell =
                        totalSell +
                        supply?.supplySellingPrice * supply?.quantity
                     totalSupply = totalSupply + supply?.quantity
                  }
               })
               return {
                  ...bill,
                  type: bill?.type === 'bill' ? 'مبيعات' : 'اعادة تعبئة',
                  totalProfit: bill?.type === 'bill' ? totalProfit : undefined,
                  totalSell: bill?.type === 'bill' ? totalSell : undefined,
                  totalSupply: bill?.type === 'bill' ? totalSupply : undefined,
               }
            })
         }

         setBills(resBills || [])
      })
   },[])
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
            }}
            elevation={8}
         >
            <Typography
               variant="h4"
               component="h1"
               gutterBottom
               sx={{
                  fontWeight: 'bold',
                  //   fontSize: '1.5rem',
                  color: '#365c00',
               }}
            >
               الفواتير
            </Typography>
            <CollapsibleTable rows={bills} />
         </Paper>
      </Container>
   )
}
