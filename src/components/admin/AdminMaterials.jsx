import { useState, useEffect } from 'react'
import { getContents, createMateri, updateMateri, deleteMateri } from '../../services/api'
import { useToast } from '../../context/ToastContext'
import { Plus, Edit, Trash2, FileText, Play, Image } from 'lucide-react'

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
  const [sourcesText, setSourcesText] = useState('')
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

    // Validasi dan parse Sumber/Referensi JSON pada saat submit
    let parsedSources = []
    if (sourcesText && sourcesText.trim() !== '') {
      try {
        parsedSources = JSON.parse(sourcesText)
        if (!Array.isArray(parsedSources)) {
          alert('Format Sumber/Referensi harus berupa array JSON (dimulai dengan [ dan diakhiri dengan ])')
          return
        }
      } catch (err) {
        alert('Format Sumber/Referensi JSON tidak valid! Pastikan tanda petik ganda dan struktur kurung siku sudah benar.')
        return
      }
    }

    // Buat payload dengan durasi integer yang valid untuk Pydantic/FastAPI
    const payload = {
      ...form,
      duration: parseInt(form.duration, 10) || 0,
      sources: parsedSources
    }

    try {
      if (editing) {
        await updateMateri(editing.id, payload)
        showToast('Materi berhasil diperbarui')
      } else {
        await createMateri(payload)
        showToast('Materi berhasil ditambahkan')
      }
      setShowForm(false)
      setEditing(null)
      setForm({ title: '', type: 'artikel', duration: 5, icon: '', description: '', fullDescription: '', videoUrl: '', imageUrl: '', category: '', content: '', sources: [] })
      setSourcesText('')
      fetchMaterials()
    } catch (error) {
      console.error('Gagal menyimpan materi:', error.response?.data || error.message)
      const detailError = error.response?.data?.detail
      const errorMessage = Array.isArray(detailError)
        ? detailError.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ')
        : detailError || error.message
      showToast(`Gagal menyimpan materi: ${errorMessage}`)
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
    setSourcesText(m.sources ? JSON.stringify(m.sources, null, 2) : '[]')
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2>Manajemen Materi</h2>
          <p className="admin-content-subtitle">Unggah, perbarui, atau hapus konten edukasi digital.</p>
        </div>
        <button className="btn btn-white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '999px', padding: '0.6rem 1.2rem' }} onClick={() => { setEditing(null); setForm({ title: '', type: 'artikel', duration: 5, icon: '', description: '', fullDescription: '', videoUrl: '', imageUrl: '', category: '', content: '', sources: [] }); setSourcesText('[]'); setShowForm(true) }}>
          <Plus size={16} />
          <span>Tambah Materi</span>
        </button>
      </div>

      {showForm && (
        <div className="admin-form">
          <h3>{editing ? 'Edit Materi' : 'Tambah Materi'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Judul</label>
                <input name="title" value={form.title} onChange={handleChange} required placeholder="Masukkan judul materi (misal: Pentingnya Rehabilitasi Medis)" />
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
                <input type="number" name="duration" value={form.duration} onChange={handleChange} required placeholder="Durasi pengerjaan dalam menit (misal: 10)" />
              </div>
              <div className="form-group">
                <label>Label Ikon</label>
                <input name="icon" value={form.icon} onChange={handleChange} placeholder="Label ikon (misal: Buku, Video, Infografis)" />
              </div>
            </div>
            <div className="form-group">
              <label>Deskripsi singkat</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="2" placeholder="Tuliskan ringkasan singkat materi untuk tampilan kartu list..."></textarea>
            </div>
            <div className="form-group">
              <label>Deskripsi lengkap</label>
              <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows="4" placeholder="Tuliskan deskripsi lengkap atau sinopsis materi untuk modal detail..."></textarea>
            </div>
            <div className="form-group">
              <label>Konten (untuk artikel)</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows="6" placeholder="Tuliskan isi artikel edukasi secara detail di sini (mendukung paragraf baru)..."></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>URL Video (jika tipe video)</label>
                <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="Contoh URL embed YouTube: https://www.youtube.com/embed/dQw4w9WgXcQ" />
              </div>
              <div className="form-group">
                <label>URL Gambar (jika tipe infografis)</label>
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Masukkan tautan gambar (misal: https://domain.com/infografis.jpg)" />
              </div>
            </div>
            <div className="form-group">
              <label>Kategori</label>
              <input name="category" value={form.category} onChange={handleChange} placeholder="Kategori/topik materi (misal: Terapi, Dampak Narkoba, Relasi)" />
            </div>
            <div className="form-group">
              <label>Sumber / Referensi (Format JSON Array)</label>
              <textarea name="sources" value={sourcesText} onChange={(e) => {
                setSourcesText(e.target.value)
                try {
                  const parsed = JSON.parse(e.target.value)
                  if (Array.isArray(parsed)) {
                    setForm(prev => ({ ...prev, sources: parsed }))
                  }
                } catch { }
              }} rows="2" placeholder='Contoh: [{"name": "BNN Manado", "link": "https://manadokota.bnn.go.id"}]'></textarea>
              <small style={{ color: 'var(--gray)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                Pastikan format sumber berupa array JSON yang valid seperti contoh placeholder di atas.
              </small>
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
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {m.type === 'artikel' && <FileText size={14} style={{ color: '#38bdf8' }} />}
                  {m.type === 'video' && <Play size={14} style={{ color: '#10b981' }} />}
                  {m.type === 'infografis' && <Image size={14} style={{ color: '#8b5cf6' }} />}
                  <span style={{ textTransform: 'capitalize' }}>{m.type}</span>
                </div>
              </td>
              <td>{m.duration} menit</td>
              <td>{m.category}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button onClick={() => handleEdit(m)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.75rem', color: '#38bdf8' }}>
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(m.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#f43f5e' }}>
                  <Trash2 size={14} />
                  <span>Hapus</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMaterials