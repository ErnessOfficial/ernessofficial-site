import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative paths so the site works under GitHub Pages project subpath
  base: '/ernessofficial-site/',
});
