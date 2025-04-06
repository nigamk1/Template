import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-500">Admin Dashboard</h1>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
