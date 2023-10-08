import * as React from 'react'
import Container from '@mui/material/Container'
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
   createData(10, 'هيبرد صوديوم (امبول)', '', 24, 4.0),
   createData(15, 'كبسولة محلول ملح تركيز %9', '', 37, 4.3),

   createData(22, 'جولكوز %5', 'التركيز 10 مش متوفر', 24, 6.0),
   createData(30, 'جركس بيكر بوينت', '', 24, 6.0),
   createData(14,"خيط للغسيل","خيط لغسيل الكلي فقط",24,6.0),
   createData(50,"ابرة للغسيل","ابرة لغسيل الكلي فقط",24,6.0),
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
   {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'الإجراءات',
   },
]

export default function Supplies() {
   return (
      <Container
         variant="main"
         component="main"
         // maxWidth="100%"
         sx={{
            marginTop: '20px',
            paddingBottom: 'calc(10% + 60px)',
         }}
      >
         <EnhancedTable data={rows} headCells={headCells} />
      </Container>
   )
}
