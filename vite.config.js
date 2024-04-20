/* eslint-env node */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : []
  },
  build: {
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        chunkFileNames: '[hash].js',
        entryFileNames: '[hash].js',
        assetFileNames: '[hash].[ext]',
        manualChunks(id) {
          // if (id.includes('element-plus')) {
          //   return 'element-plus'
          // }
          if (id.includes('fabric')) {
            return 'fabric'
          }
        }
      }
    }
  }
})
