import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import InviteAccept from './pages/auth/InviteAccept'
import ToolOverview from './pages/public/ToolOverview'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import ClientList from './pages/admin/ClientList'
import ManagerClientList from './pages/manager/ManagerClientList'
import AccountManagers from './pages/admin/AccountManagers'
import ManagerDetails from './pages/admin/ManagerDetails'
import Settings from './pages/Settings'
import ClientDashboard from './pages/client/ClientDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-primary-orange text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<ToolOverview />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/manager/dashboard'} /> : <Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/invite/:token" element={<InviteAccept />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="clients" element={<ClientList />} />
              <Route path="managers" element={<AccountManagers />} />
              <Route path="managers/:managerId" element={<ManagerDetails />} />
              <Route path="settings" element={<Settings />} />
              <Route path="clients/:clientId/*" element={<ClientDashboard />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Protected Manager Routes */}
      <Route
        path="/manager/*"
        element={
          <ProtectedRoute requiredRole="manager">
            <Routes>
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route path="clients" element={<ManagerClientList />} />
              <Route path="settings" element={<Settings />} />
              <Route path="clients/:clientId/*" element={<ClientDashboard />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App

