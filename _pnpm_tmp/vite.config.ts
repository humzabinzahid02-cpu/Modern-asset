import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Production vite config — Hostinger deployment
// Figma Make dev-only plugins removed for clean server build
export default defineConfig({
  base: '/',
  build: {
    sourcemap: false,
    minify: true,
    outDir: 'dist',
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
