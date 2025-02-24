import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import DashboardSection from './components/DashboardSection'

function App() {
  const [account, setAccount] = useState("")



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/dashboard" element={ <DashboardSection/> } />
          <Route path="*" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
