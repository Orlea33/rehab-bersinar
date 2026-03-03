import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PreTest from '../components/PreTest'// import komponen PreTest
// import api from '../services/api' nanti

const Assessment = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // step 1
    nama: '',
    password: '',
    usia: '',
    gender: '',
    pendidikan: '',
    kecamatan: '',
    informedConsent: false,
    // step 3
    format: '',
    waktu: '',
    topik: ''
  })
  const [pretestAnswers, setPretestAnswers] = useState({}) // obj jawaban
  const [pretestScore, setPretestScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }))
  }

  const validateStep1 = () => {
    const { nama, password, usia, gender, pendidikan, kecamatan, informedConsent } = formData
    if (!nama || !password || !usia || !gender || !pendidikan || !kecamatan || !informedConsent) {
      alert('Harap isi semua data dan setujui informed consent')
      return false
    }
    if (password.length < 6) {
      alert('Password minimal 6 karakter')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    const { format, waktu, topik } = formData
    if (!format || !waktu || !topik) {
      alert('Harap isi semua preferensi belajar')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    setStep(step + 1)
  }

  const handlePrev = () => {
    setStep(step - 1)
  }

  const handlePretestComplete = (answers, score) => {
    setPretestAnswers(answers)
    setPretestScore(score)
    setStep(3) // lanjut ke preferensi
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return

    setLoading(true)
    try {
      // Gabungkan data untuk dikirim ke backend
      const payload = {
        ...formData,
        pretestAnswers, // objek jawaban
        pretestScore
      }

      // TODO: ganti dengan API call
      // const res = await api.post('/register', payload)
      // login(res.data.user)

      // Simulasi sukses, grup random
      setTimeout(() => {
        const dummyUser = {
          id: 1,
          nama: formData.nama,
          group: Math.random() < 0.5 ? 'A' : 'B'
        }
        login(dummyUser)
        setLoading(false)
        // Jika grup A, tampilkan step 4 (RF processing)
        if (dummyUser.group === 'A') {
          setStep(4)
          setTimeout(() => {
            navigate('/dashboard')
          }, 4000)
        } else {
          navigate('/dashboard')
        }
      }, 1000)
    } catch (error) {
      alert('Gagal registrasi')
      setLoading(false)
    }
  }

  return (
    <div className="assessment-container">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <h2>Assessment Awal</h2>
        <p>Isi data berikut untuk analisis sistem rekomendasi</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} id="step-1-indicator">
          <div className="step-number">1</div>
          <div className="step-label">Registrasi</div>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`} id="step-2-indicator">
          <div className="step-number">2</div>
          <div className="step-label">Pre-test</div>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`} id="step-3-indicator">
          <div className="step-number">3</div>
          <div className="step-label">Preferensi</div>
        </div>
        <div className={`step ${step >= 4 ? 'active' : ''}`} id="step-4-indicator">
          <div className="step-number">4</div>
          <div className="step-label">RF Proses</div>
        </div>
      </div>

      {/* Step 1: Registrasi */}
      {step === 1 && (
        <div className="form-step active" id="step-1">
          <h3 style={{ marginBottom: '1.5rem' }}>Registrasi & Data Diri</h3>
          
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input type="text" id="nama" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" id="password" placeholder="Minimal 6 karakter" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Usia</label>
              <input type="number" id="usia" min="15" max="70" placeholder="25" value={formData.usia} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Jenis Kelamin</label>
              <select id="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Pilih...</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pendidikan Terakhir</label>
              <select id="pendidikan" value={formData.pendidikan} onChange={handleChange}>
                <option value="">Pilih...</option>
                <option value="1">SD/Sederajat</option>
                <option value="2">SMP/Sederajat</option>
                <option value="3">SMA/Sederajat</option>
                <option value="4">Diploma</option>
                <option value="5">Sarjana (S1)</option>
                <option value="6">Pascasarjana</option>
              </select>
            </div>
            <div className="form-group">
              <label>Kecamatan (Manado)</label>
              <select id="kecamatan" value={formData.kecamatan} onChange={handleChange}>
                <option value="">Pilih...</option>
                <option value="bunaken">Bunaken</option>
                <option value="malalayang">Malalayang</option>
                <option value="sario">Sario</option>
                <option value="tikala">Tikala</option>
                <option value="wenang">Wenang</option>
                <option value="singkil">Singkil</option>
                <option value="tuminting">Tuminting</option>
                <option value="mapanget">Mapanget</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="informedConsent" checked={formData.informedConsent} onChange={handleChange} />
              Saya menyetujui untuk berpartisipasi dalam penelitian ini dan data saya akan digunakan secara anonim.
            </label>
          </div>

          <button className="btn btn-white" onClick={handleNext} style={{ width: '100%', marginTop: '1rem' }}>
            Daftar & Lanjut →
          </button>
        </div>
      )}

      {/* Step 2: Pre-test (menggunakan komponen PreTest) */}
      {step === 2 && (
        <PreTest 
          onComplete={handlePretestComplete} 
          initialAnswers={pretestAnswers} 
        />
      )}

      {/* Step 3: Preferensi */}
      {step === 3 && (
        <div className="form-step active" id="step-3">
          <h3 style={{ marginBottom: '1.5rem' }}>Preferensi Belajar</h3>
          
          <div className="form-group">
            <label>Format konten yang paling Anda sukai:</label>
            <select id="format" value={formData.format} onChange={handleChange}>
              <option value="">Pilih...</option>
              <option value="video">Video (Visual/Auditori)</option>
              <option value="artikel">Artikel/Text (Reading)</option>
              <option value="infografis">Infografis (Visual Ringkas)</option>
              <option value="campuran">Campuran/Semua</option>
            </select>
          </div>

          <div className="form-group">
            <label>Waktu luang per hari untuk belajar (menit):</label>
            <input type="number" id="waktu" min="10" max="180" placeholder="30" value={formData.waktu} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Topik yang paling ingin Anda pelajari:</label>
            <select id="topik" value={formData.topik} onChange={handleChange}>
              <option value="">Pilih...</option>
              <option value="pengenalan">Pengenalan Rehabilitasi</option>
              <option value="dampak">Dampak Narkoba bagi kesehatan</option>
              <option value="terapi">Metode Terapi</option>
              <option value="keluarga">Peran Keluarga</option>
              <option value="pencegahan">Pencegahan Relaps</option>
              <option value="pencegahan">Pola hidup sehat</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={handlePrev} style={{ flex: 1 }}>
              ← Kembali
            </button>
            <button className="btn btn-white" onClick={handleSubmit} disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Memproses...' : '🚀 Selesai & Lihat Dashboard'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: RF Processing (khusus kelompok A) */}
      {step === 4 && (
        <div className="rf-processing active" id="rf-processing">
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>🤖 Random Forest Processing</h3>
          <p>Sistem sedang menganalisis 100 decision trees...</p>
          
          <div className="forest-container">
            <div className="tree"></div>
            <div className="tree"></div>
            <div className="tree"></div>
            <div className="tree"></div>
            <div className="tree"></div>
            <div className="tree"></div>
            <div className="tree"></div>
          </div>
          
          <div style={{ background: 'var(--light-gray)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
              <strong>Input Features:</strong><br />
              Usia: {formData.usia} | 
              Pendidikan: {formData.pendidikan === '1' ? 'SD' : formData.pendidikan === '2' ? 'SMP' : 'SMA'} | 
              Format: {formData.format} | 
              Pre-test: {pretestScore}/15
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Assessment