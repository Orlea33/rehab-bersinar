import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import ContentCard from '../components/ContentCard'
import ContentDetailModal from '../components/ContentDetailModal'
import { getContents, getRecommendations } from '../services/api'
import questionsData from '../data/questions'

// ==================== SIDEBAR ====================
const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const isGroupA = user?.group === 'A'
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <div className="avatar" id="dashboardAvatar">
          {user?.nama?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="user-name" id="dashboardName">{user?.nama || 'Andi Wijaya'}</div>
        <div className="user-group" id="dashboardGroup">
          {isGroupA ? 'Kelompok A - Rekomendasi Personal (Random Forest)' : 'Kelompok B - Akses Bebas (Kontrol)'}
        </div>
      </div>
      
      <ul className="sidebar-menu">
        <li><a href="#" className={activeTab === 'overview' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('overview') }}>📊 Overview</a></li>
        {isGroupA ? (
          <li><a href="#" className={activeTab === 'recommendations' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('recommendations') }}>🤖 Rekomendasi</a></li>
        ) : (
          <li><a href="#" className={activeTab === 'all' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('all') }}>📚 Semua Materi</a></li>
        )}
        <li><a href="#" className={activeTab === 'progress' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('progress') }}>📈 Progress</a></li>
        <li><a href="#" className={activeTab === 'achievements' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('achievements') }}>🏆 Achievements</a></li>
        <li><a href="#" className={activeTab === 'posttest' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('posttest') }}>📝 Post-Test</a></li>
        <li><a href="#" className={activeTab === 'settings' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('settings') }}>⚙️ Settings</a></li>
      </ul>
    </aside>
  )
}

// ==================== DASHBOARD A - OVERVIEW ====================
const DashboardAOverview = ({ recommended, other, onCardClick }) => {
  return (
    <>
      <h2 style={{ marginBottom: '1.5rem' }}>Rekomendasi Personal Untukmu</h2>
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {recommended.map(content => (
          <ContentCard 
            key={content.id} 
            content={content} 
            showConfidence={true}
            onClick={() => onCardClick(content)}
          />
        ))}
      </div>
      <h3 style={{ margin: '2rem 0 1rem' }}>Materi Lainnya</h3>
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {other.map(content => (
          <ContentCard 
            key={content.id} 
            content={content}
            onClick={() => onCardClick(content)}
          />
        ))}
      </div>
    </>
  )
}

// ==================== DASHBOARD B - OVERVIEW ====================
const DashboardBOverview = ({ contents, onCardClick }) => {
  return (
    <>
      <h2 style={{ marginBottom: '1.5rem' }}>Semua Materi Edukasi</h2>
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {contents.map(content => (
          <ContentCard 
            key={content.id} 
            content={content}
            onClick={() => onCardClick(content)}
          />
        ))}
      </div>
    </>
  )
}

