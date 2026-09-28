import { defineConfig } from 'vite'
import react from '@vitejs.plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'bm.png', 'robots.txt'],
      manifest: {
        name: 'Klinik Psikologi Benang Merah',
        short_name: 'Benang Merah',
        description: 'Sistem Rekam Medis & Layanan Klinik Psikologi Benang Merah',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/bm.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/bm.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Rekam Medis',
            short_name: 'RekamMedis',
            description: 'Buka langsung menu rekam medis',
            url: '/',
            icons: [{ src: '/bm.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff2}'],
        runtimeCaching: [
          {
            // Cache otomatis untuk respon data Supabase
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-data-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              networkTimeoutSeconds: 4
            }
          }
        ]
      }
    })
  ]
})