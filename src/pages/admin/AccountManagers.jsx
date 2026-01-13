import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Mail, Users, Eye, Edit, Trash2 } from 'lucide-react'
import ManagerModal from '../../components/ManagerModal'

export default function AccountManagers() {
  const { managers, clients, deleteManager } = useData()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingManager, setEditingManager] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getManagerStats = (managerId) => {
    const managerClients = clients.filter((c) => c.managerId === managerId)
    const avgScore = managerClients.length > 0
      ? Math.round(managerClients.reduce((sum, c) => sum + c.seoScore, 0) / managerClients.length)
      : 0
    const issues = managerClients.filter((c) => c.seoScore < 70).length
    return { clientCount: managerClients.length, avgScore, issues }
  }

  const handleView = (managerId) => {
    navigate(`/admin/managers/${managerId}`)
  }

  const handleEdit = (manager) => {
    setEditingManager(manager)
    setShowModal(true)
  }

  const handleDelete = (managerId) => {
    deleteManager(managerId)
    setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Account Managers</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your team members</p>
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

      {/* Search */}
      <div className="bg-[#2a2a2a] rounded-xl p-4 border border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search managers by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
          />
        </div>
      </div>

      {/* Managers Table */}
      <div className="bg-[#2a2a2a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#1a1a1a] border-b border-gray-800">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Name</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden md:table-cell">Email</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Clients</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden lg:table-cell">Avg SEO Score</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden lg:table-cell">Issues</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredManagers.length > 0 ? (
                filteredManagers.map((manager) => {
                  const stats = getManagerStats(manager.id)
                  return (
                    <tr key={manager.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-orange" />
                          </div>
                          <span className="text-white font-medium text-sm sm:text-base truncate">{manager.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm truncate">{manager.email}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-white font-semibold text-sm sm:text-base">{stats.clientCount}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                        <span className={`font-semibold text-sm sm:text-base ${
                          stats.avgScore >= 70 ? 'text-green-400' : stats.avgScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {stats.avgScore}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                        <span className="text-red-400 font-semibold text-sm sm:text-base">{stats.issues}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleView(manager.id)}
                            className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(manager)}
                            className="p-1.5 sm:p-2 text-primary-orange hover:bg-primary-orange/20 rounded-lg transition-colors"
                            title="Update"
                          >
                            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(manager.id)}
                            className="p-1.5 sm:p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                    {searchTerm ? 'No managers found matching your search' : 'No account managers yet'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2a2a] rounded-xl border border-gray-800 w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Delete Account Manager</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this account manager? This action cannot be undone and will unassign all their clients.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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


