import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/image2ascii/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~js': resolve(__dirname, './src/js'),
      '~styles': resolve(__dirname, './src/assets/styles'),
      '~fonts': resolve(__dirname, './src/assets/fonts'),
    },
  },
  publicDir: 'src/public',
});
