import { useState, useEffect } from 'react'
import { getAdminUsers } from '../../services/api'
import { useToast } from '../../context/ToastContext'
import { exportToCSV } from '../../utils/exportToCSV'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAdminUsers()
        setUsers(res.data)
      } catch (error) {
        showToast('Gagal memuat data pengguna')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [showToast])

  const handleExport = () => {
    const exportData = users.map(u => ({
      ID: u.id,
      Nama: u.nama,
      Usia: u.usia,
      Gender: u.gender === 'L' ? 'Laki-laki' : 'Perempuan',
      Pendidikan: u.pendidikan,
      Kecamatan: u.kecamatan,
      'Pretest Score': u.pretest_score,
      Group: u.group,
      Admin: u.is_admin ? 'Ya' : 'Tidak',
      'Tanggal Daftar': new Date(u.created_at).toLocaleDateString('id-ID')
    }))
    exportToCSV(exportData, 'pengguna.csv')
  }

  if (loading) return <div>Memuat...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2>Manajemen Pengguna</h2>
          <p className="admin-content-subtitle">Lihat data lengkap peserta dan ekspor ke CSV untuk analisis lebih lanjut.</p>
        </div>
        <button className="export-btn" onClick={handleExport}>
          ⬇️ Ekspor CSV
        </button>
      </div>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Usia</th>
              <th>Gender</th>
              <th>Pendidikan</th>
              <th>Kecamatan</th>
              <th>Pretest</th>
              <th>Group</th>
              <th>Admin</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nama}</td>
                <td>{u.usia}</td>
                <td>{u.gender}</td>
                <td>{u.pendidikan}</td>
                <td>{u.kecamatan}</td>
                <td>{u.pretest_score}/15</td>
                <td>{u.group}</td>
                <td>{u.is_admin ? 'Ya' : 'Tidak'}</td>
                <td>{new Date(u.created_at).toLocaleDateString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers