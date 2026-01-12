import { Search, TrendingUp, Eye, MousePointerClick, AlertCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SearchConsole({ client }) {
  const hasSearchConsole = client.sources?.searchConsole

  // Mock data
  const performanceData = [
    { date: 'Week 1', clicks: 1200, impressions: 45000, ctr: 2.67, position: 8.5 },
    { date: 'Week 2', clicks: 1350, impressions: 48000, ctr: 2.81, position: 7.8 },
    { date: 'Week 3', clicks: 1420, impressions: 52000, ctr: 2.73, position: 7.2 },
    { date: 'Week 4', clicks: 1580, impressions: 55000, ctr: 2.87, position: 6.9 },
  ]

  const topQueries = [
    { query: 'best products', clicks: 450, impressions: 12000, ctr: 3.75, position: 4.2 },
    { query: 'company name', clicks: 380, impressions: 8500, ctr: 4.47, position: 2.1 },
    { query: 'services', clicks: 320, impressions: 9800, ctr: 3.27, position: 5.8 },
    { query: 'contact us', clicks: 280, impressions: 7200, ctr: 3.89, position: 3.5 },
  ]

  const topPages = [
    { page: '/home', clicks: 1250, impressions: 35000, ctr: 3.57, position: 5.2 },
    { page: '/products', clicks: 980, impressions: 28000, ctr: 3.50, position: 6.1 },
    { page: '/about', clicks: 650, impressions: 18000, ctr: 3.61, position: 7.3 },
  ]

  if (!hasSearchConsole) {
    return (
      <div className="p-6">
        <div className="bg-[#2a2a2a] rounded-xl p-12 border border-gray-800 text-center">
          <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Search Console Not Connected</h2>
          <p className="text-gray-400 mb-6">
            Connect Google Search Console to view search performance, clicks, impressions, and rankings.
          </p>
          <button className="px-6 py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
            Connect Search Console
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Search Console</h1>
        <p className="text-gray-400">Search performance and visibility insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">5,550</div>
          <div className="text-sm text-gray-400">Clicks</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">200K</div>
          <div className="text-sm text-gray-400">Impressions</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8.3% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">2.77%</div>
          <div className="text-sm text-gray-400">CTR</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +0.15% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">7.6</div>
          <div className="text-sm text-gray-400">Avg Position</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            -0.8 vs last period
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Performance Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="clicks" stroke="#FF6600" strokeWidth={2} name="Clicks" />
            <Line type="monotone" dataKey="impressions" stroke="#3B82F6" strokeWidth={2} name="Impressions" />
            <Line type="monotone" dataKey="ctr" stroke="#10B981" strokeWidth={2} name="CTR (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">Top Queries</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Query</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Clicks</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {topQueries.map((query, idx) => (
                  <tr key={idx} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{query.query}</td>
                    <td className="px-4 py-3 text-gray-300">{query.clicks}</td>
                    <td className="px-4 py-3 text-gray-300">{query.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">Top Pages</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Page</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Clicks</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {topPages.map((page, idx) => (
                  <tr key={idx} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{page.page}</td>
                    <td className="px-4 py-3 text-gray-300">{page.clicks}</td>
                    <td className="px-4 py-3 text-gray-300">{page.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

