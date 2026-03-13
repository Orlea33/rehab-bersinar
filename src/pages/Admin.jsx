import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminUsers from '../components/admin/AdminUsers'
import AdminMaterials from '../components/admin/AdminMaterials'
import AdminFeedbacks from '../components/admin/AdminFeedbacks'
import AdminSettings from '../components/admin/AdminSettings'
import './Admin.css'

const Admin = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    if (!user) {
      navigate('/assessment')
      showToast('Silakan login terlebih dahulu')
    } else if (!user.is_admin) {
      navigate('/dashboard')
      showToast('Anda tidak memiliki akses ke halaman admin')
    }
  }, [user, navigate, showToast])

  if (!user || !user.is_admin) return null

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Pengguna
          </li>
          <li className={activeTab === 'materials' ? 'active' : ''} onClick={() => setActiveTab('materials')}>
            📚 Materi
          </li>
          <li className={activeTab === 'feedbacks' ? 'active' : ''} onClick={() => setActiveTab('feedbacks')}>
            💬 Feedback
          </li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            ⚙️ Settings
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'materials' && <AdminMaterials />}
        {activeTab === 'feedbacks' && <AdminFeedbacks />}
        {activeTab === 'settings' && <AdminSettings />}
      </div>
    </div>
  )
}

export default Admin