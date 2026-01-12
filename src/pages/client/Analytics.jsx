import { BarChart3, TrendingUp, Users, MousePointerClick, AlertCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Analytics({ client }) {
  const hasAnalytics = client.sources?.analytics

  // Mock data
  const trafficData = [
    { date: 'Week 1', sessions: 1200, users: 980, pageviews: 3400 },
    { date: 'Week 2', sessions: 1350, users: 1100, pageviews: 3800 },
    { date: 'Week 3', sessions: 1420, users: 1150, pageviews: 4100 },
    { date: 'Week 4', sessions: 1580, users: 1280, pageviews: 4500 },
  ]

  const topPages = [
    { page: '/home', views: 12500, bounceRate: 42 },
    { page: '/products', views: 8900, bounceRate: 38 },
    { page: '/about', views: 5600, bounceRate: 45 },
    { page: '/contact', views: 3200, bounceRate: 52 },
  ]

  if (!hasAnalytics) {
    return (
      <div className="p-6">
        <div className="bg-[#2a2a2a] rounded-xl p-12 border border-gray-800 text-center">
          <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Analytics Not Connected</h2>
          <p className="text-gray-400 mb-6">
            Connect Google Analytics to view traffic data, conversions, and user insights.
          </p>
          <button className="px-6 py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
            Connect Analytics
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Traffic and user behavior insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12,500</div>
          <div className="text-sm text-gray-400">Sessions</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">9,800</div>
          <div className="text-sm text-gray-400">Users</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8.3% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">45,200</div>
          <div className="text-sm text-gray-400">Pageviews</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +15.2% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">245</div>
          <div className="text-sm text-gray-400">Conversions</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +22.1% vs last period
          </div>
        </div>
      </div>

      {/* Traffic Trend */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Traffic Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="sessions" stroke="#FF6600" strokeWidth={2} />
            <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="pageviews" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Pages */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Top Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Page</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Pageviews</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {topPages.map((page, idx) => (
                <tr key={idx} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{page.page}</td>
                  <td className="px-4 py-3 text-gray-300">{page.views.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={page.bounceRate > 50 ? 'text-red-400' : 'text-green-400'}>
                      {page.bounceRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

