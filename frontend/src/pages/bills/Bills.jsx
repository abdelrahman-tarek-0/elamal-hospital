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
               {row.id}
            </TableCell>
            <TableCell
               //    align="right"
               sx={{
                  direction: 'rtl',
                  fontSize: '1.2rem',
               }}
            >
               {row.type}
            </TableCell>
            <TableCell
               align="right"
               sx={{
                  fontSize: '1.2rem',
               }}
            >
               {row.createdAt}
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     {/* <Typography
                        variant="h6"
                        gutterBottom
                        component="div"
                        sx={{
                           direction: 'rtl',
                        }}
                            
                     >
                        المستلزمات
                     </Typography> */}
                     <Table size="small" aria-label="purchases">
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
                              <TableCell align="right">الكمية</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {row.supplies.map((supply) => (
                              <TableRow key={supply.id}>
                                 <TableCell component="th" scope="row">
                                    {supply?.id}
                                 </TableCell>
                                 <TableCell>{supply?.name}</TableCell>
                                 <TableCell align="right">
                                   $ {supply?.buyingPrice}
                                 </TableCell>
                                 <TableCell align="right">
                                   $ {supply?.sellingPrice}
                                 </TableCell>
                                 <TableCell align="right">
                                    $ {
                                        row.type === 'مبيعات'?
                                        (supply?.sellingPrice - supply?.buyingPrice) * supply?.quantity :
                                        supply?.buyingPrice * supply?.quantity
                                    }
                                 </TableCell>
                                 <TableCell align="right">
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

const rows = [
   {
      id: 1,
      type: 'مبيعات',
      createdAt: '2021-09-19',
      supplies: [
         {
            id: 1,
            name: 'منظف',
            buyingPrice: 10,
            sellingPrice: 15,
            quantity: 5,
         },
         {
            id: 2,
            name: 'منظف',
            buyingPrice: 10,
            sellingPrice: 15,
            quantity: 5,
         },
      ],
   },
   {
    id: 2,
    type: 'اعادة تعبئة',
    createdAt: '2021-09-19',
    supplies: [
       {
          id: 1,
          name: 'منظف',
          buyingPrice: 10,
          sellingPrice: 15,
          quantity: 5,
       },
       {
          id: 2,
          name: 'منظف',
          buyingPrice: 10,
          sellingPrice: 15,
          quantity: 5,
       },
    ],
 },
]

function CollapsibleTable() {
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
               {rows.map((row) => (
                  <Row key={row.name} row={row} />
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default function Bills() {
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
            <CollapsibleTable />
         </Paper>
      </Container>
   )
}
