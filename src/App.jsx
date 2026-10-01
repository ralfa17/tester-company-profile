import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';

// Icon SVG Components
const HeartHandshakeIcon = () => (
  <svg className="w-6 h-6 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UserCheckIcon = () => (
  <svg className="w-8 h-8 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const PersonAvatarIcon = () => (
  <svg className="w-16 h-16 text-[#701A24]/40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LIST_PSIKOLOG = ['M. Azka Maulana, M.Psi., Psikolog', 'Sofia Halida Fatma, M.Psi., Psikolog'];
const LIST_TERAPIS = ['Shima Adinda Salsabil', 'Silviyah Wulandari', 'Nadifa A.M', 'Eka Zahra Nabila Nakhwa'];

// Master Rate Card Overtime Sesi Konseling
const OVERTIME_PASANGAN = [
  { label: "1 Sesi (60 Menit)", price: 600000 },
  { label: "1 Jam 15 Menit", price: 750000 },
  { label: "1 Jam 30 Menit", price: 900000 },
  { label: "1 Jam 45 Menit", price: 1050000 },
  { label: "2 Sesi (120 Menit)", price: 1200000 },
  { label: "2 Jam 15 Menit", price: 1350000 },
  { label: "2 Jam 30 Menit", price: 1500000 },
  { label: "2 Jam 45 Menit", price: 1650000 },
  { label: "3 Sesi (180 Menit)", price: 1800000 },
  { label: "3 Jam 15 Menit", price: 1950000 },
  { label: "3 Jam 30 Menit", price: 2100000 },
  { label: "3 Jam 45 Menit", price: 2250000 },
  { label: "4 Sesi (240 Menit)", price: 2400000 },
];

const OVERTIME_ASESMEN = [
  { label: "1 Sesi (60 Menit)", price: 300000 },
  { label: "1 Jam 15 Menit", price: 350000 },
  { label: "1 Jam 30 Menit", price: 450000 },
  { label: "1 Jam 45 Menit", price: 500000 },
  { label: "2 Sesi (120 Menit)", price: 600000 },
  { label: "2 Jam 15 Menit", price: 650000 },
  { label: "2 Jam 30 Menit", price: 800000 },
  { label: "2 Jam 45 Menit", price: 850000 },
  { label: "3 Sesi (180 Menit)", price: 900000 },
  { label: "3 Jam 15 Menit", price: 950000 },
  { label: "3 Jam 30 Menit", price: 1100000 },
  { label: "3 Jam 45 Menit", price: 1150000 },
  { label: "4 Sesi (240 Menit)", price: 1200000 },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // STATE AUTH & PORTAL TIM
  const [session, setSession] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [teamAccessDenied, setTeamAccessDenied] = useState(false);

  // Master Biaya & Setting Tarif Admin (Updated to 30.000)
  const [adminFeeInput, setAdminFeeInput] = useState(30000);

  // State Form Input Pasien Baru (Admin)
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [visitNumber, setVisitNumber] = useState(1);
  const [assignedPsychologist, setAssignedPsychologist] = useState(LIST_PSIKOLOG[0]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [submitting, setSubmitting] = useState(false);
  const [bookingMsg, setBookingMsg] = useState('');

  // State Modals Medis & Nota Pembayaran
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [showTherapyModal, setShowTherapyModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Form Rekam Medis Psikolog (Anamnesa, Diagnosa, Rancangan Tindak Lanjut, Durasi Sesi & Rujukan Eksternal)
  const [serviceType, setServiceType] = useState('assessment');
  const [sessionDurationPrice, setSessionDurationPrice] = useState(300000);
  const [durationLabel, setDurationLabel] = useState('1 Sesi (60 Menit)');
  const [anamnesaNotes, setAnamnesaNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [followUpPlan, setFollowUpPlan] = useState('');
  const [referToTherapist, setReferToTherapist] = useState('');
  const [externalReferral, setExternalReferral] = useState(''); // Rujukan Eksternal / Dokter Luar

  // Form Progress Terapis
  const [therapyProgress, setTherapyProgress] = useState('');

  // Validasi Maksimal 7 Anggota Tim
  const checkTeamLimit = async (currentSession) => {
    if (!currentSession) return;
    try {
      const { data: profiles, error } = await supabase.from('profiles').select('id');
      if (error) throw error;
      const isRegisteredUser = profiles.some(p => p.id === currentSession.user.id);
      if (!isRegisteredUser && profiles.length >= 7) {
        setTeamAccessDenied(true);
        await supabase.auth.signOut();
        alert("Batas maksimal tim (7 orang) telah tercapai. Akses ditolak.");
      } else {
        setTeamAccessDenied(false);
      }
    } catch (err) {
      console.error("Gagal verifikasi kuota tim:", err.message);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkTeamLimit(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkTeamLimit(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const rawRole = session?.user?.user_metadata?.role || 'admin';
  const userRole = (rawRole === 'it' || rawRole === 'it_admin') ? 'it_admin' : rawRole;
  const userName = session?.user?.user_metadata?.full_name || 'Tim Benang Merah';

  // Role Checker: Admin / IT Admin ATAU Terapis Rangkap Admin
  const canAccessAdminForm = userRole === 'admin' || userRole === 'it_admin' || userRole === 'terapis';
  const canAccessTherapist = userRole === 'terapis' || userRole === 'it_admin' || userRole === 'admin';

  // Fetch Data Pasien dari Supabase
  const fetchAppointments = async () => {
    setLoadingAppts(true);
    try {
      let query = supabase.from('appointments').select('*').order('booking_date', { ascending: true });
      const { data, error } = await query;
      if (error) throw error;
      setAppointmentsList(data || []);
    } catch (err) {
      console.error('Gagal mengambil data:', err.message);
    } finally {
      setLoadingAppts(false);
    }
  };

  useEffect(() => {
    if (session && !teamAccessDenied) {
      fetchAppointments();
    }
  }, [session, userRole, teamAccessDenied]);

  // 1. ADMIN / TERAPIS RANGKAP: Pendaftaran Pasien Baru + Penunjukan Psikolog
  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingMsg('');

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          patient_name: patientName,
          doctor_name: assignedPsychologist,
          assigned_to: assignedPsychologist,
          booking_date: bookingDate,
          booking_time: bookingTime,
          status: 'pending',
          notes: `[Klien: ${patientName} - HP: ${patientPhone}]`,
          age: parseInt(patientAge) || 0,
          visit_number: parseInt(visitNumber) || 1,
          price: Number(adminFeeInput),
          admin_fee: Number(adminFeeInput)
        },
      ]);

      if (error) throw error;
      setBookingMsg('Pendaftaran pasien berhasil disimpan!');
      fetchAppointments();
      setPatientName('');
      setPatientPhone('');
      setPatientAge('');
      setVisitNumber(1);
    } catch (err) {
      setBookingMsg(`Gagal: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // 2. PSIKOLOG: Input Anamnesa, Diagnosa, Rancangan Tindak Lanjut, Overtime & Rujukan Internal / Eksternal
  const handleSavePsychologistRecord = async () => {
    if (!selectedAppt) return;
    try {
      const adminFee = Number(selectedAppt.admin_fee || 30000);
      const totalPrice = sessionDurationPrice + adminFee;

      let rujukanText = 'Rujukan: Tidak Ada';
      if (referToTherapist && externalReferral) {
        rujukanText = `Rujukan Terapis Internal: ${referToTherapist} | Rujukan Eksternal: ${externalReferral}`;
      } else if (referToTherapist) {
        rujukanText = `Rujukan Terapis Internal: ${referToTherapist}`;
      } else if (externalReferral) {
        rujukanText = `Rujukan Eksternal (Dokter/Spesialis): ${externalReferral}`;
      }

      const medicalLog = `[REKAM MEDIS PSIKOLOG]\n` +
        ` Durasi Sesi: ${durationLabel}\n` +
        ` Anamnesa: ${anamnesaNotes}\n` +
        ` Diagnosa: ${diagnosis}\n` +
        ` Rancangan Tindak Lanjut: ${followUpPlan}\n` +
        ` ${rujukanText}`;

      const { error } = await supabase.from('appointments').update({
        notes: `${selectedAppt.notes}\n\n${medicalLog}`,
        status: referToTherapist ? 'dirujuk_terapis' : 'selesai_konseling',
        assigned_terapis: referToTherapist || null,
        service_type: `${serviceType} (${durationLabel})`,
        category: serviceType,
        price: totalPrice
      }).eq('id', selectedAppt.id);

      if (error) throw error;
      alert("Rekam medis, durasi sesi & rujukan berhasil disimpan!");
      setShowMedicalModal(false);
      setAnamnesaNotes('');
      setDiagnosis('');
      setFollowUpPlan('');
      setReferToTherapist('');
      setExternalReferral('');
      fetchAppointments();
    } catch (err) {
      alert(`Gagal menyimpan: ${err.message}`);
    }
  };

  // 3. TERAPIS: Input Catatan Perkembangan / Progress Pasien
  const handleSaveTherapyProgress = async () => {
    if (!selectedAppt) return;
    try {
      const progressLog = `\n\n[PROGRESS TERAPIS - ${userName}]\nProgress & Perubahan: ${therapyProgress}`;

      const { error } = await supabase.from('appointments').update({
        notes: `${selectedAppt.notes}${progressLog}`,
        status: 'selesai_terapi'
      }).eq('id', selectedAppt.id);

      if (error) throw error;
      alert("Catatan perkembangan terapis berhasil disimpan!");
      setShowTherapyModal(false);
      setTherapyProgress('');
      fetchAppointments();
    } catch (err) {
      alert(`Gagal menyimpan: ${err.message}`);
    }
  };

  // Hapus Pasien (Admin / IT / Terapis Rangkap)
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data pendaftaran ini?')) return;
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
      fetchAppointments();
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  };

  // 4. PRINT NOTA PEMBAYARAN KLINIK
  const handlePrintReceipt = (appt) => {
    setSelectedAppt(appt);
    setShowReceiptModal(true);
  };

  const executePrint = () => {
    window.print();
  };

  // Download Excel Rekap Medis & Keuangan
  const handleDownloadExcel = () => {
    if (appointmentsList.length === 0) {
      alert("Belum ada data untuk diunduh.");
      return;
    }

    let tableHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          table { font-family: Calibri, sans-serif; font-size: 11pt; border-collapse: collapse; }
          th { background-color: #701A24; color: #ffffff; font-weight: bold; padding: 6px; }
          td { padding: 6px; border: 1px solid #ccc; }
        </style>
      </head>
      <body>
        <h3>REKAP REKAM MEDIS & KEUANGAN BENANG MERAH</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Nama Pasien</th>
              <th>Usia</th>
              <th>Kunjungan Ke-</th>
              <th>Layanan & Durasi</th>
              <th>Psikolog PJ</th>
              <th>Terapis (Rujukan)</th>
              <th>Catatan Rekam Medis</th>
              <th>Total Biaya</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
    `;

    appointmentsList.forEach((item) => {
      tableHTML += `
        <tr>
          <td>${item.booking_date || '-'}</td>
          <td>${item.booking_time || '-'}</td>
          <td>${item.patient_name || '-'}</td>
          <td>${item.age ? item.age + ' Thn' : '-'}</td>
          <td>${item.visit_number || 1}</td>
          <td>${(item.service_type || item.category || 'Belum diisi Psikolog').toUpperCase()}</td>
          <td>${item.doctor_name || '-'}</td>
          <td>${item.assigned_terapis || 'Tidak Ada'}</td>
          <td>${(item.notes || '-').replace(/\n/g, ' ')}</td>
          <td>Rp ${(item.price || 30000).toLocaleString('id-ID')}</td>
          <td>${(item.status || 'pending').toUpperCase()}</td>
        </tr>
      `;
    });

    tableHTML += `</tbody></table></body></html>`;

    const blob = new Blob([tableHTML], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_RekamMedis_BenangMerah_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const waNumber = "6282298585310";
  const waMessage = encodeURIComponent("Halo Benang Merah, saya ingin berkonsultasi mengenai layanan konseling.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    {
      title: "Konseling Individu",
      desc: "Sesi tatap muka atau online privat untuk membantu meredakan kecemasan, depresi, manajemen stres, hingga trauma masa lalu.",
      tags: ["Kecemasan", "Stres", "Depresi", "Self-Growth"],
      type: "user"
    },
    {
      title: "Konseling Pasangan & Pernikahan",
      desc: "Membangun kembali komunikasi yang sehat, menyelesaikan konflik hubungan, serta mempererat ikatan emosional bersama pasangan.",
      tags: ["Komunikasi", "Konflik Hubungan", "Pernikahan"],
      type: "heart"
    },
    {
      title: "Pengembangan Diri & Karir",
      desc: "Eksplorasi potensi diri, mengatasi burnout kerja, penyusunan tujuan hidup, dan peningkatan ketahanan mental (resilience).",
      tags: ["Burnout", "Karir", "Confidence", "Life-Goal"],
      type: "shield"
    }
  ];

  const psychologists = [
    {
      name: "M. Azka Maulana, M.Psi., Psikolog",
      role: "FOUNDER & PSIKOLOG KLINIS ANAK - REMAJA",
      license: "SIPP Resmi",
      spec: "Fokus mendampingi tumbuh kembang anak, pengasuhan remaja, serta asesmen psikologi pendidikan dan perilaku.",
      image: "/azka.jpeg"
    },
    {
      name: "Sofia Halida Fatma, M.Psi., Psikolog",
      role: "CO-FOUNDER & PSIKOLOG KLINIS DEWASA",
      license: "SIPP Resmi",
      spec: "Ahli dalam konseling kesehatan mental dewasa, manajemen stres & kecemasan, hubungan interpersonal, serta pemulihan trauma.",
      image: "/sofia.jpeg"
    }
  ];

  const therapist = [
    {
      name: "Shima Adinda Salsabil",
      role: "CO-TERAPIS ANAK & ADMIN KLINIK",
      spec: "Spesialisasi & Fokus: Pendampingan interaksi positif, pembiasaan perilaku baik, stimulasi kemandirian harian anak, serta pendaftaran admin.",
      image: "/shima.jpeg"
    },
    {
      name: "Silviyah Wulandari",
      role: "CO-TERAPIS ANAK & ADMIN KLINIK",
      spec: "Spesialisasi & Fokus: Stimulasi kemampuan sensorik, motorik halus & kasar, kesiapan belajar pra-sekolah anak, serta pendaftaran admin.",
      image: "/silvi.jpeg"
    },
    {
      name: "Nadifa A.M",
      role: "CO-TERAPIS ANAK & ADMIN KLINIK",
      spec: "Spesialisasi & Fokus: Pendampingan stimulasi pemahaman emosi, ekspresi diri positif, latihan kemandirian anak, serta pendaftaran admin.",
      image: "/difa.jpeg"
    },
    {
      name: "Eka Zahra Nabila Nakhwa",
      role: "CO-TERAPIS ANAK & ADMIN KLINIK",
      spec: "Spesialisasi & Fokus: Fasilitasi terapi bermain edukatif (play therapy), pembinaan regulasi emosi & perilaku, serta pendaftaran admin.",
      image: "/eka.jpeg"
    }
  ];

  const itTeam = [
    {
      name: "Ridho Al Fattaah",
      role: "TIM IT & SISTEM DATA",
      spec: "Mengelola sistem pendaftaran digital yang cepat dan efisien, serta menjamin 100% kerahasiaan data pribadi dan rekam medis klien.",
      image: "/ridho.jpeg"
    }
  ];

  const faqs = [
    {
      q: "Apakah kerahasiaan sesi konseling saya terjamin?",
      a: "Sangat terjamin. Seluruh sesi konseling berada di bawah naungan Kode Etik Psikologi Indonesia. Informasi dan identitas Anda dijaga ketat 100% rahasia."
    },
    {
      q: "Apa perbedaan antara konseling Online dan Offline?",
      a: "Sesi Online dilakukan via Google Meet/Zoom dari lokasi mana pun Anda berada. Sesi Offline dilakukan di klinik kami dengan suasana privat yang tenang dan nyaman."
    },
    {
      q: "Berapa lama durasi untuk satu kali sesi?",
      a: "Satu sesi konseling berlangsung selama 60 menit, mencakup eksplorasi masalah, asesmen awal, dan diskusi langkah pemulihan."
    }
  ];

  // ---------------------------------------------------------------------
  // TAMPILAN DASHBOARD PORTAL TIM (HANYA MUNCUL SETELAH LOGIN)
  // ---------------------------------------------------------------------
  if (session && !teamAccessDenied) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans print:bg-white">
        
        {/* HEADER DASHBOARD */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm print:hidden">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#701A24] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                BM
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 leading-tight">Benang Merah</h1>
                <p className="text-xs text-gray-500">Sistem Rekam Medis & Manajemen Klinik</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{userName}</p>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-[#701A24] capitalize">
                  Role: {userRole === 'terapis' ? 'Terapis & Admin Klinik' : userRole.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={handleDownloadExcel}
                className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-xs transition flex items-center space-x-1"
              >
                <span>📊 Rekap Excel & Keuangan</span>
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 font-medium rounded-lg text-xs transition border border-gray-200"
              >
                Keluar
              </button>
            </div>
          </div>
        </header>

        {/* ISI DASHBOARD MANAGEMENT */}
        <main className="max-w-7xl mx-auto px-6 py-8 print:p-0">
          
          <div className="bg-gradient-to-r from-[#701A24] to-[#54121B] rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8 print:hidden">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Portal Rekam Medis & Penanganan Klinik
            </h2>
            <p className="text-red-100 max-w-3xl text-xs md:text-sm leading-relaxed font-light">
              {userRole === 'admin' || userRole === 'it_admin' ? 'Akses Admin: Input data pendaftaran pasien, atur tarif biaya admin, serta cetak struk nota resmi.' : ''}
              {userRole === 'psikolog' ? 'Akses Psikolog: Mengisi Anamnesa, Diagnosa, Rancangan Tindak Lanjut, Durasi Sesi / Overtime, serta Rujukan Internal & Eksternal.' : ''}
              {userRole === 'terapis' ? 'Akses Terapis Rangkap Admin: Anda dapat mendaftarkan pasien baru, mencetak nota, sekaligus menginput catatan perkembangan terapis.' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
            
            {/* COLUMN 1: FORM INPUT PASIEN (ADMIN, IT ADMIN & TERAPIS RANGKAP ADMIN) */}
            {canAccessAdminForm && (
              <div className="space-y-6 print:hidden">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
                    <span>✍️</span> Form Pendaftaran Pasien Baru
                  </h3>
                  {bookingMsg && (
                    <div className={`p-3 rounded-lg mb-4 text-xs ${bookingMsg.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {bookingMsg}
                    </div>
                  )}

                  <form onSubmit={handleRegisterPatient} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-medium text-gray-600 mb-1">Nama Pasien</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap pasien"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-600 mb-1">No. WhatsApp</label>
                      <input
                        type="text"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                      />
                    </div>

                    {/* INPUT USIA PASIEN & KUNJUNGAN KE- */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-gray-600 mb-1">Usia (Tahun)</label>
                        <input
                          type="number"
                          required
                          min="0"
                          placeholder="Contoh: 25"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-600 mb-1">Kunjungan Ke-</label>
                        <input
                          type="number"
                          required
                          min="1"
                          placeholder="1"
                          value={visitNumber}
                          onChange={(e) => setVisitNumber(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-[#701A24] mb-1 font-semibold">
                        Pilih Psikolog Penanggung Jawab
                      </label>
                      <select
                        value={assignedPsychologist}
                        onChange={(e) => setAssignedPsychologist(e.target.value)}
                        className="w-full px-3 py-2 border border-[#701A24]/30 bg-red-50/30 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] font-medium text-gray-800"
                      >
                        {LIST_PSIKOLOG.map((p, idx) => (
                          <option key={idx} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-gray-600 mb-1">Tanggal Sesi</label>
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-600 mb-1">Jam Sesi</label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                        >
                          <option value="09:00">09:00 WIB</option>
                          <option value="11:00">11:00 WIB</option>
                          <option value="14:00">14:00 WIB</option>
                          <option value="16:00">16:00 WIB</option>
                          <option value="19:00">19:00 WIB</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-600 mb-1">Biaya Administrasi Klinik (Rp)</label>
                      <input
                        type="number"
                        value={adminFeeInput}
                        onChange={(e) => setAdminFeeInput(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg outline-none font-semibold text-gray-800"
                      />
                      <span className="text-[10px] text-gray-400 mt-0.5 block">*Default Rp 30.000 / Keluarga +Rp 20.000</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 bg-[#701A24] text-white rounded-lg font-semibold hover:bg-[#54121B] transition shadow"
                    >
                      {submitting ? 'Menyimpan...' : 'Simpan Pendaftaran Pasien'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* COLUMN 2 & 3: MASTER TABEL REKAM MEDIS PASIEN */}
            <div className={`${canAccessAdminForm ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white p-6 rounded-2xl border border-gray-100 shadow-sm print:border-none print:p-0`}>
              <div className="flex justify-between items-center mb-4 print:hidden">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <span>📋</span> Data Rekam Medis & Penanganan Pasien
                </h3>
                <span className="text-xs bg-red-50 text-[#701A24] font-semibold px-2.5 py-1 rounded-full">
                  Total Active: {appointmentsList.length} Pasien
                </span>
              </div>

              {loadingAppts ? (
                <p className="text-center py-10 text-gray-500 text-xs">Memuat rekam medis...</p>
              ) : appointmentsList.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  <p className="text-3xl mb-2">📋</p>
                  <p>Belum ada data pendaftaran pasien.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600 border-collapse">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                      <tr>
                        <th className="p-3 border-b">Jadwal & Pasien</th>
                        <th className="p-3 border-b">Psikolog PJ</th>
                        <th className="p-3 border-b">Rujukan Terapis</th>
                        <th className="p-3 border-b">Catatan Rekam Medis</th>
                        <th className="p-3 border-b text-center">Aksi / Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointmentsList.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="p-3">
                            <p className="font-medium text-gray-800">{item.booking_date} ({item.booking_time})</p>
                            <p className="font-semibold text-gray-900 mt-0.5">{item.patient_name}</p>
                            
                            {/* Tampilan Usia dan Kunjungan di Tabel */}
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-1.5 py-0.5 rounded">
                                {item.age ? `${item.age} Thn` : 'Usia -'}
                              </span>
                              <span className="text-[10px] bg-red-50 text-[#701A24] font-semibold px-1.5 py-0.5 rounded">
                                Kunjungan Ke-{item.visit_number || 1}
                              </span>
                            </div>

                            <p className="text-[11px] text-green-700 font-semibold mt-1">
                              Biaya Admin: Rp {(item.admin_fee || 30000).toLocaleString('id-ID')}
                            </p>
                          </td>
                          <td className="p-3 font-medium text-gray-800">{item.doctor_name}</td>
                          <td className="p-3">
                            {item.assigned_terapis ? (
                              <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-1 rounded text-[11px] block">
                                🧑‍⚕️ {item.assigned_terapis}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic">Belum dirujuk</span>
                            )}
                          </td>
                          <td className="p-3 text-gray-700 whitespace-pre-line max-w-xs text-[11px] leading-relaxed">
                            {/* Menampilkan Layanan jika sudah diisi oleh Psikolog */}
                            {(item.service_type || item.category) && (
                              <span className="inline-block bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded text-[10px] mb-1 capitalize">
                                Layanan: {item.service_type || item.category}
                              </span>
                            )}
                            <p>{item.notes || '-'}</p>
                          </td>
                          <td className="p-3 text-center space-y-1.5">
                            {/* 1. TOMBOL KHUSUS PSIKOLOG */}
                            {userRole === 'psikolog' && (
                              <button
                                onClick={() => {
                                  setSelectedAppt(item);
                                  setShowMedicalModal(true);
                                }}
                                className="w-full px-2.5 py-1 bg-[#701A24] text-white rounded text-[11px] font-semibold hover:bg-[#54121B] block"
                              >
                                🩺 Isi Rekam Medis & Tindak Lanjut
                              </button>
                            )}

                            {/* 2. TOMBOL KHUSUS TERAPIS (Mendukung Input Progress Terapis) */}
                            {canAccessTherapist && userRole !== 'psikolog' && (
                              <button
                                onClick={() => {
                                  setSelectedAppt(item);
                                  setShowTherapyModal(true);
                                }}
                                className="w-full px-2.5 py-1 bg-blue-600 text-white rounded text-[11px] font-semibold hover:bg-blue-700 block mb-1"
                              >
                                📝 Input Progress Terapis
                              </button>
                            )}

                            {/* 3. TOMBOL ADMIN / TERAPIS RANGKAP ADMIN (Cetak Struk & Hapus) */}
                            {canAccessAdminForm && userRole !== 'psikolog' && (
                              <>
                                <button
                                  onClick={() => handlePrintReceipt(item)}
                                  className="w-full px-2.5 py-1 bg-green-600 text-white rounded text-[11px] font-semibold hover:bg-green-700 block"
                                >
                                  🧾 Cetak Struk / Nota
                                </button>
                                <button
                                  onClick={() => handleDeleteAppointment(item.id)}
                                  className="text-[10px] text-red-600 hover:text-red-800 font-medium hover:underline block w-full pt-1"
                                >
                                  Hapus Pendaftaran
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </main>

        {/* MODAL 1: INPUT REKAM MEDIS (ANAMNESA, DIAGNOSA, TINDAK LANJUT, DURASI SESI, RUJUKAN INTERNAL & EKSTERNAL) */}
        {showMedicalModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-gray-800 text-base">Form Rekam Medis Psikolog</h3>
                <button onClick={() => setShowMedicalModal(false)} className="text-gray-400 font-bold">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="bg-gray-50 p-2.5 rounded text-gray-700">
                  <span className="font-bold">Pasien:</span> {selectedAppt.patient_name || selectedAppt.notes}
                </p>

                {/* 1. KATEGORI LAYANAN & DURASI SESI */}
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Kategori Layanan Konseling</label>
                  <select
                    value={serviceType}
                    onChange={(e) => {
                      const type = e.target.value;
                      setServiceType(type);
                      if (type === 'couple') {
                        setSessionDurationPrice(600000);
                        setDurationLabel('1 Sesi (60 Menit)');
                      } else {
                        setSessionDurationPrice(300000);
                        setDurationLabel('1 Sesi (60 Menit)');
                      }
                    }}
                    className="w-full p-2.5 border rounded-lg outline-none font-medium mb-3"
                  >
                    <option value="assessment">Assessment / Intake Interview</option>
                    <option value="konseling">Konseling Individu</option>
                    <option value="psikoterapi">Psikoterapi</option>
                    <option value="terapi_anak">Terapi Anak</option>
                    <option value="couple">Konseling Pasangan (Couple)</option>
                    <option value="keluarga">Konseling Keluarga</option>
                  </select>

                  <label className="block font-semibold mb-1 text-gray-700">Durasi Sesi / Overtime & Tarif</label>
                  <select
                    value={sessionDurationPrice}
                    onChange={(e) => {
                      const selectedPrice = Number(e.target.value);
                      setSessionDurationPrice(selectedPrice);
                      const list = serviceType === 'couple' ? OVERTIME_PASANGAN : OVERTIME_ASESMEN;
                      const found = list.find(item => item.price === selectedPrice);
                      if (found) setDurationLabel(found.label);
                    }}
                    className="w-full p-2.5 border border-amber-300 bg-amber-50/50 rounded-lg outline-none font-semibold text-gray-800"
                  >
                    {(serviceType === 'couple' ? OVERTIME_PASANGAN : OVERTIME_ASESMEN).map((opt, idx) => (
                      <option key={idx} value={opt.price}>
                        {opt.label} - Rp {opt.price.toLocaleString('id-ID')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. ANAMNESA */}
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">1. Anamnesa</label>
                  <textarea
                    rows="3"
                    placeholder="Keluhan utama, riwayat masalah, observasi perilaku, dan hasil wawancara awal..."
                    value={anamnesaNotes}
                    onChange={(e) => setAnamnesaNotes(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none"
                  ></textarea>
                </div>

                {/* 3. DIAGNOSA */}
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">2. Diagnosa</label>
                  <input
                    type="text"
                    placeholder="Diagnosa dinamika psikologis / indikasi klinis..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none"
                  />
                </div>

                {/* 4. RANCANGAN TINDAK LANJUT */}
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">3. Rancangan Tindak Lanjut</label>
                  <textarea
                    rows="3"
                    placeholder="Rencana intervensi, jadwal sesi lanjutan, atau rekomendasi tugas mandiri..."
                    value={followUpPlan}
                    onChange={(e) => setFollowUpPlan(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none"
                  ></textarea>
                </div>

                {/* 5. RUJUKAN INTERNAL (TERAPIS ANAK) */}
                <div>
                  <label className="block font-semibold mb-1 text-[#701A24]">
                    Rujuk Pasien Ini ke Terapis Anak Internal (Opsional):
                  </label>
                  <select
                    value={referToTherapist}
                    onChange={(e) => setReferToTherapist(e.target.value)}
                    className="w-full p-2.5 border border-[#701A24]/40 rounded-lg outline-none font-medium mb-2"
                  >
                    <option value="">-- Pilih Terapis Rujukan --</option>
                    {LIST_TERAPIS.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* 6. RUJUKAN EKSTERNAL (DOKTER / SPESIALIS LUAR) */}
                <div>
                  <label className="block font-semibold mb-1 text-blue-800">
                    Rujukan Eksternal (Dokter / Psikiater / Rumah Sakit Luar - Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Dr. Sp.KJ / RS Gunung Jati / Klinik Spesialis..."
                    value={externalReferral}
                    onChange={(e) => setExternalReferral(e.target.value)}
                    className="w-full p-2.5 border border-blue-300 rounded-lg outline-none font-medium bg-blue-50/20"
                  />
                </div>

                <button
                  onClick={handleSavePsychologistRecord}
                  className="w-full py-2.5 bg-[#701A24] text-white font-semibold rounded-lg hover:bg-[#54121B]"
                >
                  Simpan Rekam Medis & Tindak Lanjut
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: INPUT PROGRESS PERUBAHAN (TERAPIS) */}
        {showTherapyModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-gray-800 text-base">Catatan Progres Terapis</h3>
                <button onClick={() => setShowTherapyModal(false)} className="text-gray-400 font-bold">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="bg-blue-50 p-2.5 rounded text-blue-900 leading-relaxed">
                  <span className="font-bold">Info Rekam Medis Psikolog:</span><br />
                  {selectedAppt.notes}
                </p>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Perubahan & Perkembangan Pasien</label>
                  <textarea
                    rows="4"
                    placeholder="Isi catatan perkembangan perilaku, stimulasi, atau emosi anak..."
                    value={therapyProgress}
                    onChange={(e) => setTherapyProgress(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleSaveTherapyProgress}
                  className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Simpan Catatan Terapis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: NOTA PEMBAYARAN KLINIK */}
        {showReceiptModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3 print:hidden">
                <h3 className="font-bold text-gray-800 text-sm">Struk Pembayaran Klinik</h3>
                <button onClick={() => setShowReceiptModal(false)} className="text-gray-400 font-bold">✕</button>
              </div>

              <div className="p-4 border border-dashed rounded-xl space-y-3 text-xs font-mono bg-amber-50/20">
                <div className="text-center border-b pb-2">
                  <h2 className="font-bold text-base font-serif text-[#701A24]">BENANG MERAH</h2>
                  <p className="text-[10px] text-gray-500">Layanan Psikologi & Kesehatan Mental</p>
                  <p className="text-[9px] text-gray-400">Jl. Bandung No. B9/16, Nuansa Majasem | WA: 0822-9858-5310</p>
                </div>

                <div className="space-y-1 text-[11px]">
                  <p><span className="text-gray-500">Tanggal:</span> {selectedAppt.booking_date} ({selectedAppt.booking_time})</p>
                  <p><span className="text-gray-500">Klien/Pasien:</span> {selectedAppt.patient_name || selectedAppt.notes}</p>
                  <p><span className="text-gray-500">Layanan:</span> {(selectedAppt.service_type || selectedAppt.category || 'Terlampir').toUpperCase()}</p>
                  <p><span className="text-gray-500">Psikolog PJ:</span> {selectedAppt.doctor_name}</p>
                  {selectedAppt.assigned_terapis && (
                    <p><span className="text-gray-500">Terapis:</span> {selectedAppt.assigned_terapis}</p>
                  )}
                </div>

                <div className="border-t border-b py-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Biaya Layanan/Sesi:</span>
                    <span>Rp {((selectedAppt.price || 30000) - (selectedAppt.admin_fee || 30000)).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Administrasi:</span>
                    <span>Rp {(selectedAppt.admin_fee || 30000).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#701A24] pt-1 border-t border-dashed">
                    <span>TOTAL BAYAR:</span>
                    <span>Rp {(selectedAppt.price || 30000).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="text-center text-[10px] text-gray-500 italic pt-1">
                  *** Terima kasih telah mempercayakan ruang pemulihan Anda bersama Benang Merah ***
                </div>
              </div>

              <div className="flex space-x-2 print:hidden">
                <button
                  onClick={executePrint}
                  className="flex-1 py-2 bg-[#701A24] text-white font-semibold rounded-lg hover:bg-[#54121B] text-xs"
                >
                  🖨️️ Cetak / Print Struk Nota
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ---------------------------------------------------------------------
  // TAMPILAN COMPANY PROFILE PUBLIK (LENGKAP SEMUA SECTION + PROPOSAL)
  // ---------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#701A24]/10 flex items-center justify-center">
              <HeartHandshakeIcon />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#1E293B]">
              Benang Merah
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
            <a href="#layanan" className="hover:text-[#701A24] transition-colors">Layanan</a>
            <a href="#proposal" className="hover:text-[#701A24] transition-colors">Proposal</a>
            <a href="#psikolog" className="hover:text-[#701A24] transition-colors">Tim Kami</a>
            <a href="#faq" className="hover:text-[#701A24] transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a 
              href={waUrl}
              target="_blank" 
              rel="noreferrer"
              className="bg-[#701A24] hover:bg-[#54121B] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow"
            >
              Konsultasi WhatsApp
            </a>

            <button
              onClick={() => setShowLoginModal(true)}
              className="border border-[#701A24] text-[#701A24] hover:bg-[#701A24] hover:text-white px-4 py-2 rounded-full text-xs font-semibold transition-all"
            >
              Login Tim
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#475569] font-bold"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-[#FDFBF7] px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            <a href="#layanan" onClick={() => setIsMenuOpen(false)}>Layanan</a>
            <a href="#proposal" onClick={() => setIsMenuOpen(false)}>Proposal</a>
            <a href="#psikolog" onClick={() => setIsMenuOpen(false)}>Tim Kami</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#701A24] text-white text-center py-2.5 rounded-full font-medium"
            >
              Konsultasi WhatsApp
            </a>
            <button
              onClick={() => { setIsMenuOpen(false); setShowLoginModal(true); }}
              className="border border-[#701A24] text-[#701A24] py-2 rounded-full font-semibold text-center text-xs"
            >
              Login Tim Internal
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#701A24]/10 text-[#701A24] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6">
              <ShieldCheckIcon /> 100% Kerahasiaan Terjaga
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] text-[#1E293B] mb-6">
              Ruang Aman untuk Mendengar, Memahami, & Menyembuhkan.
            </h1>
            <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-8 font-light">
              Temukan Kembali Koneksimu
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={waUrl}
                target="_blank" 
                rel="noreferrer"
                className="bg-[#701A24] hover:bg-[#54121B] text-white px-7 py-3.5 rounded-full font-medium text-center transition-all shadow-md hover:shadow-lg"
              >
                Jadwalkan Sesi Konseling
              </a>
              <a 
                href="#proposal" 
                className="border border-[#CBD5E1] hover:border-[#94A3B8] text-[#334155] px-7 py-3.5 rounded-full font-medium text-center transition-all bg-white/50"
              >
                Pelajari Proposal
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0]">
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000" 
                alt="Suasana Konseling" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-[#E2E8F0] hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#701A24]/10 flex items-center justify-center">
                <CheckIcon />
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Psikolog Terlisensi</p>
                <p className="text-sm font-semibold text-[#1E293B]">S.Psi., M.Psi., Psikolog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATING KEPERCAYAAN */}
      <section className="bg-white border-y border-[#E2E8F0] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">1,500+</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1">Sesi Terfasilitasi</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">100%</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1">Privasi Klien Terjaga</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">100%</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1">Psikolog Terlisensi SIPP</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">4.9/5.0</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1">Kepuasan Layanan</p>
          </div>
        </div>
      </section>

      {/* SERVICE LAYER */}
      <section id="layanan" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1E293B] mb-4">Layanan Konseling Kami</h2>
          <p className="text-[#64748B] text-sm md:text-base font-light">
            Dirancang khusus untuk membantu setiap tahapan proses pemulihan dan pertumbuhan kesehatan mental Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  {srv.type === "user" && <UserCheckIcon />}
                  {srv.type === "heart" && <HeartHandshakeIcon />}
                  {srv.type === "shield" && <ShieldCheckIcon />}
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1E293B] mb-3">{srv.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6 font-light">{srv.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {srv.tags.map((tag, idx) => (
                  <span key={idx} className="bg-[#F1F5F9] text-[#475569] text-xs px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION PROPOSAL PELAYANAN (GOOGLE DRIVE LINK) */}
      <section id="proposal" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#701A24] to-[#54121B] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="bg-white/10 text-red-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Dokumen Resmi
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Proposal Pelayanan Benang Merah</h2>
            <p className="text-red-100 text-xs md:text-sm leading-relaxed font-light">
              Pelajari selengkapnya mengenai detail program, alur pendampingan klinis, serta penawaran kerja sama layanan kesehatan mental kami.
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/1IaaszVRamfvzgkKD1sMEYu_Q3pneQeAO/view?usp=drive_link" 
            target="_blank" 
            rel="noreferrer"
            className="bg-white text-[#701A24] hover:bg-red-50 font-semibold px-6 py-3.5 rounded-full text-xs transition shadow-md whitespace-nowrap flex items-center gap-2"
          >
            📄 Buka & Download Proposal (PDF)
          </a>
        </div>
      </section>

      {/* STEP BY STEP */}
      <section className="bg-[#F4F1EA] py-20 px-6 border-y border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E293B] mb-4">Alur Memulai Konseling</h2>
            <p className="text-[#64748B] text-sm md:text-base font-light">4 Langkah sederhana menuju ruang aman Anda.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Pilih Metode", desc: "Tentukan opsi sesi Online (Video Call) atau Offline (Klinik)." },
              { num: "02", title: "Pilih Psikolog", desc: "Sesuaikan pilihan psikolog berdasarkan fokus kebutuhan Anda." },
              { num: "03", title: "Atur Jadwal", desc: "Pilih tanggal dan jam sesi yang paling nyaman untuk Anda." },
              { num: "04", title: "Mulai Sesi", desc: "Lakukan konseling dalam suasana yang tenang dan rahasia." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-[#E2E8F0] relative">
                <span className="font-serif text-3xl font-bold text-[#701A24]/20 absolute top-4 right-4">{step.num}</span>
                <h4 className="font-serif text-lg font-medium text-[#1E293B] mb-2">{step.title}</h4>
                <p className="text-[#64748B] text-xs leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIM PROFESIONAL LENGKAP */}
      <section id="psikolog" className="py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-15 flex items-center justify-center">
          <svg className="w-full h-full text-[#701A24]" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200 C 300 50, 400 650, 1300 400" stroke="currentColor" strokeWidth="6" strokeDasharray="12 12" />
            <path d="M-50 500 C 400 800, 700 100, 1250 600" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E293B] mb-4">Tim Profesional Kami</h2>
            <p className="text-[#64748B] text-sm md:text-base font-light">
              Pendampingan profesional, hangat, dan tepercaya untuk tumbuh kembang serta kesehatan mental keluarga Anda.
            </p>
          </div>

          {/* 1. PSIKOLOG UTAMA */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Psikolog Utama</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {psychologists.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all">
                  <div className="w-full h-72 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center relative z-10" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif text-lg font-bold text-[#1E293B]">{p.name}</h4>
                    <p className="text-[#701A24] text-xs font-semibold uppercase mt-1 mb-2">{p.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{p.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. TIM TERAPIS ANAK */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Tim Terapis Anak & Admin</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {therapist.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all">
                  <div className="w-full h-64 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover object-center relative z-10" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-base font-bold text-[#1E293B]">{t.name}</h4>
                    <p className="text-[#701A24] text-[11px] font-semibold uppercase mt-1 mb-2">{t.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{t.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. IT & SISTEM DATA */}
          <div>
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">IT & Sistem Data</h3>
            <div className="max-w-md mx-auto">
              {itTeam.map((it, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all">
                  <div className="w-full h-72 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={it.image} 
                      alt={it.name} 
                      className="w-full h-full object-cover object-center relative z-10" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-serif text-lg font-bold text-[#1E293B]">{it.name}</h4>
                    <p className="text-[#701A24] text-xs font-semibold uppercase mt-1 mb-2">{it.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{it.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="bg-white py-20 px-6 border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-[#1E293B] mb-3">Pertanyaan Umum (FAQ)</h2>
            <p className="text-[#64748B] text-sm font-light">Hal yang sering ditanyakan sebelum memulai konseling.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 bg-[#FDFBF7] flex justify-between items-center font-medium text-sm text-[#1E293B]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#701A24] font-bold">{openFaq === idx ? "▲" : "▼"}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-5 bg-white text-xs md:text-sm text-[#64748B] border-t border-[#E2E8F0] leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-slate-300 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 border-b border-slate-700 pb-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <HeartHandshakeIcon />
              <span className="font-serif text-xl font-bold text-white">Benang Merah</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Layanan psikologi dan kesehatan mental tepercaya. Menyediakan lingkungan yang aman, suportif, dan tanpa keraguan untuk perjalanan pemulihan diri Anda.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <p className="font-semibold text-white uppercase tracking-wider mb-2">Kontak Klinik</p>
            <p className="text-slate-400">📍 Perumahan Nuansa Majasem, Jl. Bandung, No. B9/16.</p>
            <p className="text-slate-400">📞 0822-9858-5310</p>
            <p className="text-slate-400">✉️ benangmerahpsy@gmail.com</p>
          </div>

          <div className="space-y-3 text-xs">
            <p className="font-semibold text-white uppercase tracking-wider mb-2">Jam Operasional</p>
            <p className="text-slate-400">🕒 Senin - Sabtu : 08.00 - 17.00 WIB</p>
            <p className="text-slate-500 italic mt-2">*Konseling dilakukan dengan perjanjian terlebih dahulu.</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center text-xs text-slate-500">
          <p>© 2026 Benang Merah. All rights reserved.</p>
        </div>
      </footer>

      {/* MODAL FORM LOGIN TIM */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">Login Tim Benang Merah</h3>
            <p className="text-xs text-gray-500 text-center mb-4">Akses Khusus 7 Anggota Tim Terdaftar</p>
            <Auth />
          </div>
        </div>
      )}

    </div>
  );
}