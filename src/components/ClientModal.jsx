import { useState, useEffect } from 'react'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import { X, User } from 'lucide-react'

export default function ClientModal({ client, onClose }) {
  const { addClient, updateClient, managers } = useData()
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    status: 'active',
    managerId: '',
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        website: client.website || '',
        status: client.status || 'active',
        managerId: client.managerId || '',
      })
    }
  }, [client])

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      managerId: isAdmin 
        ? (formData.managerId ? parseInt(formData.managerId) : null)
        : (client?.managerId || user?.id), // For managers, keep existing managerId or use their own ID
    }
    if (client) {
      updateClient(client.id, submitData)
    } else {
      // Managers can't create new clients, only admins can
      if (isAdmin) {
        addClient(submitData)
      }
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a2a] rounded-xl border border-gray-800 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {client ? 'Edit Client' : 'Add New Client'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              placeholder="Enter client name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Manager {!client && <span className="text-red-400">*</span>}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.managerId}
                  onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                  required={!client && isAdmin}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                >
                  <option value="">Select Account Manager</option>
                  {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
                    </option>
                  ))}
                </select>
              </div>
              {!client && managers.length === 0 && (
                <p className="text-xs text-yellow-400 mt-1">No account managers available. Please add one first.</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              {client ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


