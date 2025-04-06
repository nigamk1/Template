import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, EyeOff, Eye } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register form submitted:', formData)
    // In a real app, you would register the user here
    // For this template, we'll just redirect to the login page
    navigate('/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            required
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the <a href="#terms" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#privacy" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
          </label>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create Account
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
        <Link to="/login" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default Register
