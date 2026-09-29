// public/sw.js
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Service worker dasar untuk memenuhi syarat PWA
  e.respondWith(fetch(e.request));
});