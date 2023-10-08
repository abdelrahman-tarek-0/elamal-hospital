import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import pages from '../pages/index.pages'

function ResponsiveAppBar() {
   const [anchorElNav, setAnchorElNav] = React.useState(null)

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget)
   }

   const handleCloseNavMenu = () => {
      setAnchorElNav(null)
   }

   return (
      <AppBar
         position="static"
         sx={{
            backgroundColor: '#200100',
            color: '#98f701',
         }}
      >
         <Container
            maxWidth="xl"
            sx={{
               maxWidth: '100% !important',
            }}
         >
            <Toolbar
               disableGutters
               sx={{
                  marginRight: '20px',
               }}
            >
               <Box
                  component="img"
                  sx={{
                     height: 48,
                     display: { xs: 'none', md: 'flex' },
                  }}
                  alt="Your logo."
                  src="/logo.jpg"
               />
               <Typography
                  variant="h6"
                  noWrap
                  // component="a"
                  // href="/"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     color: 'inherit',
                     textDecoration: 'none',
                     marginLeft: '100px',
                     cursor: 'pointer',
                  }}
               >
                  <Link
                     to="/"
                     style={{
                        color: 'inherit',
                        textDecoration: 'none',
                     }}
                  >
                     مستشفي الأمل
                  </Link>
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {pages.map((page) => {
                        if (page.icon === null) return null
                        return (
                           <Link 
                           style={{
                              color: 'inherit',
                              textDecoration: 'none',
                           }}
                           to={page.path} key={page.name}>
                              <MenuItem
                                 key={page.name}
                                 onClick={handleCloseNavMenu}
                              >
                                 <Typography textAlign="center">
                                    {page.name}
                                 </Typography>
                              </MenuItem>
                           </Link>
                        )
                     })}
                  </Menu>
               </Box>

               <Box
                  component="img"
                  sx={{
                     height: 48,
                     display: { xs: 'flex', md: 'none' },
                  }}
                  alt="Your logo."
                  src="/logo.jpg"
               />

               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  مستشفي الأمل
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => {
                     if (page.icon === null) return null
                     return (
                        <Link
                           to={page.path}
                           style={{
                              color: 'inherit',
                              textDecoration: 'none',
                           }}
                           key={page.name}
                        >
                           <Button
                              onClick={handleCloseNavMenu}
                              sx={{
                                 my: 2,
                                 color: 'inherit',
                                 display: 'block',
                                 margin: '0 16px',
                                 fontSize: '1.5rem',
                                 ':hover': {
                                    background: '#365c00',
                                 },
                              }}
                           >
                              <page.icon
                                 sx={{
                                    fontSize: '1.2rem',
                                    marginLeft: '5px',
                                 }}
                              />

                              <Typography
                                 variant="span"
                                 sx={{
                                    fontSize: '1.5rem',
                                 }}
                              >
                                 {page.name}
                              </Typography>
                           </Button>
                        </Link>
                     )
                  })}
               </Box>

               <Box sx={{ flexGrow: 0 }}></Box>
            </Toolbar>
         </Container>
      </AppBar>
   )
}
export default ResponsiveAppBar
