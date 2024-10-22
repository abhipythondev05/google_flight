import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows external access
    port: 5173,  // Default port or change to any port you prefer
    open: true   // Opens the app in the default browser when starting
  }
})

