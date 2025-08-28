import { defineConfig } from 'vite'

export default defineConfig({
  // 👇 bắt buộc phải có, trùng với tên repo
  base: '/DungeonCard/',

  server: {
    port: 3000,
    open: true
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },

  // Giữ mặc định, không override publicDir = 'assets'
  // Nếu có file tĩnh (ảnh, icon, json...) thì để vào thư mục "public/"
  // Vite sẽ copy nguyên trạng vào dist
  publicDir: 'public'
})
