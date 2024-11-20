import { defineConfig } from 'vite'
import { automdPlugin } from './.vitepress/plugins/automd'

export default defineConfig({
  plugins: [automdPlugin()],
})
