<template>
  <div class="flex h-full flex-col px-8">
    <div class="flex justify-between gap-x-6 py-4">
      <div class="my-auto flex flex-row gap-x-4">
        <article class="rounded-lg border border-slate-100 bg-white p-6">
          <div>
            <p class="truncate text-sm text-slate-500">
              Total de chaves de API
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ apiKeys.length }}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-green-600">
            <Icon name="material-symbols:show-chart" class="h-4 w-4" />

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                67.81%
              </span>

              <span class="truncate text-slate-500">
                Maior / mês passado
              </span>
            </p>
          </div>
        </article>

        <article class="rounded-lg border border-slate-100 bg-white p-6">
          <div>
            <p class="truncate text-sm text-slate-500">
              Total de consumidores
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ getTotalConsumers }}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-red-600">
            <Icon name="material-symbols:show-chart" class="h-4 w-4 rotate-180" />

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                67.81%
              </span>
              <span class="truncate text-slate-500">
                Maior / mês passado
              </span>
            </p>
          </div>
        </article>

        <article class="rounded-lg border border-slate-100 bg-white p-6">
          <div>
            <p class="truncate text-sm text-slate-500">
              Total chaves ativas
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ getTotalActiveKeys }}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-red-600">
            <Icon name="material-symbols:show-chart" class="h-4 w-4 rotate-180" />

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                67.81%
              </span>
              <span class="truncate text-slate-500">
                Maior / mês passado
              </span>
            </p>
          </div>
        </article>
      </div>

      <Bar :data="props.chartData.data" :options="props.chartData.options" class="max-w-lg" />
    </div>

    <TableComponent
      template="stock"
      title="Chaves de API"
      :action="handleSlide"
      :actions="[
        { label: 'Editar', icon: 'mdi:square-edit-outline', template: 'edit', action: handleSlide },
        { label: 'Excluir', icon: 'mdi:trash-can-outline', template: 'delete', action: handleModal },
      ]"
      :columns="[
        { label: 'Sistema', field: 'nomeSistema', sortable: false, details: false, type: 'string' },
        { label: 'API Key', field: 'prefixo', sortable: false, details: false, type: 'string' },
        { label: 'Consumidor', field: 'consumidor', sortable: false, details: false, type: 'string' },
        { label: 'Criada em', field: 'dataCriacao', sortable: false, details: false, type: 'string' },
        { label: 'Status', field: 'status', sortable: false, details: false, type: 'boolean' },
        { label: 'Ações', field: 'actions', sortable: false, details: false, type: 'actions' },
      ]"
      :data="apiKeys"
      :description="`Você possui ${apiKeys.length} grupos de permissões cadastrados.`"
      :pagination="pagination"
      @prev="handlePagination('prev')"
      @next="handlePagination('next')"
      @page="handlePagination('page', $event)"
    >
      <template #actions>
        <div class="flex flex-row items-center gap-x-2">
          <span class="flex flex-col">
            <label>Busque por nome</label>
            <input
              v-model="pagination.q"
              type="text"
              class="input input-bordered"
              placeholder="Busque"
              @keyup.enter="fetchApiKeys"
            >
          </span>

          <span class="flex flex-col">
            <label>Mostrando</label>
            <select v-model="pagination.limit" class="input input-bordered w-40" @change="handlePagination('limit')">
              <option value="10">
                10 por página
              </option>
              <option value="20">
                20 por página
              </option>
              <option value="30">
                30 por página
              </option>
              <option value="50">
                50 por página
              </option>
              <option value="100">
                100 por página
              </option>
            </select>
          </span>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, ArcElement, PointElement, Legend, BarElement, CategoryScale, LinearScale, LineElement } from "chart.js";
import { useAppStore } from "@/store/app";
import { getApiKeys, getCompanies, getPermissionGroups, getSystems } from "~/service/api";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);

const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({
      data: {},
      options: {},
    }),
  },
});

const app = useAppStore();
const apiKeys = ref([]);
const systems = ref([]);
const companies = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  q: "",
  actual: 1,
  limit: 10,
});

const getTotalConsumers = computed(() => {
  return apiKeys.value.map(i => i.consumidor).filter((v, i, a) => a.indexOf(v) === i && v).length;
});

const getTotalActiveKeys = computed(() => {
  return apiKeys.value.filter(i => i.status).length;
});

const fetchApiKeys = () => {
  return new Promise((resolve, reject) => {
    getApiKeys({
      _page: pagination.value.actual,
      _limit: pagination.value.limit,
      q: pagination.value.q || null,
    })
      .then((res) => {
        pagination.value.total = parseInt(res.length);
        pagination.value.pages = 5;
        apiKeys.value = res.map(i => ({
          consumidor: i.consumidor,
          dataCriacao: i.dataCriacao,
          idApiKey: i.idApiKey,
          idSistema: i.idSistema,
          nomeSistema: i.nomeSistema,
          grupos: i.grupos,
          prefixo: i.prefixo,
          status: i.status === "A",
        }));

        // const obj = {
        //   labels: apiKeys.value.map(i => i.nomeSistema).filter((v, i, a) => a.indexOf(v) === i && v),
        //   datasets: [
        //     {
        //       backgroundColor: getRandomHEX,
        //       data: apiKeys.value.map(i => i.nomePerfil),
        //     },
        //   ],
        // };
        // apiKeysChart.value = obj;
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const fetchCompanies = () => {
  return new Promise((resolve, reject) => {
    getCompanies()
      .then((res) => {
        companies.value = res.map(i => ({
          ...i,
        }));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const fetchSystems = () => {
  return new Promise((resolve, reject) => {
    getSystems()
      .then((res) => {
        systems.value = res.map(i => ({
          descricao: i.descricao,
          icone: i.icone,
          idSistema: i.idSistema,
          nome: i.nome,
          permissoes: i.permissoes,
          status: i.status === "A",
          url: i.url,
        }));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const handlePagination = (action, callback) => {
  if (action === "next") {
    pagination.value.actual++;
    fetchApiKeys();
  }
  if (action === "prev") {
    pagination.value.actual--;
    fetchApiKeys();
  }
  if (action === "page") {
    pagination.value.actual = callback;
    fetchApiKeys();
  }
  if (action === "limit") {
    pagination.value.limit = callback;
    fetchApiKeys();
  }
};

const handleSlide = (template, _value) => {
  if (template === "edit") {
    getApiKeys({ idApiKey: _value.idApiKey })
      .then((apikey) => {
        getPermissionGroups({ nomeSistema: apikey[0].nomeSistema })
          .then((group) => {
            app.setSlide({
              show: true,
              title: "Editar chave de API",
              template: "edit",
              data: {
                ..._value,
                grupos: apikey[0].grupos || [],
                sistemas: systems.value,
                empresas: companies.value,
                gruposArr: group,
              },
            });
          })
          .catch((err) => {
            console.log({ err });
          });
      });
  }
};

const handleModal = (template, _value) => {
  if (template === "delete") {
    app.setModal({
      show: true,
      title: "Confirmação de exclusão",
      content: "Você tem certeza que deseja excluir este item?",
      template: "delete",
      data: { ..._value },
    });
  }
};

onMounted(() => {
  Promise.all([
    fetchApiKeys(),
    fetchCompanies(),
    fetchSystems(),
  ]);
});
</script>
