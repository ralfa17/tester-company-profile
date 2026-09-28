import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        <div className="w-12 h-12 bg-[#701A24] rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2 shadow-md">
          BM
        </div>
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
                <option value="psikolog">Psikolog Klinis</option>
                <option value="terapis">Terapis Anak</option>
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
          <input
            type="password"
            required
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#701A24] focus:border-transparent outline-none text-xs transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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