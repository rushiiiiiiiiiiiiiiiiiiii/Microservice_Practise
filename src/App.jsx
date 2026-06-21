import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import User from './pages/User'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Signin/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/createUser' element={<CreateUser/>}/>
          <Route path='/user/:email' element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
