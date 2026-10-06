import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';

// ============================================================
// ELEGANT SVG ICON COMPONENTS
// ============================================================
const HeartHandshakeIcon = () => (
  <svg className="w-6 h-6 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LockPrivacyIcon = () => (
  <svg className="w-3.5 h-3.5 text-amber-700 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserCheckIcon = () => (
  <svg className="w-8 h-8 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const PersonAvatarIcon = () => (
  <svg className="w-16 h-16 text-[#701A24]/30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ReceiptIcon = () => (
  <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DownloadChartIcon = () => (
  <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserBadgeIcon = () => (
  <svg className="w-3.5 h-3.5 inline mr-1 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-4 h-4 text-amber-500 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// MASTER DATA PSIKOLOG DENGAN LABEL NAMA BERGELAR & KATA KUNCI MATCHING
const LIST_PSIKOLOG = [
  { 
    label: 'M. Azka Maulana, M.Psi., Psikolog', 
    keywords: ['azka', 'maulana']
  },
  { 
    label: 'Sofia Halida Fatma, M.Psi., Psikolog', 
    keywords: ['sofia', 'halida']
  }
];

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
  const [activeTherapistList, setActiveTherapistList] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [teamAccessDenied, setTeamAccessDenied] = useState(false);

  // State Search Bar Pasien
  const [searchQuery, setSearchQuery] = useState('');

  // Master Biaya & Setting Tarif Admin
  const [adminFeeInput, setAdminFeeInput] = useState(30000);

  // State Form Input Pasien Baru
  const [registrationType, setRegistrationType] = useState('psikolog');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [visitNumber, setVisitNumber] = useState(1);
  const [assignedPsychologist, setAssignedPsychologist] = useState(LIST_PSIKOLOG[0].label);
  const [directTherapist, setDirectTherapist] = useState('');
  const [directTherapyMethod, setDirectTherapyMethod] = useState('Play and Grow');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [submitting, setSubmitting] = useState(false);
  const [bookingMsg, setBookingMsg] = useState('');

  // State Modals Medis, Edit & Nota Pembayaran
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [showTherapyModal, setShowTherapyModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [receiptType, setReceiptType] = useState('paid');

  // Form State Edit Pasien
  const [editPatientName, setEditPatientName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editVisitNumber, setEditVisitNumber] = useState(1);
  const [editBookingDate, setEditBookingDate] = useState('');
  const [editBookingTime, setEditBookingTime] = useState('09:00');
  const [editAdminFee, setEditAdminFee] = useState(30000);
  const [editPsychologist, setEditPsychologist] = useState('');
  const [editTherapist, setEditTherapist] = useState('');

  // Form Rekam Medis Psikolog
  const [serviceType, setServiceType] = useState('assessment');
  const [sessionDurationPrice, setSessionDurationPrice] = useState(300000);
  const [durationLabel, setDurationLabel] = useState('1 Sesi (60 Menit)');
  const [anamnesaNotes, setAnamnesaNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [followUpPlan, setFollowUpPlan] = useState('');
  const [referToTherapist, setReferToTherapist] = useState('');
  const [externalReferral, setExternalReferral] = useState('');

  // Form Progress Terapis
  const [therapyProgress, setTherapyProgress] = useState('');

  // Fetch Terapis Aktif dari Database Supabase
  const fetchActiveTherapists = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('full_name, role');
      
      if (error) throw error;

      if (profiles && profiles.length > 0) {
        const registeredTherapists = profiles
          .filter(p => {
            const nameLower = (p.full_name || '').toLowerCase();
            const isShimaAccount = nameLower.includes('shima') || nameLower.includes('sima');
            return p.role === 'terapis' || isShimaAccount;
          })
          .map(p => p.full_name)
          .filter(Boolean);

        setActiveTherapistList(registeredTherapists);
        if (registeredTherapists.length > 0 && !directTherapist) {
          setDirectTherapist(registeredTherapists[0]);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil terapis terdaftar:", err.message);
    }
  };

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
      fetchActiveTherapists();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkTeamLimit(session);
      fetchActiveTherapists();
    });

    return () => subscription.unsubscribe();
  }, []);

  const rawRole = session?.user?.user_metadata?.role || 'admin';
  const userRole = (rawRole === 'it' || rawRole === 'it_admin') ? 'it_admin' : rawRole;
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email || 'Tim Benang Merah';

  // LOGIKA SHIMA & TERAPIS
  const isShima = userName.toLowerCase().includes('shima') || userName.toLowerCase().includes('sima');
  const canAccessAdminForm = userRole === 'admin' || userRole === 'it_admin' || (userRole === 'terapis' && isShima);

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

  // 1. ADMIN / SHIMA: Pendaftaran Pasien Baru
  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingMsg('');

    try {
      const isDirect = registrationType === 'terapis_direct';
      const selectedTherapist = isDirect ? (directTherapist || activeTherapistList[0]) : null;

      const initialNotes = isDirect 
        ? `[Klien: ${patientName} - HP: ${patientPhone}] (Layanan Langsung Terapis: ${directTherapyMethod})`
        : `[Klien: ${patientName} - HP: ${patientPhone}]`;

      const { error } = await supabase.from('appointments').insert([
        {
          patient_name: patientName,
          doctor_name: isDirect ? 'Layanan Langsung Terapis' : assignedPsychologist,
          assigned_to: isDirect ? 'Layanan Langsung Terapis' : assignedPsychologist,
          assigned_terapis: selectedTherapist,
          booking_date: bookingDate,
          booking_time: bookingTime,
          status: isDirect ? 'dirujuk_terapis' : 'pending',
          service_type: isDirect ? directTherapyMethod : null,
          category: isDirect ? directTherapyMethod : null,
          notes: initialNotes,
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

  // 2. EDIT DATA PENDAFTARAN
  const handleOpenEditModal = (item) => {
    setSelectedAppt(item);
    setEditPatientName(item.patient_name || '');
    setEditAge(item.age || 0);
    setEditVisitNumber(item.visit_number || 1);
    setEditBookingDate(item.booking_date || '');
    setEditBookingTime(item.booking_time || '09:00');
    setEditAdminFee(item.admin_fee || 30000);
    setEditPsychologist(item.doctor_name || LIST_PSIKOLOG[0].label);
    setEditTherapist(item.assigned_terapis || '');
    setShowEditModal(true);
  };

  const handleSaveEditAppointment = async () => {
    if (!selectedAppt) return;
    try {
      const currentServicePrice = (selectedAppt.price || 30000) - (selectedAppt.admin_fee || 30000);
      const newTotalPrice = currentServicePrice + Number(editAdminFee);

      const { error } = await supabase.from('appointments').update({
        patient_name: editPatientName,
        age: parseInt(editAge) || 0,
        visit_number: parseInt(editVisitNumber) || 1,
        booking_date: editBookingDate,
        booking_time: editBookingTime,
        admin_fee: Number(editAdminFee),
        price: newTotalPrice,
        doctor_name: editPsychologist,
        assigned_terapis: editTherapist || null
      }).eq('id', selectedAppt.id);

      if (error) throw error;
      alert("Data pendaftaran berhasil diperbarui!");
      setShowEditModal(false);
      fetchAppointments();
    } catch (err) {
      alert(`Gagal memperbarui data: ${err.message}`);
    }
  };

  // 3. PSIKOLOG: Input Anamnesa & Diagnosa
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
        rujukanText = `Rujukan Eksternal: ${externalReferral}`;
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
      alert("Rekam medis berhasil disimpan!");
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

  // 4. TERAPIS: Input Catatan Progress
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

  // Hapus Pasien
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

  // PRINT NOTA PEMBAYARAN KLINIK
  const handlePrintReceipt = (appt) => {
    setSelectedAppt(appt);
    setShowReceiptModal(true);
  };

  const executePrint = () => {
    window.print();
  };

  // EXCEL DOWNLOAD KEUANGAN
  const handleDownloadFinancialExcel = () => {
    if (appointmentsList.length === 0) {
      alert("Belum ada data untuk diunduh.");
      return;
    }

    let tableHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" text/plain; charset=UTF-8"/>
        <style>
          table { font-family: Calibri, sans-serif; font-size: 11pt; border-collapse: collapse; }
          th { background-color: #701A24; color: #ffffff; font-weight: bold; padding: 6px; }
          td { padding: 6px; border: 1px solid #ccc; }
        </style>
      </head>
      <body>
        <h3>REKAP KEUANGAN & TRANSAKSI KLINIK BENANG MERAH</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Nama Pasien</th>
              <th>Usia</th>
              <th>Kunjungan Ke-</th>
              <th>Layanan</th>
              <th>Psikolog PJ</th>
              <th>Terapis PJ</th>
              <th>Biaya Admin</th>
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
          <td>${(item.service_type || item.category || 'Belum diisi').toUpperCase()}</td>
          <td>${item.doctor_name || '-'}</td>
          <td>${item.assigned_terapis || 'Tidak Ada'}</td>
          <td>Rp ${(item.admin_fee || 30000).toLocaleString('id-ID')}</td>
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
    link.setAttribute("download", `Rekap_Keuangan_BenangMerah_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTherapistExcel = () => {
    const currentNameLower = userName.toLowerCase();
    const myPatients = appointmentsList.filter(item => {
      if (!item.assigned_terapis) return false;
      const assignedLower = item.assigned_terapis.toLowerCase();
      return assignedLower.includes(currentNameLower) ||
        (currentNameLower.includes('difa') && assignedLower.includes('nadifa')) ||
        (currentNameLower.includes('nadifa') && assignedLower.includes('difa')) ||
        (isShima && (assignedLower.includes('shima') || assignedLower.includes('sima')));
    });

    if (myPatients.length === 0) {
      alert(`Belum ada data pasien rujukan khusus untuk ${userName}.`);
      return;
    }

    let tableHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" text/plain; charset=UTF-8"/>
        <style>
          table { font-family: Calibri, sans-serif; font-size: 11pt; border-collapse: collapse; }
          th { background-color: #1D4ED8; color: #ffffff; font-weight: bold; padding: 6px; }
          td { padding: 6px; border: 1px solid #ccc; }
        </style>
      </head>
      <body>
        <h3>REKAP PROGRESS PASIEN TERAPIS (${userName.toUpperCase()})</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Nama Pasien</th>
              <th>Usia</th>
              <th>Kunjungan Ke-</th>
              <th>Layanan</th>
              <th>Psikolog PJ</th>
              <th>Detail Rekam Medis & Progress Terapis</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
    `;

    myPatients.forEach((item) => {
      tableHTML += `
        <tr>
          <td>${item.booking_date || '-'}</td>
          <td>${item.booking_time || '-'}</td>
          <td>${item.patient_name || '-'}</td>
          <td>${item.age ? item.age + ' Thn' : '-'}</td>
          <td>${item.visit_number || 1}</td>
          <td>${(item.service_type || item.category || 'Terapi Anak').toUpperCase()}</td>
          <td>${item.doctor_name || '-'}</td>
          <td>${(item.notes || '-').replace(/\n/g, ' ')}</td>
          <td>${(item.status || 'pending').toUpperCase()}</td>
        </tr>
      `;
    });

    tableHTML += `</tbody></table></body></html>`;

    const blob = new Blob([tableHTML], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Medis_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FILTER SEARCHING PASIEN
  const filteredAppointments = appointmentsList.filter((item) => {
    if (searchQuery.trim() !== '') {
      const nameMatch = item.patient_name && item.patient_name.toLowerCase().includes(searchQuery.toLowerCase());
      const notesMatch = item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || notesMatch;
    }
    return true;
  });

  const waNumber = "6282298585310";
  const waMessage = encodeURIComponent("Halo Benang Merah, saya ingin berkonsultasi mengenai layanan konseling.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    {
      title: "Konseling Individu",
      desc: "Sesi privat untuk membantu meredakan kecemasan, depresi, manajemen stres, hingga pemulihan trauma.",
      tags: ["Kecemasan", "Stres", "Depresi", "Self-Growth"],
      type: "user"
    },
    {
      title: "Konseling Pasangan & Pernikahan",
      desc: "Membangun kembali komunikasi yang sehat, menyelesaikan konflik hubungan, serta mempererat ikatan emosional.",
      tags: ["Komunikasi", "Konflik Hubungan", "Pernikahan"],
      type: "heart"
    },
    {
      title: "Pengembangan Diri & Karir",
      desc: "Eksplorasi potensi diri, mengatasi burnout kerja, penyusunan tujuan hidup, dan peningkatan resilience.",
      tags: ["Burnout", "Karir", "Confidence", "Life-Goal"],
      type: "shield"
    }
  ];

  const psychologists = [
    {
      name: "M. Azka Maulana, M.Psi., Psikolog",
      role: "FOUNDER & PSIKOLOG KLINIS ANAK - REMAJA",
      spec: "Fokus mendampingi tumbuh kembang anak, pengasuhan remaja, serta asesmen psikologi pendidikan dan perilaku.",
      image: "/azka.jpeg"
    },
    {
      name: "Sofia Halida Fatma, M.Psi., Psikolog",
      role: "CO-FOUNDER & PSIKOLOG KLINIS DEWASA",
      spec: "Ahli dalam konseling kesehatan mental dewasa, manajemen stres & kecemasan, hubungan interpersonal, serta pemulihan trauma.",
      image: "/sofia.jpeg"
    }
  ];

  const therapist = [
    {
      name: "Shima Adinda Salsabil",
      role: "CO-TERAPIS ANAK & ADMIN KLINIK",
      spec: "Spesialisasi & Fokus: Pendampingan interaksi positif, Play and Grow, Pra Literasi, stimulasi kemandirian, serta pendaftaran admin.",
      image: "/shima.jpeg"
    },
    {
      name: "Silviyah Wulandari",
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Stimulasi kemampuan sensorik, Play and Grow, Pra Literasi, serta kesiapan belajar pra-sekolah anak.",
      image: "/silvi.jpeg"
    },
    {
      name: "Nadifa A.M",
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Pendampingan stimulasi pemahaman emosi, ekspresi diri positif, Play and Grow, serta Pra Literasi.",
      image: "/difa.jpeg"
    },
    {
      name: "Eka Zahra Nabila Nakhwa",
      role: "CO-TERAPIS ANAK",
      spec: "Spesialisasi & Fokus: Fasilitasi terapi bermain edukatif (Play and Grow), Pra Literasi, serta pembinaan regulasi emosi.",
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

  const creatorTeam = [
    {
      name: "Fauzan Hamdani",
      role: "CONTENT CREATOR & MEDIA",
      spec: "Merancang dan memproduksi konten kreatif visual serta media edukasi kesehatan mental untuk memperluas jangkauan layanan Benang Merah.",
      image: "/fauzan.jpeg"
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

  // ============================================================
  // TAMPILAN DASHBOARD PORTAL TIM
  // ============================================================
  if (session && !teamAccessDenied) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-gray-800 font-sans print:bg-white animate-fade-up">
        
        {/* HEADER DASHBOARD DENGAN LOGO PNG */}
        <header className="bg-white/90 backdrop-blur-md border-b border-[#EADFD5] sticky top-0 z-10 shadow-sm print:hidden">
          <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Logo Benang Merah" 
                className="w-9 h-9 object-contain rounded-lg shadow-sm hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo.jpeg";
                }}
              />
              <div>
                <h1 className="font-serif font-bold text-lg text-[#701A24] leading-tight">Benang Merah</h1>
                <p className="text-[11px] text-gray-500 font-medium">Sistem Rekam Medis & Manajemen Klinik</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block mr-2">
                <p className="text-xs font-semibold text-gray-800">{userName}</p>
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#701A24]/10 text-[#701A24] uppercase tracking-wider">
                  Role: {isShima ? 'Terapis & Admin Klinik' : userRole.replace('_', ' ')}
                </span>
              </div>

              {canAccessAdminForm && (
                <button
                  onClick={handleDownloadFinancialExcel}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition shadow-sm hover:shadow flex items-center"
                  title="Download Rekap Keuangan Seluruh Pasien"
                >
                  <DownloadChartIcon /> Excel Keuangan
                </button>
              )}

              {(userRole === 'terapis' || isShima) && (
                <button
                  onClick={handleDownloadTherapistExcel}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs transition shadow-sm hover:shadow flex items-center"
                  title="Download Rekap Progress Pasien Sendiri"
                >
                  <StethoscopeIcon /> Excel Medis Saya
                </button>
              )}

              <button
                onClick={() => supabase.auth.signOut()}
                className="px-3.5 py-1.5 bg-white hover:bg-red-50 text-gray-600 hover:text-red-700 font-medium rounded-lg text-xs transition border border-gray-200 shadow-sm ml-1"
              >
                Keluar
              </button>
            </div>
          </div>
        </header>

        {/* ISI DASHBOARD MANAGEMENT */}
        <main className="max-w-7xl mx-auto px-6 py-8 print:p-0">
          
          <div className="bg-gradient-to-r from-[#701A24] via-[#5D151E] to-[#420E15] rounded-2xl p-6 md:p-8 text-white shadow-xl mb-8 print:hidden relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-medium text-red-100 mb-3 backdrop-blur-sm">
                <SparklesIcon /> Portal Terintegrasi & Strict Privilege
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 tracking-tight">
                Portal Rekam Medis & Penanganan Klinik
              </h2>
              <p className="text-red-100/90 max-w-3xl text-xs md:text-sm leading-relaxed font-light">
                {userRole === 'admin' || userRole === 'it_admin' ? 'Akses Admin: Pendaftaran, edit jadwal, dan cetak nota. Rekam medis terlindungi 100% rahasia.' : ''}
                {userRole === 'psikolog' ? 'Akses Psikolog: Mengisi Anamnesa, Diagnosa & Merujuk Terapis. Catatan Direct Terapis bersifat rahasia.' : ''}
                {isShima ? 'Akses Khusus Shima (Admin + Terapis): Memegang fitur Admin, serta BISA MENGISI progress medis khusus pasien yang ditunjuk ke Shima.' : ''}
                {userRole === 'terapis' && !isShima ? `Akses Khusus ${userName}: Anda hanya dapat membaca & mengisi progress medis pasien milik Anda sendiri.` : ''}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
            
            {/* COLUMN 1: FORM INPUT PASIEN (ADMIN & SHIMA) */}
            {canAccessAdminForm && (
              <div className="space-y-6 print:hidden">
                <div className="bg-white p-6 rounded-2xl border border-[#EADFD5] shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-serif font-bold text-gray-800 text-sm mb-4 flex items-center gap-2 text-[#701A24]">
                    <EditIcon /> Form Pendaftaran Pasien Baru
                  </h3>
                  {bookingMsg && (
                    <div className={`p-3 rounded-lg mb-4 text-xs font-medium ${bookingMsg.includes('Gagal') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                      {bookingMsg}
                    </div>
                  )}

                  <form onSubmit={handleRegisterPatient} className="space-y-3.5 text-xs">
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EADFD5]">
                      <label className="block font-semibold text-gray-700 mb-2">Pilih Jalur Pendaftaran Layanan</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRegistrationType('psikolog')}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold transition border ${registrationType === 'psikolog' ? 'bg-[#701A24] text-white border-[#701A24] shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-[#701A24]/40'}`}
                        >
                          Sesi Psikolog Utama
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegistrationType('terapis_direct')}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold transition border ${registrationType === 'terapis_direct' ? 'bg-blue-700 text-white border-blue-700 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}
                        >
                          Langsung Terapis (Direct)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-600 mb-1">Nama Pasien</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap pasien"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] focus:border-transparent transition"
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
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] focus:border-transparent transition"
                      />
                    </div>

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
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] focus:border-transparent transition"
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
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24] focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {registrationType === 'psikolog' ? (
                      <div>
                        <label className="block font-medium text-[#701A24] mb-1 font-semibold">
                          Pilih Psikolog Penanggung Jawab
                        </label>
                        <select
                          value={assignedPsychologist}
                          onChange={(e) => setAssignedPsychologist(e.target.value)}
                          className="w-full px-3.5 py-2 border border-[#701A24]/30 bg-red-50/20 rounded-lg outline-none font-medium text-gray-800 focus:ring-2 focus:ring-[#701A24]"
                        >
                          {LIST_PSIKOLOG.map((p, idx) => (
                            <option key={idx} value={p.label}>{p.label}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-2 bg-blue-50/40 p-3 rounded-xl border border-blue-100">
                        <div>
                          <label className="block font-medium text-blue-900 mb-1 font-semibold">
                            Metode Layanan Terapis Direct
                          </label>
                          <select
                            value={directTherapyMethod}
                            onChange={(e) => setDirectTherapyMethod(e.target.value)}
                            className="w-full px-3.5 py-2 border rounded-lg outline-none font-medium text-gray-800"
                          >
                            <option value="Play and Grow">Play and Grow</option>
                            <option value="Pra Literasi">Pra Literasi</option>
                            <option value="Play and Grow & Pra Literasi">Play and Grow & Pra Literasi</option>
                          </select>
                        </div>
                        <div className="text-sm">
                          <label className="block font-medium text-blue-900 mb-1 font-semibold text-xs">
                            Pilih Terapis Penanggung Jawab
                          </label>
                          <select
                            value={directTherapist}
                            onChange={(e) => setDirectTherapist(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none font-medium text-sm text-gray-800 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                          >
                            {activeTherapistList.length === 0 ? (
                              <option value="">-- Memuat Terapis Aktif... --</option>
                            ) : (
                              activeTherapistList.map((t, idx) => (
                                <option key={idx} value={t} className="text-sm py-2 text-gray-800">
                                  {t}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-gray-600 mb-1">Tanggal Sesi</label>
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-600 mb-1">Jam Sesi</label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
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
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-lg outline-none font-semibold text-gray-800 focus:ring-2 focus:ring-[#701A24]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 bg-[#701A24] text-white rounded-lg font-semibold hover:bg-[#54121B] transition duration-200 shadow-md hover:shadow-lg"
                    >
                      {submitting ? 'Menyimpan...' : 'Simpan Pendaftaran Pasien'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* COLUMN 2 & 3: MASTER TABEL REKAM MEDIS PASIEN */}
            <div className={`${canAccessAdminForm ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white p-6 rounded-2xl border border-[#EADFD5] shadow-sm print:border-none print:p-0`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 print:hidden">
                <h3 className="font-serif font-bold text-gray-800 text-sm flex items-center gap-2 text-[#701A24]">
                  <StethoscopeIcon /> Data Rekam Medis Pasien
                </h3>

                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari nama pasien..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#701A24] focus:border-transparent transition"
                  />
                  <span className="absolute left-2.5 top-2">
                    <SearchIcon />
                  </span>
                </div>

                <span className="text-xs bg-red-50 text-[#701A24] font-semibold px-3 py-1 rounded-full whitespace-nowrap border border-red-100">
                  Total: {filteredAppointments.length} Pasien
                </span>
              </div>

              {loadingAppts ? (
                <p className="text-center py-10 text-gray-500 text-xs">Memuat rekam medis...</p>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  <p className="text-2xl mb-2">📋</p>
                  <p>{searchQuery ? `Tidak ditemukan pasien dengan nama "${searchQuery}"` : 'Belum ada data pendaftaran pasien.'}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600 border-collapse">
                    <thead className="bg-[#FAF8F5] text-gray-700 font-semibold border-b border-[#EADFD5]">
                      <tr>
                        <th className="p-3 border-b">Jadwal & Pasien</th>
                        <th className="p-3 border-b">Psikolog PJ</th>
                        <th className="p-3 border-b">Terapis PJ</th>
                        <th className="p-3 border-b">Catatan Rekam Medis</th>
                        <th className="p-3 border-b text-center">Aksi / Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAppointments.map((item) => {
                        const isDirectTherapy = item.doctor_name === 'Layanan Langsung Terapis';
                        
                        const docLower = (item.doctor_name || '').toLowerCase();
                        const currentNameLower = userName.toLowerCase();

                        // PENGECEKAN FLEXIBLE MATCHING PSIKOLOG
                        const isMyPsychologistPatient = item.doctor_name && (
                          LIST_PSIKOLOG.some((p) => {
                            const matchesUser = p.keywords.some((key) => currentNameLower.includes(key));
                            const matchesDoc = p.keywords.some((key) => docLower.includes(key));
                            return matchesUser && matchesDoc;
                          }) || docLower.includes(currentNameLower)
                        );

                        // PENGECEKAN TERAPIS FLEKSIBEL
                        const assignedLower = (item.assigned_terapis || '').toLowerCase();

                        const isMyTherapistPatient = item.assigned_terapis && (
                          assignedLower.includes(currentNameLower) ||
                          (currentNameLower.includes('difa') && assignedLower.includes('nadifa')) ||
                          (currentNameLower.includes('nadifa') && assignedLower.includes('difa')) ||
                          (isShima && (assignedLower.includes('shima') || assignedLower.includes('sima')))
                        );

                        let canReadNotes = false;
                        let hiddenReason = '[PRIVACY MEDIS]';

                        // PERATURAN PRIVASI MEDIS REKAM MEDIS
                        if (userRole === 'psikolog') {
                          if (!isDirectTherapy && isMyPsychologistPatient) {
                            canReadNotes = true;
                          } else {
                            canReadNotes = false;
                            hiddenReason = '[PRIVACY MEDIS]';
                          }
                        } else if (userRole === 'terapis' || isShima) {
                          if (isMyTherapistPatient) {
                            canReadNotes = true;
                          } else {
                            canReadNotes = false;
                            hiddenReason = '[PRIVACY MEDIS]';
                          }
                        } else {
                          // Admin biasa / IT Admin / role lainnya
                          canReadNotes = false;
                          hiddenReason = '[PRIVACY MEDIS]';
                        }

                        return (
                          <tr key={item.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                            <td className="p-3">
                              <p className="font-medium text-gray-800">{item.booking_date} ({item.booking_time})</p>
                              <p className="font-semibold text-gray-900 mt-0.5">{item.patient_name}</p>
                              
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-1.5 py-0.5 rounded">
                                  {item.age ? `${item.age} Thn` : 'Usia -'}
                                </span>
                                <span className="text-[10px] bg-red-50 text-[#701A24] font-semibold px-1.5 py-0.5 rounded">
                                  Kunjungan Ke-{item.visit_number || 1}
                                </span>
                              </div>

                              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                                Biaya Admin: Rp {(item.admin_fee || 30000).toLocaleString('id-ID')}
                              </p>
                            </td>
                            <td className="p-3 font-medium text-gray-800">{item.doctor_name || '-'}</td>
                            <td className="p-3">
                              {item.assigned_terapis ? (
                                <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-1 rounded text-[11px] inline-flex items-center">
                                  <UserBadgeIcon /> {item.assigned_terapis}
                                </span>
                              ) : (
                                <span className="text-gray-400 italic">Belum dirujuk</span>
                              )}
                            </td>
                            <td className="p-3 text-gray-700 whitespace-pre-line max-w-xs text-[11px] leading-relaxed">
                              {(item.service_type || item.category) && (
                                <span className="inline-block bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded text-[10px] mb-1 capitalize border border-purple-100">
                                  Layanan: {item.service_type || item.category}
                                </span>
                              )}
                              <p className={canReadNotes ? 'text-gray-800 font-normal' : 'text-gray-400 italic font-medium flex items-center'}>
                                {!canReadNotes && <LockPrivacyIcon />}
                                {canReadNotes ? (item.notes || '-') : hiddenReason}
                              </p>
                            </td>
                            <td className="p-3 text-center space-y-1.5">
                              {userRole === 'psikolog' && !isDirectTherapy && isMyPsychologistPatient && (
                                <button
                                  onClick={() => {
                                    setSelectedAppt(item);
                                    setShowMedicalModal(true);
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-[#701A24] text-white rounded-lg text-[11px] font-semibold hover:bg-[#54121B] block transition shadow-sm"
                                >
                                  <StethoscopeIcon /> Isi Rekam Medis
                                </button>
                              )}

                              {isMyTherapistPatient && (
                                <button
                                  onClick={() => {
                                    setSelectedAppt(item);
                                    setShowTherapyModal(true);
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-blue-700 text-white rounded-lg text-[11px] font-semibold hover:bg-blue-800 block mb-1 transition shadow-sm"
                                >
                                  <EditIcon /> Input Progress Terapis
                                </button>
                              )}

                              {canAccessAdminForm && (
                                <>
                                  <button
                                    onClick={() => handleOpenEditModal(item)}
                                    className="w-full px-2.5 py-1 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 block transition"
                                  >
                                    <EditIcon /> Edit Pendaftaran
                                  </button>
                                  <button
                                    onClick={() => handlePrintReceipt(item)}
                                    className="w-full px-2.5 py-1 bg-emerald-700 text-white rounded text-[11px] font-semibold hover:bg-emerald-800 block transition"
                                  >
                                    <ReceiptIcon /> Cetak Struk / Nota
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </main>

        {/* MODAL EDIT DATA PENDAFTARAN */}
        {showEditModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-up">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-gray-800 text-base flex items-center gap-1.5 text-[#701A24]">
                  <EditIcon /> Edit Detail Pendaftaran Pasien
                </h3>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nama Pasien</label>
                  <input
                    type="text"
                    value={editPatientName}
                    onChange={(e) => setEditPatientName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none font-semibold text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Usia (Tahun)</label>
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="w-full p-2.5 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kunjungan Ke-</label>
                    <input
                      type="number"
                      value={editVisitNumber}
                      onChange={(e) => setEditVisitNumber(e.target.value)}
                      className="w-full p-2.5 border rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Tanggal Sesi</label>
                    <input
                      type="date"
                      value={editBookingDate}
                      onChange={(e) => setEditBookingDate(e.target.value)}
                      className="w-full p-2.5 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Jam Sesi</label>
                    <select
                      value={editBookingTime}
                      onChange={(e) => setEditBookingTime(e.target.value)}
                      className="w-full p-2.5 border rounded-lg outline-none"
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
                  <label className="block font-semibold text-gray-700 mb-1">Biaya Administrasi Klinik (Rp)</label>
                  <input
                    type="number"
                    value={editAdminFee}
                    onChange={(e) => setEditAdminFee(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Psikolog Penanggung Jawab</label>
                  <select
                    value={editPsychologist}
                    onChange={(e) => setEditPsychologist(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none"
                  >
                    {LIST_PSIKOLOG.map((p, idx) => (
                      <option key={idx} value={p.label}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Terapis Rujukan Aktif</label>
                  <select
                    value={editTherapist}
                    onChange={(e) => setEditTherapist(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none font-medium text-sm text-gray-800 bg-white"
                  >
                    <option value="">-- Tanpa Terapis / Belum Dirujuk --</option>
                    {activeTherapistList.map((t, idx) => (
                      <option key={idx} value={t} className="text-sm py-1.5 text-gray-800">{t}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSaveEditAppointment}
                  className="w-full py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition shadow"
                >
                  Simpan Perubahan Pendaftaran
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: INPUT REKAM MEDIS (PSIKOLOG) */}
        {showMedicalModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-up">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-gray-800 text-base flex items-center gap-1.5 text-[#701A24]">
                  <StethoscopeIcon /> Form Rekam Medis Psikolog
                </h3>
                <button onClick={() => setShowMedicalModal(false)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="bg-gray-50 p-2.5 rounded-lg text-gray-700 border">
                  <span className="font-bold">Pasien:</span> {selectedAppt.patient_name || selectedAppt.notes}
                </p>

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

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">1. Anamnesa</label>
                  <textarea
                    rows="3"
                    placeholder="Keluhan utama, riwayat masalah, observasi perilaku, dan wawancara awal..."
                    value={anamnesaNotes}
                    onChange={(e) => setAnamnesaNotes(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">2. Diagnosa</label>
                  <input
                    type="text"
                    placeholder="Diagnosa dinamika psikologis / indikasi klinis..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">3. Rancangan Tindak Lanjut</label>
                  <textarea
                    rows="3"
                    placeholder="Rencana intervensi, jadwal sesi lanjutan, atau tugas mandiri..."
                    value={followUpPlan}
                    onChange={(e) => setFollowUpPlan(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#701A24]"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#701A24]">
                    Rujuk Pasien Ini ke Terapis Aktif (Opsional):
                  </label>
                  <select
                    value={referToTherapist}
                    onChange={(e) => setReferToTherapist(e.target.value)}
                    className="w-full p-2.5 border border-[#701A24]/40 rounded-lg outline-none font-medium mb-2 text-sm bg-white"
                  >
                    <option value="">-- Pilih Terapis Rujukan --</option>
                    {activeTherapistList.map((t, idx) => (
                      <option key={idx} value={t} className="text-sm py-1.5">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-blue-800">
                    Rujukan Eksternal (Dokter / Psikiater / Rumah Sakit Luar - Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Dr. Sp.KJ / RS Gunung Jati..."
                    value={externalReferral}
                    onChange={(e) => setExternalReferral(e.target.value)}
                    className="w-full p-2.5 border border-blue-300 rounded-lg outline-none font-medium bg-blue-50/20"
                  />
                </div>

                <button
                  onClick={handleSavePsychologistRecord}
                  className="w-full py-2.5 bg-[#701A24] text-white font-semibold rounded-lg hover:bg-[#54121B] transition shadow"
                >
                  Simpan Rekam Medis & Tindak Lanjut
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: INPUT PROGRESS PERUBAHAN (TERAPIS) */}
        {showTherapyModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-up">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-gray-800 text-base flex items-center gap-1.5 text-blue-700">
                  <EditIcon /> Catatan Progres Terapis
                </h3>
                <button onClick={() => setShowTherapyModal(false)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="bg-blue-50/70 p-3 rounded-xl text-blue-900 leading-relaxed border border-blue-100">
                  <span className="font-bold">Info Pasien & Catatan Medis:</span><br />
                  {selectedAppt.notes}
                </p>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Perubahan & Perkembangan Pasien</label>
                  <textarea
                    rows="4"
                    placeholder="Isi catatan perkembangan perilaku, stimulasi, atau emosi anak..."
                    value={therapyProgress}
                    onChange={(e) => setTherapyProgress(e.target.value)}
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>

                <button
                  onClick={handleSaveTherapyProgress}
                  className="w-full py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition shadow"
                >
                  Simpan Catatan Terapis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: NOTA PEMBAYARAN KLINIK */}
        {showReceiptModal && selectedAppt && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-up">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              
              <div className="flex justify-between items-center border-b pb-3 print:hidden">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5 text-[#701A24]">
                  <ReceiptIcon /> Cetak Struk & Invoice
                </h3>
                <button onClick={() => setShowReceiptModal(false)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl print:hidden">
                <button
                  onClick={() => setReceiptType('invoice')}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                    receiptType === 'invoice'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📄 Invoice Tagihan
                </button>
                <button
                  onClick={() => setReceiptType('paid')}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                    receiptType === 'paid'
                      ? 'bg-[#701A24] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ✅ Struk Lunas (PAID)
                </button>
              </div>

              <div className="p-5 border border-dashed border-[#EADFD5] rounded-2xl space-y-3 font-mono bg-[#FAF8F5] relative overflow-hidden">
                
                {receiptType === 'paid' && (
                  <div className="absolute right-4 bottom-10 pointer-events-none transform -rotate-12 opacity-90">
                    <div className="border-4 border-double border-[#701A24] rounded-xl px-3 py-1.5 text-center bg-white/95 shadow-sm">
                      <div className="flex items-center justify-center gap-1.5">
                        <img 
                          src="/logo.png" 
                          alt="Logo Benang Merah" 
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/logo.jpeg";
                          }}
                        />
                        <span className="text-xs font-black tracking-wider text-[#701A24] uppercase">
                          LUNAS / PAID
                        </span>
                      </div>
                      <p className="text-[8px] font-bold text-[#701A24] mt-0.5 border-t border-[#701A24] pt-0.5 uppercase tracking-widest">
                        BENANG MERAH
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-center border-b pb-2">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <img 
                      src="/logo.png" 
                      alt="Logo Benang Merah" 
                      className="w-7 h-7 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logo.jpeg";
                      }}
                    />
                    <h2 className="font-bold text-base font-serif text-[#701A24]">BENANG MERAH</h2>
                  </div>
                  <p className="text-[10px] text-gray-500 font-sans">Layanan Psikologi & Kesehatan Mental</p>
                  <p className="text-[9px] text-gray-400 font-sans">Jl. Bandung No. B9/16, Nuansa Majasem | WA: 0822-9858-5310</p>
                  
                  <div className="mt-2">
                    {receiptType === 'invoice' ? (
                      <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase tracking-wider">
                        INVOICE PEMBAYARAN
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase tracking-wider">
                        NOTA BUKTI PEMBAYARAN LUNAS
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-[11px] font-sans">
                  <p><span className="text-gray-500">Tanggal & Sesi:</span> {selectedAppt.booking_date} ({selectedAppt.booking_time})</p>
                  <p><span className="text-gray-500">Klien / Pasien:</span> <strong className="text-gray-800">{selectedAppt.patient_name || selectedAppt.notes}</strong></p>
                  <p><span className="text-gray-500">Layanan:</span> {(selectedAppt.service_type || selectedAppt.category || 'Terlampir').toUpperCase()}</p>
                  <p><span className="text-gray-500">Psikolog PJ:</span> {selectedAppt.doctor_name}</p>
                  {selectedAppt.assigned_terapis && (
                    <p><span className="text-gray-500">Terapis:</span> {selectedAppt.assigned_terapis}</p>
                  )}
                </div>

                <div className="border-t border-b py-2 space-y-1 text-xs font-sans">
                  <div className="flex justify-between">
                    <span>Biaya Layanan / Sesi:</span>
                    <span>Rp {((selectedAppt.price || 30000) - (selectedAppt.admin_fee || 30000)).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Administrasi:</span>
                    <span>Rp {(selectedAppt.admin_fee || 30000).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#701A24] pt-1.5 border-t border-dashed">
                    <span>TOTAL {receiptType === 'invoice' ? 'TAGIHAN' : 'BAYAR'}:</span>
                    <span>Rp {(selectedAppt.price || 30000).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="text-center text-[10px] text-gray-500 italic pt-1 font-sans">
                  {receiptType === 'invoice' ? (
                    <span>* Silakan lakukan pembayaran sesuai nominal di atas ke kasir / rekening resmi Benang Merah.</span>
                  ) : (
                    <span>*** Pembayaran telah diterima. Terima kasih telah mempercayakan ruang pemulihan Anda bersama Benang Merah ***</span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 print:hidden">
                <button
                  onClick={executePrint}
                  className="flex-1 py-2.5 bg-[#701A24] text-white font-semibold rounded-lg hover:bg-[#54121B] text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <ReceiptIcon /> Print {receiptType === 'invoice' ? 'Invoice Tagihan' : 'Struk Lunas (PAID)'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // ============================================================
  // TAMPILAN COMPANY PROFILE PUBLIK
  // ============================================================
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] font-sans selection:bg-[#701A24]/20 selection:text-[#701A24] overflow-x-hidden">
      
      {/* NAVBAR GLASSMORPHISM */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#EADFD5] transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#701A24]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <HeartHandshakeIcon />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#701A24]">
              Benang Merah
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
            <a href="#layanan" className="hover:text-[#701A24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#701A24] hover:after:w-full after:transition-all">Layanan</a>
            <a href="#proposal" className="hover:text-[#701A24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#701A24] hover:after:w-full after:transition-all">Proposal</a>
            <a href="#psikolog" className="hover:text-[#701A24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#701A24] hover:after:w-full after:transition-all">Tim Kami</a>
            <a href="#faq" className="hover:text-[#701A24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#701A24] hover:after:w-full after:transition-all">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a 
              href={waUrl}
              target="_blank" 
              rel="noreferrer"
              className="bg-[#701A24] hover:bg-[#54121B] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Konsultasi WhatsApp
            </a>

            <button
              onClick={() => setShowLoginModal(true)}
              className="border border-[#701A24] text-[#701A24] hover:bg-[#701A24] hover:text-white px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:shadow-sm"
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
          <div className="md:hidden border-b border-[#EADFD5] bg-[#FAF8F5] px-6 py-4 flex flex-col gap-4 text-sm font-medium animate-fade-up">
            <a href="#layanan" onClick={() => setIsMenuOpen(false)}>Layanan</a>
            <a href="#proposal" onClick={() => setIsMenuOpen(false)}>Proposal</a>
            <a href="#psikolog" onClick={() => setIsMenuOpen(false)}>Tim Kami</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#701A24] text-white text-center py-2.5 rounded-full font-medium shadow-sm"
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
      <section className="relative py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#701A24]/10 rounded-full blur-3xl -z-10 animate-float pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10 animate-float pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-[#701A24]/10 text-[#701A24] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm border border-[#701A24]/20 backdrop-blur-sm">
              <ShieldCheckIcon /> 100% Kerahasiaan Terjaga
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.18] text-[#1E293B] mb-6">
              Ruang Aman untuk Mendengar, Memahami, & Menyembuhkan.
            </h1>
            <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-8 font-light">
              Temukan Kembali Koneksimu Bersama Layanan Psikologi & Kesehatan Mental Profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={waUrl}
                target="_blank" 
                rel="noreferrer"
                className="bg-[#701A24] hover:bg-[#54121B] text-white px-7 py-3.5 rounded-full font-medium text-center transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                Jadwalkan Sesi Konseling
              </a>
              <a 
                href="#proposal" 
                className="border border-[#CBD5E1] hover:border-[#701A24]/40 text-[#334155] hover:text-[#701A24] px-7 py-3.5 rounded-full font-medium text-center transition-all duration-300 bg-white/60 backdrop-blur-sm shadow-sm"
              >
                Pelajari Proposal
              </a>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#EADFD5] group">
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000" 
                alt="Suasana Konseling" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#EADFD5] hidden sm:flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-full bg-[#701A24]/10 flex items-center justify-center">
                <CheckIcon />
              </div>
              <div>
                <p className="text-xs text-[#64748B] font-medium">Psikolog Terlisensi</p>
                <p className="text-sm font-semibold text-[#1E293B]">S.Psi., M.Psi., Psikolog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATING KEPERCAYAAN */}
      <section className="bg-white border-y border-[#EADFD5] py-12 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="hover:-translate-y-1 transition-transform duration-300">
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">1,500+</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1 font-light">Sesi Terfasilitasi</p>
          </div>
          <div className="hover:-translate-y-1 transition-transform duration-300">
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">100%</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1 font-light">Privasi Klien Terjaga</p>
          </div>
          <div className="hover:-translate-y-1 transition-transform duration-300">
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">100%</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1 font-light">Psikolog Terlisensi SIPP</p>
          </div>
          <div className="hover:-translate-y-1 transition-transform duration-300">
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#701A24]">4.9/5.0</p>
            <p className="text-xs md:text-sm text-[#64748B] mt-1 font-light">Kepuasan Layanan</p>
          </div>
        </div>
      </section>

      {/* SERVICE LAYER */}
      <section id="layanan" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1E293B] mb-4">Layanan Konseling Kami</h2>
          <p className="text-[#64748B] text-sm md:text-base font-light">
            Dirancang khusus untuk membantu setiap tahapan proses pemulihan dan pertumbuhan kesehatan mental Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-[#EADFD5] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="mb-6 p-3 bg-[#FAF8F5] rounded-2xl w-fit border border-[#EADFD5] group-hover:scale-110 transition-transform duration-300">
                  {srv.type === "user" && <UserCheckIcon />}
                  {srv.type === "heart" && <HeartHandshakeIcon />}
                  {srv.type === "shield" && <ShieldCheckIcon />}
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1E293B] mb-3 group-hover:text-[#701A24] transition-colors">{srv.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6 font-light">{srv.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {srv.tags.map((tag, idx) => (
                  <span key={idx} className="bg-[#FAF8F5] text-[#475569] text-xs px-3 py-1 rounded-full border border-[#EADFD5]/70 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROPOSAL SECTION */}
      <section id="proposal" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#701A24] via-[#5D151E] to-[#420E15] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl text-center md:text-left relative z-10">
            <span className="bg-white/10 text-red-200 text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10">
              Dokumen Resmi
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">Proposal Pelayanan Benang Merah</h2>
            <p className="text-red-100/90 text-xs md:text-sm leading-relaxed font-light">
              Pelajari selengkapnya mengenai detail program, alur pendampingan klinis, serta penawaran kerja sama layanan kesehatan mental kami.
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/1IaaszVRamfvzgkKD1sMEYu_Q3pneQeAO/view?usp=drive_link" 
            target="_blank" 
            rel="noreferrer"
            className="bg-white text-[#701A24] hover:bg-red-50 font-semibold px-7 py-4 rounded-full text-xs transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap relative z-10"
          >
            📄 Buka & Download Proposal (PDF)
          </a>
        </div>
      </section>

      {/* STEP BY STEP */}
      <section className="bg-[#FAF8F5] py-20 px-6 border-y border-[#EADFD5]">
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
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#EADFD5] relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="font-serif text-3xl font-bold text-[#701A24]/15 absolute top-4 right-4">{step.num}</span>
                <h4 className="font-serif text-lg font-medium text-[#1E293B] mb-2">{step.title}</h4>
                <p className="text-[#64748B] text-xs leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIM PROFESIONAL LENGKAP */}
      <section id="psikolog" className="py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E293B] mb-4">Tim Profesional Kami</h2>
            <p className="text-[#64748B] text-sm md:text-base font-light">
              Pendampingan profesional, hangat, dan tepercaya untuk tumbuh kembang serta kesehatan mental keluarga Anda.
            </p>
          </div>

          {/* PSIKOLOG UTAMA */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Psikolog Utama</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {psychologists.map((p, i) => (
                <div key={i} className="bg-white rounded-3xl border border-[#EADFD5] overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-72 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center relative z-10 group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif text-lg font-bold text-[#1E293B] group-hover:text-[#701A24] transition-colors">{p.name}</h4>
                    <p className="text-[#701A24] text-xs font-semibold uppercase mt-1 mb-2 tracking-wider">{p.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{p.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TERAPIS ANAK */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Tim Terapis Anak</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {therapist.map((t, i) => (
                <div key={i} className="bg-white rounded-3xl border border-[#EADFD5] overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-64 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover object-center relative z-10 group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-base font-bold text-[#1E293B] group-hover:text-[#701A24] transition-colors">{t.name}</h4>
                    <p className="text-[#701A24] text-[11px] font-semibold uppercase mt-1 mb-2 tracking-wider">{t.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{t.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IT & SISTEM DATA */}
          <div className="mb-16">
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">IT & Sistem Data</h3>
            <div className="max-w-md mx-auto">
              {itTeam.map((it, i) => (
                <div key={i} className="bg-white rounded-3xl border border-[#EADFD5] overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-72 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={it.image} 
                      alt={it.name} 
                      className="w-full h-full object-cover object-center relative z-10 group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-serif text-lg font-bold text-[#1E293B] group-hover:text-[#701A24] transition-colors">{it.name}</h4>
                    <p className="text-[#701A24] text-xs font-semibold uppercase mt-1 mb-2 tracking-wider">{it.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{it.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT CREATOR */}
          <div>
            <h3 className="text-center font-serif text-2xl font-bold text-[#701A24] mb-8">Content Creator</h3>
            <div className="max-w-md mx-auto">
              {creatorTeam.map((c, i) => (
                <div key={i} className="bg-white rounded-3xl border border-[#EADFD5] overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-72 bg-[#701A24]/5 relative flex items-center justify-center overflow-hidden">
                    <img 
                      src={c.image} 
                      alt={c.name} 
                      className="w-full h-full object-cover object-center relative z-10 group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute z-0">
                      <PersonAvatarIcon />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-serif text-lg font-bold text-[#1E293B] group-hover:text-[#701A24] transition-colors">{c.name}</h4>
                    <p className="text-[#701A24] text-xs font-semibold uppercase mt-1 mb-2 tracking-wider">{c.role}</p>
                    <p className="text-[#64748B] text-xs font-light leading-relaxed">{c.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="bg-white py-20 px-6 border-t border-[#EADFD5]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-[#1E293B] mb-3">Pertanyaan Umum (FAQ)</h2>
            <p className="text-[#64748B] text-sm font-light">Hal yang sering ditanyakan sebelum memulai konseling.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#EADFD5] rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 bg-[#FAF8F5] flex justify-between items-center font-medium text-sm text-[#1E293B] hover:bg-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#701A24] font-bold transition-transform duration-300">{openFaq === idx ? "▲" : "▼"}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-5 bg-white text-xs md:text-sm text-[#64748B] border-t border-[#EADFD5] leading-relaxed font-light animate-fade-up">
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
            <p className="text-slate-400">✉ benangmerahpsy@gmail.com</p>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-up">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[#EADFD5]">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold transition-colors"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-1 text-center font-serif text-[#701A24]">Login Tim Benang Merah</h3>
            <p className="text-xs text-gray-500 text-center mb-4 font-light">Akses Khusus 7 Anggota Tim Terdaftar</p>
            <Auth />
          </div>
        </div>
      )}

    </div>
  );
}