import { Menu, Bell, Search, Moon, Sun, User } from 'lucide-react'
import { useState } from 'react'

const Navbar = ({ toggleSidebar, theme, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
          <Menu size={20} />
        </button>
        
        {/* Search Bar */}
        <div className="hidden md:flex ml-4 items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="ml-2 bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200 w-48"
          />
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="hidden md:inline-block text-sm font-medium">Admin</span>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
              <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Your Profile
              </a>
              <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </a>
              <a href="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
