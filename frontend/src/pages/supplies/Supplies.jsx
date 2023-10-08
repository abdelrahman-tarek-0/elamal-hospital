import * as React from 'react'
import EnhancedTable from './supplies.table'

function createData(id, name, description, stock, price) {
   return {
      id,
      name,
      description,
      stock,
      price,
   }
}

const rows = [
   createData(55, 'حقنةشصيشصيشصي 3 سانتي', 'حقنة وشصيشصيريدي 3 سانتي', 110, 4),
   createData(3, 'حقنشصيشصية 3 سانتي', 'حقنة شصي 3 سانتي', 60, 7),
   createData(14, 'حقنةشصيشصي 3 سانتي', 'حقنة ششيصشيشي 3 سانتي', 364, 41),
   createData(30, 'حقنةشصيشصي 3 سانتي', 'حقنة شششش 3 سانتي', 114, 15),
   createData(35, 'حقنةشصيشصيشصييص 3 سانتي', 'حقنة شصي 3 سانتي', 414, 77),
   createData(30, 'حقنةشصيشصي 3 سانتي', 'حقنة شششش 3 سانتي', 114, 15),
   createData(35, 'حقنةشصيشصيشصييص 3 سانتي', 'حقنة شصي 3 سانتي', 414, 77),
   createData(30, 'حقنةشصيشصي 3 سانتي', 'حقنة شششش 3 سانتي', 114, 15),
   createData(35, 'حقنةشصيشصيشصييص 3 سانتي', 'حقنة شصي 3 سانتي', 414, 77),
   createData(90, 'حقنشصيشصيشصية 3 سانتي', 'حقنة شصيشصي 3 سانتي', 14, 1),
   createData(30, 'حقنةشصيشصي 3 سانتي', 'حقنة شششش 3 سانتي', 114, 15),
   createData(35, 'حقنةشصيشصيشصييص 3 سانتي', 'حقنة شصي 3 سانتي', 414, 77),
   createData(90, 'حقنشصيشصيشصية 3 سانتي', 'حقنة شصيشصي 3 سانتي', 14, 1),

]


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
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'السعر',
   },
]


export default function Supplies() {
  return <EnhancedTable data={rows} headCells={headCells} />
}