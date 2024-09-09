import React from 'react'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-[#f3efef] flex justify-center items-start py-8">
      <div className="container max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <Dashboard />
      </div>
    </div>
  )
}

export default App;