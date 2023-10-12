import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Supplies from './supplies/Supplies'
import Sessions from './sessions/Sessions'

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
      name: 'لا يوجد',
      path: '*',
      icon: null,
      component: NotFound,
   },
]

export default pages
