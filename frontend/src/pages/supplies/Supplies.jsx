import * as React from 'react'

import Container from '@mui/material/Container'
import EnhancedTable from './supplies.table'
import useLocalStorage from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'
import { getAllSupplies,addSupply,deleteSupply } from '../../utils/apiSupplies'
import handelApiData from '../../utils/handelApiRes'


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
   const [maxWidth, setMaxWidth] = useLocalStorage(
      'EnhancedTable_maxWidth',
      undefined
   )
   const [data, setData] = useLocalStorage('supplies',[])
   const [open, setOpen] = useLocalStorage('AddSupplyForm_open', false)

   const handelAddSupply = (newSupply) => {
      addSupply(newSupply)
         .then((resData) => {
            setData((prevData) => [...prevData, resData.data])
            setOpen(false)

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
   }, [])

   const toggleMaxWidth = (isChecked) => {
      if (isChecked) {
         setMaxWidth(undefined)
      } else {
         setMaxWidth('100%')
      }
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
         <EnhancedTable
            data={data}
            headCells={headCells}
            toggleMaxWidth={toggleMaxWidth}
            handelAddSupply={handelAddSupply}
            handelDeleteSupply={handelDeleteSupply}
            open={open}
            setOpen={setOpen}
         />
      </Container>
   )
}
