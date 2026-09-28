import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';

// Icon SVG
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // STATE AUTH & PORTAL TIM
  const [session, setSession] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [teamAccessDenied, setTeamAccessDenied] = useState(false);

  // State Form Input Pasien
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [category, setCategory] = useState('konseling');
  const [assignedTo, setAssignedTo] = useState(LIST_PSIKOLOG[0]);
  const [doctor, setDoctor] = useState('Psikolog Klinis (Umum)');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Validasi Batas Maksimal 7 Anggota Tim
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
      console.error("Gagal verifikasi batas kuota tim:", err.message);
    }
  };

  // Supabase Auth Listener
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

  useEffect(() => {
    if (category === 'konseling') {
      setAssignedTo(LIST_PSIKOLOG[0]);
    } else {
      setAssignedTo(LIST_TERAPIS[0]);
    }
  }, [category]);

  // Fetch Data Pasien dari Supabase
  const fetchAppointments = async () => {
    setLoadingAppts(true);
    try {
      let query = supabase.from('appointments').select('*').order('booking_date', { ascending: true });
      
      if (userRole === 'psikolog') {
        query = query.eq('category', 'konseling');
      } else if (userRole === 'terapis') {
        query = query.eq('category', 'terapi');
      }

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

  // FITUR DOWNLOAD EXCEL RAPI (CALIBRI 12PT)
  const handleDownloadCSV = () => {
    if (appointmentsList.length === 0) {
      alert("Belum ada data pasien untuk diunduh.");
      return;
    }

    let tableHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Laporan Pasien</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          table { font-family: Calibri, sans-serif; font-size: 12pt; }
          th { background-color: #dc2626; color: #ffffff; font-weight: bold; font-size: 12pt; padding: 6px; }
          td { font-size: 12pt; padding: 6px; }
        </style>
      </head>
      <body>
        <table border="1">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>PJ (Tim)</th>
              <th>Layanan/Spesialis</th>
              <th>Info Klien</th>
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
          <td>${item.assigned_to || '-'}</td>
          <td>${item.doctor_name || '-'}</td>
          <td>${(item.notes || '-').replace(/\n/g, ' ')}</td>
          <td>${(item.status || 'pending').toUpperCase()}</td>
        </tr>
      `;
    });

    tableHTML += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([tableHTML], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Pasien_BenangMerah_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Input Pasien Baru
  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingMsg('');

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          category: category,
          doctor_name: doctor,
          assigned_to: assignedTo,
          booking_date: bookingDate,
          booking_time: bookingTime,
          status: 'pending',
          notes: `[Klien WA: ${patientName} - HP: ${patientPhone}] ${notes}`,
        },
      ]);

      if (error) throw error;
      setBookingMsg('Data pasien berhasil disimpan!');
      fetchAppointments();
      setTimeout(() => {
        setBookingMsg('');
        setPatientName('');
        setPatientPhone('');
        setNotes('');
      }, 1500);
    } catch (err) {
      setBookingMsg(`Gagal: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      fetchAppointments();
    } catch (err) {
      alert(`Gagal ubah status: ${err.message}`);
    }
  };

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
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Pendampingan interaksi positif, pembiasaan perilaku baik, dan stimulasi kemandirian harian anak.",
      image: "/shima.jpeg"
    },
    {
      name: "Silviyah Wulandari",
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Stimulasi kemampuan sensorik, motorik halus & kasar, serta kesiapan belajar pra-sekolah anak.",
      image: "/silvi.jpeg"
    },
    {
      name: "Nadifa A.M",
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Pendampingan stimulasi pemahaman emosi, ekspresi diri positif, dan latihan kemandirian anak.",
      image: "/difa.jpeg"
    },
    {
      name: "Eka Zahra Nabila Nakhwa",
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Fasilitasi terapi bermain edukatif (play therapy) serta pembinaan regulasi emosi & perilaku.",
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

  // TAMPILAN DASHBOARD PORTAL TIM (HANYA MUNCUL JIKA TERVERIFIKASI DALAM 7 ANGGOTA TIM)
  if (session && !teamAccessDenied) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#701A24] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                BM
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 leading-tight">Benang Merah</h1>
                <p className="text-xs text-gray-500">Internal Management Portal (Max 7 Tim)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{userName}</p>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-[#701A24] capitalize">
                  Role: {userRole.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={handleDownloadCSV}
                className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-xs transition flex items-center space-x-1"
              >
                <span>📊 Export Excel</span>
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

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-[#701A24] to-[#54121B] rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Selamat Datang, {userName}! 👋
            </h2>
            <p className="text-red-100 max-w-2xl text-sm md:text-base font-light">
              {userRole === 'it_admin' && 'Akses Super Admin IT & Data: Input pendaftaran, monitoring status, dan export rekap Excel.'}
              {userRole === 'admin' && 'Akses Admin Klinik: Input pendaftaran pasien WA dan alokasi tim penanggung jawab.'}
              {userRole === 'psikolog' && 'Akses Psikolog: Pantau status dan jadwal sesi konseling aktif.'}
              {userRole === 'terapis' && 'Akses Terapis: Pantau status dan jadwal sesi terapi aktif.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(userRole === 'admin' || userRole === 'it_admin') && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
                  <span>➕</span> Form Input Pasien WA
                </h3>
                {bookingMsg && (
                  <div className={`p-3 rounded-lg mb-4 text-xs ${bookingMsg.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {bookingMsg}
                  </div>
                )}

                <form onSubmit={handleRegisterPatient} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nama Pasien</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama pasien dari WA"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">No. WhatsApp</label>
                    <input
                      type="text"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Kategori Layanan</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                    >
                      <option value="konseling">Konseling Psikologi</option>
                      <option value="terapi">Sesi Terapi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Penanggung Jawab Tim</label>
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                    >
                      {category === 'konseling'
                        ? LIST_PSIKOLOG.map((p, idx) => <option key={idx} value={p}>{p}</option>)
                        : LIST_TERAPIS.map((t, idx) => <option key={idx} value={t}>{t}</option>)
                      }
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Spesialisasi</label>
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                    >
                      <option value="Psikolog Klinis (Umum)">Psikolog Klinis (Umum)</option>
                      <option value="Konseling Remaja & Dewasa">Konseling Remaja & Dewasa</option>
                      <option value="Terapi Emosi & Perilaku">Terapi Emosi & Perilaku</option>
                      <option value="Terapi Tumbuh Kembang">Terapi Tumbuh Kembang</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Jam Sesi</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Keluhan</label>
                    <textarea
                      rows="2"
                      placeholder="Catatan keluhan singkat..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] text-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 bg-[#701A24] text-white rounded-lg text-xs font-semibold hover:bg-[#54121B] transition shadow"
                  >
                    {submitting ? 'Menyimpan...' : 'Simpan Pasien'}
                  </button>
                </form>
              </div>
            )}

            <div className={`${(userRole === 'admin' || userRole === 'it_admin') ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white p-6 rounded-2xl border border-gray-100 shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                  <span>📋</span> Master Jadwal Pasien Active
                </h3>
                <span className="text-xs bg-red-50 text-[#701A24] font-semibold px-2.5 py-1 rounded-full">
                  Total: {appointmentsList.length} Pasien
                </span>
              </div>

              {loadingAppts ? (
                <p className="text-center py-10 text-gray-500 text-xs">Memuat data pasien...</p>
              ) : appointmentsList.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  <p className="text-3xl mb-2">📋</p>
                  <p>Belum ada data pasien terdaftar.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600 border-collapse">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                      <tr>
                        <th className="p-3 border-b">Tanggal / Jam</th>
                        <th className="p-3 border-b">PJ (Tim)</th>
                        <th className="p-3 border-b">Info Klien</th>
                        <th className="p-3 border-b">Status</th>
                        {(userRole === 'it_admin' || userRole === 'admin') && <th className="p-3 border-b">Aksi</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointmentsList.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="p-3">
                            <p className="font-medium text-gray-800">{item.booking_date}</p>
                            <span className="text-[10px] bg-red-50 text-[#701A24] font-semibold px-1.5 py-0.5 rounded">
                              {item.booking_time}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-gray-700">{item.assigned_to || '-'}</td>
                          <td className="p-3 text-gray-700">{item.notes || '-'}</td>
                          <td className="p-3">
                            <select
                              value={item.status || 'pending'}
                              onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                              className={`text-[11px] font-semibold px-2 py-1 rounded border outline-none ${
                                item.status === 'selesai'
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : item.status === 'proses'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                  : 'bg-gray-100 text-gray-700 border-gray-300'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="proses">Diproses</option>
                              <option value="selesai">Selesai</option>
                            </select>
                          </td>
                          {(userRole === 'it_admin' || userRole === 'admin') && (
                            <td className="p-3">
                              <button
                                onClick={() => handleDeleteAppointment(item.id)}
                                className="text-[11px] text-red-600 hover:text-red-800 font-semibold hover:underline"
                              >
                                Hapus
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // TAMPILAN COMPANY PROFILE (UNTUK PENGUNJUNG UMUM)
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans">
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
            <a href="#tentang" className="hover:text-[#701A24] transition-colors">Tentang Kami</a>
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
            <a href="#tentang" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a>
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
                href="#layanan" 
                className="border border-[#CBD5E1] hover:border-[#94A3B8] text-[#334155] px-7 py-3.5 rounded-full font-medium text-center transition-all bg-white/50"
              >
                Pelajari Layanan
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

      {/* TIM PROFESIONAL LENGKAP (7 PERSONEL TERDAFTAR) */}
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
              7 Personel resmi pendampingan profesional, hangat, dan tepercaya untuk kesehatan mental keluarga Anda.
            </p>
          </div>

          {/* 1. PSIKOLOG UTAMA (2 Orang) */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Psikolog Utama (2 Personel)</h3>
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

          {/* 2. TIM TERAPIS ANAK (4 Orang) */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Tim Terapis Anak (4 Personel)</h3>
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

          {/* 3. IT & SISTEM DATA (1 Orang) */}
          <div>
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">IT & Sistem Data (1 Personel)</h3>
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
            <p className="text-slate-400">📍 Perumahan Nuansa Majasem, Jl. Bandung, No. B9/16. </p>
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