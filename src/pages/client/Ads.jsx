import { DollarSign, TrendingUp, MousePointerClick, Target, AlertCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Ads({ client }) {
  const hasAds = client.sources?.ads

  // Mock data
  const spendData = [
    { date: 'Week 1', spend: 1800, clicks: 650, conversions: 35 },
    { date: 'Week 2', spend: 2100, clicks: 780, conversions: 42 },
    { date: 'Week 3', spend: 1950, clicks: 720, conversions: 38 },
    { date: 'Week 4', spend: 2650, clicks: 1050, conversions: 65 },
  ]

  const campaigns = [
    { name: 'Brand Campaign', spend: 3200, clicks: 1200, conversions: 85, cpc: 2.67, roas: 4.2 },
    { name: 'Product Launch', spend: 2800, clicks: 1050, conversions: 72, cpc: 2.67, roas: 3.8 },
    { name: 'Retargeting', spend: 1500, clicks: 650, conversions: 48, cpc: 2.31, roas: 5.1 },
    { name: 'Search Campaign', spend: 1000, clicks: 300, conversions: 40, cpc: 3.33, roas: 6.5 },
  ]

  if (!hasAds) {
    return (
      <div className="p-6">
        <div className="bg-[#2a2a2a] rounded-xl p-12 border border-gray-800 text-center">
          <DollarSign className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Ads Not Connected</h2>
          <p className="text-gray-400 mb-6">
            Connect Google Ads to view campaign performance, spend, and conversion data.
          </p>
          <button className="px-6 py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
            Connect Ads
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Ads Performance</h1>
        <p className="text-gray-400">Campaign metrics and spend analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$8,500</div>
          <div className="text-sm text-gray-400">Total Spend</div>
          <div className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +18.2% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">3,200</div>
          <div className="text-sm text-gray-400">Clicks</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +15.5% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">245</div>
          <div className="text-sm text-gray-400">Conversions</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +22.1% vs last period
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$2.65</div>
          <div className="text-sm text-gray-400">Avg CPC</div>
          <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            -5.2% vs last period
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Performance Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={spendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="spend" stroke="#FF6600" strokeWidth={2} name="Spend ($)" />
            <Line type="monotone" dataKey="clicks" stroke="#3B82F6" strokeWidth={2} name="Clicks" />
            <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Campaigns Table */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Campaigns</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Campaign</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Spend</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Clicks</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Conversions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">CPC</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {campaigns.map((campaign, idx) => (
                <tr key={idx} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{campaign.name}</td>
                  <td className="px-4 py-3 text-gray-300">${campaign.spend.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-300">{campaign.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-300">{campaign.conversions}</td>
                  <td className="px-4 py-3 text-gray-300">${campaign.cpc}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-400 font-semibold">{campaign.roas}x</span>
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

