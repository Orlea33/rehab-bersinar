import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import ContentCard from '../components/ContentCard'
import ContentDetailModal from '../components/ContentDetailModal'
import {
  getContents,
  getRecommendations,
  getUserProgress,
  getUserAchievements,
  submitPosttest,
  getUserWeeklyActivity,
  updateUserProfile,
  submitFeedback
} from '../services/api'
import questionsData from '../data/questions'

// ==================== SVG ICON HELPER ====================
const Icon = ({ name }) => {
  const icons = {
    overview: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    recommendations: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 0 1 10 10h-7V5l-3-3z"></path></svg>,
    all: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    progress: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    achievements: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
    posttest: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  };
  return icons[name] || null;
};

// ==================== SIDEBAR ====================
const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const isGroupA = user?.group === 'A'
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <div className="avatar" id="dashboardAvatar">
          {user?.nama?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="user-info-text">
          <div className="user-name" id="dashboardName">{user?.nama || 'Andi Wijaya'}</div>
          <div className="user-group" id="dashboardGroup">
            {isGroupA ? 'Grup A - Personal' : 'Grup B - Bebas'}
          </div>
        </div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <a href="#" className={activeTab === 'overview' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('overview') }}>
            <span className="sidebar-icon"><Icon name="overview" /></span>
            <span className="sidebar-label">Overview</span>
          </a>
        </li>
        {isGroupA ? (
          <li>
            <a href="#" className={activeTab === 'recommendations' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('recommendations') }}>
              <span className="sidebar-icon"><Icon name="recommendations" /></span>
              <span className="sidebar-label">Rekomendasi</span>
            </a>
          </li>
        ) : (
          <li>
            <a href="#" className={activeTab === 'all' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('all') }}>
              <span className="sidebar-icon"><Icon name="all" /></span>
              <span className="sidebar-label">Materi</span>
            </a>
          </li>
        )}
        <li>
          <a href="#" className={activeTab === 'progress' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('progress') }}>
            <span className="sidebar-icon"><Icon name="progress" /></span>
            <span className="sidebar-label">Progress</span>
          </a>
        </li>
        <li>
          <a href="#" className={activeTab === 'achievements' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('achievements') }}>
            <span className="sidebar-icon"><Icon name="achievements" /></span>
            <span className="sidebar-label">Achievements</span>
          </a>
        </li>
        <li>
          <a href="#" className={activeTab === 'posttest' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('posttest') }}>
            <span className="sidebar-icon"><Icon name="posttest" /></span>
            <span className="sidebar-label">Post-Test</span>
          </a>
        </li>
        <li>
          <a href="#" className={activeTab === 'settings' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('settings') }}>
            <span className="sidebar-icon"><Icon name="settings" /></span>
            <span className="sidebar-label">Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  )
}

