import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        include: ['node_modules/flowbite-react/dist/flowbite.css'],
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: ['flowbite-react'],
    esbuildOptions: {
      target: 'esnext', // Ensure compatibility with modern features
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Ensure native modules are bundled correctly
    },
  },
});
