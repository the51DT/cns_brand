import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
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
        createHtmlPlugin({
            minify: false,
            /**
             * HTML 포맷팅 설정
             */
            prettify: {
                indent_size: 2,
                indent_char: ' ',
                indent_with_tabs: false,
                preserve_newlines: true,
                max_preserve_newlines: 2,
                unformatted: ['pre', 'code'],
                indent_inner_html: true,
                wrap_line_length: 0,
                inline: [],
                end_with_newline: true
            }
        }),
        {
            name: 'move-js-to-bottom',
            transformIndexHtml(html) {
                const scriptRegex = /<script[^>]*src="([^"]+)"[^>]*>(?:<\/script>)?/g;
                const scripts = [];
                let match;

                while ((match = scriptRegex.exec(html)) !== null) {
                    const script = match[0].endsWith('</script>') 
                        ? match[0] 
                        : `${match[0]}</script>`;
                    scripts.push(script);
                }

                html = html.replace(scriptRegex, '');
                return html.replace('</body>', `  ${scripts.join('\n  ')}\n</body>`);
            }
        }
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
});