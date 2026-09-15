// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Tambahkan ini agar favicon.ico default tidak diikutsertakan:
      includeAssets: ['bm.png', 'robots.txt', 'apple-touch-icon.png'], 
      manifest: {
        name: 'Klinik Psikologi Benang Merah',
        short_name: 'Benang Merah',
        description: 'Layanan Psikologi & Konseling Benang Merah Cirebon',
        theme_color: '#ffffff',
        start_url: '/', // Pastikan ini ada
        display: 'standalone', // Pastikan ini ada
        icons: [
          // Konfigurasi ini memberitahu PWA untuk memakai bm.png untuk semua ukuran
          {
            src: '/bm.png',
            sizes: '192x192 512x512', // Cukup cantumkan ukuran yang diminta
            type: 'image/png',
            purpose: 'any maskable' // Tambahkan 'maskable' agar ikon bagus di Android
          }
        ]
      }
    })
  ],
})