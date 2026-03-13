import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminSettings = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Yakin ingin logout?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Pengaturan Admin</h2>
      <div className="settings-section">
        <h3>Akun Admin</h3>
        <p><strong>Nama:</strong> {user?.nama}</p>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Group:</strong> {user?.group}</p>
        <p><strong>Status Admin:</strong> Ya</p>
        <button className="btn-danger-modern" onClick={handleLogout} style={{ marginTop: '1rem' }}>
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

export default AdminSettings