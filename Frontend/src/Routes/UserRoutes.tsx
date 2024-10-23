
import { Route,Routes } from 'react-router-dom'
import SignInPage from '../Pages/SignInPage'
import SignUpPage from '../Pages/SignUpPage'
import DashboardPage from '../Pages/DashboardPage'
import PrivateRoute from './PrivateRoute'

const UserRoutes = () => {
  return (
   <Routes>
    <Route path='/login' element={<SignInPage/>}/>
    <Route path='/register' element={<SignUpPage/>}/>
    <Route element={<PrivateRoute/>}/>
    <Route path='/dashboard' element={<DashboardPage/>}/>
    <Route/>
   </Routes>
  )
}

export default UserRoutes 