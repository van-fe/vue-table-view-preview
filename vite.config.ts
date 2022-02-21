import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [createVuePlugin({
    jsx: true
  }), viteMockServe({
    localEnabled: true
  })]
})