// ==================== DASHBOARD A - OVERVIEW ====================
const DashboardAOverview = ({ recommended, other, onCardClick }) => {
  return (
    <div className="dashboard-section">
      <div className="dashboard-section-header">
        <div>
          <h2>🎯 Rekomendasi Personal Untukmu</h2>
          <p>Dipilih otomatis oleh model Random Forest berdasarkan profil dan aktivitas belajar kamu.</p>
        </div>
        <div className="dashboard-section-chip">
          <span className="chip-dot" /> Mode Kelompok A • Rekomendasi adaptif
        </div>
      </div>

      <div className="content-grid dashboard-grid">
        {recommended.map(content => (
          <ContentCard
            key={content.id}
            content={content}
            showConfidence={true}
            onClick={() => onCardClick(content)}
          />
        ))}
      </div>

      <div className="dashboard-section-sub">
        <div className="dashboard-section-sub-header">
          <h3>Materi Lainnya</h3>
          <p>Eksplorasi materi tambahan di luar rekomendasi utama untuk memperluas wawasanmu.</p>
        </div>
        <div className="content-grid dashboard-grid">
          {other.map(content => (
            <ContentCard
              key={content.id}
              content={content}
              onClick={() => onCardClick(content)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== DASHBOARD B - OVERVIEW ====================
const DashboardBOverview = ({ contents, onCardClick }) => {
  return (
    <div className="dashboard-section">
      <div className="dashboard-section-header">
        <div>
          <h2>📚 Semua Materi Edukasi</h2>
          <p>Akses bebas ke seluruh konten edukasi. Pilih materi sesuai kebutuhanmu.</p>
        </div>
        <div className="dashboard-section-chip">
          <span className="chip-dot" /> Mode Kelompok B • Akses bebas
        </div>
      </div>

      <div className="content-grid dashboard-grid">
        {contents.map(content => (
          <ContentCard
            key={content.id}
            content={content}
            onClick={() => onCardClick(content)}
          />
        ))}
      </div>
    </div>
  )
}

// ==================== REKOMENDASI PAGE (khusus Grup A) ====================
const RecommendationsPage = ({ recommendations, onCardClick }) => {
  return (
    <div className="dashboard-section recommendations-page">
      <div className="dashboard-section-header">
        <div>
          <h2>🤖 Semua Rekomendasi (Random Forest)</h2>
          <p>
            Daftar lengkap materi yang disarankan untukmu, sudah diurutkan dari yang paling relevan.
            Lihat juga alasan dan confidence score di setiap kartu.
          </p>
        </div>
      </div>

      <div className="content-grid dashboard-grid">
        {recommendations.map(item => (
          <div key={item.materi.id} className="recommendation-item">
            <ContentCard
              content={item.materi}
              showConfidence={true}
              onClick={() => onCardClick(item.materi)}
            />
            <div className="recommendation-reason">
              <strong>🧠 Alasan:</strong> {item.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== PROGRESS ====================
// Komponen ini sekarang menggunakan user dari props, tapi API dipanggil tanpa parameter
// ==================== PROGRESS ====================
const Progress = ({ user, refreshKey }) => {
  const { showToast } = useToast()
  const [progress, setProgress] = useState(null)
  const [weekData, setWeekData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, activityRes] = await Promise.all([
          getUserProgress(),
          getUserWeeklyActivity()
        ])
        setProgress(progressRes.data)
        setWeekData(activityRes.data)
      } catch (error) {
        showToast('Gagal memuat data progress')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [showToast, refreshKey])

  if (loading) return <div className="progress-modern"><div className="stats-bar-loading">Memuat progress...</div></div>
  if (!progress) return <div className="progress-modern"><div className="stats-bar-loading">Gagal memuat data.</div></div>

  const { total_materi, completed_count, total_duration, streak, consistency, pretest_score, posttest_score } = progress
  const percentage = total_materi > 0 ? Math.round((completed_count / total_materi) * 100) : 0
  const totalMinutes = Math.round(total_duration / 60)
  const todayDayName = new Date().toLocaleDateString('id-ID', { weekday: 'short' });

  const statCards = [
    { emoji: '⏱️', num: totalMinutes, label: 'Menit Belajar', color: '#10B981' },
    { emoji: '🔥', num: streak, label: 'Hari Streak', color: '#EF4444' },
    { emoji: '📊', num: `${consistency}%`, label: 'Konsistensi', color: '#3B82F6' },
    { emoji: '🏆', num: posttest_score || '-', label: 'Skor Akhir', color: '#F59E0B' }
  ];

  return (
    <div className="progress-universal">
      <div className="progress-header-flex">
        <h2 className="progress-title">📈 Ringkasan Belajar</h2>
        <div className="user-badge-premium">Grup {user?.group || 'B'}</div>
      </div>

      <div className="progress-top-grid">
        {/* Ringkasan Utama dengan Animasi Lingkaran */}
        <div className="main-stats-card">
          <div className="circular-container">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle-fill" strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="percentage-display">
              <span className="pct-num">{percentage}%</span>
              <span className="pct-label">Progres</span>
            </div>
          </div>
          <div className="stats-info-text">
            <h3>Halo, {user?.nama?.split(' ')[0]}!</h3>
            <p>Modul Selesai: <strong>{completed_count}/{total_materi}</strong></p>
            <div className="test-badge-container">
              <span className="test-pill">Pre: {pretest_score}</span>
              <span className="test-pill">Post: {posttest_score || '-'}</span>
            </div>
          </div>
        </div>

        {/* Kartu Statistik - Swipe di Mobile, Grid di Desktop */}
        <div className="stats-cards-scroll-container">
          <div className="stats-cards-track">
            {statCards.map((card, i) => (
              <div key={i} className="interactive-stat-card" style={{"--card-accent": card.color}}>
                <div className="stat-card-icon">{card.emoji}</div>
                <div className="stat-card-data">
                  <span className="data-val">{card.num}</span>
                  <span className="data-lbl">{card.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grafik Aktivitas Interaktif */}
      <div className="activity-chart-card">
        <div className="activity-header">
          <h3>Aktivitas Minggu Ini</h3>
          <span className="total-time-tag">{totalMinutes} Menit</span>
        </div>
        <div className="chart-bars-flex">
          {weekData.map((item) => {
            const maxVal = Math.max(...weekData.map(d => d.minutes), 1);
            const barHeight = (item.minutes / maxVal) * 100;
            const todayDayName = new Date().toLocaleDateString('id-ID', { weekday: 'short' });
            const isToday = item.day === todayDayName;
            return (
              <div key={item.day} className={`bar-item ${isToday ? 'active-today' : ''}`}>
                <div className="bar-column">
                  <div className="bar-fill-animated" style={{ height: `${barHeight}%` }}>
                    {item.minutes > 0 && <span className="bar-tooltip">{item.minutes}m</span>}
                  </div>
                </div>
                <span className="bar-name">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

// ==================== ACHIEVEMENTS ====================
// Komponen ini menggunakan user dari props, API tanpa parameter
const Achievements = ({ user }) => {
  const { showToast } = useToast()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await getUserAchievements() // tanpa parameter
        setAchievements(res.data)
      } catch (error) {
        showToast('Gagal memuat achievements')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [showToast])

  if (loading) {
    return (
      <div className="achievements-modern">
        <div className="stats-bar-loading">Memuat daftar pencapaian kamu...</div>
      </div>
    )
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length

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
                <span className="unlocked-date">✅ Terbuka</span>
              ) : (
                <div className="achievement-progress-modern">
                  <div className="progress-bar-ach">
                    <div style={{ width: `${(ach.progress / ach.total) * 100}%` }}></div>
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
// Menerima prop user, tapi submitPosttest tanpa user_id
// ==================== POST-TEST ====================
const PostTest = ({ onComplete, user }) => {
  const { showToast } = useToast()
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkPosttest = async () => {
      try {
        const res = await getUserProgress()
        if (res.data.posttest_score !== null) {
          setAlreadySubmitted(true)
        }
      } catch (error) {
        console.error('Gagal mengecek post-test', error)
      } finally {
        setLoading(false)
      }
    }
    checkPosttest()
  }, [])

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

  const handleSubmit = async () => {
    let score = 0
    questionsData.forEach(q => {
      if (answers[q.id] === 'correct') score++
    })

    try {
      await submitPosttest({ answers, score })
      onComplete(score, answers)
      setSubmitted(true)
      showToast(`✅ Post-test selesai! Skor: ${score}/${questionsData.length}`)
    } catch (error) {
      showToast('Gagal menyimpan post-test')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="assessment-container posttest-modern">
        <div className="stats-bar-loading">Memuat status post-test...</div>
      </div>
    )
  }

  if (alreadySubmitted) {
    return (
      <div className="assessment-container posttest-summary">
        <h2>📝 Post-Test Sudah Dikerjakan</h2>
        <p>Anda telah menyelesaikan post-test. Terima kasih.</p>
        <p>Skor Anda dapat dilihat di halaman Progress.</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="assessment-container posttest-summary">
        <h2>📝 Post-Test Selesai</h2>
        <p>Terima kasih telah mengerjakan post-test.</p>
        <p>Skor Anda: {Object.values(answers).filter(v => v === 'correct').length}/{questionsData.length}</p>
      </div>
    )
  }

  return (
    <div className="assessment-container posttest-modern">
      <h2>📝 Post-Test Pengetahuan</h2>
      <p>Jawablah pertanyaan berikut untuk mengukur pemahaman Anda setelah belajar.</p>

      <div className="posttest-header">
        <span>Halaman {currentPage + 1} dari {totalPages}</span>
        <div className="posttest-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              className={`dot ${idx === currentPage ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {currentQuestions.map((q, index) => (
        <div key={q.id} className="form-group posttest-question">
          <label>{startIdx + index + 1}. {q.text}</label>
          <select
            value={answers[q.id] || ''}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
          >
            <option value="">Pilih jawaban...</option>
            {q.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="posttest-actions">
        {currentPage > 0 && (
          <button className="btn btn-outline" onClick={handlePrev}>
            ← Sebelumnya
          </button>
        )}
        {currentPage < totalPages - 1 ? (
          <button
            className="btn btn-white"
            onClick={handleNext}
            disabled={!isCurrentPageComplete}
          >
            Selanjutnya →
          </button>
        ) : (
          <button
            className="btn btn-white"
            onClick={handleSubmit}
            disabled={!isCurrentPageComplete}
          >
            Selesai & Kirim
          </button>
        )}
      </div>
    </div>
  )
}

// ==================== SETTINGS ====================
// Menerima prop user, tapi panggilan API tanpa userId
const Settings = ({ user, onLogout }) => {
  const { showToast } = useToast()
  const [nama, setNama] = useState(user?.nama || '')
  const [usia, setUsia] = useState(user?.usia || '')
  const [gender, setGender] = useState(user?.gender || '')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSaveProfile = async () => {
    if (!nama || !usia || !gender) {
      showToast('Semua field profil harus diisi')
      return
    }
    setLoading(true)
    try {
      // updateUserProfile tanpa userId
      await updateUserProfile({ nama, usia: parseInt(usia), gender })
      showToast('✅ Profil berhasil diperbarui')
    } catch (error) {
      showToast('Gagal memperbarui profil')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (rating < 1 || rating > 5) {
      showToast('Rating harus antara 1-5')
      return
    }
    setLoading(true)
    try {
      // submitFeedback tanpa user_id
      await submitFeedback({ rating, comment })
      showToast('Terima kasih atas feedback Anda!')
      setComment('')
      setRating(5)
    } catch (error) {
      showToast('Gagal mengirim feedback')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="settings-modern">
      <h2>⚙️ Pengaturan Akun</h2>

      <div className="settings-section-modern">
        <h3>Feedback & Penilaian</h3>
        <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
          Bantu kami meningkatkan platform dengan memberikan penilaian dan komentar Anda.
        </p>
        <div className="settings-form">
          <div className="form-group-modern">
            <label>Rating (1-5)</label>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2rem' }}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => !loading && setRating(star)}
                  style={{
                    cursor: loading ? 'not-allowed' : 'pointer',
                    color: star <= rating ? '#F59E0B' : '#e5e7eb'
                  }}
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
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid #e5e7eb',
                borderRadius: '18px',
                resize: 'vertical'
              }}
            />
          </div>
          <button
            className="btn-save-modern"
            onClick={handleSubmitFeedback}
            disabled={loading}
          >
            {loading ? 'Mengirim...' : 'Kirim Feedback'}
          </button>
        </div>
      </div>

      <div className="settings-section-modern danger">
        <h3>Logout</h3>
        <button
          className="btn-danger-modern"
          onClick={onLogout}
          disabled={loading}
        >
          🚪 Keluar dari Akun
        </button>
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
  const [recommended, setRecommended] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [allContents, setAllContents] = useState([])
  const [selectedContent, setSelectedContent] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const [refreshProgressKey, setRefreshProgressKey] = useState(0);

  const refreshProgress = () => {
    setRefreshProgressKey(prev => prev + 1);
  };


  useEffect(() => {
    if (!user) {
      navigate('/assessment')
      return
    }

    const fetchData = async () => {
      try {
        const contentsRes = await getContents()
        setAllContents(contentsRes.data)

        if (user.group === 'A') {
          // getRecommendations tanpa parameter
          const recRes = await getRecommendations()
          setRecommendations(recRes.data)
          setRecommended(recRes.data.slice(0, 3).map(item => ({
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
  }, [user, navigate, showToast])

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout()
      navigate('/')
    }
  }

  const handlePostTestComplete = async (score, answers) => {
    try {
      // submitPosttest tanpa user_id
      await submitPosttest({ answers, score })
      showToast('✅ Post-test berhasil disimpan!')
    } catch (error) {
      showToast('Gagal menyimpan post-test')
      console.error(error)
    }
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
        {activeTab === 'progress' && <Progress user={user} refreshKey={refreshProgressKey} />}
        {activeTab === 'achievements' && <Achievements user={user} />}
        {activeTab === 'posttest' && <PostTest onComplete={handlePostTestComplete} user={user} />}
        {activeTab === 'settings' && <Settings user={user} onLogout={handleLogout} />}
      </div>
      {showModal && (
        <ContentDetailModal
          content={selectedContent}
          onClose={() => setShowModal(false)}
          user={user}
          onInteractionComplete={refreshProgress}
        />
      )}
    </div>
  )
}

export default Dashboard