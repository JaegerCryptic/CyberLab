import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: { exportType: 'default' } })],
  optimizeDeps: {
    include: ['@mui/icons-material', '@mui/material/Unstable_Grid2'],
    exclude: ['surrealdb.wasm'],
  },
  build: {
    sourcemap: true,
  },
})
