import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { ArrowLeft, Mail, Users, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react'

export default function ManagerDetails() {
  const { managerId } = useParams()
  const navigate = useNavigate()
  const { managers, clients } = useData()

  const manager = managers.find((m) => m.id === parseInt(managerId))
  const managerClients = clients.filter((c) => c.managerId === parseInt(managerId))

  if (!manager) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Manager Not Found</h2>
          <p className="text-gray-400 mb-4">The account manager you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin/managers')}
            className="px-4 py-2 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Back to Managers
          </button>
        </div>
      </div>
    )
  }

  const avgScore = managerClients.length > 0
    ? Math.round(managerClients.reduce((sum, c) => sum + c.seoScore, 0) / managerClients.length)
    : 0

  const criticalClients = managerClients.filter((c) => c.seoScore < 50).length
  const warningClients = managerClients.filter((c) => c.seoScore >= 50 && c.seoScore < 70).length
  const healthyClients = managerClients.filter((c) => c.seoScore >= 70).length

  const getSeoScoreColor = (score) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'inactive':
        return <AlertTriangle className="w-4 h-4 text-gray-400" />
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/managers')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{manager.name}</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{manager.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{managerClients.length}</div>
          <div className="text-sm text-gray-400">Total Clients</div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-orange" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{avgScore}</div>
          <div className="text-sm text-gray-400">Avg SEO Score</div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-1">{criticalClients}</div>
          <div className="text-sm text-gray-400">Critical Issues</div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-1">{warningClients}</div>
          <div className="text-sm text-gray-400">Warnings</div>
        </div>
      </div>

      {/* Client Health Overview */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Client Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-white font-semibold">Critical</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{criticalClients}</div>
            <div className="text-sm text-gray-400">Clients</div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Warning</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{warningClients}</div>
            <div className="text-sm text-gray-400">Clients</div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">Healthy</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{healthyClients}</div>
            <div className="text-sm text-gray-400">Clients</div>
          </div>
        </div>
      </div>

      {/* Assigned Clients */}
      <div className="bg-[#2a2a2a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Assigned Clients</h2>
        </div>
        {managerClients.length > 0 ? (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">SEO Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {managerClients.map((client) => (
                  <tr 
                    key={client.id} 
                    className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/clients/${client.id}`)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{client.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getSeoScoreColor(client.seoScore)}`}>
                        {client.seoScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(client.status)}
                        <span className="text-gray-300 capitalize">{client.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="text-primary-orange hover:text-orange-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Clients Assigned</h3>
            <p className="text-gray-400">This manager doesn't have any clients assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

