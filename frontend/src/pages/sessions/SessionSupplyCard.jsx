import * as React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'
import { Box, CardActions, Divider, Chip } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import HtmlTooltip from '../../components/HtmlToolTip'

export default function SessionSupplyCard({ supply, handelRemoveSupply }) {
   return (
      <Card sx={{ width: '100%' }} elevation={3}>
         <CardContent
            sx={{
               textAlign: 'right',
            }}
         >
            <Box
               sx={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
               }}
            >
               <Typography variant="h5" component="div">
                  {supply?.name || ''}
               </Typography>
               <CardActions>
                  <HtmlTooltip
                     arrow
                     // placement="right"
                     title={<React.Fragment>{`تعديل بيانات`}</React.Fragment>}
                  >
                     <Edit
                        color="success"
                        sx={{
                           cursor: 'pointer',
                           fontSize: '1rem',
                           marginLeft: '10px',
                        }}
                     />
                  </HtmlTooltip>

                  <HtmlTooltip
                     arrow
                     // placement="left"
                     title={<React.Fragment>{`حذف`}</React.Fragment>}
                  >
                     <Delete
                        color="error"
                        sx={{
                           cursor: 'pointer',
                           fontSize: '1rem',
                        }}
                        onClick={() => {
                           handelRemoveSupply(supply)
                        }}
                     />
                  </HtmlTooltip>
               </CardActions>
            </Box>

            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
               }}
            >
               <Typography
                  component={'span'}
                  variant={'body2'}
                  sx={{
                     marginLeft: '10px',
                     fontWeight: 'bold',
                  }}
               >
                  كمية الأستخدام : {supply?.SessionSupply?.quantity ?? ''}
               </Typography>
               <Typography
                  component={'span'}
                  variant={'body2'}
                  sx={{
                     marginLeft: '10px',
                  }}
               >
                  سعر الشراء : ${supply?.buyingPrice ?? ''}
               </Typography>
               <Typography
                  component={'span'}
                  variant={'body2'}
                  sx={{
                     marginLeft: '10px',
                  }}
               >
                  سعر البيع : $20
               </Typography>
               <Typography component={'span'} variant={'body2'}>
                  الكمية في المخزن : {supply.stock}
               </Typography>
            </Box>

            <Typography component={'span'} variant={'body2'}>
               {supply?.description ? (
                  <Divider
                     sx={{
                        marginTop: '10px',
                        marginBottom: '10px',
                     }}
                  >
                     <Chip
                        label="وصف"
                        // sx={{
                        //    fontSize: '1.2rem',
                        // }}
                     ></Chip>
                  </Divider>
               ) : (
                  ''
               )}
               {supply?.description ?? ''}
            </Typography>
         </CardContent>
      </Card>
   )
}
