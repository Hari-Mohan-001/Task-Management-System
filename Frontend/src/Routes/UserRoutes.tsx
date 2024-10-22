
import { Route,Routes } from 'react-router-dom'
import SignInPage from '../Pages/SignInPage'
import SignUpPage from '../Pages/SignUpPage'

const UserRoutes = () => {
  return (
   <Routes>
    <Route path='/login' element={<SignInPage/>}/>
    <Route path='/register' element={<SignUpPage/>}/>
   </Routes>
  )
}

export default UserRoutes 