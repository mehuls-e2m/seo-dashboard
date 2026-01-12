import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Plus, Mail, Users, X } from 'lucide-react'
import ManagerModal from '../../components/ManagerModal'

export default function AccountManagers() {
  const { managers, clients, deleteManager } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingManager, setEditingManager] = useState(null)

  const getManagerStats = (managerId) => {
    const managerClients = clients.filter((c) => c.managerId === managerId)
    const avgScore = managerClients.length > 0
      ? Math.round(managerClients.reduce((sum, c) => sum + c.seoScore, 0) / managerClients.length)
      : 0
    const issues = managerClients.filter((c) => c.seoScore < 70).length
    return { clientCount: managerClients.length, avgScore, issues }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Account Managers</h1>
          <p className="text-gray-400">Manage your team members</p>
        </div>
        <button
          onClick={() => {
            setEditingManager(null)
            setShowModal(true)
          }}
          className="px-6 py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Manager
        </button>
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managers.length > 0 ? (
          managers.map((manager) => {
            const stats = getManagerStats(manager.id)
            return (
              <div key={manager.id} className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{manager.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{manager.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteManager(manager.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Clients</span>
                    </div>
                    <span className="text-white font-semibold">{stats.clientCount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Avg SEO Score</span>
                    <span className={`font-semibold ${
                      stats.avgScore >= 70 ? 'text-green-400' : stats.avgScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {stats.avgScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Clients with Issues</span>
                    <span className="text-red-400 font-semibold">{stats.issues}</span>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full bg-[#2a2a2a] rounded-xl p-12 border border-gray-800 text-center">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Account Managers</h3>
            <p className="text-gray-400 mb-6">Add your first account manager to get started.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              Add Manager
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <ManagerModal
          manager={editingManager}
          onClose={() => {
            setShowModal(false)
            setEditingManager(null)
          }}
        />
      )}
    </div>
  )
}

