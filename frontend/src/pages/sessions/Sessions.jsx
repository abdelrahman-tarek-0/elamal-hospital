import * as React from 'react'

import Container from '@mui/material/Container'

import { Box } from '@mui/material'

import SessionAccordionSuppliesList from './SessionAccordionSuppliesList'
import useLocalStorage from '../../hooks/useLocalStorage'
import { getAllSessions } from './apiSessions'

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
         
        {
            sessions.map((session, index) => (
               <SessionAccordionSuppliesList key={index} session={session} />
            ))
        }
      </Container>
   )
}

// export default function Sessions() {
//    return (
//       <Container
//          variant="main"
//          component="main"
//          sx={{
//             marginTop: '20px',
//             paddingBottom: 'calc(10% + 60px)',
//          }}
//       >
//          <Box>
//             <MultiActionAreaCard />
//          </Box>
//       </Container>
//    )
// }
