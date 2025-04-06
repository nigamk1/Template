import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const DashboardLayout = ({ theme, toggleTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className={`flex flex-col flex-1 overflow-y-auto lg:pl-64 transition-all duration-300`}>
        <Navbar 
          toggleSidebar={toggleSidebar} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        
        <main className="flex-1 p-5">
          <Outlet />
        </main>
        
        <footer className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Admin Dashboard Template. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout