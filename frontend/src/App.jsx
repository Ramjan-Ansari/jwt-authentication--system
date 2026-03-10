import Login from './components/Login'
import Register from './components/Register'
import UserDetails from './components/UserDetails'
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/getuserdetails' element={ <UserDetails /> } />
      </Routes>
    </>
  )
}

export default App
