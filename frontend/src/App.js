import GuestFooter from './components/Footer'
import ResponsiveAppBar from './components/NavBar'

function App() {
   return (
      <div className="App">
         <ResponsiveAppBar />

         <main
            style={{
               paddingBottom: 'calc(10% + 60px)',
            }}
         >
            <p
               style={{
                  width: '100%',
                  height: '100vh',
               }}
            >
               Edit <code>src/App.js</code> and save to reload.
            </p>
          
         </main>

         <GuestFooter />
      </div>
   )
}

export default App
