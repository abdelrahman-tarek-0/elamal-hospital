import * as React from 'react'

import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import HtmlTooltip from '../../components/HtmlToolTip'

import { AddCircle } from '@mui/icons-material'

import SessionSupplyCard from './SessionSupplyCard'
import { Delete, Edit } from '@mui/icons-material'

import Swal from 'sweetalert2'
import EditSessionModal from './EditSessionModal'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function SessionAccordionSuppliesList({
   session,
   handelDeleteSession,
   toggleEdit
}) {


   const handelDelete = (name, id) => {
      Swal.fire({
         title: `هل أنت متأكد من حذف '${name}' ؟`,
         text: 'لن تتمكن من التراجع عن هذا الإجراء!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'نعم، احذفها!',
         cancelButtonText: 'لا، ألغِ الأمر',
      }).then((result) => {
         if (!result?.isConfirmed) return

         handelDeleteSession(id)
      })
   }

   return (
      <>
         <Accordion
            elevation={5}
            sx={{
               color: '#365c00',
            }}
         >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography component="h4" variant="h4">
                  {session?.name || ''}
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <List
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                  }}
               >
                  {session?.Supplies?.map((supply) => (
                     <ListItem key={supply.id}>
                        <SessionSupplyCard supply={supply} />
                     </ListItem>
                  ))}
               </List>

               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
               >
                  <HtmlTooltip
                     arrow
                     // placement="right"
                     title={<React.Fragment>{`إضافة مستلزمات`}</React.Fragment>}
                  >
                     <AddCircle
                        color="success"
                        sx={{
                           cursor: 'pointer',
                           fontSize: '3rem',
                           marginLeft: '10px',
                        }}
                     />
                  </HtmlTooltip>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'flex-start',
                  }}
               >
                  <HtmlTooltip
                     arrow
                     // placement="right"
                     title={
                        <React.Fragment>{`تعديل اسم الجلسة`}</React.Fragment>
                     }
                  >
                     <Edit
                        color="success"
                        sx={{
                           cursor: 'pointer',
                           marginLeft: '10px',
                        }}
                        onClick={() => {
                           toggleEdit(session)
                        }}
                     />
                  </HtmlTooltip>
                  <HtmlTooltip
                     arrow
                     // placement="right"
                     title={<React.Fragment>{`حذف الجلسة`}</React.Fragment>}
                  >
                     <Delete
                        color="error"
                        sx={{
                           cursor: 'pointer',
                           marginLeft: '10px',
                        }}
                        onClick={() => handelDelete(session?.name, session?.id)}
                     />
                  </HtmlTooltip>
               </Box>
            </AccordionDetails>
         </Accordion>
      </>
   )
}
