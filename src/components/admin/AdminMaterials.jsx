import { useState, useEffect } from 'react'
import { getContents, createMateri, updateMateri, deleteMateri } from '../../services/api'
import { useToast } from '../../context/ToastContext'

const AdminMaterials = () => {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '',
    type: 'artikel',
    duration: 5,
    icon: '',
    description: '',
    fullDescription: '',
    videoUrl: '',
    imageUrl: '',
    category: '',
    content: '',
    sources: []
  })
  const { showToast } = useToast()

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const res = await getContents()
      setMaterials(res.data)
    } catch (error) {
      showToast('Gagal memuat materi')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await updateMateri(editing.id, form)
        showToast('Materi berhasil diperbarui')
      } else {
        await createMateri(form)
        showToast('Materi berhasil ditambahkan')
      }
      setShowForm(false)
      setEditing(null)
      setForm({ title: '', type: 'artikel', duration: 5, icon: '', description: '', fullDescription: '', videoUrl: '', imageUrl: '', category: '', content: '', sources: [] })
      fetchMaterials()
    } catch (error) {
      showToast('Gagal menyimpan materi')
    }
  }

  const handleEdit = (m) => {
    setEditing(m)
    setForm({
      title: m.title,
      type: m.type,
      duration: m.duration,
      icon: m.icon || '',
      description: m.description || '',
      fullDescription: m.fullDescription || '',
      videoUrl: m.videoUrl || '',
      imageUrl: m.imageUrl || '',
      category: m.category || '',
      content: m.content || '',
      sources: m.sources || []
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus materi ini?')) return
    try {
      await deleteMateri(id)
      showToast('Materi dihapus')
      fetchMaterials()
    } catch (error) {
      showToast('Gagal menghapus materi')
    }
  }

  if (loading) return <div>Memuat...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Manajemen Materi</h2>
        <button className="btn btn-white" onClick={() => { setEditing(null); setForm({ title: '', type: 'artikel', duration: 5, icon: '', description: '', fullDescription: '', videoUrl: '', imageUrl: '', category: '', content: '', sources: [] }); setShowForm(true) }}>
          + Tambah Materi
        </button>
      </div>

      {showForm && (
        <div className="admin-form">
          <h3>{editing ? 'Edit Materi' : 'Tambah Materi'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Judul</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Tipe</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="artikel">Artikel</option>
                  <option value="video">Video</option>
                  <option value="infografis">Infografis</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Durasi (menit)</label>
                <input type="number" name="duration" value={form.duration} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Icon (emoji)</label>
                <input name="icon" value={form.icon} onChange={handleChange} placeholder="🎥" />
              </div>
            </div>
            <div className="form-group">
              <label>Deskripsi singkat</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="2"></textarea>
            </div>
            <div className="form-group">
              <label>Deskripsi lengkap</label>
              <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows="4"></textarea>
            </div>
            <div className="form-group">
              <label>Konten (untuk artikel)</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows="6"></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>URL Video (jika video)</label>
                <input name="videoUrl" value={form.videoUrl} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>URL Gambar</label>
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Kategori</label>
              <input name="category" value={form.category} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sumber (JSON array, contoh: {`[{"name":"BNN","link":"https://..."}]`})</label>
              <textarea name="sources" value={JSON.stringify(form.sources)} onChange={(e) => {
                try {
                  setForm({ ...form, sources: JSON.parse(e.target.value) })
                } catch { }
              }} rows="2"></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-white">Simpan</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Batal</button>
            </div>
          </form>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Tipe</th>
            <th>Durasi</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.title}</td>
              <td>{m.type}</td>
              <td>{m.duration} menit</td>
              <td>{m.category}</td>
              <td>
                <button onClick={() => handleEdit(m)}>✏️ Edit</button>
                <button onClick={() => handleDelete(m.id)}>🗑️ Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMaterials