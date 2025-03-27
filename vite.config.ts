import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0', // Listen on all network interfaces (required for Docker)
        watch: {
            usePolling: true, // Ensures file changes are detected inside Docker
        },
        strictPort: true,
        port: 5173, // Ensure this matches the exposed port in docker-compose.yml
        hmr: {
            host: 'local.my-career.com', // Ensures HMR works when accessed via localhost
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
