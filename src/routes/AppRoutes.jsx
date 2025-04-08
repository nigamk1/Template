import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import AuthLayout from '../layouts/AuthLayout'

// Pages
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tables from '../pages/Tables'
import Charts from '../pages/Charts'
import NotFound from '../pages/NotFound'
import UserManagement from '../pages/UserManagement'
import Settings from '../pages/Settings'
import Help from '../pages/Help'

const AppRoutes = ({ theme, toggleTheme }) => {
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/" element={<DashboardLayout theme={theme} toggleTheme={toggleTheme} />}>
        <Route index element={<Dashboard />} />
        <Route path="tables" element={<Tables />} />
        <Route path="charts" element={<Charts />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      {/* Error Routes */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default AppRoutes
