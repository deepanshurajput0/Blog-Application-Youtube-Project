import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import BlogDetails from './pages/BlogDetails'
const App = () => {
  return (
  <>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/blog/:id' element={<BlogDetails/>} />
    </Routes>
  </Router>
  </>
  )
}

export default App