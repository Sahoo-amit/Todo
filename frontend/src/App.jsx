import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import { useTokenContext } from './context/TokenContext'

const App = () => {
  const { isLogout } = useTokenContext()
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogout? <Navigate to='/login'/> : <Home />} />
          <Route path="/login" element={isLogout ? <Login />: <Navigate to='/'/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/signup' element={isLogout ? <Signup />: <Navigate to='/'/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App