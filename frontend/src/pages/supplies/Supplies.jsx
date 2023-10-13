import * as React from 'react'

import { Container, Box, Typography, Button } from '@mui/material'
import EnhancedTable from './supplies.table'
import useLocalStorage from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'

import {
   getAllSupplies,
   addSupply,
   deleteSupply,
   updateSupply,
   changeSupplyStock,
} from './apiSupplies'
import { getAllSessions } from '../sessions/apiSessions'

import handelApiData from '../../utils/handelApiRes'
import HtmlTooltip from '../../components/HtmlToolTip'

import { AddCircle } from '@mui/icons-material'
import SessionButton from './SessionButton'

const headCells = [
   {
      id: 'id',
      numeric: false,
      disablePadding: false,
      label: 'رقم تعريفي',
   },
   {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'الأسم',
   },
   {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'الوصف',
   },
   {
      id: 'stock',
      numeric: true,
      disablePadding: false,
      label: 'الكمية',
   },
   {
      id: 'sellingPrice',
      numeric: true,
      disablePadding: false,
      label: 'السعر',
   },
   {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'العمليات',
   },
]

export default function Supplies() {
   // const [maxWidth, setMaxWidth] = useLocalStorage(
   //    'EnhancedTable_maxWidth',
   //    undefined
   // )
   const [data, setData] = useLocalStorage('supplies', [])
   const [sessions, setSessions] = useLocalStorage('sessionsSuppliesPage', [])

   const [openAdd, setOpenAdd] = useLocalStorage('AddSupplyForm_open', false)
   const [openEdit, setOpenEdit] = useLocalStorage('EditSupplyForm_open', false)
   const [openCollapseEdit, setOpenCollapseEdit] = useLocalStorage(
      'EditSupplyModal_collapse_edit',
      false
   )

   const handelAddSupply = (newSupply) => {
      addSupply(newSupply)
         .then((resData) => {
            setData((prevData) => [...prevData, resData.data])
            setOpenAdd(false)

            Swal.fire({
               icon: 'success',
               title: 'تمت الإضافة بنجاح',
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

   const handelDeleteSupply = (id) => {
      deleteSupply(id)
         .then((resData) => {
            setData((prevData) => prevData.filter((supply) => supply.id !== id))

            Swal.fire({
               icon: 'success',
               title: 'تمت الحذف بنجاح',
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

   const handelChangeSupplyStock = (id, change) => {
      changeSupplyStock(id, change)
         .then((resData) => {
            setData((prevData) =>
               prevData.map((supply) => {
                  if (supply.id === resData?.data?.id) {
                     return {
                        ...supply,
                        stock: resData?.data?.stock,
                     }
                  }
                  return supply
               })
            )
            setOpenEdit(false)

            Swal.fire({
               icon: 'success',
               title: resData?.message,
               showConfirmButton: true,
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

   const handelEditSupply = (id, newData) => {
      updateSupply(id, newData)
         .then((resData) => {
            setData((prevData) =>
               prevData.map((supply) => {
                  if (supply.id === resData?.data?.id) {
                     return {
                        ...supply,
                        name: resData?.data?.name,
                        description: resData?.data?.description,
                        buyingPrice: resData?.data?.buyingPrice,
                        sellingPrice: resData?.data?.sellingPrice,
                     }
                  }
                  return supply
               })
            )
            setOpenEdit(false)
            setOpenCollapseEdit(false)

            Swal.fire({
               icon: 'success',
               title: 'تمت التعديل بنجاح',
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

   React.useEffect(() => {
      getAllSupplies()
         .then((resData) => {
            setData(handelApiData(resData)?.data || [])
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

      getAllSessions()
         .then((resData) => {
            setSessions(handelApiData(resData)?.data || [])
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
   }, [])

   // const toggleMaxWidth = (isChecked) => {
   //    if (isChecked) {
   //       setMaxWidth(undefined)
   //    } else {
   //       setMaxWidth('100%')
   //    }
   // }

   return (
      <Container
         variant="div"
         component="div"
         sx={{
            minWidth: '100%',
            maxWidth: '100%',
            width: '100%',

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',

            marginTop: '30px',
            paddingBottom: 'calc(10% + 60px)',
         }}
      >
         <Box
            sx={{
               width: '15%',
               height: '100%',
               minHeight: '100%',
            }}
         >
            <Typography
               variant="h5"
               component="h5"
               sx={{
                  fontWeight: 'bold',
                  marginBottom: '20px',
               }}
            >
               الجلسات
            </Typography>

            {sessions?.map((session) => (
               <SessionButton key={session?.id} session={session} />
            ))}

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
                  variant="outlined"
                  color="success"
                  sx={{
                     // backgroundColor: '#6AAD01',
                     // color: '#200100',
                     borderRadius: '5px',
                     '&:hover': {
                        // backgroundColor: '#200100',
                        // backgroundColor: '#3D6300',
                     },
                     marginBottom: '20px',
                     direction: 'ltr',
                     width: '100%',
                  }}
                  onClick={() => setOpenAdd(true)}
               >
                  <AddCircle sx={{ mr: 1 }} />
                  انشاء فاتورة سريعة
               </Button>
            </HtmlTooltip>
         </Box>
         <Container
            variant="main"
            component="main"
            sx={{
               width: '85% !important',
               minWidth: '85% !important',
               height: '100%',
               minHeight: '100%',
            }}
         >
            <EnhancedTable
               data={data}
               headCells={headCells}
               // toggleMaxWidth={toggleMaxWidth}
               handelAddSupply={handelAddSupply}
               handelDeleteSupply={handelDeleteSupply}
               handelChangeSupplyStock={handelChangeSupplyStock}
               openAdd={openAdd}
               setOpenAdd={setOpenAdd}
               openEdit={openEdit}
               setOpenEdit={setOpenEdit}
               handelEditSupply={handelEditSupply}
               openCollapseEdit={openCollapseEdit}
               setOpenCollapseEdit={setOpenCollapseEdit}
            />
         </Container>
      </Container>
   )
}
