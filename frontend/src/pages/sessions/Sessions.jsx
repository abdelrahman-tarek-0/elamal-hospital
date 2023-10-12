import * as React from 'react'

import Container from '@mui/material/Container'

import { Box,Typography,Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import SessionAccordionSuppliesList from './SessionAccordionSuppliesList'
import useLocalStorage from '../../hooks/useLocalStorage'
import { getAllSessions } from './apiSessions'
import HtmlTooltip from '../../components/HtmlToolTip'

export default function Sessions() {
   const [sessions, setSessions] = useLocalStorage('sessions', [])

   React.useEffect(() => {
      getAllSessions().then((res) => {
         setSessions(res?.data || [])
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
                     اضافة جلسة جديد
                  </Typography>
                  {'سيتم اضافة جلسة جديدة للأستخدام'}
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
                  marginBottom: '20px',
                  direction: 'ltr',
               }}
               // onClick={handleOpenAdd}
            >
               <AddCircle sx={{ mr: 1 }} />
               إضافة
            </Button>
         </HtmlTooltip>
         {sessions.map((session, index) => (
            <SessionAccordionSuppliesList key={index} session={session} />
         ))}
      </Container>
   )
}

