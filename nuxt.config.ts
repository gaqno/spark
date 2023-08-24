import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // Simple usage
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "nuxt-delay-hydration",
    "nuxt-swiper",
  ],
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
  i18n: {
    vueI18n: "./i18n.config.ts",
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
