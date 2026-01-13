import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { useAuth } from '../../contexts/AuthContext'
import ClientHeader from '../../components/ClientHeader'
import Overview from './Overview'
import SEOAudit from './SEOAudit'
import Analytics from './Analytics'
import Ads from './Ads'
import SearchConsole from './SearchConsole'

export default function ClientDashboard() {
  const { clientId } = useParams()
  const { clients } = useData()
  const { user } = useAuth()

  const client = clients.find((c) => c.id === parseInt(clientId))

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Client Not Found</h2>
          <p className="text-gray-400">The client you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  // Check access
  if (user?.role === 'manager' && client.managerId !== user.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have access to this client.</p>
        </div>
      </div>
    )
  }

  const basePath = user?.role === 'admin' ? '/admin/clients' : '/manager/clients'

  return (
    <div className="flex flex-col h-full w-full -m-4 sm:-m-6">
      <div className="flex-shrink-0 -mx-4 sm:-mx-6">
        <ClientHeader client={client} />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-primary-dark">
        <Routes>
          <Route path="/" element={<Navigate to={`${basePath}/${clientId}/overview`} replace />} />
          <Route path="overview" element={<Overview client={client} />} />
          <Route path="seo-audit" element={<SEOAudit client={client} />} />
          <Route path="analytics" element={<Analytics client={client} />} />
          <Route path="ads" element={<Ads client={client} />} />
          <Route path="search-console" element={<SearchConsole client={client} />} />
        </Routes>
      </div>
    </div>
  )
}

