import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base path based on deployment environment
const base = process.env.VITE_BASE_PATH || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    strictPort: false,
    open: true,
  },
  preview: {
    port: 4173,
    host: '127.0.0.1',
    open: true,
  },
});
