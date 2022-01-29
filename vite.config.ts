import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import vitePluginRaw from 'vite-plugin-raw'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: true
    }),
    eslintPlugin({ cache: false }),
    vitePluginRaw({
      match: /\.svg$/,
      exclude: [new RegExp(path.resolve(__dirname, './src/assets'))]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
