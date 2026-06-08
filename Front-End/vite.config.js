import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // <-- Tambahin ini biar ngewhitelist semua host dari tunnel
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/surplus-food': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/explore': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/customer': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/merchant': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})