import { useState, useEffect } from 'react'
import { getAdminFeedbacks } from '../../services/api'
import { useToast } from '../../context/ToastContext'
import { exportToCSV } from '../../utils/exportToCSV'

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await getAdminFeedbacks()
        setFeedbacks(res.data)
      } catch (error) {
        showToast('Gagal memuat feedback')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [showToast])
  
  const handleExport = () => {
  const exportData = feedbacks.map(f => ({
    ID: f.id,
    'User ID': f.user_id,
    Rating: f.rating,
    Komentar: f.comment || '-',
    Tanggal: new Date(f.created_at).toLocaleString('id-ID')
  }))
  exportToCSV(exportData, 'feedback.csv')
}

  if (loading) return <div>Memuat...</div>

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Feedback Pengguna</h2>
            <button className="export.btn" onClick={handleExport}>⬇️ Ekspor CSV</button>
        </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Rating</th>
            <th>Komentar</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.user_id}</td>
              <td>{'⭐'.repeat(f.rating)}</td>
              <td>{f.comment || '-'}</td>
              <td>{new Date(f.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminFeedbacks