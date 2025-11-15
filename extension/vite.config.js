import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'src/popup/index.html',
        options: 'src/options/index.html',
        background: 'src/background.js',
      },
      output: {
        entryFileNames: `src/[name].js`,
        chunkFileNames: `src/[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});
