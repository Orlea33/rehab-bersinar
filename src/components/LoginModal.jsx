import { useState } from 'react'
import './LoginModal.css' // optional, styling

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [nama, setNama] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Di sini nantinya bisa ditambahkan validasi ke API
    // Untuk sementara, kita langsung panggil onLogin dengan data
    onLogin({ nama, password })
    onClose()
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
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
          <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal