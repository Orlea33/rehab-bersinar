import { useState, useEffect } from 'react'
import { getAdminStats } from '../../services/api'
import { useToast } from '../../context/ToastContext'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats()
        setStats(res.data)
      } catch (error) {
        showToast('Gagal memuat statistik')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [showToast])

  if (loading) return <div className="admin-loading">Memuat statistik...</div>
  if (!stats) return <div>Gagal memuat data</div>

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Admin</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total_users}</span>
          <span className="stat-label">Total Pengguna</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.total_materi}</span>
          <span className="stat-label">Total Materi</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.total_feedback}</span>
          <span className="stat-label">Total Feedback</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.avg_pretest}</span>
          <span className="stat-label">Rata Pretest</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.avg_posttest}</span>
          <span className="stat-label">Rata Posttest</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.group_a}</span>
          <span className="stat-label">Kelompok A</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.group_b}</span>
          <span className="stat-label">Kelompok B</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard