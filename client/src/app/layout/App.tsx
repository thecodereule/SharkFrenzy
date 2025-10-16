import { Box, Container, CssBaseline } from "@mui/material"
import Navbar from "./NavBar"
import { Outlet, ScrollRestoration, useLocation } from "react-router"
import HomePage from "../../features/home/HomePage";


function App() {
  const location = useLocation();
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <Navbar />
          <Container maxWidth='xl' sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  )
}

export default App
 