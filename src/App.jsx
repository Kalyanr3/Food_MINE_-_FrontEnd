import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './vendorDashboard/pages/LandingPage'
import NavBar from './vendorDashboard/components/NavBar'
import SideBar from './vendorDashboard/components/SideBar'
import "./App.css"
import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<LandingPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
        {/* <LandingPage /> */} 
    </div>
  )
}

export default App;
