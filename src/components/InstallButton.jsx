import React, { useState, useEffect } from 'react';

export default function InstallMobile() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      alert('Untuk menginstall di HP:\n- Chrome/Android: Ketuk titik 3 > Tambahkan ke Layar Utama\n- Safari/iOS: Ketuk ikon Share > Tambahkan ke Layar Utama');
    }
  };

  return (
    <button
      onClick={handleInstall}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-3 py-2 rounded-lg shadow-md flex items-center gap-2"
    >
      📱 Install App di HP
    </button>
  );
}