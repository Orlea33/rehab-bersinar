import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PreTest from '../components/PreTest';
import { register } from '../services/api';
import { ArrowLeft, ArrowRight, Rocket, Bot } from 'lucide-react';

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: '', password: '', usia: '', gender: '', pendidikan: '', kecamatan: '',
    informedConsent: false, format: '', waktu: '', topik: ''
  });
  const [pretestAnswers, setPretestAnswers] = useState({});
  const [pretestScore, setPretestScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const validateStep1 = () => {
    const { nama, password, usia, gender, pendidikan, kecamatan, informedConsent } = formData;
    if (!nama || !password || !usia || !gender || !pendidikan || !kecamatan || !informedConsent) {
      alert('Harap isi semua data dan setujui informed consent');
      return false;
    }
    if (password.length < 6) {
      alert('Password minimal 6 karakter');
      return false;
    }
    return true;
  };

  const isStep1ValidForNavigation = () => {
    const { nama, password, usia, gender, pendidikan, kecamatan, informedConsent } = formData;
    if (!nama || !password || !usia || !gender || !pendidikan || !kecamatan || !informedConsent) return false;
    if (password.length < 6) return false;
    return true;
  };

  const isPretestCompleted = () => Object.keys(pretestAnswers || {}).length > 0;

  const validateStep3 = () => {
    const { format, waktu, topik } = formData;
    if (!format || !waktu || !topik) {
      alert('Harap isi semua preferensi belajar');
      return false;
    }
    return true;
  };

  const handleGoToStep = (targetStep) => {
    if (targetStep === 1) {
      setStep(1)
      return
    }

    if (targetStep === 2) {
      if (!isStep1ValidForNavigation()) {
        validateStep1()
        return
      }
      setStep(2)
      return
    }

    if (targetStep === 3) {
      if (!isStep1ValidForNavigation()) {
        validateStep1()
        return
      }
      if (!isPretestCompleted()) {
        alert('Selesaikan pre-test terlebih dahulu sebelum mengisi preferensi.')
        return
      }
      setStep(3)
    }
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handlePretestComplete = (answers, score) => {
    setPretestAnswers(answers);
    setPretestScore(score);
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!validateStep1()) {
      setStep(1)
      return
    }
    if (!validateStep3()) return;

    setLoading(true);
    try {
      const payload = {
        nama: formData.nama,
        password: formData.password,
        usia: parseInt(formData.usia),
        gender: formData.gender,
        pendidikan: formData.pendidikan,
        kecamatan: formData.kecamatan,
        informed_consent: formData.informedConsent,
        pretest_answers: pretestAnswers,
        pretest_score: pretestScore,
        preferensi_format: formData.format,
        preferensi_waktu: parseInt(formData.waktu),
        preferensi_topik: formData.topik
      };

      await register(payload);         // registrasi
      await login(formData.nama, formData.password); // auto login

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Registrasi gagal: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assessment-container">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <h2>Assessment Awal</h2>
        <p>Isi data berikut untuk analisis sistem rekomendasi</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <button
          type="button"
          className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
          id="step-1-indicator"
          onClick={() => handleGoToStep(1)}
        >
          <div className="step-number">1</div>
          <div className="step-label">Registrasi</div>
        </button>

        <button
          type="button"
          className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
          id="step-2-indicator"
          disabled={!isStep1ValidForNavigation()}
          onClick={() => handleGoToStep(2)}
        >
          <div className="step-number">2</div>
          <div className="step-label">Pre-test</div>
        </button>

        <button
          type="button"
          className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}
          id="step-3-indicator"
          disabled={!isStep1ValidForNavigation() || !isPretestCompleted()}
          onClick={() => handleGoToStep(3)}
        >
          <div className="step-number">3</div>
          <div className="step-label">Preferensi</div>
        </button>

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
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6 0-10-8-10-8a21.73 21.73 0 0 1 5.06-7.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.88 9.88a3 3 0 0 0 4.24 4.24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 4c6 0 10 8 10 8a21.8 21.8 0 0 1-4.13 5.02"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1l22 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path
                      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Usia</label>
              <input type="number" id="usia" min="15" max="60" placeholder="Silahkan masukkan usia anda" value={formData.usia} onChange={handleChange} />
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
                <option value="wanea">Wanea</option>
                <option value="paal2">Paal II</option>
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

          <button className="btn btn-white" onClick={handleNext} style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            Daftar & Lanjut <ArrowRight size={16} />
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

          {/* <div className="form-group">
            <label>Waktu luang per hari untuk belajar (menit):</label>
            <input type="number" id="waktu" min="10" max="180" placeholder="30" value={formData.waktu} onChange={handleChange} />
          </div> */}

          <div className="form-group">
            <label>Topik yang paling ingin Anda pelajari:</label>
            <select id="topik" value={formData.topik} onChange={handleChange}>
              <option value="">Pilih...</option>
              <option value="program">Pengenalan Rehabilitasi</option>
              <option value="pengetahuan">Dampak Narkoba bagi kesehatan</option>
              <option value="kesehatan">Metode Terapi</option>
              <option value="keluarga">Peran Keluarga</option>
              <option value="pencegahan">Pencegahan Relaps</option>
              <option value="pola hidup sehat">Pola hidup sehat</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={handlePrev} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Kembali
            </button>
            <button className="btn btn-white" onClick={handleSubmit} disabled={loading} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading ? 'Memproses...' : <><Rocket size={16} /> Selesai & Lihat Dashboard</>}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: RF Processing (khusus kelompok A) */}
      {step === 4 && (
        <div className="rf-processing active" id="rf-processing">
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={20} /> Random Forest Processing
          </h3>
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