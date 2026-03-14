import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span>🎓</span>
          <span>Penelitian Skripsi 2025 - Kota Manado</span>
        </div>
        <h1>Rehabilitasi untuk Hidup yang Lebih Baik</h1>
        <p>Platform edukasi personalisasi berbasis Machine Learning (Random Forest) untuk meningkatkan pemahaman masyarakat tentang rehabilitasi narkoba.</p>
        <div className="hero-buttons">
          <button className="btn btn-white" onClick={() => window.location.href='/assessment'}>
            <span>🚀</span>
            Mulai Assessment
          </button>
          <button className="btn btn-outline" onClick={() => window.location.href='/education'}>
            <span>📚</span>
            Jelajahi Materi
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero