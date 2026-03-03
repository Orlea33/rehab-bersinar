import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ContentCard from '../components/ContentCard'
import contentsData from '../data/contents'

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <div className="avatar" id="dashboardAvatar">
          {user?.nama?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="user-name" id="dashboardName">{user?.nama || 'Andi Wijaya'}</div>
        <div className="user-group" id="dashboardGroup">
          {user?.group === 'A' ? 'Kelompok A - RF Rekomendasi' : 'Kelompok B - Akses Bebas'}
        </div>
      </div>
      
      <ul className="sidebar-menu">
        <li><a href="#" className={activeTab === 'overview' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('overview') }}>📊 Overview</a></li>
        <li><a href="#" className={activeTab === 'learning' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('learning') }}>📚 Learning Path</a></li>
        <li><a href="#" className={activeTab === 'progress' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('progress') }}>📈 Progress</a></li>
        <li><a href="#" className={activeTab === 'achievements' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('achievements') }}>🏆 Achievements</a></li>
        <li><a href="#" className={activeTab === 'settings' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('settings') }}>⚙️ Settings</a></li>
      </ul>
    </aside>
  )
}

const DashboardA = ({ recommended, other }) => {
  return (
    <>
      <h2 style={{ marginBottom: '1.5rem' }}>Rekomendasi Personal Untukmu</h2>
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {recommended.map(content => (
          <ContentCard 
            key={content.id} 
            content={content} 
            showConfidence={true}
            onClick={() => alert(`Membuka: ${content.title}`)}
          />
        ))}
      </div>
      <h3 style={{ margin: '2rem 0 1rem' }}>Materi Lainnya</h3>
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {other.map(content => (
          <ContentCard 
            key={content.id} 
            content={content}
            onClick={() => alert(`Membuka: ${content.title}`)}
          />
        ))}
      </div>
    </>
  )
}

const DashboardB = ({ contents }) => {
  return (
    <>
      <h2 style={{ marginBottom: '1.5rem' }}>Semua Materi Edukasi</h2>
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {contents.map(content => (
          <ContentCard 
            key={content.id} 
            content={content}
            onClick={() => alert(`Membuka: ${content.title}`)}
          />
        ))}
      </div>
    </>
  )
}

const Dashboard = () => {
  const { user, logout } = useAuth()        // <-- tambahkan logout
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [recommended, setRecommended] = useState([])
  const [allContents, setAllContents] = useState([])

  useEffect(() => {
    if (!user) {
      navigate('/Assessment')
      return
    }
    setAllContents(contentsData)
    if (user.group === 'A') {
      setRecommended(contentsData.filter(c => c.recommended))
    }
  }, [user, navigate])

 const handleLogout = () => {
  if (window.confirm('Apakah Anda yakin ingin logout?')) {
    logout()
    navigate('/')
  }
}

  if (!user) return null

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <div className="main-content" id="dashboard-content">
        {activeTab === 'overview' && (
          user.group === 'A' 
            ? <DashboardA recommended={recommended} other={allContents.filter(c => !recommended.some(r => r.id === c.id))} />
            : <DashboardB contents={allContents} />
        )}
        {activeTab === 'learning' && <h2>Learning Path</h2>}
        {activeTab === 'progress' && <h2>Progress Belajar</h2>}
        {activeTab === 'achievements' && <h2>Achievements</h2>}
        {activeTab === 'settings' && (
          <div>
            <h2>Pengaturan</h2>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard