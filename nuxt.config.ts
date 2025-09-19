// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@Core': resolve(__dirname, './core')
  },
  devServer: {
    port: process.env['port'] ? parseInt(process.env['port']) : 3000,
  },
  nitro: {
    experimental: {
      websocket: true,
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})
