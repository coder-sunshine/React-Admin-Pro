import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugins'
import { createProxy } from './build/proxy'
import { wrapperEnv } from './build/getEnv'
import { resolve } from 'path'
import pkg from './package.json'
import dayjs from 'dayjs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  // 加载 envDir 中的 .env 文件。默认情况下只有前缀为 VITE_ 会被加载，除非更改了 prefixes 配置。
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { dependencies, devDependencies, name, version } = pkg
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    define: {
      // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
      // 为了与 esbuild 的行为保持一致，表达式必须为一个 JSON 对象（null、boolean、number、string、数组或对象），亦或是一个单独的标识符。
      __APP_INFO__: JSON.stringify({ __APP_INFO__ }),
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      // 打包后是否丢弃控制台输出
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild', // 默认值
      // esbuild is faster to package, but cannot remove console.log, terser is slower to package, but can remove console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小。（以 kbs 为单位）。它将与未压缩的 chunk 大小进行比较
      chunkSizeWarningLimit: 2000,
      // 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并
      rollupOptions: {
        output: {
          // 静态资源分类和包装
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
