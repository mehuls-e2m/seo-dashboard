import { useData } from '../../contexts/DataContext'
import { Users, TrendingUp, AlertTriangle, CheckCircle, BarChart3, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { clients, managers } = useData()

  const activeClients = clients.filter((c) => c.status === 'active')
  const avgSeoScore = clients.length > 0
    ? Math.round(clients.reduce((sum, c) => sum + c.seoScore, 0) / clients.length)
    : 0

  const criticalClients = clients.filter((c) => c.seoScore < 50).length
  const warningClients = clients.filter((c) => c.seoScore >= 50 && c.seoScore < 70).length
  const healthyClients = clients.filter((c) => c.seoScore >= 70).length

  const analyticsConnected = clients.filter((c) => c.sources?.analytics).length
  const adsConnected = clients.filter((c) => c.sources?.ads).length
  const searchConsoleConnected = clients.filter((c) => c.sources?.searchConsole).length

  // Mock conversions and spend
  const totalConversions = clients.reduce((sum, c) => sum + (c.conversions || 0), 0)
  const totalSpend = clients.reduce((sum, c) => sum + (c.spend || 0), 0)

  const clientsNeedingAttention = clients
    .filter((c) => c.seoScore < 70)
    .sort((a, b) => a.seoScore - b.seoScore)
    .slice(0, 5)

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm sm:text-base">Agency performance overview</p>
      </div>

      {/* Global Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{clients.length}</div>
          <div className="text-sm text-gray-400">Total Clients</div>
          <div className="text-xs text-gray-500 mt-2">{activeClients.length} active</div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-orange" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{avgSeoScore}</div>
          <div className="text-sm text-gray-400">Avg SEO Score</div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{totalConversions}</div>
          <div className="text-sm text-gray-400">Total Conversions</div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${totalSpend.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Ad Spend</div>
        </div>
      </div>

      {/* SEO Audit Overview */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">SEO Audit Overview</h2>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Average SEO Health Score</span>
            <span className="text-2xl font-bold text-white">{avgSeoScore}/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-primary-orange h-3 rounded-full transition-all"
              style={{ width: `${avgSeoScore}%` }}
            />
          </div>
        </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Source Coverage */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">Data Source Coverage</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Analytics Connected</span>
              <span className="text-white font-semibold">{analyticsConnected}/{clients.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Ads Connected</span>
              <span className="text-white font-semibold">{adsConnected}/{clients.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Search Console</span>
              <span className="text-white font-semibold">{searchConsoleConnected}/{clients.length}</span>
            </div>
          </div>
        </div>

        {/* Clients Needing Attention */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Clients Needing Attention</h2>
          <Link
            to="/admin/clients"
            className="text-primary-orange hover:text-orange-400 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        {clientsNeedingAttention.length > 0 ? (
          <div className="space-y-3">
            {clientsNeedingAttention.map((client) => {
              const manager = managers.find((m) => m.id === client.managerId)
              return (
                <Link
                  key={client.id}
                  to={`/admin/clients/${client.id}`}
                  className="block bg-[#1a1a1a] rounded-lg p-4 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{client.name}</div>
                      <div className="text-sm text-gray-400">
                        SEO Score: {client.seoScore} • {manager ? `Manager: ${manager.name}` : 'Unassigned'}
                      </div>
                    </div>
                    <div className="text-red-400 font-semibold">Critical Issues</div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">All clients are healthy!</p>
        )}
        </div>
      </div>
    </div>
  )
}

