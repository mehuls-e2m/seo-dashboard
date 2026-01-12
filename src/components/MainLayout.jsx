import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark flex transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-primary-dark transition-colors">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

