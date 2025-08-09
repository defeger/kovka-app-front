import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    preview: {
    allowedHosts: ['defeger-kovka-app-front-7dc0.twc1.net'],
  },
})
