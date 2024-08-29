import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import BlogDetails from './pages/BlogDetails'
import useLoadUser from './components/LoadUser'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
const App = () => {

  const loadUser = useLoadUser()
  useEffect(()=>{
    loadUser()
  },[]) 
  return (
  <>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={
        <ProtectedRoute>
          <Signup/>
        </ProtectedRoute>
      } />
      <Route path='/login' element={
        <ProtectedRoute>
          <Login/>
        </ProtectedRoute>
      } />
      <Route path='/blog/:id' element={<BlogDetails/>} />
    </Routes>
    <Toaster/>
  </Router>
  </>
  )
}

export default App