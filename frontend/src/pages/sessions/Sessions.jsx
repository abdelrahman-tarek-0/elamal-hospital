import * as React from 'react'

import Container from '@mui/material/Container'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
   Box,
   Button,
   CardActionArea,
   CardActions,
   Collapse,
   Divider,
   IconButton,
   Chip,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import HtmlTooltip from '../../components/HtmlToolTip'


import { Delete, Edit, AddCircle } from '@mui/icons-material'

function MultiActionAreaCard({ sessionName }) {
   return (
      <>
         <Accordion elevation={5}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography component="h4" variant="h4">
                  جلسة رقم 1
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
                  <ListItem>
                     <Card sx={{ width: '100%' }} elevation={3}>
                        <CardContent
                           sx={{
                              textAlign: 'right',
                           }}
                        >
                           <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                 marginTop: '10px',
                                 marginBottom: '10px',
                                 // light border bottom under the text only not the hole card
                                 // borderBottom: '1px solid #ccc',
                                 // width: 'fit-content',
                              }}
                           >
                              مستلزم امبول 1 سانتي
                           </Typography>

                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'row',
                                 alignItems: 'flex-start',
                              }}
                           >
                              <Typography
                                 variant="body2"
                                 sx={{
                                    marginLeft: '10px',
                                    fontWeight: 'bold',
                                 }}
                              >
                                 كمية الأستخدام : 10
                              </Typography>
                              <Typography
                                 variant="body2"
                                 sx={{
                                    marginLeft: '10px',
                                 }}
                              >
                                 سعر الشراء : $10
                              </Typography>
                              <Typography
                                 variant="body2"
                                 sx={{
                                    marginLeft: '10px',
                                 }}
                              >
                                 سعر البيع : $20
                              </Typography>
                              <Typography variant="body2">
                                 الكمية في المخزن : 100
                              </Typography>
                           </Box>

                           <Typography variant="body2">
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
                              مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم
                              امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم امبول 1
                              سانتي مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي
                              مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم
                              امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم امبول 1
                              سانتي مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي
                              مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم
                              امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم امبول 1
                              سانتي مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي
                              مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم
                              امبول 1 سانتي مستلزم امبول 1 سانتي مستلزم امبول 1
                              سانتي مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي
                              مستلزم امبول 1 سانتي مستلزم امبول 1 سانتي
                           </Typography>
                        </CardContent>
                        <CardActions>
                           <HtmlTooltip
                              arrow
                              // placement="right"
                              title={
                                 <React.Fragment>
                                    {`تعديل بيانات`}
                                 </React.Fragment>
                              }
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
                              />
                           </HtmlTooltip>
                        </CardActions>
                     </Card>
                  </ListItem>
                  <ListItem>
                     <Card sx={{ minWidth: 275 }} elevation={3}>
                        <CardContent>
                           <Typography variant="h5" component="div">
                              مستلزم امبول 1 سانتي
                           </Typography>

                           <Typography variant="body2">
                              كمية الأستخدام : 10
                           </Typography>
                        </CardContent>
                        <CardActions>
                           <HtmlTooltip
                              arrow
                              // placement="right"
                              title={
                                 <React.Fragment>
                                    {`تعديل بيانات`}
                                 </React.Fragment>
                              }
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
                              />
                           </HtmlTooltip>
                        </CardActions>
                     </Card>
                  </ListItem>
                  <ListItem>
                     <Card sx={{ minWidth: 275 }} elevation={3}>
                        <CardContent>
                           <Typography variant="h5" component="div">
                              مستلزم امبول 1 سانتي
                           </Typography>

                           <Typography variant="body2">
                              كمية الأستخدام : 10
                           </Typography>
                        </CardContent>
                        <CardActions>
                           <HtmlTooltip
                              arrow
                              // placement="right"
                              title={
                                 <React.Fragment>
                                    {`تعديل بيانات`}
                                 </React.Fragment>
                              }
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
                              />
                           </HtmlTooltip>
                        </CardActions>
                     </Card>
                  </ListItem>
                  <ListItem>
                     <Card sx={{ minWidth: 275 }} elevation={3}>
                        <CardContent>
                           <Typography variant="h5" component="div">
                              مستلزم امبول 1 سانتي
                           </Typography>

                           <Typography variant="body2">
                              كمية الأستخدام : 10
                           </Typography>
                        </CardContent>
                        <CardActions>
                           <HtmlTooltip
                              arrow
                              // placement="right"
                              title={
                                 <React.Fragment>
                                    {`تعديل بيانات`}
                                 </React.Fragment>
                              }
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
                              />
                           </HtmlTooltip>
                        </CardActions>
                     </Card>
                  </ListItem>
                  <ListItem>
                     <Card sx={{ minWidth: 275 }} elevation={3}>
                        <CardContent>
                           <Typography variant="h5" component="div">
                              مستلزم امبول 1 سانتي
                           </Typography>

                           <Typography variant="body2">
                              كمية الأستخدام : 10
                           </Typography>
                        </CardContent>
                        <CardActions>
                           <HtmlTooltip
                              arrow
                              // placement="right"
                              title={
                                 <React.Fragment>
                                    {`تعديل بيانات`}
                                 </React.Fragment>
                              }
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
                              />
                           </HtmlTooltip>
                        </CardActions>
                     </Card>
                  </ListItem>
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
         <Accordion>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel2a-content"
               id="panel2a-header"
            >
               <Typography>جلسة رقم 122</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <List>
                  <ListItem>
                     <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                     <ListItemText primary="Work" secondary="Jan 7, 2014" />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary="Vacation"
                        secondary="July 20, 2014"
                     />
                  </ListItem>
               </List>
            </AccordionDetails>
         </Accordion>
      </>
   )
}

export default function Sessions() {
   return (
      <Container
         variant="main"
         component="main"
         sx={{
            marginTop: '20px',
            paddingBottom: 'calc(10% + 60px)',
         }}
      >
         <Box
            sx={
               {
                  // display: 'flex',
                  // flexWrap: 'wrap',
                  // justifyContent: 'space-around',
               }
            }
         >
            <MultiActionAreaCard sessionName="جلسة رقم 20" />
         </Box>
      </Container>
   )
}
