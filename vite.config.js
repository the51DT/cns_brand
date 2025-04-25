// vite.config.js

import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import fg from 'fast-glob';
import path from 'path';
import pretty from 'pretty';
import { readFileSync, writeFileSync } from 'fs';

export default defineConfig({
    plugins: [
        ViteEjsPlugin({
            data: {
                title: 'LG CNS',
                description: 'IT신기술로 고객의 DX 경험을 혁신하는 Digital Business Innovator! LG CNS의 공식 홈페이지입니다.',
            },
        }),
        // ViteImageOptimizer({
        //     test: /\.(jpe?g|png|gif|webp|svg)$/i,
        //     png: { quality: 80 },
        //     jpeg: { quality: 80 },
        //     svg: false,
        //     webp: false,
        // }),
        {
            name: 'html-formatter',
            apply: 'build', // 빌드 단계에서만 실행
            writeBundle() {
                const files = fg.sync(['dist/**/*.html']);
                files.forEach(file => {
                    let content = readFileSync(file, 'utf-8');
                    if (!/<head>/i.test(content)) {
                        content = content.replace(/<link\s+rel=["']stylesheet["'][^>]*>/gi, '');
                    }
                    const formatted = pretty(content, { ocd: true });
                    writeFileSync(file, formatted, 'utf-8');
                });
            },
        },
    ],
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@use '/src/assets/css/_custom_var' as *;`,
    //         },
    //     },
    // },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false, // CSS 코드 분할 비활성화
        //minify: 'esbuild',
        minify: false,
        assetsInlineLimit: 0, // 모든 자산을 파일로 처리 (이미지 인라인 방지)
        rollupOptions: {
            preserveModules: true, // 모듈 구조 유지
            input: Object.fromEntries(
                fg.sync(['./index.html', './src/**/*.html']).map(file => [
                    path.relative('.', file).replace(/\.html$/, '').replace(/\//g, '-'),
                    path.resolve(__dirname, file),
                ])
            ),
            output: {
                manualChunks: undefined, // 추가적인 번들링 최적화 방지
                entryFileNames: (chunkInfo) => {
                    // 원래 폴더 구조를 유지하여 js 폴더에 저장
                    const name = chunkInfo.name;
                    return `assets/js/${name}.js`;
                },
                chunkFileNames: (chunkInfo) => {
                    // 청크 파일도 js 폴더 내에 저장
                    const name = chunkInfo.name;
                    return `assets/js/${name}.js`;
                },
                assetFileNames: (assetInfo) => {
                    console.log('Processing asset:', assetInfo.name); // 디버깅용 로그
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'assets/css/index.css'; // 모든 CSS를 assets/css/index.css로 통합
                    }
                    if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
                        return 'assets/images/[name].[extname]'; // 이미지를 assets/images/ 폴더로 저장
                    }
                    // if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                    //     return 'assets/fonts/[name].[hash][extname]'; // 폰트를 assets/fonts/ 폴더로 저장
                    // }
                    return 'assets/other/[name].[hash][extname]'; // 기타 자산은 assets/other/ 폴더로 저장
                },
            },
        },
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
        middleware: (req, res, next) => {
            if (req.headers['user-agent']?.includes('Live Server')) {
                res.statusCode = 500;
                res.end('Error: Live Server는 지원되지 않습니다. 개발을 위해 Vite를 사용하세요.');
            } else {
                next();
            }
        },
    },
});