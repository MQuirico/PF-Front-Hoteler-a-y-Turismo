import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['node_modules/react-datepicker/dist/react-datepicker.js', 'node_modules/react-datepicker/dist/']
    }
  }
})

