import { TrendingUp, AlertTriangle, CheckCircle, BarChart3, DollarSign, FileSearch, Link2 } from 'lucide-react'

export default function Overview({ client }) {
  const hasAnalytics = client.sources?.analytics
  const hasAds = client.sources?.ads
  const hasSearchConsole = client.sources?.searchConsole

  // Mock data - in real app, this would come from API
  const analyticsData = hasAnalytics ? {
    sessions: 12500,
    conversions: 245,
    bounceRate: 42.5,
  } : null

  const adsData = hasAds ? {
    spend: 8500,
    clicks: 3200,
    conversions: 180,
    cpc: 2.65,
  } : null

  const getSeoScoreColor = (score) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getSeoScoreBg = (score) => {
    if (score >= 70) return 'bg-green-500/20 border-green-500/30'
    if (score >= 50) return 'bg-yellow-500/20 border-yellow-500/30'
    return 'bg-red-500/20 border-red-500/30'
  }

  return (
    <div className="p-6 space-y-6">
      {/* SEO Score */}
      <div className={`rounded-xl p-6 border ${getSeoScoreBg(client.seoScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">SEO Health Score</h2>
          <span className={`text-4xl font-bold ${getSeoScoreColor(client.seoScore)}`}>
            {client.seoScore}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-primary-orange h-3 rounded-full transition-all"
            style={{ width: `${client.seoScore}%` }}
          />
        </div>
      </div>

      {/* Critical Issues */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-semibold text-white">Critical Issues</h2>
        </div>
        <div className="text-3xl font-bold text-red-400 mb-2">
          {client.seoScore < 50 ? 5 : client.seoScore < 70 ? 3 : 0}
        </div>
        <p className="text-gray-400 text-sm">
          {client.seoScore < 50
            ? 'Multiple critical SEO issues detected'
            : client.seoScore < 70
            ? 'Some issues need attention'
            : 'No critical issues'}
        </p>
      </div>

      {/* Connected Sources Status */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Connected Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${hasAnalytics ? 'bg-blue-500/10 border-blue-500/30' : 'bg-gray-800/50 border-gray-700'}`}>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className={`w-5 h-5 ${hasAnalytics ? 'text-blue-400' : 'text-gray-500'}`} />
              <span className="text-white font-medium">Analytics</span>
            </div>
            {hasAnalytics ? (
              <span className="text-green-400 text-sm">Connected</span>
            ) : (
              <span className="text-gray-500 text-sm">Not connected</span>
            )}
          </div>

          <div className={`p-4 rounded-lg border ${hasAds ? 'bg-purple-500/10 border-purple-500/30' : 'bg-gray-800/50 border-gray-700'}`}>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className={`w-5 h-5 ${hasAds ? 'text-purple-400' : 'text-gray-500'}`} />
              <span className="text-white font-medium">Ads</span>
            </div>
            {hasAds ? (
              <span className="text-green-400 text-sm">Connected</span>
            ) : (
              <span className="text-gray-500 text-sm">Not connected</span>
            )}
          </div>

          <div className={`p-4 rounded-lg border ${hasSearchConsole ? 'bg-green-500/10 border-green-500/30' : 'bg-gray-800/50 border-gray-700'}`}>
            <div className="flex items-center gap-3 mb-2">
              <FileSearch className={`w-5 h-5 ${hasSearchConsole ? 'text-green-400' : 'text-gray-500'}`} />
              <span className="text-white font-medium">Search Console</span>
            </div>
            {hasSearchConsole ? (
              <span className="text-green-400 text-sm">Connected</span>
            ) : (
              <span className="text-gray-500 text-sm">Not connected</span>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Data (if connected) */}
      {hasAnalytics && analyticsData && (
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Sessions</div>
              <div className="text-2xl font-bold text-white">{analyticsData.sessions.toLocaleString()}</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Conversions</div>
              <div className="text-2xl font-bold text-white">{analyticsData.conversions}</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Bounce Rate</div>
              <div className="text-2xl font-bold text-white">{analyticsData.bounceRate}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Ads Data (if connected) */}
      {hasAds && adsData && (
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Ads Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Spend</div>
              <div className="text-2xl font-bold text-white">${adsData.spend.toLocaleString()}</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Clicks</div>
              <div className="text-2xl font-bold text-white">{adsData.clicks.toLocaleString()}</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Conversions</div>
              <div className="text-2xl font-bold text-white">{adsData.conversions}</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">CPC</div>
              <div className="text-2xl font-bold text-white">${adsData.cpc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Sources Prompt */}
      {!hasAnalytics && !hasAds && !hasSearchConsole && (
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800 text-center">
          <Link2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Connect Data Sources</h3>
          <p className="text-gray-400 mb-4">
            Connect Analytics, Ads, or Search Console to see detailed metrics and insights.
          </p>
          <button className="px-6 py-2 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
            Connect Sources
          </button>
        </div>
      )}
    </div>
  )
}


