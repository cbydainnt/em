import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(__dirname, '..', '..');
const certPath = path.join(rootPath, 'apps', 'backend', 'cert');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '../../node_modules/onnxruntime-web/dist/*.wasm',
          dest: './',
        },
      ],
    }),
  ],
  build: {
    target: 'esnext',
    sourcemap: false,
    outDir: 'dist',
    chunkSizeWarningLimit: 2000, // tăng giới hạn cảnh báo chunk size

    rollupOptions: {
      output: {
        // ⚙️ Tự động tách các thư viện trong node_modules ra thành chunk riêng
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const parts = id.split('node_modules/')[1].split('/');
            return parts[0] === '@' ? parts.slice(0, 2).join('/') : parts[0];
          }
        },
      },
      onwarn(warning, warn) {
        // ⚠️ Ẩn cảnh báo "Use of eval" của onnxruntime
        if (warning.message.includes('Use of eval')) return;
        warn(warning);
      },
    },
  },
  esbuild: {
    legalComments: 'none', // loại bỏ comment license trong file build
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  assetsInclude: ['**/*.onnx'],
  resolve: {
    alias: {
      '@/': `${resolve('./src')}/`,
      '@components': `${resolve('./src/components')}/`,
      '@layouts': `${resolve('./src/layouts')}/`,
      '@assets': `${resolve('./src/assets')}/`,
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.join(certPath, 'key.pem')),
      cert: fs.readFileSync(path.join(certPath, 'cert.pem')),
    },
    port: Number(process.env.VITE_FRONTEND_PORT),
    proxy: {
      '/api': {
        target: 'https://localhost:' + process.env.VITE_PORT,
        changeOrigin: true,
        secure: false, // vì cert tự ký
      },
      '/graphql': {
        target: 'https://localhost:' + process.env.VITE_PORT,
        changeOrigin: true,
        secure: false, // vì cert tự ký
      },
    },
  },
});
