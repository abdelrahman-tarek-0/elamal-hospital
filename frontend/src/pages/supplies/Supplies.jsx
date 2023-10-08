import * as React from 'react'

import Container from '@mui/material/Container'
import EnhancedTable from './supplies.table'
import useLocalStorage from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'
import { getAllSupplies } from '../../utils/apiSupplies'
import handelApiData from '../../utils/handelApiRes'

// const rows = [
//    createData(10, 'هيبرد صوديوم (امبول)', '', 24, 4.0),
//    createData(15, 'كبسولة محلول ملح تركيز %9', '', 37, 4.3),
//    createData(22, 'جولكوز %5', 'التركيز 10 مش متوفر', 24, 6.0),
//    createData(30, 'جركس بيكر بوينت', '', 24, 6.0),
//    createData(14, 'خيط للغسيل', 'خيط لغسيل الكلي فقط', 24, 6.0),
//    createData(50, 'ابرة للغسيل', 'ابرة لغسيل الكلي فقط', 24, 6.0),
// ]

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
   // {
   //    id: 'buying-price',
   //    numeric: true,
   //    disablePadding: false,
   //    label: 'سعر الشراء',
   // },
   // {
   //    id: 'selling-price',
   //    numeric: true,
   //    disablePadding: false,
   //    label: 'سعر البيع',
   // },
   {
      id: 'profit',
      numeric: true,
      disablePadding: false,
      label: 'الربح',
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
   const [data, setData] = React.useState([])

   React.useEffect(() => {
      getAllSupplies()
         .then((resData) => {
            setData(handelApiData(resData)?.data || [])
         })
         .catch((err) => {
            if (err.name === 'AxiosError') {
               console.log(err.response.data)
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
         />
      </Container>
   )
}
