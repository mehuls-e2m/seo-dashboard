import { Calendar, Link as LinkIcon, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

export default function ClientHeader({ client }) {
  const [dateRange, setDateRange] = useState('30d')

  const hasAnySource = client.sources?.analytics || client.sources?.ads || client.sources?.searchConsole

  return (
    <div className="bg-white dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-gray-800 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">{client.name}</h1>
          {client.website && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm transition-colors">
              <LinkIcon className="w-4 h-4" />
              <span>{client.website}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {client.sources?.analytics && (
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center" title="Analytics Connected">
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
            )}
            {client.sources?.ads && (
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center" title="Ads Connected">
                <CheckCircle className="w-4 h-4 text-purple-400" />
              </div>
            )}
            {client.sources?.searchConsole && (
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center" title="Search Console Connected">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            )}
            {!hasAnySource && (
              <div className="text-xs text-gray-600 dark:text-gray-500 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded transition-colors">
                No sources connected
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none transition-colors"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

