import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, BarChart3, DollarSign, FileSearch, X } from 'lucide-react'

export default function ClientSidebar({ basePath, clientId, onClose }) {
  const menuItems = [
    { path: `${basePath}/${clientId}/overview`, label: 'Overview', icon: LayoutDashboard },
    { path: `${basePath}/${clientId}/seo-audit`, label: 'SEO Audit', icon: Search },
  ]

  const conditionalItems = [
    { path: `${basePath}/${clientId}/analytics`, label: 'Analytics', icon: BarChart3, key: 'analytics' },
    { path: `${basePath}/${clientId}/ads`, label: 'Ads', icon: DollarSign, key: 'ads' },
    { path: `${basePath}/${clientId}/search-console`, label: 'Search Console', icon: FileSearch, key: 'searchConsole' },
  ]

  // In a real app, we'd check if sources are connected
  // For now, we'll show all items but they'll show connection prompts if not connected

  return (
    <div className="w-full h-full bg-[#1f1f1f] flex flex-col">
      <div className="lg:hidden p-4 border-b border-gray-800 flex items-center justify-between">
        <span className="text-white font-semibold">Menu</span>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 p-3 sm:p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-orange text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          )
        })}
        {conditionalItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-orange text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

