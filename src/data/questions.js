// src/data/questions.js
const questions = [
  {
    id: 1,
    text: "Apa tujuan utama rehabilitasi narkoba?",
    options: [
      { value: "correct", label: "Memulihkan fisik, mental, dan sosial pengguna agar dapat kembali ke masyarakat" },
      { value: "wrong1", label: "Memberikan hukuman agar jera menggunakan narkoba lagi" },
      { value: "wrong2", label: "Mengisolasi pengguna dari masyarakat" }
    ]
  },
  {
    id: 2,
    text: "Tahap pertama dalam rehabilitasi medis adalah?",
    options: [
      { value: "correct", label: "Detoksifikasi (Pembersihan racun dari tubuh)" },
      { value: "wrong1", label: "Terapi kelompok dan konseling" },
      { value: "wrong2", label: "Konseling lanjutan" }
    ]
  },
  {
    id: 3,
    text: "Peran keluarga dalam rehabilitasi adalah?",
    options: [
      { value: "correct", label: "Memberikan dukungan emosional,motivasi dan menciptakan lingkungan positif" },
      { value: "wrong1", label: "Memberikan aturan ketat dan hukuman untuk setiap kesalahan agar pengguna takut mengulanginya" },
      { value: "wrong2", label: "Hanya mengawasi dan mengatur aktivitas pengguna tanpa mendengarkan atau memberi motivasi" }
    ]
  },
  {
    id: 4,
    text: "Dampak jangka panjang penggunaan narkoba jenis heroin pada sistem saraf pusat adalah?",
    options: [
      { value: "wrong1", label: "Peningkatan kecerdasan dan daya ingat" },
      { value: "wrong2", label: "Hanya membuat pengguna merasa rileks dan tenang tanpa efek negatif jangka panjang" },
      { value: "correct", label: "Kerusakan reseptor dopamin dan gangguan fungsi kognitif" }
    ]
  },
  {
    id: 5,
    text: "Menurut UU No. 35 Tahun 2009 tentang Narkotika, bagaimana pendekatan terhadap pecandu dan korban penyalahgunaan narkotika?",
    options: [
      { value: "wrong1", label: "Dapat dipidana, namun rehabilitasi diberikan setelah menjalani hukuman" },
      { value: "correct", label: "Wajib menjalani rehabilitasi medis dan sosial" },
      { value: "wrong2", label: "Dikenakan sanksi administratif tanpa perlu rehabilitasi medis" }
    ]
  },
  {
    id: 6,
    text: "Apa itu terapi kognitif perilaku (CBT)?",
    options: [
      { value: "wrong1", label: "Pemberian obat-obatan" },
      { value: "correct", label: "Terapi yang mengubah pola pikir dan perilaku" },
      { value: "wrong2", label: "Terapi fisik" }
    ]
  },
  {
    id: 7,
    text: "BNN (Badan Narkotika Nasional) memiliki kewenangan utama dalam?",
    options: [
      { value: "wrong1", label: " Menangani kasus narkoba" },
      { value: "wrong2", label: "memberikan sosialisasi dan edukasi narkotika kepada masyarakat" },
      { value: "correct", label: "Pencegahan, pemberantasan, penyalahgunaan, dan peredaran gelap narkotika" }
    ]
  },
  {
    id: 8,
    text: "Bagaimana cara mencegah relaps(Kambuh)?",
    options: [
      { value: "correct", label: "Menghindari pemicu dan membangun dukungan sosial" },
      { value: "wrong1", label: "Mengisolasi diri" },
      { value: "wrong2", label: "Mengganti narkoba dengan alkohol" }
    ]
  },
  {
    id: 9,
    text: "Mengapa seseorang yang sudah 'bersih' dari narkoba selama bulanan masih bisa mengalami keinginan kuat (craving) ketika melihat tempat tertentu?",
    options: [
      { value: "wrong1", label: "Karena keinginan tersebut menunjukkan kelemahan moral yang belum teratasi" },
      { value: "correct", label: "Karena adiksi mengubah struktur otak terkait memori dan asosiasi lingkungan" },
      { value: "wrong2", label: "Karena zat narkoba masih tersimpan dalam lemak tubuh dan aktif kembali" }
    ]
  },
  { 
    id: 10,
    text: "Kapan rehabilitasi rawat jalan menjadi pilihan yang tepat untuk seseorang?",
    options: [
      { value: "correct", label: "Kondisi kecanduan ringan hingga sedang dengan lingkungan rumah yang mendukung" },
      { value: "wrong1", label: "Kecanduan berat dengan gejala putus zat yang mengancam jiwa" },
      { value: "wrong2", label: "Hanya untuk mereka yang sudah pernah rehabilitasi rawat inap sebelumnya" }
    ]
  },
  {
    id: 11,
    text: "Apa perbedaan utama Intervensi Berbasis Masyarakat (IBM) dengan pendekatan penegakan hukum dalam penanganan narkotika?",
    options: [
      { value: "correct", label: "IBM melibatkan partisipasi aktif masyarakat untuk pencegahan dan rehabilitasi, bukan hanya penindakan" },
      { value: "wrong1", label: "IBM menggantikan seluruh peran penegakan hukum dalam kasus narkotika" },
      { value: "wrong2", label: "IBM berfokus pada sosialisasi tanpa keterlibatan proses rehabilitas" }
    ]
  },
  {
    id: 12,
    text: "Faktor apa yang menentukan apakah seseorang memerlukan rehabilitasi rawat inap atau cukup rawat jalan ?",
    options: [
      { value: "wrong1", label: "Jenis narkoba yang digunakan menentukan semua keputusan rehabilitasi tanpa melihat kondisi pasien" },
      { value: "wrong2", label: "Semua pengguna yang pernah overdosis otomatis harus rawat inap, meski kondisinya stabil" },
      { value: "correct", label: "Tingkat keparahan kecanduan, stabilitas kondisi medis, dan dukungan lingkungan rumah" }
    ]
  },
  {
    id: 13,
    text: "Apa yang dimaksud dengan Adiksi?",
    options: [
      { value: "wrong1", label: "Hanya keinginan sesaat untuk mencoba sesuatu yang baru" },
      { value: "correct", label: "Kondisi ketergantungan fisik dan psikologis terhadap zat atau perilaku tertentu" },
      { value: "wrong2", label: "Kebiasaan rutin yang tidak berdampak negatif sama sekali" }
    ]
  },
  {
    id: 14,
    text: "Apa yang dimaksud dengan coping strategy dalam rehabilitasi narkotika?",
    options: [
      { value: "wrong1", label: "Coping strategy adalah mekanisme pertahanan diri yang terjadi secara tidak sadar untuk melindungi diri dari kecemasan" },
      { value: "correct", label: "Coping strategy adalah cara cara mengelola stres (stressor), emosi negatif, godaan agar tidak kembali menggunakan narkotika" },
      { value: "wrong2", label: "Strategi bertahan hidup yang hanya berfokus pada mengalihkan pikiran saat muncul keinginan menggunakan" }
    ]
  },
  {
    id: 15,
    text: "Program (Aftercare) pasca rehabilitasi penting dilakukan untuk?",
    options: [
      { value: "correct", label: "Memantau dan mendukung klien mencegah relaps jangka panjang" },
      { value: "wrong1", label: "Memastikan klien tetap diawasi tanpa perlu dukungan lanjutan" },
      { value: "wrong2", label: "Menghentikan semua bentuk terapi setelah rehabilitasi selesai" }
    ]
  }
];

export default questions;