import { useState } from 'react'
import './index.css'
import Home from './pages/Home'
import Navbar from './components/ui/Navbar'


function App() {

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Home />
      </div>
    </>
  )
}

export default App
