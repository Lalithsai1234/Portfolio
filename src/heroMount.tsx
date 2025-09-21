import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function mount() {
  const rootEl = document.getElementById('react-hero-root');
  if (!rootEl) return;

  const fb = document.getElementById('hero-fallback');
  if (fb) fb.style.display = 'none';
  const pic = document.getElementById('hero-pic-fallback');
  if (pic) pic.style.display = 'none';

  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
