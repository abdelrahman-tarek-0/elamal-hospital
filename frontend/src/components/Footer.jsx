import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function GuestFooter() {
   return (
      <Paper
         sx={{
            // marginTop: 'calc(10% + 60px)',
            paddingTop: '10px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#200100',
            color: '#98f701',
         }}
         component="footer"
         square
         variant="outlined"
      >
         <Container maxWidth="lg">
            <Box
               sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  mb: 2,
               }}
            >
               <Typography
                  variant="caption"
                  color="initial"
                  sx={{
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     color: 'inherit',
                     textDecoration: 'none',
                     marginLeft: '100px',
                     fontSize: '1rem',
                  }}
               >
                Copyright ©2023. 
                  <Typography
                    variant='a'
                    component='a'
                    target='_blank'
                    href='https://www.facebook.com/abdoWebDev'
                    sx={{
                      fontFamily: 'monospace',
                      textDecoration: 'underline',
                      color: '#fcf6c6',
                    }}
                  >
                    عبدالرحمن
                  </Typography> رقم الهاتف 01551887547
               </Typography>
            </Box>
         </Container>
      </Paper>
   )
}
// 