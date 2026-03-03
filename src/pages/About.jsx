const About = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="comparison-section">
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Tentang Penelitian</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <strong>Judul:</strong> Analisis Sistem Rekomendasi Berbasis Random Forest untuk Edukasi 
          Rehabilitasi Narkoba di Masyarakat Kota Manado
        </p>
        
        <h3 style={{ margin: '2rem 0 1rem' }}>Tujuan Penelitian</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
          <li>Mengembangkan sistem rekomendasi edukasi berbasis Random Forest</li>
          <li>Mengukur efektivitas personalisasi konten terhadap pemahaman masyarakat</li>
          <li>Membandingkan hasil belajar antara kelompok RF dan non-RF</li>
          <li>Menyediakan platform edukasi yang valid untuk BNN Kota Manado</li>
        </ul>

        <h3 style={{ margin: '2rem 0 1rem' }}>Metodologi</h3>
        <div style={{ background: 'var(--light-gray)', padding: '1.5rem', borderRadius: '8px' }}>
          <p><strong>Desain:</strong> Randomized Controlled Trial (RCT)</p>
          <p><strong>Sample:</strong> 100-200 responden masyarakat Manado</p>
          <p><strong>Alokasi:</strong> Simple randomization (1:1)</p>
          <p><strong>Durasi:</strong> 4 minggu intervensi</p>
          <p><strong>Analisis:</strong> Independent t-test, ANCOVA, Mann-Whitney U</p>
        </div>
      </div>
    </div>
  )
}

export default About