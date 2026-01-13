import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MainLayout from './MainLayout'

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-primary-orange text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/manager/dashboard'} replace />
  }

  return <MainLayout>{children}</MainLayout>
}

