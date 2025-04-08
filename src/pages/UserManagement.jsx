import { useState } from 'react'
import { 
  UserPlus, Search, Filter, MoreVertical, Edit, Trash, Eye, 
  UserCheck, Shield, AlertTriangle, ChevronLeft, ChevronRight
} from 'lucide-react'

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-12-01', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-11-30', avatar: 'JS' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'User', status: 'Inactive', lastLogin: '2023-11-15', avatar: 'RJ' },
    { id: 4, name: 'Maria Garcia', email: 'maria@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-11-28', avatar: 'MG' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Pending', lastLogin: '2023-11-20', avatar: 'DB' },
    { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-11-29', avatar: 'SW' },
    { id: 7, name: 'Michael Lee', email: 'michael@example.com', role: 'User', status: 'Active', lastLogin: '2023-11-27', avatar: 'ML' },
    { id: 8, name: 'Emily Clark', email: 'emily@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2023-10-15', avatar: 'EC' },
  ])
  
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('view') // 'view', 'edit', 'add'
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  
  const usersPerPage = 5
  
  // Filter and paginate users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter ? user.role === roleFilter : true
    const matchesStatus = statusFilter ? user.status === statusFilter : true
    
    return matchesSearch && matchesRole && matchesStatus
  })
  
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  
  // User actions
  const viewUser = (user) => {
    setSelectedUser(user)
    setModalMode('view')
    setIsModalOpen(true)
  }
  
  const editUser = (user) => {
    setSelectedUser(user)
    setModalMode('edit')
    setIsModalOpen(true)
  }
  
  const addUser = () => {
    setSelectedUser({
      id: users.length + 1,
      name: '',
      email: '',
      role: 'User',
      status: 'Pending',
      lastLogin: '-',
      avatar: ''
    })
    setModalMode('add')
    setIsModalOpen(true)
  }
  
  const deleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }
  
  const handleSaveUser = (userData) => {
    if (modalMode === 'add') {
      setUsers([...users, userData])
    } else if (modalMode === 'edit') {
      setUsers(users.map(user => user.id === userData.id ? userData : user))
    }
    setIsModalOpen(false)
  }
  
  // Status badge helper
  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
      Inactive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
      Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
        {status}
      </span>
    )
  }
  
  // Role badge helper
  const getRoleBadge = (role) => {
    const roleClasses = {
      Admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500',
      Editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
      User: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500',
    }
    
    const roleIcons = {
      Admin: <Shield size={14} className="mr-1" />,
      Editor: <Edit size={14} className="mr-1" />,
      User: <UserCheck size={14} className="mr-1" />,
    }
    
    return (
      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${roleClasses[role]}`}>
        {roleIcons[role]}
        {role}
      </span>
    )
  }
  
  // Pagination helpers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button 
          onClick={addUser}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
        >
          <UserPlus size={16} className="mr-2" />
          Add New User
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select 
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
              </select>
            </div>
            
            <div className="relative">
              <select 
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-medium">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => viewUser(user)}
                          className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => editUser(user)}
                          className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                        >
                          <Trash size={18} />
                        </button>
                        <div className="relative inline-block text-left">
                          <button className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center py-6">
                      <AlertTriangle size={48} className="text-gray-400 mb-2" />
                      <p>No users found matching your criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('')
                          setRoleFilter('')
                          setStatusFilter('')
                        }}
                        className="mt-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastUser, filteredUsers.length)}
              </span>{' '}
              of <span className="font-medium">{filteredUsers.length}</span> results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={16} />
                <span className="sr-only">Previous</span>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`inline-flex items-center px-3 py-1 border ${
                    currentPage === page
                      ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  } rounded-md text-sm font-medium`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronRight size={16} />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                      {modalMode === 'view' ? 'User Details' : modalMode === 'edit' ? 'Edit User' : 'Add New User'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {modalMode === 'view' ? (
                        <div className="space-y-3">
                          <div className="flex justify-center mb-4">
                            <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-2xl font-bold">
                              {selectedUser.avatar}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                            <p className="text-base text-gray-900 dark:text-gray-100">{selectedUser.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-base text-gray-900 dark:text-gray-100">{selectedUser.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
                            <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                            <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</p>
                            <p className="text-base text-gray-900 dark:text-gray-100">{selectedUser.lastLogin}</p>
                          </div>
                        </div>
                      ) : (
                        <form className="space-y-3">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              defaultValue={selectedUser.name}
                              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              defaultValue={selectedUser.email}
                              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800"
                            />
                          </div>
                          <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Role
                            </label>
                            <select
                              id="role"
                              name="role"
                              defaultValue={selectedUser.role}
                              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Editor">Editor</option>
                              <option value="User">User</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              defaultValue={selectedUser.status}
                              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800"
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {modalMode === 'view' ? (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleSaveUser({...selectedUser})}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
