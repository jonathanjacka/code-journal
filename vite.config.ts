import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          // inject process.env.NODE_ENV
          process: 'process',
        }),
      ],
    },
  },

})
