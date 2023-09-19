<template>
  <section class="pointer-events-auto flex min-h-screen w-screen max-w-[70vw] flex-col bg-white md:max-w-[30vw]">
    <div class="bg-primary px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <h2 id="slide-over-title" class="text-base font-semibold leading-6 text-white">
          Filtros
        </h2>

        <button class="btn btn-ghost text-white" @click="app.toggleSlide">
          <Icon name="mdi:close" />
        </button>
      </div>
    </div>

    <form v-if="app.route === 'admin_sso'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-800">
                Prefixo
              </label>
              <div class="mt-2">
                <input
                  id="query"
                  v-model="ssoForm.prefixo"
                  name="query"
                  type="query"
                  autocomplete="query"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-800">
                Categoria
              </label>
              <div class="mt-2">
                <input
                  id="query"
                  name="query"
                  type="query"
                  autocomplete="query"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-800">
                Preço
              </label>
              <div class="mt-2">
                <input
                  id="query"
                  name="query"
                  type="query"
                  autocomplete="query"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-slate-800">
          Cancelar
        </button>
        <button type="submit" class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useAppStore } from "@/store/app";

// const emits = defineEmits(["change-view"])
const app = useAppStore();

const ssoForm = ref({
  consumidor: "",
  dataCriacao: "",
  grupos: [],
  idApiKey: "",
  idSistema: "",
  nomeSistema: "",
  prefixo: "",
  status: "",
});

onMounted(() => {
  if (app.route === "admin_sso") {
    ssoForm.value = {
      consumidor: app.getSlideData.consumidor,
      dataCriacao: app.getSlideData.dataCriacao,
      grupos: app.getSlideData.grupos,
      idApiKey: app.getSlideData.idApiKey,
      idSistema: app.getSlideData.idSistema,
      nomeSistema: app.getSlideData.nomeSistema,
      prefixo: app.getSlideData.prefixo,
      status: app.getSlideData.status,
    };
  }
});
</script>
