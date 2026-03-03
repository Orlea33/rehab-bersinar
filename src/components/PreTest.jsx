import React, { useState } from 'react';
import questions from '../data/questions';

const PreTest = ({ onComplete, initialAnswers = {} }) => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentPage, setCurrentPage] = useState(0);
  
  const questionsPerPage = 3;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  
  const startIdx = currentPage * questionsPerPage;
  const endIdx = startIdx + questionsPerPage;
  const currentQuestions = questions.slice(startIdx, endIdx);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Hitung skor
      let score = 0;
      questions.forEach(q => {
        if (answers[q.id] === 'correct') score++;
      });
      onComplete(answers, score);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Cek apakah semua pertanyaan di halaman ini sudah dijawab
  const isCurrentPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);

  return (
    <div className="form-step active">
      <h3 style={{ marginBottom: '1.5rem' }}>Pre-test Pengetahuan Dasar</h3>
      
      {/* Indikator Halaman */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem' 
      }}>
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
                transition: 'background-color 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Pertanyaan per halaman */}
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

      {/* Tombol Navigasi */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {currentPage > 0 && (
          <button className="btn btn-outline" onClick={handlePrev} style={{ flex: 1 }}>
            ← Sebelumnya
          </button>
        )}
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
          {currentPage === totalPages - 1 ? 'Selesai' : 'Selanjutnya'} →
        </button>
      </div>
    </div>
  );
};

export default PreTest;