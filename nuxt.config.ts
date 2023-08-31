import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-br",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    "nuxt-icon",
    "nuxt-swiper",
  ],
  nitro: {
    compressPublicAssets: true,
  },
  image: {
    cloudinary: {
      baseURL: "https://app.hmg.redeancora.com.br/portal/imagens/",
    },
  },
  ssr: false,
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
  components: true,
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  tailwindcss: {
    cssPath: "~/global.css",
  },
  runtimeConfig: {
    public: {
      BASE_API: process.env.BASE_API,
      ANCORA_ENDPOINT_DEFAULT: process.env.ANCORA_ENDPOINT_DEFAULT,
      ANCORA_ENDPOINT_STAGING: process.env.ANCORA_ENDPOINT_STAGING,
      ANCORA_ENDPOINT_HOMOLOG: process.env.ANCORA_ENDPOINT_HOMOLOG,
      ANCORA_ENDPOINT_PROD: process.env.ANCORA_ENDPOINT_PROD,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      OPENAI_CONTEXT: process.env.OPENAI_CONTEXT,
    },
  },
});
