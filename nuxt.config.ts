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
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      OPENAI_CONTEXT: process.env.OPENAI_CONTEXT,
    },
  },
});
