import { useState } from 'react'
import { login as apiLogin } from '../services/api' // impor fungsi login
import './LoginModal.css'

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [nama, setNama] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await apiLogin({ nama, password })
      onLoginSuccess(response.data) // kirim data user ke Navbar
      onClose()
    } catch (err) {
      setError(err.response?.data?.detail || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login ke RehabBersinar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
            Batal
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal