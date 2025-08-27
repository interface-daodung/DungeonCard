import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Đảm bảo đường dẫn tương đối cho GitHub Pages
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
