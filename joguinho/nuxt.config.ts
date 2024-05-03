// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@Core': resolve(__dirname, './core')
  },
})
