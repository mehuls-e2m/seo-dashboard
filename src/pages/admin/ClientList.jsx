import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Eye, Edit, Trash2, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import ClientModal from '../../components/ClientModal'

export default function ClientList() {
  const { clients, managers, deleteClient } = useData()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSeoScoreColor = (score) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
    }
  }

  const handleView = (clientId) => {
    navigate(`/admin/clients/${clientId}`)
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setShowModal(true)
  }

  const handleDelete = (clientId) => {
    deleteClient(clientId)
    setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Clients</h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage all agency clients</p>
        </div>
        <button
          onClick={() => {
            setEditingClient(null)
            setShowModal(true)
          }}
          className="px-6 py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Client
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
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-[#2a2a2a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#1a1a1a] border-b border-gray-800">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Client Name</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">SEO Score</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden md:table-cell">Connected Sources</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden lg:table-cell">Manager</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Status</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => {
                  const manager = managers.find((m) => m.id === client.managerId)
                  return (
                    <tr 
                      key={client.id} 
                      className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                      onClick={(e) => {
                        // Don't trigger if clicking on action buttons
                        if (!e.target.closest('button')) {
                          handleView(client.id)
                        }
                      }}
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-white font-medium text-sm sm:text-base hover:text-primary-orange transition-colors">
                          {client.name}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`font-semibold text-sm sm:text-base ${getSeoScoreColor(client.seoScore)}`}>
                          {client.seoScore}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 flex-wrap">
                          {client.sources?.analytics && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Analytics</span>
                          )}
                          {client.sources?.ads && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Ads</span>
                          )}
                          {client.sources?.searchConsole && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">SC</span>
                          )}
                          {!client.sources?.analytics && !client.sources?.ads && !client.sources?.searchConsole && (
                            <span className="text-gray-500 text-xs">None</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                        <span className="text-gray-300 text-sm">
                          {manager ? manager.name : <span className="text-gray-500">Unassigned</span>}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(client.status)}
                          <span className="text-gray-300 capitalize text-sm sm:text-base">{client.status}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleView(client.id)}
                            className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(client)}
                            className="p-1.5 sm:p-2 text-primary-orange hover:bg-primary-orange/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(client.id)}
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
                    No clients found
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
              <h3 className="text-xl font-semibold text-white mb-4">Delete Client</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this client? This action cannot be undone.
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
        <ClientModal
          client={editingClient}
          onClose={() => {
            setShowModal(false)
            setEditingClient(null)
          }}
        />
      )}
    </div>
  )
}


