import Container from '@mui/material/Container'
import GuestFooter from './components/Footer'
import ResponsiveAppBar from './components/NavBar'

function App() {
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
            <p>Content</p>
         </Container>
         
         <GuestFooter />
      </div>
   )
}

export default App
