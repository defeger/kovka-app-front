import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    preview: {
    allowedHosts: ['https://defeger-kovka-app-front-023f.twc1.net/?roistat_visit=4039933'],
  },
})
