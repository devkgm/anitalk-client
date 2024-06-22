import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/ws': {
                target: 'http://localhost:80',
                // ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/ws/, ''),
            },
        },
    },
    define: {
        global: {},
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@recoil': fileURLToPath(new URL('./src/recoil', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
            '@apis': fileURLToPath(new URL('./src/apis', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/styles/main.scss";',
            },
        },
        modules: {
            localsConvention: 'camelCase',
        },
    },
});
