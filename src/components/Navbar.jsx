import { Link, useLocation, useNavigate } from 'react-router-dom' // <-- tambahkan useNavigate
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate() // <-- inisialisasi navigate
  const { user, login } = useAuth()

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar')
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = (userData) => {
    // Simulasi login, nanti diganti dengan panggilan API
    const dummyUser = {
      id: Date.now().toString(),
      nama: userData.nama,
      group: Math.random() < 0.5 ? 'A' : 'B' // contoh random
    }
    login(dummyUser)
    navigate('/dashboard') // <-- arahkan ke dashboard setelah login
  }

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <div className="logo-icon">🌿</div>
            RehabBersinar
          </Link>
          
          <ul className={`nav-links ${menuOpen ? 'show' : ''}`} id="navLinks">
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Beranda</Link></li>
            <li><Link to="/assessment" className={isActive('/assessment') ? 'active' : ''}>Assessment</Link></li>
            <li><Link to="/education" className={isActive('/education') ? 'active' : ''}>Edukasi</Link></li>
            <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>Tentang</Link></li>
            {!user ? (
              <li>
                <button className="btn-nav" onClick={() => setIsLoginModalOpen(true)}>
                  Login
                </button>
              </li>
            ) : (
              <li><Link to="/dashboard" className="btn-nav">Halo, {user.nama}</Link></li>
            )}
          </ul>
          
          <button className="mobile-menu-btn" id="mobileMenuBtn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

export default Navbar