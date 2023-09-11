<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot name="content">
      <section v-if="app.route === 'admin_sso'" class="pb-20">
        <div class="relative isolate mx-8 overflow-hidden rounded bg-slate-900 py-12">
          <img
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt=""
            class="absolute inset-0 -z-10 h-full w-full object-cover"
          >
          <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
            <div
              class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div
            class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          >
            <div
              class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Admin SSO
            </h2>
            <p class="mt-6 text-lg leading-8 text-white">
              Acompanhe os dados da sua empresa.
            </p>
          </div>
        </div>

        <section>
          <div class="mb-[5vh] mt-8 grid grid-cols-1 items-center gap-8 px-8 lg:grid-cols-2">
            <div :class="[app.darkMode && 'border', 'card card-compact w-full shadow-xl']">
              <div class="card-body">
                <h2 :class="[!app.darkMode ? 'text-primary' : 'text-secondary' , 'card-title mt-2']">
                  Grupos de permissões
                </h2>
                <p>Acompanhe os grupos de permissões</p>

                <div class="flex justify-between gap-x-2">
                  <article class="flex w-full items-center justify-center rounded-lg border border-slate-100 p-6">
                    <div class="flex w-full flex-col">
                      <div>
                        <p class="text-sm text-slate-500">
                          Total de grupos de permissões
                        </p>

                        <span class="flex flex-row">
                          <p class="text-2xl font-medium text-slate-900">
                            27
                          </p>

                          <div class="inline-flex items-center gap-2 rounded bg-green-100 p-1 text-green-600">
                            <Icon name="material-symbols:show-chart" />
                            <span class="text-xs font-medium">
                              7
                            </span>
                          </div>
                        </span>
                      </div>
                      <figure>
                        <Line id="apiKeys" :data="permissionGroupsChartData" :options="optionsChart" />
                      </figure>
                    </div>
                  </article>
                </div>

                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_groups' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>

            <div :class="[app.darkMode && 'border', 'card card-compact w-full shadow-xl']">
              <div class="card-body">
                <h2 :class="[!app.darkMode ? 'text-primary' : 'text-secondary' , 'card-title mt-2']">
                  Chaves de API
                </h2>
                <p>Acompanhe as chaves de API</p>
                <article class="flex w-full items-center justify-center rounded-lg border border-slate-100 p-6">
                  <div class="flex flex-col">
                    <div>
                      <p class="text-sm text-slate-500">
                        Total de chaves de API
                      </p>

                      <span class="flex flex-row">
                        <p class="text-2xl font-medium text-slate-900">
                          1
                        </p>

                        <div class="inline-flex items-center gap-2 rounded bg-green-100 p-1 text-green-600">
                          <Icon name="material-symbols:show-chart" />
                          <span class="text-xs font-medium">
                            2
                          </span>
                        </div>
                      </span>
                    </div>
                    <figure>
                      <Line id="apiKeys" :data="apiKeysChartData" :options="optionsChart" />
                    </figure>
                  </div>
                </article>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_keys' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>

            <div :class="[app.darkMode && 'border', 'card card-compact w-full shadow-xl']">
              <div class="card-body">
                <h2 :class="[!app.darkMode ? 'text-primary' : 'text-secondary' , 'card-title mt-2']">
                  Sistemas
                </h2>
                <span>Acompanhe os sistemas</span>
                <article class="flex w-full items-center justify-center rounded-lg border border-slate-100 p-6">
                  <div class="flex flex-col">
                    <div>
                      <p class="text-sm text-slate-500">
                        Total de Sistemas
                      </p>

                      <span class="flex flex-row">
                        <p class="text-2xl font-medium text-slate-900">
                          34
                        </p>

                        <div class="inline-flex items-center gap-2 rounded bg-green-100 p-1 text-green-600">
                          <Icon name="material-symbols:show-chart" />
                          <span class="text-xs font-medium">
                            2
                          </span>
                        </div>
                      </span>
                    </div>
                    <figure>
                      <Line id="apiKeys" :data="systemsChartData" :options="optionsChart" />
                    </figure>
                  </div>
                </article>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_systems' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>

            <div :class="[app.darkMode && 'border', 'card card-compact w-full shadow-xl']">
              <div class="card-body">
                <h2 :class="[!app.darkMode ? 'text-primary' : 'text-secondary' , 'card-title mt-2']">
                  Usuários
                </h2>
                <span>Acompanhe os usuários</span>
                <article class="flex w-full items-center justify-center rounded-lg border border-slate-100 p-6">
                  <div class="flex flex-col">
                    <div>
                      <p class="text-sm text-slate-500">
                        Total de grupos
                      </p>

                      <span class="flex flex-row">
                        <p class="text-2xl font-medium text-slate-900">
                          1
                        </p>

                        <div class="inline-flex items-center gap-2 rounded bg-green-100 p-1 text-green-600">
                          <Icon name="material-symbols:show-chart" />
                          <span class="text-xs font-medium">
                            2
                          </span>
                        </div>
                      </span>
                    </div>
                    <figure>
                      <Line id="apiKeys" :data="usersChartData" :options="optionsChart" />
                    </figure>
                  </div>
                </article>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_users' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <AdminSsoGroupsComponent
        v-else-if="app.route === 'admin_sso_groups'"
        :chart-data="{
          data: permissionGroupsChartData,
          options: chartOptions,
        }"
        @change-view="($event) => emits('change-view', $event)"
      />

      <AdminSsoKeysComponent
        v-else-if="app.route === 'admin_sso_keys'"
        :chart-data="{
          data: apiKeysChartData,
          options: chartOptions,
        }"
        @change-view="($event) => emits('change-view', $event)"
      />

      <AdminSsoSystemsComponent
        v-else-if="app.route === 'admin_sso_systems'"
        :chart-data="{
          data: systemsChartData,
          options: chartOptions,
        }"
        @change-view="($event) => emits('change-view', $event)"
      />

      <AdminSsoUsersComponent
        v-else-if="app.route === 'admin_sso_users'"
        :chart-data="{
          data: usersChartData,
          options: chartOptions,
        }"
        @change-view="($event) => emits('change-view', $event)"
      />
    </slot>
  </Transition>
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, ArcElement, PointElement, Legend, BarElement, CategoryScale, LinearScale, LineElement } from "chart.js";
import { Doughnut, Line } from "vue-chartjs";
import { useAppStore } from "@/store/app";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);

definePageMeta({ title: "Admin SSO" });

const app = useAppStore();
const emits = defineEmits("change-view");

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const dataChart = {
  labels: ["a", "b", "x", "y"],
  datasets: [
    {
      label: "z",
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

const permissionGroupsChartData = {
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  datasets: [
    {
      label: "Criação de grupos",
      backgroundColor: "#003a5d",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

const apiKeysChartData = {
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  datasets: [
    {
      label: "Criação de chaves de API",
      backgroundColor: "#003a5d",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

const systemsChartData = {
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  datasets: [
    {
      label: "Criação de sistemas",
      backgroundColor: "#003a5d",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

const usersChartData = {
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  datasets: [
    {
      label: "Criação de usuários",
      backgroundColor: "#003a5d",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

</script>
