import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PaymentsIcon from '@mui/icons-material/Payments';

import Supplies from './supplies/Supplies'
import Sessions from './sessions/Sessions'
import Bills from './bills/Bills';


function NotFound() {
   return (
      <div>
         <h1>404</h1>
      </div>
   )
}

const pages = [
   {
      name: 'مستلزمات',
      path: '/',
      icon: MedicalServicesIcon,
      component: Supplies,
   },
   {
      name: 'جلسات',
      path: '/sessions',
      icon: AssignmentIcon,
      component: Sessions,
   },
   {
      name: 'الفواتير',
      path: '/bills',
      icon: PaymentsIcon,
      component: Bills,
   },
   {
      name: 'لا يوجد',
      path: '*',
      icon: null,
      component: NotFound,
   },
]

export default pages
