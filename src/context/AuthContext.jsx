import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Cek sessionStorage saat pertama load
    const storedUserId = sessionStorage.getItem('rehabUserId')
    if (storedUserId) {
      // Fetch user data from API (nanti)
      // Untuk sementara, kita set dummy
      setUser({ id: storedUserId, nama: 'User', group: 'A' })
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    sessionStorage.setItem('rehabUserId', userData.id)
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('rehabUserId')
  }

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)