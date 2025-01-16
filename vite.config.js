import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { glob } from 'glob';
import path from 'path';

export default defineConfig({
    plugins: [
        ViteImageOptimizer({
            test: /\.(jpe?g|png|gif|webp|svg)$/i,
            exclude: undefined,
            include: undefined,
            includePublic: true,
            logStats: true,
            ansiColors: true,
            svg: {
                multipass: true,
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                cleanupNumericValues: false,
                                removeViewBox: false,
                            },
                        },
                    },
                ],
            },
            png: {
                quality: 80,
            },
            jpeg: {
                quality: 80,
            },
            jpg: {
                quality: 80,
            },
            webp: {
                lossless: true,
            },
        }),
    ],
    build: {
        outDir: 'dist-public',
        emptyOutDir: true,
        minify: 'esbuild',
        rollupOptions: {
            input: Object.fromEntries(
                glob.sync('./*.html').map(file => [
                    path.basename(file, '.html'),
                    path.resolve(__dirname, file)
                ])
            )
        }
    },
    publicDir: 'public',
    server: {
        port: 5001,
        strictPort: true,
        onListening: (server) => {
            const address = server.address();
            if (address && typeof address === 'object') {
                const port = address.port;
                if (port !== 5001) {
                    console.error(`Error: The server is running on an unexpected port: ${port}. Expected port: 5001.`);
                }
            }
        },
    },
});