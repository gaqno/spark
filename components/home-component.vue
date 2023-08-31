<template>
  <section class="mx-auto mb-[10em] flex flex-col items-center p-4">
    <div class="mx-auto max-w-screen-xl py-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
        <div class="relative overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
          <CarrouselComponent
            :slides="[
              { path: 'https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_01.png' },
              { path: 'https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_02.png' },
              { path: 'https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_03.png' },
            ]"
          />
        </div>

        <div class="mx-4 lg:py-24">
          <h2 class="text-3xl font-bold sm:text-4xl">
            Bem vindo!
          </h2>

          <p>
            {{ client.nome }}, você está logado como
            <span class="badge">
              {{ client.roles[0] || 'Nenhuma permissão' }}
            </span>
          </p>
          <p class="mt-4">
            <span>
              Vinculado a empresa
              <span v-for="company in client.empresas" :key="`${company.nome}_home`" class="badge">
                {{ company.nome }}
              </span>
            </span>
          </p>

          <a href="#" class="mt-8 inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
            Ver eventos
          </a>
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
      <a v-for="card in cards" :key="card.label" class="relative col-span-1 mt-4 block cursor-pointer gap-4 overflow-hidden rounded-lg border border-slate-100 ">
        <section :class="[!app.darkMode ? 'bg-white hover:bg-slate-200' : 'bg-slate-800 text-white hover:bg-slate-900', 'p-4 sm:p-6 lg:p-8']" @click.prevent="onChangeView(card.view)">
          <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div class="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 class="text-lg font-bold sm:text-xl">
                {{ card.label }}
              </h3>
            </div>

            <div class="hidden sm:block sm:shrink-0">
              <Icon
                :name="card.icon"
                class="h-12 w-12 rounded-lg object-cover p-1 shadow-lg"
              />
            </div>
          </div>

          <div class="mt-4">
            <p class="max-w-[40ch] text-sm">
              {{ card.subtitle }}
            </p>
          </div>
        </section>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useClientStore } from "@/store/client";
import { useAppStore } from "@/store/app";

const app = useAppStore();
const emit = defineEmits(["change-view"]);
const client = useClientStore();

const onChangeView = (view: string) =>
  emit("change-view", view);

const cards = ref([
  {
    label: "Assitente virtual",
    subtitle: "Utilize nossa assistente virtual para te ajudar nas tarefas diárias!",
    icon: "mdi:robot",
    view: "assistant",
    tags: ["#assistente", "#virtual"],
  },
  {
    label: "Equipes",
    subtitle: "Acompanhe todas as equipes da sua empresa em tempo real!",
    icon: "mdi:account-group",
    view: "teams",
    tags: ["#assistente", "#virtual"],
  },
  {
    label: "Calendário",
    subtitle: "Acompanhe um calendário com todos os eventos atribuídos a você",
    icon: "mdi:calendar",
    view: "calendar",
    tags: ["#assistente", "#virtual"],
  },
  {
    label: "Relatório",
    subtitle: "Acompanhe relatórios de vendas, funcionários e muito mais!",
    icon: "mdi:chart-line",
    view: "reports",
    tags: ["#assistente", "#virtual"],
  },
]);
</script>
