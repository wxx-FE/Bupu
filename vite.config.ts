import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import {resolve} from "path"

export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    build: {
        //清除console和debugger
        //terserOptions: {compress: {drop_console: true, drop_debugger: true}},
        //构建时清空文件夹
        emptyOutDir: true,
        // 启用 / 禁用 brotli 压缩大小报告
        brotliSize: true,
        outDir: "../dist",
        minify: 'terser',
        cssCodeSplit: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                //依赖碎片化打包
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split("/")[0].toString()
                    }
                },
                chunkFileNames: 'static/build/js/[name]-[hash].js',
                entryFileNames: 'static/build/js/[name]-[hash].js',
                assetFileNames: 'static/build/[ext]/[name]-[hash].[ext]',
            }
        }
    }
})
