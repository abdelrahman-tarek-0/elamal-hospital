import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from 'react-router-dom'
import { Outlet, RouterProvider } from 'react-router-dom'

import Container from '@mui/material/Container'
import GuestFooter from './components/Footer'
import ResponsiveAppBar from './components/NavBar'

import pages from './pages/index.pages'

function Root() {
   return (
      <div className="App">
         <ResponsiveAppBar />
         <Container
            variant="main"
            component="main"
            maxWidth="100%"
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

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Root />}>
         {pages.map((page) => (
            <Route
               key={page.path}
               path={page.path}
               element={<page.component />}
            />
         ))}
      </Route>
   )
)
function App() {
   return <RouterProvider router={router} />
}

export default App
