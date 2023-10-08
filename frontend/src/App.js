import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from 'react-router-dom'
import { Outlet, RouterProvider } from 'react-router-dom'

import Container from '@mui/material/Container'
import GuestFooter from './components/Footer'
import ResponsiveAppBar from './components/NavBar'

function Root() {
   return (
      <div className="App">
         <ResponsiveAppBar />
         <Container
            variant="main"
            component="main"
            // maxWidth="100%"
            sx={{
               marginTop: '20px',
               paddingBottom: 'calc(10% + 60px)',
            }}
         >
            <Outlet />
         </Container>
         <GuestFooter />
      </div>
   )
}
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
const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Root />}>
         <Route index element={<Home />} />
         <Route path="*" element={<NotFound />} />
      </Route>
   )
)
function App() {
   return <RouterProvider router={router} />
}

export default App
