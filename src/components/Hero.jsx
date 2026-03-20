import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge animate-fade-in-up">
          <span className="badge-icon">🎓</span>
          <span>Penelitian Skripsi 2025 - Kota Manado</span>
        </div>
        <h1 className="animate-fade-in-up delay-100">
          Rehabilitasi untuk <span className="text-gradient">Hidup yang Lebih Baik</span>
        </h1>
        <p className="animate-fade-in-up delay-200">
          Platform edukasi personalisasi berbasis Machine Learning (Random Forest) untuk meningkatkan pemahaman masyarakat tentang rehabilitasi narkoba.
        </p>
        <div className="hero-buttons animate-fade-in-up delay-300">
          <button className="btn btn-primary btn-glow" onClick={() => navigate('/assessment')}>
            <span className="btn-icon">🚀</span>
            Mulai Assessment
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/education')}>
            <span className="btn-icon">📚</span>
            Jelajahi Materi
          </button>
        </div>
      </div>
      
      <div className="hero-visual animate-fade-in-up delay-200">
        <div className="visual-card main-card">
          <div className="card-header">
            <div className="dots"><span></span><span></span><span></span></div>
          </div>
          <div className="card-body">
             <div className="abstract-rf">
               <div className="tree-node root"></div>
               <div className="branch-left"></div>
               <div className="branch-right"></div>
               <div className="tree-node child-left"></div>
               <div className="tree-node child-right"></div>
             </div>
             <p className="visual-title">Random Forest ML</p>
             <div className="progress-bar-mock"><div className="fill"></div></div>
          </div>
        </div>
        <div className="visual-card floating-card-1">
          <span className="emoji">📊</span>
          <span>Personalisasi 98%</span>
        </div>
        <div className="visual-card floating-card-2">
          <span className="emoji">🤝</span>
          <span>Edukasi Interaktif</span>
        </div>
      </div>

      <div className="hero-background">
         <div className="gradient-blob top-right"></div>
         <div className="gradient-blob bottom-left"></div>
      </div>
    </div>
  )
}

export default Hero;