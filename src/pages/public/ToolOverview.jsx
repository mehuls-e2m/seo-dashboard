import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { ArrowRight, Shield, Users, BarChart3, Moon, Sun } from 'lucide-react'

export default function ToolOverview() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={theme === 'dark' ? '/dark-logo-leadgear.png' : '/light-logo-leadgear.png'}
              alt="LEADGEAR"
              className="h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          <Link
            to="/login"
            className="px-6 py-2 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
          Agency Internal <span className="text-primary-orange">SEO Dashboard</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto transition-colors">
          Manage clients, monitor SEO health, and track analytics all in one powerful platform.
          Built exclusively for agency teams.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-orange hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
            <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary-orange" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Internal agency tool. No client access. Invite-based authentication for team members.
            </p>
          </div>

          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
            <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary-orange" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors">Comprehensive SEO</h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Technical SEO, on-page optimization, off-page analysis, and local SEO tracking.
            </p>
          </div>

          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
            <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary-orange" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors">Team Management</h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Assign clients to account managers. Track performance and workload distribution.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 dark:text-gray-400 text-sm transition-colors">
          <p>© 2024 LEADGEAR. Internal agency tool.</p>
        </div>
      </footer>
    </div>
  )
}

