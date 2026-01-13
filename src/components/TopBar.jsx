import { useState, useRef, useEffect } from 'react'
import { LogOut, User, Menu, ChevronDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <div className="bg-[#2a2a2a] border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <User className="w-5 h-5 text-primary-orange hidden sm:block" />
        <div className="hidden sm:block">
          <div className="text-white font-medium">{user?.name}</div>
          <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
        </div>
        <div className="sm:hidden text-white font-medium">{user?.name}</div>
      </div>
      
      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-orange/20 rounded-full flex items-center justify-center border border-primary-orange/30">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-orange" />
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#2a2a2a] border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-orange/20 rounded-full flex items-center justify-center border border-primary-orange/30">
                  <User className="w-5 h-5 text-primary-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">{user?.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-sm text-white truncate">{user?.email}</div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

