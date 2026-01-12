import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Search, ExternalLink, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function ManagerClientList() {
  const { getClientsForUser } = useData()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const clients = getClientsForUser()
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        return <XCircle className="w-4 h-4 text-gray-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Clients</h1>
        <p className="text-gray-400">Your assigned clients</p>
      </div>

      {/* Search */}
      <div className="bg-[#2a2a2a] rounded-xl p-4 border border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-[#2a2a2a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">SEO Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Connected Sources</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        to={`/manager/clients/${client.id}`}
                        className="text-white font-medium hover:text-primary-orange transition-colors"
                      >
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getSeoScoreColor(client.seoScore)}`}>
                        {client.seoScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {client.sources?.analytics && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Analytics</span>
                        )}
                        {client.sources?.ads && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Ads</span>
                        )}
                        {client.sources?.searchConsole && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">SC</span>
                        )}
                        {!client.sources?.analytics && !client.sources?.ads && !client.sources?.searchConsole && (
                          <span className="text-gray-500 text-xs">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(client.status)}
                        <span className="text-gray-300 capitalize">{client.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/manager/clients/${client.id}`}
                        className="text-primary-orange hover:text-orange-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                    No clients assigned
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

