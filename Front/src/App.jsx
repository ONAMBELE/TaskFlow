import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import FormAddTask from './components/FormAddTask'
import DashboardSection from './components/DashboardSection'
import PopUpViewTask from './components/PopUpViewTask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <DashboardSection/>
    </>
  )
}

export default App
