import { Link, useLocation } from 'react-router-dom'
import { 
  Home, BarChart2, Table, Users, Settings, HelpCircle, X 
} from 'lucide-react'

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation()
  
  const sidebarItems = [
    { title: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { title: 'Charts', path: '/charts', icon: <BarChart2 size={20} /> },
    { title: 'Tables', path: '/tables', icon: <Table size={20} /> },
    { title: 'User Management', path: '/users', icon: <Users size={20} /> },
    { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { title: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
  ]
  
  const isPathActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">Admin Panel</span>
          </Link>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Sidebar Content */}
        <nav className="p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 space-x-3 rounded-md transition-colors ${
                    isPathActive(item.path)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 mt-auto border-t dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
