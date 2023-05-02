import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://test-junior-matheus-lousada.up.railway.app'
    }
  },
  plugins: [react()]
})
