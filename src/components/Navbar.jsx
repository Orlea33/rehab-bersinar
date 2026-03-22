import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'
import { GiHealing } from 'react-icons/gi'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
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

  const handleLoginSuccess = (userData) => {
    if (userData.is_admin) {
      navigate('/admin')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <div className="logo-icon logo-icon-clean">
              <GiHealing size={24} color="#5f6ac1" />
            </div>
            RehabBersinar
          </Link>
          
          <ul className={`nav-links ${menuOpen ? 'show' : ''}`} id="navLinks">
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Beranda</Link></li>
            <li><Link to="/assessment" className={isActive('/assessment') ? 'active' : ''}>Assessment</Link></li>
            <li><Link to="/education" className={isActive('/education') ? 'active' : ''}>Edukasi</Link></li>
            <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>Tentang</Link></li>
            {user && user.is_admin && (
              <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''}>Admin</Link></li>
            )}
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
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}

export default Navbar