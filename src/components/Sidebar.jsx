import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import {
  LayoutDashboard,
  Users,
  UserCog,
  Settings,
  Briefcase,
} from 'lucide-react'

export default function Sidebar() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const location = useLocation()

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/clients', label: 'Clients', icon: Briefcase },
    { path: '/admin/managers', label: 'Account Managers', icon: UserCog },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  const managerMenuItems = [
    { path: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/manager/clients', label: 'My Clients', icon: Briefcase },
    { path: '/manager/settings', label: 'Settings', icon: Settings },
  ]

  const menuItems = user?.role === 'admin' ? adminMenuItems : managerMenuItems

  return (
    <div className="w-64 bg-white dark:bg-[#1f1f1f] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={theme === 'dark' ? '/dark-logo-leadgear.png' : '/light-logo-leadgear.png'}
            alt="LEADGEAR"
            className="h-10 w-auto"
          />
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-orange text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
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

