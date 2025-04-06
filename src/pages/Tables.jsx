import { useState } from 'react'
import { ChevronDown, ChevronUp, Edit, Trash, Eye, MoreHorizontal, Search } from 'lucide-react'

const Tables = () => {
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample data for the table
  const initialData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Tom Wilson', email: 'tom@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Michael Johnson', email: 'michael@example.com', role: 'Editor', status: 'Active' },
    { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', role: 'User', status: 'Pending' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Admin', status: 'Active' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', role: 'User', status: 'Inactive' },
  ]

  // Sort and filter data
  const sortData = (data) => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const filterData = (data) => {
    if (!searchTerm) return data

    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const renderSortIcon = (field) => {
    if (sortField !== field) return null
    
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="ml-1" /> : 
      <ChevronDown size={16} className="ml-1" />
  }

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  // Process data
  const filteredData = filterData(initialData)
  const sortedData = sortData(filteredData)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Add New User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <select className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>

            <select className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('name')}
                  >
                    Name {renderSortIcon('name')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('email')}
                  >
                    Email {renderSortIcon('email')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('role')}
                  >
                    Role {renderSortIcon('role')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('status')}
                  >
                    Status {renderSortIcon('status')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500">
                        <Eye size={18} />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                        <Trash size={18} />
                      </button>
                      <div className="relative inline-block text-left">
                        <button className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedData.length}</span> of{' '}
                <span className="font-medium">{initialData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-500 text-primary-600 dark:text-primary-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tables
