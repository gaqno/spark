<template>
  <section class="pointer-events-auto flex flex-col bg-white w-screen max-w-[80vw] md:max-w-[40vw] min-h-screen">
    <div class="bg-primary px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <h2 id="slide-over-title" class="text-base font-semibold leading-6 text-white">
          Spark ✨
        </h2>

        <button class="btn btn-ghost text-white" @click="app.toggleSlide">
          <Icon name="mdi:close" />
        </button>
      </div>
    </div>

    <form>
      <div class="items-center overflow-hidden sm:rounded-md m-8">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl">
              Sobre nós
            </h1>

            <span class="flex flex-col gap-y-4 mt-4 text-left text-gray-500 text-sm">
              <p>
                Tecnologias utilizadas:
              </p>
              <ul>
                <li>Vue 3</li>
                <li>Nuxt 3</li>
                <li>TailwindCSS</li>
                <li>OpenIA</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();
</script>
