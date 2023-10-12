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

export default function SessionAccordionSuppliesList({ session }) {
   return (
      <Accordion elevation={5}>
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
               {session.Supplies.map((supply) => (
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
         </AccordionDetails>
      </Accordion>
   )
}
