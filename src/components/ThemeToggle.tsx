'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // initialize from localStorage or system preference
    try {
      const saved = localStorage.getItem('wd-theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldDark = saved ? saved === 'dark' : prefersDark;
      document.documentElement.classList.toggle('theme-dark', shouldDark);
      setIsDark(shouldDark);
    } catch {
      // no-op
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('theme-dark', next);
    try { localStorage.setItem('wd-theme', next ? 'dark' : 'light'); } catch {}
    setIsDark(next);
  };

  return (
    <button type="button" className="text-sm px-3 py-1 rounded border" onClick={toggle}>
      Tema: {isDark ? 'Mørk' : 'Lys'}
    </button>
  );
}