// ==================== REKOMENDASI PAGE (khusus Grup A) ====================
const RecommendationsPage = ({ recommendations, onCardClick }) => {
  return (
    <div className="recommendations-page">
      <h2>🤖 Semua Rekomendasi (Random Forest)</h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--gray)' }}>
        Berikut adalah semua materi yang direkomendasikan untuk Anda, diurutkan dari yang paling cocok. 
        Setiap materi disertai dengan confidence score dan alasan rekomendasi berdasarkan profil Anda.
      </p>
      <div className="content-grid">
        {recommendations.map(item => (
          <div key={item.materi.id} className="recommendation-item">
            <ContentCard 
              content={item.materi} 
              showConfidence={true}
              onClick={() => onCardClick(item.materi)}
            />
            <div className="recommendation-reason" style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.9rem', 
              color: 'var(--gray)', 
              background: '#f0f9ff', 
              padding: '0.75rem', 
              borderRadius: '8px',
              borderLeft: '4px solid var(--accent)'
            }}>
              <strong>🧠 Alasan:</strong> {item.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== PROGRESS ====================
const Progress = ({ user }) => {
  // Data dummy progress, nanti bisa diganti dengan data dari backend
  const completedCount = 2; // contoh
  const totalModules = 6;
  const percentage = Math.round((completedCount / totalModules) * 100);
  const streak = 3;
  const totalMinutes = 45;

  const weekData = [
    { day: 'Sen', minutes: 20 },
    { day: 'Sel', minutes: 45 },
    { day: 'Rab', minutes: 70 },
    { day: 'Kam', minutes: 30 },
    { day: 'Jum', minutes: 0 },
    { day: 'Sab', minutes: 0 },
    { day: 'Min', minutes: 0 },
  ];

  const topics = [
    { name: 'Fundamental', progress: 100 },
    { name: 'Kesehatan', progress: 30 },
    { name: 'Terapi', progress: 0 },
    { name: 'Dukungan', progress: 0 },
  ];

  return (
    <div className="progress-modern">
      <h2 className="progress-title">📈 Progress Belajar</h2>
      
      <div className="progress-grid">
        <div className="progress-card highlight">
          <div className="circular-progress-modern">
            <svg viewBox="0 0 36 36">
              <path className="circle-bg-modern" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle-fill-modern" strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="circle-text">
              <span className="big-number">{percentage}%</span>
              <span>Overall</span>
            </div>
          </div>
          <div className="progress-details">
            <p><strong>{completedCount}/{totalModules}</strong> modul selesai</p>
            <p>Estimasi sisa: <strong>3 hari</strong></p>
          </div>
        </div>

        <div className="stats-grid-modern">
          <div className="stat-card-modern">
            <span className="stat-emoji">⏱️</span>
            <div>
              <span className="stat-num">{totalMinutes}</span>
              <span className="stat-label">Menit</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <span className="stat-emoji">🔥</span>
            <div>
              <span className="stat-num">{streak}</span>
              <span className="stat-label">Streak</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <span className="stat-emoji">📊</span>
            <div>
              <span className="stat-num">85%</span>
              <span className="stat-label">Konsistensi</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <span className="stat-emoji">🏆</span>
            <div>
              <span className="stat-num">3</span>
              <span className="stat-label">Achievements</span>
            </div>
          </div>
        </div>
      </div>

      <div className="activity-modern">
        <h3>Aktivitas Minggu Ini</h3>
        <div className="chart-modern">
          {weekData.map((item, i) => {
            const heightPercent = Math.min(100, (item.minutes / 70) * 100); // 70 sebagai maks contoh
            return (
              <div key={item.day} className="chart-bar">
                <div className="bar-fill" style={{ height: `${heightPercent}%` }}></div>
                <span>{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="topic-breakdown-modern">
        <h3>Progress per Topik</h3>
        <div className="topic-list-modern">
          {topics.map(topic => (
            <div key={topic.name} className="topic-item-modern">
              <div><span>{topic.name}</span> <span>{topic.progress}%</span></div>
              <div className="topic-bar-modern">
                <div style={{ width: `${topic.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== ACHIEVEMENTS ====================
const Achievements = () => {
  const achievements = [
    { icon: "🌟", name: "First Step", desc: "Selesaikan 1 modul", unlocked: true, date: "2 hari lalu" },
    { icon: "📖", name: "Bookworm", desc: "Baca 3 artikel", unlocked: true, date: "Kemarin" },
    { icon: "🎥", name: "Video Learner", desc: "Tonton 2 video", unlocked: true, date: "Hari ini" },
    { icon: "🔥", name: "On Fire", desc: "7 hari streak", unlocked: false, progress: 3, total: 7 },
    { icon: "🏆", name: "Master", desc: "Selesaikan semua modul", unlocked: false, progress: 2, total: 6 },
    { icon: "🧠", name: "Knowledge Keeper", desc: "Post-test >90%", unlocked: false, progress: 0, total: 1 },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="achievements-modern">
      <div className="achievements-header-modern">
        <h2>🏆 Achievements</h2>
        <div className="achievement-counter">
          <span className="counter-num">{unlockedCount}</span>/<span>{achievements.length}</span> Terbuka
        </div>
      </div>

      <div className="achievement-grid-modern">
        {achievements.map(ach => (
          <div key={ach.name} className={`achievement-card-modern ${ach.unlocked ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon-modern">{ach.icon}</div>
            <div className="achievement-info">
              <h4>{ach.name}</h4>
              <p>{ach.desc}</p>
              {ach.unlocked ? (
                <span className="unlocked-date">✅ {ach.date}</span>
              ) : (
                <div className="achievement-progress-modern">
                  <div className="progress-bar-ach">
                    <div style={{ width: `${(ach.progress/ach.total)*100}%` }}></div>
                  </div>
                  <span>{ach.progress}/{ach.total}</span>
                </div>
              )}
            </div>
            {!ach.unlocked && <div className="lock-icon">🔒</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== POST-TEST ====================
const PostTest = ({ onComplete }) => {
  const { showToast } = useToast()
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const questionsPerPage = 5
  const totalPages = Math.ceil(questionsData.length / questionsPerPage)
  const startIdx = currentPage * questionsPerPage
  const endIdx = startIdx + questionsPerPage
  const currentQuestions = questionsData.slice(startIdx, endIdx)

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const isCurrentPageComplete = currentQuestions.every(q => answers[q.id] !== undefined)

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    let score = 0
    questionsData.forEach(q => {
      if (answers[q.id] === 'correct') score++
    })
    onComplete(score, answers)
    setSubmitted(true)
    showToast(`✅ Post-test selesai! Skor: ${score}/${questionsData.length}`)
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>📝 Post-Test Selesai</h2>
        <p>Terima kasih telah mengerjakan post-test.</p>
        <p>Skor Anda: {Object.values(answers).filter(v => v === 'correct').length}/{questionsData.length}</p>
        <button className="btn btn-white" onClick={() => setSubmitted(false)}>Lihat Kembali Jawaban</button>
      </div>
    )
  }

  return (
    <div className="assessment-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>📝 Post-Test Pengetahuan</h2>
      <p style={{ marginBottom: '1rem' }}>Jawablah pertanyaan berikut untuk mengukur pemahaman Anda setelah belajar.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span>Halaman {currentPage + 1} dari {totalPages}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: idx === currentPage ? 'var(--primary)' : '#e5e7eb',
              }}
            />
          ))}
        </div>
      </div>

      {currentQuestions.map((q, index) => (
        <div key={q.id} className="form-group" style={{ marginBottom: '2rem' }}>
          <label>{startIdx + index + 1}. {q.text}</label>
          <select
            value={answers[q.id] || ''}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">Pilih jawaban...</option>
            {q.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {currentPage > 0 && (
          <button className="btn btn-outline" onClick={handlePrev} style={{ flex: 1 }}>
            ← Sebelumnya
          </button>
        )}
        {currentPage < totalPages - 1 ? (
          <button
            className="btn btn-white"
            onClick={handleNext}
            disabled={!isCurrentPageComplete}
            style={{
              flex: 1,
              opacity: isCurrentPageComplete ? 1 : 0.5,
              cursor: isCurrentPageComplete ? 'pointer' : 'not-allowed'
            }}
          >
            Selanjutnya →
          </button>
        ) : (
          <button
            className="btn btn-white"
            onClick={handleSubmit}
            disabled={!isCurrentPageComplete}
            style={{
              flex: 1,
              opacity: isCurrentPageComplete ? 1 : 0.5,
              cursor: isCurrentPageComplete ? 'pointer' : 'not-allowed'
            }}
          >
            Selesai & Kirim
          </button>
        )}
      </div>
    </div>
  )
}

// ==================== SETTINGS ====================
const Settings = ({ user, onLogout }) => {
  const { showToast } = useToast()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const handleSaveProfile = () => {
    showToast('✅ Profil diperbarui (simulasi)')
  }

  const handleSubmitFeedback = () => {
    showToast('Terima kasih atas feedback Anda!')
    setComment('')
    setRating(5)
  }

  return (
    <div className="settings-modern">
      <h2>⚙️ Pengaturan Akun</h2>

      <div className="settings-section-modern">
        <h3>Profil</h3>
        <div className="settings-form">
          <div className="form-group-modern">
            <label>Nama Lengkap</label>
            <input type="text" defaultValue={user?.nama || ''} placeholder="Nama Anda" />
          </div>
          <div className="form-row-modern">
            <div className="form-group-modern">
              <label>Usia</label>
              <input type="number" defaultValue={user?.usia || ''} placeholder="25" />
            </div>
            <div className="form-group-modern">
              <label>Jenis Kelamin</label>
              <select defaultValue={user?.gender || ''}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>
          <button className="btn-save-modern" onClick={handleSaveProfile}>Simpan Profil</button>
        </div>
      </div>

      <div className="settings-section-modern">
        <h3>Feedback & Penilaian</h3>
        <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>Bantu kami meningkatkan platform dengan memberikan penilaian dan komentar Anda.</p>
        <div className="settings-form">
          <div className="form-group-modern">
            <label>Rating (1-5)</label>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2rem' }}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ cursor: 'pointer', color: star <= rating ? '#F59E0B' : '#e5e7eb' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="form-group-modern">
            <label>Komentar / Saran</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis komentar Anda di sini..."
              style={{ width: '100%', padding: '0.8rem', border: '2px solid #e5e7eb', borderRadius: '18px', resize: 'vertical' }}
            />
          </div>
          <button className="btn-save-modern" onClick={handleSubmitFeedback}>Kirim Feedback</button>
        </div>
      </div>

      <div className="settings-section-modern danger">
        <h3>Logout</h3>
        <button className="btn-danger-modern" onClick={onLogout}>🚪 Keluar dari Akun</button>
      </div>
    </div>
  )
}

// ==================== DASHBOARD UTAMA ====================
const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [recommended, setRecommended] = useState([])        // untuk overview A
  const [recommendations, setRecommendations] = useState([]) // untuk halaman rekomendasi
  const [allContents, setAllContents] = useState([])
  const [postTestScore, setPostTestScore] = useState(null)
  const [selectedContent, setSelectedContent] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/assessment')
      return
    }

    const fetchData = async () => {
      try {
        // Ambil semua materi
        const contentsRes = await getContents()
        setAllContents(contentsRes.data)

        // Jika grup A, ambil rekomendasi
        if (user.group === 'A') {
          const recRes = await getRecommendations(user.id)
          // recRes.data adalah array { materi, confidence, reason }
          setRecommendations(recRes.data)
          // Untuk overview, ambil 3 teratas
          setRecommended(recRes.data.slice(0,3).map(item => ({
            ...item.materi,
            confidence: item.confidence,
            recommended: true
          })))
        }
      } catch (error) {
        showToast('Gagal memuat data')
        console.error(error)
      }
    }

    fetchData()

    const savedScore = localStorage.getItem('postTestScore')
    if (savedScore) {
      setPostTestScore(JSON.parse(savedScore))
    }
  }, [user, navigate, showToast])

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout()
      navigate('/')
    }
  }

  const handlePostTestComplete = (score, answers) => {
    setPostTestScore(score)
    localStorage.setItem('postTestScore', JSON.stringify(score))
    // TODO: kirim ke backend via submitPosttest jika diperlukan
  }

  const handleCardClick = (content) => {
    setSelectedContent(content)
    setShowModal(true)
  }

  if (!user) return null

  const isGroupA = user.group === 'A'

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <div className="main-content" id="dashboard-content">
        {activeTab === 'overview' && (
          isGroupA 
            ? <DashboardAOverview 
                recommended={recommended} 
                other={allContents.filter(c => !recommended.some(r => r.id === c.id))} 
                onCardClick={handleCardClick} 
              />
            : <DashboardBOverview contents={allContents} onCardClick={handleCardClick} />
        )}
        {isGroupA && activeTab === 'recommendations' && (
          <RecommendationsPage recommendations={recommendations} onCardClick={handleCardClick} />
        )}
        {!isGroupA && activeTab === 'all' && (
          <DashboardBOverview contents={allContents} onCardClick={handleCardClick} />
        )}
        {activeTab === 'progress' && <Progress user={user} />}
        {activeTab === 'achievements' && <Achievements />}
        {activeTab === 'posttest' && <PostTest onComplete={handlePostTestComplete} />}
        {activeTab === 'settings' && <Settings user={user} onLogout={handleLogout} />}
      </div>
      {showModal && (
        <ContentDetailModal 
          content={selectedContent} 
          onClose={() => setShowModal(false)} 
          user={user} 
        />
      )}
    </div>
  )
}

export default Dashboard