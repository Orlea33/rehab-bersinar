const StatsBar = () => {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-number">156</span>
        <span className="stat-label">Pengguna Terdaftar</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">12</span>
        <span className="stat-label">Materi Edukasi</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">85%</span>
        <span className="stat-label">Tingkat Pemahaman ↑</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">RF</span>
        <span className="stat-label">Algoritma Aktif</span>
      </div>
    </div>
  )
}

export default StatsBar