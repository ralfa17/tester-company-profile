import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('admin') // Default 'admin' atau 'psikolog'
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
        setMessage('Registrasi akun tim berhasil! Silakan login.')
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2">
          BM
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Portal Tim Benang Merah</h2>
        <p className="text-xs text-gray-500 mt-1">Admin, Psikolog dan Terapis</p>
      </div>

      {message && (
        <div className={`p-3 rounded-lg mb-4 text-sm ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap Tim</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                placeholder="Contoh: Admin Siska / dr. Anita"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peran Tim</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
              >
                <option value="admin">Admin</option>
                <option value="psikolog">Psikolog</option>
                <option value="terapis">Terapis</option>
                <option value="it">IT</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
            placeholder="benangmerahpsy@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 text-sm shadow-md"
        >
          {loading ? 'Memproses...' : isLogin ? 'Masuk ke Portal' : 'Daftarkan Akun Tim'}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-600">
        {isLogin ? 'Belum punya akun tim? ' : 'Sudah punya akun tim? '}
        <button
          onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
          className="text-red-600 font-semibold hover:underline"
        >
          {isLogin ? 'Daftar Akun Baru' : 'Masuk di sini'}
        </button>
      </p>
    </div>
  )
}