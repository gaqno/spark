<template>
  <div class="flex h-full flex-col px-8">
    <div class="flex justify-between gap-x-6 py-4">
      <div class="my-auto flex flex-row gap-x-4">
        <article class="rounded-lg border border-slate-100 bg-white p-6">
          <div>
            <p class="truncate text-sm text-slate-500">
              Total de sistemas
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ systems.length }}
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
              Total de sistemas ativos
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ getTotalSystemsActive }}
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

      <Bar :data="props.chartData.data" :options="props.chartData.options" class="max-w-sm" />
    </div>

    <TableComponent
      template="stock"
      title="Sistemas"
      :action="handleSlide"
      :actions="[
        { label: 'Editar', icon: 'mdi:square-edit-outline', template: 'edit', action: handleSlide },
        { label: 'Excluir', icon: 'mdi:trash-can-outline', template: 'delete', action: handleModal },
      ]"
      :columns="[
        { label: 'ID', field: 'idExterno', sortable: false, details: false, type: 'string' },
        { label: 'Sistema', field: 'nome', sortable: false, details: false, type: 'string' },
        { label: 'URL', field: 'url', sortable: false, details: false, type: 'string' },
        { label: 'Descrição', field: 'descricao', sortable: false, details: false, type: 'string' },
        { label: 'Status', field: 'status', sortable: false, details: false, type: 'boolean' },
        { label: 'Ações', field: 'actions', sortable: false, details: false, type: 'actions' },
      ]"
      :data="systems"
      :description="`Você possui ${systems.length} sistemas cadastrados.`"
      :pagination="pagination"
      @prev="handlePagination('prev')"
      @next="handlePagination('next')"
      @page="handlePagination('page', $event)"
    >
      <template #actions>
        <div class="flex flex-row items-center gap-x-2">
          <span class="flex flex-col">
            <label>Busque por nome</label>
            <input type="text" class="input input-bordered input-sm" placeholder="Busque">
          </span>

          <span class="flex flex-col">
            <label>Mostrando</label>
            <select v-model="pagination.limit" class="input input-bordered input-sm w-40 text-xs" @change="fetchSystems">
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
import { getSystems } from "~/service/api";

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
const systems = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  q: "",
  actual: 1,
  limit: 10,
});

const getTotalSystemsActive = computed(() => {
  return systems.value.filter(i => i.status).length;
});

const fetchSystems = () => {
  return new Promise((resolve, reject) => {
    getSystems({
      _page: pagination.value.actual,
      _limit: pagination.value.limit,
      q: pagination.value.q || null,
    }).then((res) => {
      pagination.value.total = parseInt(res.length);
      pagination.value.pages = 5;
      systems.value = res.map(i => ({
        descricao: i.descricao,
        icone: i.icone,
        nome: i.nome,
        permissoes: i.permissoes,
        status: i.status === "A",
        url: i.url,
      }));

      // const obj = {
      //   labels: systems.value.map(i => i.nomeSistema).filter((v, i, a) => a.indexOf(v) === i && v),
      //   datasets: [
      //     {
      //       backgroundColor: getRandomHEX,
      //       data: systems.value.map(i => i.nomePerfil),
      //     },
      //   ],
      // };
      // systemChart.value = obj;
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

const handlePagination = (action, callback) => {
  if (action === "next") {
    pagination.value.actual++;
    fetchSystems();
  }
  if (action === "prev") {
    pagination.value.actual--;
    fetchSystems();
  }
  if (action === "page") {
    pagination.value.actual = callback;
    fetchSystems();
  }
  if (action === "limit") {
    pagination.value.limit = callback;
    fetchSystems();
  }
};

const handleSlide = (template, _value) => {
  if (template === "edit") {
    app.setSlide({
      show: true,
      title: "Editar sistema",
      template: "edit",
      data: { ..._value },
    });
  }

  if (template === "filters") {
    app.setSlide({
      show: true,
      title: "Filtros sistema",
      template: "edit",
      data: { ..._value },
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
  fetchSystems();
});
</script>
