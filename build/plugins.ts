import { resolve } from 'path'
import { PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
// vite-plugin-compression 打包压缩插件
import viteCompression from 'vite-plugin-compression'

/**
 * Create vite plugin
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv

  return [
    react(),
    // esLint错误消息显示在浏览器界面上
    checker({ typescript: true }),
    // 创建打包的压缩配置
    createCompression(viteEnv),
    // 注入变量到html文件
    createHtmlPlugin({
      minify: true,
      viteNext: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE },
      },
    }),
    // Create svg icons
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // Whether to generate package preview, analyze dependent package size for optimization
    VITE_REPORT && (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as PluginOption),
  ]
}

/**
 * Generate different compression rules according to the compress configuration
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  // 压缩方式  |  压缩是否删除原始文件
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
  const compressList = VITE_BUILD_COMPRESS.split(',')
  const plugins: PluginOption[] = []
  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        ext: '.gz',
        algorithm: 'gzip',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      })
    )
  }
  return plugins
}

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_GLOB_APP_TITLE } = viteEnv
  return VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: '#ffffff',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  })
}
