import * as React from 'react'

import Container from '@mui/material/Container'

import { Typography, Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import Swal from 'sweetalert2'

import SessionAccordionSuppliesList from './SessionAccordionSuppliesList'
import useLocalStorage from '../../hooks/useLocalStorage'

import Paper from '@mui/material/Paper'

import {
   getAllSessions,
   createSession,
   deleteSession,
   updateSession,
} from './apiSessions'

import HtmlTooltip from '../../components/HtmlToolTip'

import handelApiData from '../../utils/handelApiRes'

import CreateSessionModal from './CreateSessionModal'
import EditSessionModal from './EditSessionModal'
import AddSupplySessionModal from './AddSupplySessionModal'
import EditSupplySessionModal from './EditSupplySessionModal'

export default function Sessions() {
   const [sessions, setSessions] = useLocalStorage('sessions', [])

   const [openAdd, setOpenAdd] = useLocalStorage(
      'CreateSession_Form_open',
      false
   )

   const [openEdit, setOpenEdit] = useLocalStorage(
      'EditSession_Form_open',
      false
   )

   const [openAddSupply, setOpenAddSupply] = useLocalStorage(
      'AddSupplySession_Form_open',
      false
   )

   const [EditingSession, setEditingSession] = useLocalStorage(
      'EditingSession',
      {}
   )
   const [EditingSupplySession, setEditingSupplySession] = useLocalStorage(
      'EditingSupplySession',
      {}
   )

   const [openSupplyEdit, setOpenSupplyEdit] = useLocalStorage(
      'EditSupplySession_Form_open',
      false
   )

   React.useEffect(() => {
      getAllSessions().then((res) => {
         setSessions(res?.data || [])
      })
   },[])

   const handelAddSession = (name) => {
      createSession(name)
         .then((resData) => {
            setSessions((prevData) => [...prevData, resData.data])
            setOpenAdd(false)

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: false,
               timer: 1500,
            })
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               if (!err?.response?.data) {
                  return Swal.fire({
                     icon: 'error',
                     title: 'خطأ',
                     text: `${err.message}`,
                  })
               }

               return handelApiData(err?.response?.data)
            }

            Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: `${err?.message}`,
            })
         })
   }

   const handelDeleteSession = (id) => {
      deleteSession(id)
         .then((resData) => {
            setSessions((prevData) =>
               prevData.filter((session) => session.id !== id)
            )

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: false,
               timer: 1500,
            })
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               if (!err?.response?.data) {
                  return Swal.fire({
                     icon: 'error',
                     title: 'خطأ',
                     text: `${err.message}`,
                  })
               }
               return handelApiData(err.response.data)
            }

            Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: `${err.message}`,
            })
         })
   }

   const handelAddSupply = (sessionId, supplyId, quantity) => {
      const targetedSession =
         sessions?.find((session) => session.id === sessionId) || {}

      const prevSupplies =
         targetedSession?.Supplies?.map((s) => {
            return { id: s?.id, quantity: s?.SessionSupply?.quantity }
         }) || []

      updateSession(sessionId, {
         supplies: [{ id: supplyId, quantity }, ...prevSupplies],
      })
         .then((resData) => {
            getAllSessions().then((res) => {
               setSessions(res?.data || [])
            })

            setOpenAddSupply(false)

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: false,
               timer: 1500,
            })
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               if (!err?.response?.data) {
                  return Swal.fire({
                     icon: 'error',
                     title: 'خطأ',
                     text: `${err.message}`,
                  })
               }
               return handelApiData(err.response.data)
            }

            Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: `${err.message}`,
            })
         })
   }

   const handelRemoveSupply = (sessionId, supplyId) => {
      const targetedSession =
         sessions?.find((session) => session.id === sessionId) || {}

      let filteredSupplies =
         targetedSession?.Supplies?.filter((s) => s.id !== supplyId) || []
      filteredSupplies = filteredSupplies?.map((s) => {
         return { id: s?.id, quantity: s?.SessionSupply?.quantity }
      })

      updateSession(sessionId, {
         supplies: [...filteredSupplies],
      })
         .then((resData) => {
            getAllSessions().then((res) => {
               setSessions(res?.data || [])
            })

            setOpenAddSupply(false)

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: false,
               timer: 1500,
            })
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               if (!err?.response?.data) {
                  return Swal.fire({
                     icon: 'error',
                     title: 'خطأ',
                     text: `${err.message}`,
                  })
               }
               return handelApiData(err.response.data)
            }

            Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: `${err.message}`,
            })
         })
   }

   const handelEditSessionName = (id, name) => {
      updateSession(id, { name })
         .then((resData) => {
            setSessions((prevData) =>
               prevData.map((session) => {
                  if (session.id === id) {
                     session.name = name
                  }
                  return session
               })
            )

            setOpenEdit(false)

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: false,
               timer: 1500,
            })
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               if (!err?.response?.data) {
                  return Swal.fire({
                     icon: 'error',
                     title: 'خطأ',
                     text: `${err.message}`,
                  })
               }
               return handelApiData(err.response.data)
            }

            Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: `${err.message}`,
            })
         })
   }

   const handelEditSupplyQuantity = (sessionId, supplyId, quantity) => {
      const targetedSession =
         sessions?.find((session) => session.id === sessionId) || {}
      const fixedSupplies =
         targetedSession?.Supplies?.map((s) => {
            if (s?.id === supplyId) {
               s.SessionSupply.quantity = quantity
            }
            return { id: s?.id, quantity: s?.SessionSupply?.quantity }
         }) || []

      updateSession(sessionId, {
         supplies: [...fixedSupplies],
      })
         .then((resData) => {
            getAllSessions().then((res) => {
               setSessions(res?.data || [])
            })

            setOpenSupplyEdit(false)

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: false,
               timer: 1500,
            })
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               if (!err?.response?.data) {
                  return Swal.fire({
                     icon: 'error',
                     title: 'خطأ',
                     text: `${err.message}`,
                  })
               }
               return handelApiData(err.response.data)
            }

            Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: `${err.message}`,
            })
         })
   }

   const toggleEdit = (session) => {
      setEditingSession(session)
      setOpenEdit(true)
   }

   const toggleEditSupply = (session, supply) => {
      setEditingSession(session)
      setEditingSupplySession(supply)

      setOpenSupplyEdit(true)
   }

   const toggleAddSupply = (session) => {
      setEditingSession(session)
      setOpenAddSupply(true)
   }

   return (
      <Container
         variant="main"
         component="main"
         sx={{
            marginTop: '20px',
            paddingBottom: 'calc(10% + 60px)',
         }}
      >
         <CreateSessionModal
            open={openAdd}
            handleClose={() => setOpenAdd(false)}
            handelCreateSession={handelAddSession}
         />

         <EditSessionModal
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            session={EditingSession}
            handelEditSessionName={handelEditSessionName}
         />

         <AddSupplySessionModal
            open={openAddSupply}
            handleClose={() => setOpenAddSupply(false)}
            session={EditingSession}
            handelAddSupply={handelAddSupply}
         />

         <EditSupplySessionModal
            open={openSupplyEdit}
            handleClose={() => setOpenSupplyEdit(false)}
            session={EditingSession}
            supply={EditingSupplySession}
            handelEditSupplyQuantity={handelEditSupplyQuantity}
         />

 

         <Paper sx={{ width: '100%', mb: 2, p: 2 }} elevation={8}>
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
                  width: '100%',
               }}
               onClick={() => setOpenAdd(true)}
            >
               <AddCircle sx={{ mr: 1 }} />
               إضافة
            </Button>
         </HtmlTooltip>
            {sessions?.map((session, index) => (
               <SessionAccordionSuppliesList
                  key={index}
                  session={session}
                  handelDeleteSession={handelDeleteSession}
                  handelRemoveSupply={handelRemoveSupply}
                  toggleEdit={toggleEdit}
                  toggleAddSupply={toggleAddSupply}
                  toggleEditSupply={toggleEditSupply}
               />
            ))}
         </Paper>
      </Container>
   )
}
