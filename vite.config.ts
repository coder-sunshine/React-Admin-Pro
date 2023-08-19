import { ConfigEnv, UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import stylelintPlugin from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  console.log('mode', mode)
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [react(), stylelintPlugin()],
  }
})
