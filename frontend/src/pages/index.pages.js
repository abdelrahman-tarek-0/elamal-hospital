import HomeIcon from '@mui/icons-material/Home'
import BadgeIcon from '@mui/icons-material/Badge'
import Supplies from './supplies/Supplies'

function Home() {
   return (
      <div>
         <h1>اهلا وسهلا</h1>
      </div>
   )
}

function NotFound() {
   return (
      <div>
         <h1>404</h1>
      </div>
   )
}

const pages  = [
   {
      name: 'الرئيسية',
      path: '/',
      icon: HomeIcon,
      component: Home,
   },
   {
      name: 'مستلزمات',
      path: '/supplies',
      icon: BadgeIcon,
      component: Supplies,
   },
   {
      name: 'لا يوجد',
      path: '*',
      icon: null,
      component: NotFound,
   },
]


export default pages;