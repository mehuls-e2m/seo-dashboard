import { NavLink, useLocation } from 'react-router-dom'
import { Link as LinkIcon, Globe, LayoutDashboard, Search, BarChart3, DollarSign, FileSearch } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function ClientHeader({ client }) {
  const { user } = useAuth()
  const location = useLocation()
  const clientId = client.id
  const basePath = user?.role === 'admin' ? '/admin/clients' : '/manager/clients'

  const navItems = [
    { path: `${basePath}/${clientId}/overview`, label: 'Overview', icon: LayoutDashboard, shortLabel: 'Overview' },
    { path: `${basePath}/${clientId}/seo-audit`, label: 'SEO Audit', icon: Search, shortLabel: 'SEO' },
    { path: `${basePath}/${clientId}/analytics`, label: 'Analytics', icon: BarChart3, shortLabel: 'Analytics' },
    { path: `${basePath}/${clientId}/ads`, label: 'Ads', icon: DollarSign, shortLabel: 'Ads' },
    { path: `${basePath}/${clientId}/search-console`, label: 'Search Console', icon: FileSearch, shortLabel: 'Search' },
  ]

  return (
    <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] border-b border-gray-800 w-full sticky top-0 z-10">
      {/* Top Section: Client Info */}
      <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Client Info Section */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary-orange/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-primary-orange/30 flex-shrink-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-orange" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1 truncate">
                {client.name}
              </h1>
              {client.website && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm">
                  <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="hover:text-primary-orange transition-colors truncate max-w-[200px] sm:max-w-none">
                    {client.website}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* SEO Score Badge */}
          <div className="flex items-center justify-start sm:justify-end flex-shrink-0">
            <div className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              client.seoScore >= 70 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : client.seoScore >= 50 
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              <span className="hidden md:inline">SEO Score: </span>
              <span className="md:hidden">Score: </span>
              <span className="font-bold">{client.seoScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-gray-800">
        <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-8">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium rounded-t-lg transition-all whitespace-nowrap border-b-2 min-w-fit ${
                    isActive
                      ? 'text-primary-orange border-primary-orange bg-primary-orange/10'
                      : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-gray-700 hover:bg-gray-800/30'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="hidden min-[380px]:inline">{item.label}</span>
                <span className="min-[380px]:hidden">{item.shortLabel}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

