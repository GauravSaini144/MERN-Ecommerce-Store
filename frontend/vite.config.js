import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    NodePolyfillPlugin()
  ],

  resolve: {
    alias: {
      path: 'path-browserify',
      os: 'os-browserify/browser',
      crypto: 'crypto-browserify'
    }
  }
})
