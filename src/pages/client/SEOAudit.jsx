import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  FileText, 
  Globe, 
  MapPin,
  Zap,
  Lock,
  Smartphone,
  Search,
  Link2,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileCheck,
  FileX,
  Server,
  Gauge,
  ShieldCheck,
  ShieldAlert,
  Network,
  Building2,
  Star
} from 'lucide-react'

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
        return <XCircle className="w-6 h-6 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'info':
        return <CheckCircle2 className="w-6 h-6 text-green-400" />
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />
    }
  }

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score) => {
    if (score >= 70) return 'bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/40'
    if (score >= 50) return 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/40'
    return 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/40'
  }

  const getStatusIcon = (status, isGood = true) => {
    if (isGood) {
      return <CheckCircle2 className="w-4 h-4 text-green-400" />
    } else {
      return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getWarningIcon = () => {
    return <AlertTriangle className="w-4 h-4 text-yellow-400" />
  }

  const SEOCategory = ({ title, score, issues, icon: Icon }) => (
    <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-primary-orange" />}
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className={`px-5 py-3 rounded-xl border shadow-md ${getScoreBg(score)}`}>
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-gray-400 text-sm ml-2">/100</span>
        </div>
      </div>
      <div className="w-full bg-gray-800/50 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            score >= 70 ? 'bg-gradient-to-r from-green-500 to-green-400' :
            score >= 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
            'bg-gradient-to-r from-red-500 to-red-400'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="space-y-3">
        {issues.map((issue, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${
              issue.type === 'critical'
                ? 'bg-gradient-to-r from-red-500/10 to-red-600/5 border-red-500/40 shadow-md shadow-red-500/10'
                : issue.type === 'warning'
                ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/40 shadow-md shadow-yellow-500/10'
                : 'bg-gradient-to-r from-green-500/10 to-green-600/5 border-green-500/40 shadow-md shadow-green-500/10'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                issue.type === 'critical' ? 'bg-red-500/20' :
                issue.type === 'warning' ? 'bg-yellow-500/20' :
                'bg-green-500/20'
              }`}>
                {getIssueIcon(issue.type)}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1.5">{issue.title}</h4>
                <p className="text-gray-300 text-sm mb-2 leading-relaxed">{issue.description}</p>
                {issue.fix && (
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-primary-orange mt-0.5 flex-shrink-0" />
                      <p className="text-primary-orange text-sm font-medium">{issue.fix}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const DetailCard = ({ title, icon: Icon, items }) => (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-xl p-5 border border-gray-800/50 shadow-lg hover:border-gray-700 transition-all">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <div className="p-2 bg-primary-orange/20 rounded-lg"><Icon className="w-5 h-5 text-primary-orange" /></div>}
        <h4 className="text-white font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex-shrink-0">
              {item.status === 'good' && getStatusIcon('good', true)}
              {item.status === 'bad' && getStatusIcon('bad', false)}
              {item.status === 'warning' && getWarningIcon()}
              {!item.status && <span className="text-gray-500">•</span>}
            </span>
            <span className={`${item.status === 'good' ? 'text-green-300' : item.status === 'bad' ? 'text-red-300' : item.status === 'warning' ? 'text-yellow-300' : 'text-gray-300'}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="p-6 space-y-6 min-h-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">SEO Audit</h1>
        <p className="text-gray-400 text-sm sm:text-base">Comprehensive SEO health analysis for {client.name}</p>
      </div>

      {/* Overall Score */}
      <div className={`rounded-2xl p-8 border-2 shadow-2xl bg-gradient-to-br ${getScoreBg(client.seoScore)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Overall SEO Health Score</h2>
            <p className="text-gray-300 text-lg">
              Based on technical, on-page, off-page, and local SEO factors
            </p>
          </div>
          <div className="text-right">
            <div className={`text-7xl font-bold ${getScoreColor(client.seoScore)} drop-shadow-lg`}>
              {client.seoScore}
            </div>
            <div className="text-gray-300 text-lg mt-2">out of 100</div>
          </div>
        </div>
        <div className="w-full bg-gray-800/50 rounded-full h-5 mt-8 overflow-hidden shadow-inner">
          <div
            className={`h-5 rounded-full transition-all duration-1000 ${
              client.seoScore >= 70 ? 'bg-gradient-to-r from-green-500 via-green-400 to-green-300' :
              client.seoScore >= 50 ? 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300' :
              'bg-gradient-to-r from-red-500 via-red-400 to-red-300'
            }`}
            style={{ width: `${client.seoScore}%` }}
          />
        </div>
      </div>

      {/* Technical SEO */}
      <SEOCategory
        title="Technical SEO"
        score={technicalSEO.score}
        issues={technicalSEO.issues}
        icon={Shield}
      />

      {/* On-Page SEO */}
      <SEOCategory
        title="On-Page SEO"
        score={onPageSEO.score}
        issues={onPageSEO.issues}
        icon={FileText}
      />

      {/* Off-Page SEO */}
      <SEOCategory
        title="Off-Page SEO"
        score={offPageSEO.score}
        issues={offPageSEO.issues}
        icon={Network}
      />

      {/* Local SEO */}
      <SEOCategory
        title="Local SEO"
        score={localSEO.score}
        issues={localSEO.issues}
        icon={MapPin}
      />

      {/* Detailed Technical SEO Scope */}
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary-orange" />
          <h3 className="text-2xl font-semibold text-white">Technical SEO Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailCard
            title="Crawlability"
            icon={Search}
            items={[
              { text: 'robots.txt: Found and valid', status: 'good' },
              { text: 'XML Sitemap: Found', status: 'good' },
              { text: 'Crawl Budget: Optimized', status: 'good' },
              { text: 'LLM.txt: Not configured', status: 'warning' },
            ]}
          />
          <DetailCard
            title="Indexability"
            icon={FileCheck}
            items={[
              { text: 'noindex tags: Properly configured', status: 'good' },
              { text: 'Meta robots: Valid', status: 'good' },
              { text: 'Canonical tags: Present', status: 'good' },
            ]}
          />
          <DetailCard
            title="Server Responses"
            icon={Server}
            items={[
              { text: '200 responses: 98%', status: 'good' },
              { text: '301 redirects: 2% (optimal)', status: 'good' },
              { text: '404 errors: 0.1%', status: 'good' },
              { text: 'Redirect chains: None detected', status: 'good' },
            ]}
          />
          <DetailCard
            title="Performance"
            icon={Gauge}
            items={[
              { text: 'TTFB: 1.2s (needs improvement)', status: 'warning' },
              { text: 'LCP: 2.8s (good)', status: 'good' },
              { text: 'CLS: 0.05 (excellent)', status: 'good' },
              { text: 'FID: 85ms (good)', status: 'good' },
            ]}
          />
          <DetailCard
            title="Security"
            icon={ShieldCheck}
            items={[
              { text: 'HTTPS: Valid TLS certificate', status: 'good' },
              { text: 'Mixed Content: 3 pages detected', status: 'warning' },
            ]}
          />
          <DetailCard
            title="Mobile & Schema"
            icon={Smartphone}
            items={[
              { text: 'Mobile Friendly: Responsive design', status: 'good' },
              { text: 'Viewport: Properly configured', status: 'good' },
              { text: 'Structured Data: Present', status: 'good' },
              { text: 'Schema Errors: 0', status: 'good' },
            ]}
          />
        </div>
      </div>

      {/* Detailed On-Page SEO Scope */}
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-primary-orange" />
          <h3 className="text-2xl font-semibold text-white">On-Page SEO Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard
            title="Title Tags & Meta"
            icon={FileText}
            items={[
              { text: 'Unique titles: 88%', status: 'good' },
              { text: 'Optimal length: 85%', status: 'good' },
              { text: 'Meta descriptions: 55% (needs work)', status: 'warning' },
              { text: 'H1 tags: All pages have H1', status: 'good' },
            ]}
          />
          <DetailCard
            title="Content Quality"
            icon={TrendingUp}
            items={[
              { text: 'Duplicate content: 12 pages', status: 'warning' },
              { text: 'Thin pages: 8 pages (<300 words)', status: 'warning' },
              { text: 'Keyword targeting: Good', status: 'good' },
            ]}
          />
          <DetailCard
            title="URL Structure"
            icon={Globe}
            items={[
              { text: 'Clean URLs: Yes', status: 'good' },
              { text: 'Readable: Yes', status: 'good' },
              { text: 'Consistent: Yes', status: 'good' },
            ]}
          />
          <DetailCard
            title="Images & Links"
            icon={Link2}
            items={[
              { text: 'Alt text: 92% coverage', status: 'good' },
              { text: 'Image optimization: Good', status: 'good' },
              { text: 'Internal linking: Good', status: 'good' },
              { text: 'Orphan pages: 3 detected', status: 'warning' },
            ]}
          />
        </div>
      </div>

      {/* Detailed Off-Page SEO Scope */}
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-primary-orange" />
          <h3 className="text-2xl font-semibold text-white">Off-Page SEO Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard
            title="Backlink Profile"
            icon={Link2}
            items={[
              { text: 'Referring domains: 245', status: 'good' },
              { text: 'Total backlinks: 1,234', status: 'good' },
              { text: 'Toxic links: 0', status: 'good' },
              { text: 'Diversity: Good', status: 'good' },
            ]}
          />
          <DetailCard
            title="Authority & Trust"
            icon={Star}
            items={[
              { text: 'Domain Authority: 32', status: 'warning' },
              { text: 'Trust Score: 45/100', status: 'warning' },
              { text: 'Relevance: Good', status: 'good' },
              { text: 'Link velocity: Stable', status: 'good' },
            ]}
          />
        </div>
      </div>

      {/* Detailed Local SEO Scope */}
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-primary-orange" />
          <h3 className="text-2xl font-semibold text-white">Local SEO Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard
            title="Google Business Profile"
            icon={Building2}
            items={[
              { text: 'Status: Not optimized', status: 'bad' },
              { text: 'Categories: Not set', status: 'bad' },
              { text: 'Reviews: 0', status: 'warning' },
            ]}
          />
          <DetailCard
            title="Local Presence"
            icon={MapPin}
            items={[
              { text: 'NAP consistency: 3 inconsistencies', status: 'warning' },
              { text: 'Local keywords: 15 tracked', status: 'good' },
              { text: 'Local rankings: Monitoring', status: 'good' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
