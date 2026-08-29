import React, { useState } from 'react';

// Icon
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
      name: "Siti Rahma, M.Psi., Psikolog",
      role: "Psikolog Klinis Dewasa",
      license: "SIPP: 1234/SIPP/2024",
      spec: "Spesialisasi: Kecemasan, Depresi & Trauma",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Budi Santoso, M.Psi., Psikolog",
      role: "Psikolog Hubungan & Keluarga",
      license: "SIPP: 5678/SIPP/2024",
      spec: "Spesialisasi: Konseling Pasangan & Burnout",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
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
            <a href="#tentang" className="hover:text-[#701A24] transition-colors">Tentang Kami</a>
            <a href="#psikolog" className="hover:text-[#701A24] transition-colors">Tim Psikolog</a>
            <a href="#faq" className="hover:text-[#701A24] transition-colors">FAQ</a>
          </div>

          <div className="hidden md:block">
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#701A24] hover:bg-[#54121B] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow"
            >
              Konsultasi WhatsApp
            </a>
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
            <a href="#psikolog" onClick={() => setIsMenuOpen(false)}>Tim Psikolog</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#701A24] text-white text-center py-2.5 rounded-full font-medium"
            >
              Konsultasi WhatsApp
            </a>
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
                href="https://wa.me/" 
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

      {/* reting kepercayaan */}
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

      {/* service layer */}
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

      {/* step by step */}
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

      {/* tim profesional */}
      <section id="psikolog" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1E293B] mb-4">Tim Psikolog Profesional</h2>
          <p className="text-[#64748B] text-sm md:text-base font-light">
            Seluruh psikolog kami telah memiliki Surat Izin Praktik Psikologi (SIPP) resmi dan berpengalaman luas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {psychologists.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col sm:flex-row shadow-sm">
              <img src={p.image} alt={p.name} className="w-full sm:w-48 h-56 object-cover" />
              <div className="p-6 flex flex-col justify-center">
                <h3 className="font-serif text-lg font-medium text-[#1E293B]">{p.name}</h3>
                <p className="text-[#701A24] text-xs font-semibold mt-1 mb-2">{p.role}</p>
                <p className="text-[#94A3B8] text-xs mb-3">{p.license}</p>
                <p className="text-[#64748B] text-xs font-light">{p.spec}</p>
              </div>
            </div>
          ))}
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
      <footer className="bg-[#1E293B] text-slate-300 py-16 px-6">
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
            <p className="text-slate-400">📍 Jl. Ir. Soekarno No. 1, Talun, Cirebon</p>
            <p className="text-slate-400">📞 +62 888-629-2665</p>
            <p className="text-slate-400">✉️ benangmerah305@gmail.com</p>
          </div>

          <div className="space-y-3 text-xs">
            <p className="font-semibold text-white uppercase tracking-wider mb-2">Jam Operasional</p>
            <p className="text-slate-400">🕒 Senin - Jumat: 08.00 - 17.00 WIB</p>
            <p className="text-slate-500 italic mt-2">*Konseling dilakukan dengan perjanjian terlebih dahulu.</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center text-xs text-slate-500">
          <p>© 2026 Benang Merah. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}