<template>
  <section class="mx-auto mb-[10em] flex flex-col items-center p-4">
    <CarrouselComponent
      :slides="[
        { path: 'https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_01.png' },
        { path: 'https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_02.png' },
        { path: 'https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_03.png' },
      ]"
    />

    <div class="stats stats-vertical mt-4 w-full bg-white shadow lg:stats-horizontal">
      <div class="stat">
        <div class="stat-title text-secondary">
          Total de vendas
        </div>
        <div class="stat-value text-primary">
          31K
        </div>
        <div class="stat-desc text-slate-400">
          01/Jan - {{ new Date().toLocaleDateString() }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-title text-secondary">
          Funcionários
        </div>
        <div class="stat-value text-primary">
          4,200
        </div>
        <div class="stat-desc text-slate-400">
          ↗︎ 400 (22%)
        </div>
      </div>

      <div class="stat">
        <div class="stat-title text-secondary">
          Total de funcionários
        </div>
        <div class="stat-value text-primary">
          1,200
        </div>
        <div class="stat-desc text-slate-400">
          ↘︎ 90 (14%)
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
      <a v-for="card in cards" :key="card.label" class="relative col-span-1 mt-4 block cursor-pointer gap-4 overflow-hidden rounded-lg border border-slate-100 ">
        <section class="p-4 hover:bg-slate-200 sm:p-6 lg:p-8" @click.prevent="onChangeView(card.view)">
          <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div class="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 class="text-lg font-bold text-primary sm:text-xl">
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
            <p class="max-w-[40ch] text-sm text-black">
              {{ card.subtitle }}
            </p>
          </div>
        </section>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(["change-view"]);

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
