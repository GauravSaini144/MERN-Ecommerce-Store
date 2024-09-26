import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'use-sync-external-store/with-selector': 'use-sync-external-store/shim/with-selector.js',
      
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },

        
          external: ['path', 'os', 'crypto'],
        
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit
  },
});
