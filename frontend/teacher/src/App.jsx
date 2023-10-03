
import './App.css';
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'

import Profile from './Profile'
import Home from './Home'
import Teacher from './Teacher'
import AddTeacher from './AddTeacher'
import EditTeacher from './EditTeacher'


function App() {
  

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
     
      <Route path='' element={<Home />}></Route>
      
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/teacher' element={<Teacher />}></Route>
      <Route path='/create' element={<AddTeacher />}></Route>
      <Route path='/teacherEdit/:id' element={<EditTeacher />}></Route>

      </Route>
       <Route path='/login' element={<Login />}></Route>
  
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
