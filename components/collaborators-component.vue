<template>
  <div class="flex h-full flex-col px-8">
    <div class="flex flex-col justify-between gap-4 py-4 md:flex-row">
      <div class="my-auto flex flex-col gap-4 md:flex-row">
        <article class="rounded-lg border border-slate-100 bg-white p-6">
          <div>
            <p class="truncate text-sm text-slate-500">
              Total de colaboradores
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ collaborators.length }}
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
              Total de colaboradores ativos
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ getTotalCollaboratorsActive }}
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
      <Bar :data="dataChart" :options="chartOptions" class="max-h-[20vh] max-w-sm" />
    </div>

    <TableComponent
      template="stock"
      title="Colaboradores"
      :action="handleSlide"
      :toggle="toggleActive"
      :actions="[
        { label: 'Editar', icon: 'mdi:square-edit-outline', template: 'edit', action: handleSlide },
        { label: 'Visualizar', icon: 'ic:baseline-remove-red-eye', template: 'view', action: handleModal },
        { label: 'Redefinir senha', icon: 'solar:lock-password-outline', template: 'delete', action: handleModal },
      ]"
      :columns="columns"
      :data="collaborators"
      :dark-mode="app.darkMode"
      :description="`Você possui ${collaborators.length} colaboradores cadastrados.`"
      :pagination="pagination"
      :route="app.route"
      :loading="app.loading"
      @prev="handlePagination('prev')"
      @next="handlePagination('next')"
      @sort="handlePagination('sort', $event)"
      @page="handlePagination('page', $event)"
    >
      <template #actions>
        <div class="flex flex-col items-center gap-4 py-8 md:flex-row">
          <span class="flex flex-col">
            <label>Busque por nome</label>
            <input
              v-model="pagination.q"
              type="text"
              class="input input-bordered input-sm md:w-40"
              placeholder="Busque"
              @keyup.enter="fetchCollaborators"
            >
          </span>

          <span class="flex flex-col">
            <label>Mostrando</label>
            <select v-model="pagination.limit" class="input input-bordered input-sm w-72 text-xs md:w-40" @change="fetchCollaborators">
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
import { getCollaborators, putCollaborator } from "@/service/api";
ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);

const dataChart = {
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
      label: "Criação de colaboradores",
      backgroundColor: "#003a5d",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
};

const app = useAppStore();
const columns = ref(
  [
    { label: "Nome", field: "nome", sortable: false, details: false, type: "group_info" },
    { label: "Login", field: "login", sortable: false, details: false, type: "string" },
    { label: "Status", field: "status", sortable: false, details: false, type: "toggle" },
    { label: "Ações", field: "actions", sortable: false, details: false, type: "actions" },
  ],
);
const collaborators = ref([]);
const systems = ref([]);
const pagination = ref({
  actual: 1,
  q: "",
  limit: 10,
  total: 0,
  pages: 0,
  sort: {
    field: "",
    order: "",
  },
});

const getTotalCollaboratorsActive = computed(() => {
  return collaborators.value.filter(i => i.status).length;
});

const fetchCollaborators = () => {
  return new Promise((resolve, reject) => {
    getCollaborators({
      _start: (pagination.value.actual - 1) * pagination.value.limit,
      _end: pagination.value.actual * pagination.value.limit,
      _sort: pagination.value.sort.field || null,
      _order: pagination.value.sort.order || null,
      q: pagination.value.q || null,
    })
      .then((res) => {
        pagination.value.total = parseInt(res.length);
        pagination.value.pages = 5;
        collaborators.value = res.map(i => ({
          id: i.id,
          login: i.login,
          nome: i.nome,
          status: i.status === "true",
        }));
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
  });
};

const handlePagination = (action, callback) => {
  if (action === "next") {
    pagination.value.actual++;
    fetchCollaborators();
  }
  if (action === "prev") {
    pagination.value.actual--;
    fetchCollaborators();
  }
  if (action === "page") {
    pagination.value.actual = callback;
    fetchCollaborators();
  }
  if (action === "limit") {
    pagination.value.limit = callback;
    fetchCollaborators();
  }
  if (action === "sort") {
    columns.value.forEach((i) => {
      if (i.field === callback.field) {
        i.sortable = !i.sortable;
        pagination.value.sort = {
          field: callback.field,
          order: i.sortable ? "asc" : "desc",
        };
      } else {
        i.sortable = false;
      }
    });
    fetchCollaborators();
  }
};

const handleSlide = (template, _value) => {
  getCollaborators({ idPerfil: _value.idPerfil })
    .then((res) => {
      if (template === "edit") {
        app.setSlide({
          show: true,
          template: "edit",
          title: "Editar dados do colaborador",
          data: {
            ..._value,
            ...systems.value.find(i => i.nome === _value.nomeSistema),
            permissoes: res[0].permissoes,
            sistemas: systems.value,
          },
        });
      }

      if (template === "add") {
        app.setSlide({
          show: true,
          template: "edit",
          title: "Editar dados do colaborador",
          data: {
            ..._value,
            ...systems.value.find(i => i.nome === _value.nomeSistema),
            permissoes: res[0].permissoes,
            sistemas: systems.value,
          },
        });
      }

      if (template === "filters") {
        app.setSlide({
          show: true,
          template: "edit",
          title: "Filtros grupo de permissões",
          data: { ..._value, ...res[0] },
        });
      }
    });
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

const toggleActive = (value, obj) => {
  return new Promise((resolve, reject) => {
    putCollaborator({
      id: obj.id,
      nome: obj.nome,
      login: obj.login,
      statusDescricao: obj.statusDescricao ?? "",
      status: value === "true" ? "false" : "true",
    })
      .then((res) => {
        fetchCollaborators();
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

onMounted(() => {
  Promise.all([
    fetchCollaborators(),
  ]);
});
</script>
