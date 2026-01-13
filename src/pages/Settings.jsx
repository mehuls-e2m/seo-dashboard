import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Shield, Bell, Key } from 'lucide-react'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage your account settings and preferences</p>
      </div>

      {/* Settings Cards - Two Side by Side, One Centered Below */}
      <div className="space-y-4 lg:space-y-6">
        {/* First Row: Profile and Security Side by Side */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Profile Settings */}
          <div className="bg-[#2a2a2a] rounded-xl p-4 sm:p-6 border border-gray-800 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary-orange" />
              <h2 className="text-xl font-semibold text-white">Profile Information</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  value={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  disabled
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="px-6 py-2 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-[#2a2a2a] rounded-xl p-4 sm:p-6 border border-gray-800 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary-orange" />
              <h2 className="text-xl font-semibold text-white">Security</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="px-6 py-2 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Notifications Full Width */}
        <div className="w-full">
          <div className="bg-[#2a2a2a] rounded-xl p-4 sm:p-6 border border-gray-800 w-full">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary-orange" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive email updates about your clients</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Critical Alerts</div>
                  <div className="text-sm text-gray-400">Get notified about critical SEO issues</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


