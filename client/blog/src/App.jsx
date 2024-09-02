import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import BlogDetails from './pages/BlogDetails'
import useLoadUser from './components/LoadUser'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/Dashboard'
import { useEffect } from 'react'
import AllBlogs from './components/AllBlogs'
import CreateBlogs from './components/CreateBlogs'
import CreateCategory from './components/CreateCategory'
import Analytics from './components/Analytics'
import EditBlog from './pages/EditBlog'
const App = () => {
  const loadUser = useLoadUser()

  useEffect(()=>{
     loadUser()
  },[loadUser])

 
  return (
  <>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/blogdetail/:id' element={<BlogDetails/>} />
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
      <Route path="/dashboard"  element={<DashboardLayout />} >
      <Route path="blogs" element={<AllBlogs/>} />
          <Route path="create-blog" element={<CreateBlogs/>} />
          <Route path="create-category" element={<CreateCategory/>} />
          <Route path="analytics" element={<Analytics/>} />
          <Route path="edit/:id" element={<EditBlog/>} />
      </Route>
    </Routes>
    <Toaster/>
  </Router>
  </>
  )
}

export default App