import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [clients, setClients] = useState([])
  const [managers, setManagers] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    // Load mock data from localStorage or initialize
    const storedClients = localStorage.getItem('clients')
    const storedManagers = localStorage.getItem('managers')

    if (storedClients) {
      setClients(JSON.parse(storedClients))
    } else {
      // Initialize with mock data
      const initialClients = [
        {
          id: 1,
          name: 'Acme Corporation',
          seoScore: 78,
          status: 'active',
          managerId: 2,
          sources: { analytics: true, ads: false, searchConsole: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'TechStart Inc',
          seoScore: 65,
          status: 'active',
          managerId: 2,
          sources: { analytics: true, ads: true, searchConsole: false },
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Global Services',
          seoScore: 92,
          status: 'active',
          managerId: null,
          sources: { analytics: false, ads: false, searchConsole: false },
          createdAt: new Date().toISOString(),
        },
      ]
      setClients(initialClients)
      localStorage.setItem('clients', JSON.stringify(initialClients))
    }

    if (storedManagers) {
      setManagers(JSON.parse(storedManagers))
    } else {
      const initialManagers = [
        { id: 2, name: 'John Manager', email: 'manager@leadgear.com', clients: [1, 2] },
      ]
      setManagers(initialManagers)
      localStorage.setItem('managers', JSON.stringify(initialManagers))
    }
  }, [])

  const addClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      seoScore: 0,
      status: 'active',
      sources: { analytics: false, ads: false, searchConsole: false },
    }
    const updatedClients = [...clients, newClient]
    setClients(updatedClients)
    localStorage.setItem('clients', JSON.stringify(updatedClients))
    return newClient
  }

  const updateClient = (id, updates) => {
    const updatedClients = clients.map((client) =>
      client.id === id ? { ...client, ...updates } : client
    )
    setClients(updatedClients)
    localStorage.setItem('clients', JSON.stringify(updatedClients))
  }

  const deleteClient = (id) => {
    const updatedClients = clients.filter((client) => client.id !== id)
    setClients(updatedClients)
    localStorage.setItem('clients', JSON.stringify(updatedClients))
  }

  const addManager = (managerData) => {
    const newManager = {
      ...managerData,
      id: Date.now(),
      clients: [],
    }
    const updatedManagers = [...managers, newManager]
    setManagers(updatedManagers)
    localStorage.setItem('managers', JSON.stringify(updatedManagers))
    return newManager
  }

  const updateManager = (id, updates) => {
    const updatedManagers = managers.map((manager) =>
      manager.id === id ? { ...manager, ...updates } : manager
    )
    setManagers(updatedManagers)
    localStorage.setItem('managers', JSON.stringify(updatedManagers))
  }

  const deleteManager = (id) => {
    // Unassign all clients from this manager
    const updatedClients = clients.map((client) =>
      client.managerId === id ? { ...client, managerId: null } : client
    )
    setClients(updatedClients)
    localStorage.setItem('clients', JSON.stringify(updatedClients))
    
    // Delete the manager
    const updatedManagers = managers.filter((manager) => manager.id !== id)
    setManagers(updatedManagers)
    localStorage.setItem('managers', JSON.stringify(updatedManagers))
  }

  const assignClientToManager = (clientId, managerId) => {
    updateClient(clientId, { managerId })
  }

  const getClientsForUser = () => {
    if (user?.role === 'admin') {
      return clients
    }
    return clients.filter((client) => client.managerId === user?.id)
  }

  return (
    <DataContext.Provider
      value={{
        clients,
        managers,
        addClient,
        updateClient,
        deleteClient,
        addManager,
        updateManager,
        deleteManager,
        assignClientToManager,
        getClientsForUser,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

