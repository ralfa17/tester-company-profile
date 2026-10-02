import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('admin') // Default 'admin'
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            },
          },
        })
        if (error) throw error
        setMessage('Registrasi akun tim berhasil! Silakan pindah ke menu login.')
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* HEADER LOGO & BRAND */}
      <div className="text-center mb-6">
        <img 
          src="/logo.png" 
          alt="Logo Benang Merah" 
          className="w-12 h-12 object-contain mx-auto mb-2 drop-shadow-md"
          onError={(e) => {
            // Fallback otomatis jika nama file di folder public adalah logo.jpeg
            e.target.onerror = null;
            e.target.src = "/logo.jpeg";
          }}
        />
        <h2 className="text-2xl font-bold text-gray-800">Portal Tim Benang Merah</h2>
        <p className="text-xs text-gray-500 mt-1">Akses Khusus Admin, Psikolog, Terapis & IT</p>
      </div>

      {/* ALERT NOTIFIKASI / ERROR */}
      {message && (
        <div 
          className={`p-3 rounded-lg mb-4 text-xs leading-relaxed font-medium ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          {message}
        </div>
      )}

      {/* FORM AUTHENTICATION */}
      <form onSubmit={handleAuth} className="space-y-4 text-left">
        {!isLogin && (
          <>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nama Lengkap Tim
              </label>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#701A24] focus:border-transparent outline-none text-xs transition"
                placeholder="Contoh: M. Azka Maulana, M.Psi."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Peran / Role Tim
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#701A24] focus:border-transparent outline-none text-xs transition font-medium text-gray-800 bg-white"
              >
                <option value="admin">Admin Klinik</option>
                <option value="psikolog">Psikolog</option>
                <option value="terapis">Terapis</option>
                <option value="it">IT & Sistem Data</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Resmi Tim
          </label>
          <input
            type="email"
            required
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#701A24] focus:border-transparent outline-none text-xs transition"
            placeholder="nama@benangmerahpsikologi.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Kata Sandi / Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#701A24] focus:border-transparent outline-none text-xs transition pr-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* ICON MATA SVG ELEGAN & MINIMALIS */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-[#701A24] transition-colors focus:outline-none"
              title={showPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
            >
              {showPassword ? (
                // Icon Eye Off (Mata Coret)
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                </svg>
              ) : (
                // Icon Eye (Mata Terbuka)
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#701A24] hover:bg-[#54121B] text-white font-semibold rounded-lg transition duration-200 text-xs shadow-md disabled:opacity-50 mt-2"
        >
          {loading ? 'Memproses...' : isLogin ? 'Masuk ke Portal Tim' : 'Daftarkan Akun Tim'}
        </button>
      </form>

      {/* FOOTER SWITCH LOGIN / REGISTRASI */}
      <p className="mt-5 text-center text-xs text-gray-600">
        {isLogin ? 'Belum punya akun tim? ' : 'Sudah punya akun tim? '}
        <button
          type="button"
          onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
          className="text-[#701A24] font-bold hover:underline ml-0.5"
        >
          {isLogin ? 'Daftar Akun Baru' : 'Masuk di sini'}
        </button>
      </p>
    </div>
  )
}