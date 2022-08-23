import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      '~': './src',
    },

    environment: 'happy-dom',
    globals: true,
  },
})
