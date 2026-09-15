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
      manifest: {
        name: 'Klinik Psikologi Benang Merah',
        short_name: 'Benang Merah',
        description: 'Layanan Psikologi & Konseling Benang Merah Cirebon',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/bm.png',
            sizes: '192x192 512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})