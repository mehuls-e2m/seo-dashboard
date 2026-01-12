import { AlertTriangle, CheckCircle, AlertCircle, TrendingUp, XCircle } from 'lucide-react'

export default function SEOAudit({ client }) {
  // Mock SEO audit data - in real app, this would come from API
  const technicalSEO = {
    score: 75,
    issues: [
      { type: 'critical', title: 'Missing robots.txt', description: 'No robots.txt file found', fix: 'Create and upload robots.txt file' },
      { type: 'warning', title: 'Slow TTFB', description: 'Time to First Byte is 1.2s (target: <0.6s)', fix: 'Optimize server response time' },
      { type: 'warning', title: 'Mixed Content', description: '3 pages have mixed HTTP/HTTPS content', fix: 'Update all HTTP resources to HTTPS' },
      { type: 'info', title: 'XML Sitemap', description: 'Sitemap found and valid', fix: null },
    ],
  }

  const onPageSEO = {
    score: 68,
    issues: [
      { type: 'critical', title: 'Missing Meta Descriptions', description: '45 pages missing meta descriptions', fix: 'Add unique meta descriptions to all pages' },
      { type: 'warning', title: 'Duplicate Title Tags', description: '12 pages have duplicate title tags', fix: 'Create unique title tags for each page' },
      { type: 'warning', title: 'Thin Content', description: '8 pages have less than 300 words', fix: 'Expand content to meet minimum word count' },
      { type: 'info', title: 'H1 Tags', description: 'All pages have proper H1 tags', fix: null },
    ],
  }

  const offPageSEO = {
    score: 82,
    issues: [
      { type: 'warning', title: 'Low Domain Authority', description: 'Domain Authority: 32 (Industry avg: 45)', fix: 'Build quality backlinks from authoritative sites' },
      { type: 'info', title: 'Backlink Profile', description: '245 referring domains, healthy diversity', fix: null },
      { type: 'info', title: 'No Toxic Links', description: 'No toxic or spammy backlinks detected', fix: null },
    ],
  }

  const localSEO = {
    score: 60,
    issues: [
      { type: 'critical', title: 'Google Business Profile', description: 'Not connected or not optimized', fix: 'Create and optimize Google Business Profile' },
      { type: 'warning', title: 'NAP Inconsistency', description: 'Name/Address/Phone differs across 3 directories', fix: 'Standardize NAP across all directories' },
      { type: 'info', title: 'Local Keywords', description: 'Tracking 15 local keywords', fix: null },
    ],
  }

  const getIssueIcon = (type) => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'info':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score) => {
    if (score >= 70) return 'bg-green-500/20 border-green-500/30'
    if (score >= 50) return 'bg-yellow-500/20 border-yellow-500/30'
    return 'bg-red-500/20 border-red-500/30'
  }

  const SEOCategory = ({ title, score, issues }) => (
    <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className={`px-4 py-2 rounded-lg border ${getScoreBg(score)}`}>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-gray-400 text-sm ml-2">/100</span>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div
          className="bg-primary-orange h-2 rounded-full transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="space-y-4">
        {issues.map((issue, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border ${
              issue.type === 'critical'
                ? 'bg-red-500/10 border-red-500/30'
                : issue.type === 'warning'
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-green-500/10 border-green-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {getIssueIcon(issue.type)}
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">{issue.title}</h4>
                <p className="text-gray-400 text-sm mb-2">{issue.description}</p>
                {issue.fix && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <p className="text-primary-orange text-sm font-medium">Fix: {issue.fix}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">SEO Audit</h1>
        <p className="text-gray-400">Comprehensive SEO health analysis for {client.name}</p>
      </div>

      {/* Overall Score */}
      <div className={`rounded-xl p-6 border ${getScoreBg(client.seoScore)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Overall SEO Health Score</h2>
            <p className="text-gray-400">
              Based on technical, on-page, off-page, and local SEO factors
            </p>
          </div>
          <div className="text-right">
            <div className={`text-6xl font-bold ${getScoreColor(client.seoScore)}`}>
              {client.seoScore}
            </div>
            <div className="text-gray-400">out of 100</div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 mt-6">
          <div
            className="bg-primary-orange h-4 rounded-full transition-all"
            style={{ width: `${client.seoScore}%` }}
          />
        </div>
      </div>

      {/* Technical SEO */}
      <SEOCategory
        title="Technical SEO"
        score={technicalSEO.score}
        issues={technicalSEO.issues}
      />

      {/* On-Page SEO */}
      <SEOCategory
        title="On-Page SEO"
        score={onPageSEO.score}
        issues={onPageSEO.issues}
      />

      {/* Off-Page SEO */}
      <SEOCategory
        title="Off-Page SEO"
        score={offPageSEO.score}
        issues={offPageSEO.issues}
      />

      {/* Local SEO */}
      <SEOCategory
        title="Local SEO"
        score={localSEO.score}
        issues={localSEO.issues}
      />

      {/* Detailed Technical SEO Scope */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Technical SEO Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Crawlability</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• robots.txt: {technicalSEO.issues.find(i => i.title.includes('robots')) ? '❌ Missing' : '✅ Found'}</li>
              <li>• XML Sitemap: ✅ Found</li>
              <li>• Crawl Budget: Optimized</li>
              <li>• LLM.txt: Not configured</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Indexability</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• noindex tags: Properly configured</li>
              <li>• Meta robots: Valid</li>
              <li>• Canonical tags: Present</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Server Responses</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 200 responses: 98%</li>
              <li>• 301 redirects: 2% (optimal)</li>
              <li>• 404 errors: 0.1%</li>
              <li>• Redirect chains: None detected</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Performance</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• TTFB: 1.2s (needs improvement)</li>
              <li>• LCP: 2.8s (good)</li>
              <li>• CLS: 0.05 (excellent)</li>
              <li>• FID: 85ms (good)</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Security</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• HTTPS: ✅ Valid TLS</li>
              <li>• Mixed Content: ⚠️ 3 pages</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Mobile & Schema</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Mobile Friendly: ✅ Responsive</li>
              <li>• Viewport: ✅ Configured</li>
              <li>• Structured Data: ✅ Present</li>
              <li>• Schema Errors: 0</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed On-Page SEO Scope */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">On-Page SEO Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Title Tags & Meta</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Unique titles: 88%</li>
              <li>• Optimal length: 85%</li>
              <li>• Meta descriptions: 55% (needs work)</li>
              <li>• H1 tags: ✅ All pages have H1</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Content Quality</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Duplicate content: 12 pages</li>
              <li>• Thin pages: 8 pages (&lt;300 words)</li>
              <li>• Keyword targeting: Good</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">URL Structure</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Clean URLs: ✅ Yes</li>
              <li>• Readable: ✅ Yes</li>
              <li>• Consistent: ✅ Yes</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Images & Links</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Alt text: 92% coverage</li>
              <li>• Image optimization: Good</li>
              <li>• Internal linking: ✅ Good</li>
              <li>• Orphan pages: 3 detected</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Off-Page SEO Scope */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Off-Page SEO Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Backlink Profile</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Referring domains: 245</li>
              <li>• Total backlinks: 1,234</li>
              <li>• Toxic links: 0</li>
              <li>• Diversity: Good</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Authority & Trust</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Domain Authority: 32</li>
              <li>• Trust Score: 45/100</li>
              <li>• Relevance: Good</li>
              <li>• Link velocity: Stable</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Local SEO Scope */}
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Local SEO Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Google Business Profile</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Status: ⚠️ Not optimized</li>
              <li>• Categories: Not set</li>
              <li>• Reviews: 0</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Local Presence</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• NAP consistency: ⚠️ 3 inconsistencies</li>
              <li>• Local keywords: 15 tracked</li>
              <li>• Local rankings: Monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

