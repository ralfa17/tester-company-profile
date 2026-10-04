import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

// SVG Icon Elegan Maroon (#701A24)
const UserProfileIcon = () => (
  <svg className="w-5 h-5 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const StethoscopeBadgeIcon = () => (
  <svg className="w-5 h-5 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const KeySecurityIcon = () => (
  <svg className="w-5 h-5 text-[#701A24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const BackArrowIcon = () => (
  <svg className="w-4 h-4 text-[#701A24] inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// DAFTAR 7 ANGGOTA TIM KLINIK BENANG MERAH
const TEAM_MEMBERS = [
  {
    name: 'Muhammad Azka Maulana',
    shortName: 'Azka',
    role: 'Psikolog Utama',
    dbRole: 'psikolog',
    email: 'aska.maulana@umc.ac.id',
    hasAccount: true,
    icon: <StethoscopeBadgeIcon />
  },
  {
    name: 'Sofia Halida Fatma',
    shortName: 'Sofia',
    role: 'Psikolog Utama',
    dbRole: 'psikolog',
    email: 'sofiazka916@gmail.com',
    hasAccount: true,
    icon: <StethoscopeBadgeIcon />
  },
  {
    name: 'Shima Adinda Salsabil',
    shortName: 'Shima',
    role: 'Admin & Terapis',
    dbRole: 'admin',
    email: 'salsabilshima@gmail.com',
    hasAccount: true,
    icon: <UserProfileIcon />
  },
  {
    name: 'Silviyah Wulandari',
    shortName: 'Silvi',
    role: 'Terapis Anak',
    dbRole: 'terapis',
    email: 'silviyahwulandari00@gmail.com',
    hasAccount: true,
    icon: <UserProfileIcon />
  },
  {
    name: 'Nadifah AM',
    shortName: 'Difa',
    role: 'Terapis Anak',
    dbRole: 'terapis',
    email: 'nadifahmahfuzh@gmail.com',
    hasAccount: true,
    icon: <UserProfileIcon />
  },
  {
    name: 'Eka Zahra Nabila Nakhwa',
    shortName: 'Eka',
    role: 'Terapis Anak',
    dbRole: 'terapis',
    email: 'ekazahranabilanakhwa@gmail.com',
    hasAccount: false, // Opsi pendaftaran akan muncul untuk Eka
    icon: <UserProfileIcon />
  },
  {
    name: 'Ridho Al Fattaah',
    shortName: 'Ridho',
    role: 'IT Admin',
    dbRole: 'it_admin',
    email: 'ridhoalfattaah17@gmail.com',
    hasAccount: true,
    icon: <KeySecurityIcon />
  }
];

export default function Auth() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [password, setPassword] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // PROSES LOGIN ATALAU PENDAFTARAN AKUN
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) return;

    setLoading(true);
    setMessage('');

    if (isRegisterMode) {
      // PENDAFTARAN AKUN BARU (EKA)
      try {
        const { data, error } = await supabase.auth.signUp({
          email: emailInput || selectedMember.email,
          password: password,
          options: {
            data: {
              full_name: selectedMember.name,
              role: selectedMember.dbRole,
            },
          },
        });

        if (error) throw error;
        setMessage(`Akun ${selectedMember.shortName} berhasil dibuat! Silakan langsung login.`);
        setIsRegisterMode(false);
        setPassword('');
      } catch (error) {
        setMessage(`Gagal pendaftaran: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      // PROSES LOGIN BIASA
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: selectedMember.email,
          password: password,
        });

        if (error) throw error;
        // Login berhasil
      } catch (error) {
        setMessage('Password salah! Silakan periksa dan ketikkan kembali.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-1 text-xs font-sans">
      
      {/* TAMPILAN 1: PILIHAN ANGGOTA TIM */}
      {!selectedMember ? (
        <div>
          <p className="text-center text-gray-500 mb-4 font-medium">
            Pilih nama Anda untuk masuk ke portal tim:
          </p>

          <div className="grid grid-cols-1 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
            {TEAM_MEMBERS.map((member, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedMember(member);
                  setMessage('');
                  setPassword('');
                  setEmailInput(member.email);
                  setIsRegisterMode(!member.hasAccount); // Jika belum ada akun, otomatis masuk ke mode buat akun
                }}
                className="flex items-center justify-between p-3.5 bg-[#FAF8F5] hover:bg-[#701A24]/5 border border-[#EADFD5] hover:border-[#701A24]/40 rounded-2xl transition-all duration-200 text-left group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl border border-[#EADFD5] shadow-sm group-hover:scale-105 transition-transform">
                    {member.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-gray-800 group-hover:text-[#701A24] transition-colors text-xs">
                        {member.name}
                      </h4>
                      {!member.hasAccount && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          Belum Buat Akun
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#701A24] font-medium bg-[#701A24]/10 px-2 py-0.5 rounded-full inline-block mt-1">
                      {member.role}
                    </span>
                  </div>
                </div>
                <span className="text-[#701A24] font-bold text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* TAMPILAN 2: INPUT PASSWORD / REGISTRASI AKUN BARU */
        <div className="animate-fade-up">
          <button
            type="button"
            onClick={() => {
              setSelectedMember(null);
              setPassword('');
              setMessage('');
              setIsRegisterMode(false);
            }}
            className="text-gray-500 hover:text-[#701A24] font-semibold text-[11px] mb-3.5 flex items-center transition"
          >
            <BackArrowIcon /> Kembali ke Pilih Anggota Tim
          </button>

          <div className="p-4 bg-[#701A24]/5 rounded-2xl border border-[#701A24]/15 flex items-center gap-3.5 mb-4">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-[#701A24]/20">
              {selectedMember.icon}
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                {isRegisterMode ? 'Pendaftaran Akun Baru:' : 'Akses Login Portal:'}
              </p>
              <h4 className="font-bold text-gray-900 text-xs mt-0.5">{selectedMember.name}</h4>
              <p className="text-[10px] text-[#701A24] font-semibold mt-0.5">{selectedMember.role}</p>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-xl mb-3.5 text-xs font-medium border ${message.includes('Gagal') || message.includes('salah') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegisterMode && (
              <div>
                <label className="block font-semibold text-gray-700 mb-1 text-xs">Email Akun</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#701A24] text-xs font-medium bg-white"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-xs">
                {isRegisterMode ? 'Buat Password Baru' : 'Masukkan Password Anda'}
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Ketik password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#701A24] text-xs font-medium bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#701A24] text-white font-semibold rounded-xl hover:bg-[#54121B] transition shadow-md duration-200 text-xs"
            >
              {loading 
                ? 'Memproses...' 
                : isRegisterMode 
                  ? 'Daftarkan Akun Eka' 
                  : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}