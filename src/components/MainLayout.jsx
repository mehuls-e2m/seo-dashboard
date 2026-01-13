import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-primary-dark flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 flex-shrink-0 h-full overflow-y-auto scrollbar-hide border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-shrink-0">
          <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className="flex-1 overflow-y-auto bg-primary-dark scrollbar-hide">
          <div className="p-4 sm:p-6">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

