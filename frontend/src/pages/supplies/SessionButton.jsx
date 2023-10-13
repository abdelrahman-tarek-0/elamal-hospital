import * as React from 'react'

import Button from '@mui/material/Button'
import AdsClickIcon from '@mui/icons-material/AdsClick'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import HtmlTooltip from '../../components/HtmlToolTip'

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
   width: '100%',
}))

function ItemPaper({ supply }) {
   return (
      <Item>
         <Typography
            color="inherit"
            sx={{
               fontSize: '1.2rem',
               fontWeight: 'bold',
            }}
         >
            {supply?.name || ''}
         </Typography>
         <Typography
            color="inherit"
            sx={{
               fontSize: '1.2rem',
               fontWeight: 'bold',
            }}
         >
            كمية الأستخدام: {supply?.SessionSupply?.quantity || 0}
         </Typography>
      </Item>
   )
}

export default function SessionButton({ session,handelCheckSession }) {
   return (
      <HtmlTooltip
         arrow
         title={
            <React.Fragment>
               <Stack direction="column" spacing={2}>
                  {session?.Supplies.length > 0 ? (
                     session?.Supplies?.map((supply) => (
                        <ItemPaper key={supply?.id} supply={supply} />
                     ))
                  ) : (
                     <Item>
                        <Typography
                           color="inherit"
                           sx={{
                              fontSize: '1.2rem',
                              fontWeight: 'bold',
                           }}
                        >
                           لا يوجد مستلزمات في هذه الجلسة
                        </Typography>
                     </Item>
                  )}
               </Stack>
            </React.Fragment>
         }
      >
         <Button
            variant="outlined"
            color="success"
            sx={{
               backgroundColor: '#6AAD01',
               color: '#200100',
               borderRadius: '5px',
               '&:hover': {
                  // backgroundColor: '#200100',
                  backgroundColor: '#3D6300',
               },
               marginBottom: '20px',
               direction: 'ltr',
               width: '100%',

               display: 'flex',
               justifyContent: 'space-between',

            }}
            // onClick={() => setOpenAdd(true)}
            onClick={() => handelCheckSession()}
         >
            <AdsClickIcon sx={{ mr: 1 }} />
            <Typography color="inherit" sx={{ fontSize: '1rem' }}> 
               {session?.name || ''}
            </Typography>
         </Button>
      </HtmlTooltip>
   )
}
