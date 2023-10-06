import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function GuestFooter() {
   return (
      <Paper
         sx={{
   
            paddingTop: '10px',
            width: '100%',
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
                  تمت البرمجة من قبل <Typography
                    variant='a'
                    component='a'
                    href='https://www.facebook.com/abdoWebDev'
                    sx={{
                      fontFamily: 'monospace',
                      textDecoration: 'none',
                      textDecoration: 'underline',
                      color: '#fcf6c6',
                    }}
                  >
                    عبدالرحمن
                  </Typography> رقم الهاتف للتواصل 01551887547
               </Typography>
            </Box>
         </Container>
      </Paper>
   )
}
// 