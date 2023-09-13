<template>
  <div>
    <div class="flex h-full flex-col px-8">
      <div class="flex justify-between gap-x-6 py-4">
        <div class="my-auto flex flex-row gap-x-4">
          <article class="rounded-lg border border-slate-100 bg-white p-6">
            <div>
              <p class="truncate text-sm text-slate-500">
                Total de usuários
              </p>

              <p class="text-2xl font-medium text-slate-900">
                {{ users.length }}
              </p>
            </div>

            <div class="mt-1 flex gap-1 text-green-600">
              <Icon name="material-symbols:show-chart" class="h-4 w-4" />

              <p class="flex gap-2 text-xs">
                <span class="font-medium">
                  x.y%
                </span>

                <span class="truncate text-slate-500">
                  Maior que mês passado
                </span>
              </p>
            </div>
          </article>

          <article class="rounded-lg border border-slate-100 bg-white p-6">
            <div>
              <p class="truncate text-sm text-slate-500">
                Total de usuários ativos
              </p>

              <p class="text-2xl font-medium text-slate-900">
                {{ usersActive.length }}
              </p>
            </div>

            <div class="mt-1 flex gap-1 text-red-600">
              <Icon name="material-symbols:show-chart" class="h-4 w-4 rotate-180" />

              <p class="flex gap-2 text-xs">
                <span class="font-medium">
                  x.y%
                </span>
                <span class="truncate text-slate-500">
                  Maior que mês passado
                </span>
              </p>
            </div>
          </article>
        </div>

        <Bar :data="props.chartData.data" :options="props.chartData.options" class="max-w-sm" />
      </div>

      <TableComponent
        template="stock"
        title="Usuários"
        :action="handleSlide"
        :actions="[
          { label: 'Editar', icon: 'mdi:square-edit-outline', template: 'edit', action: handleSlide },
          { label: 'Excluir', icon: 'mdi:trash-can-outline', template: 'delete', action: handleModal },
        ]"
        :columns="[
          { label: 'ID Externo', field: 'idUsuario', sortable: false, details: false, type: 'string' },
          { label: 'Nome', field: 'nome', sortable: false, details: false, type: 'string' },
          { label: 'Login', field: 'login', sortable: false, details: false, type: 'string' },
          { label: 'Status', field: 'status', sortable: false, details: false, type: 'boolean' },
          { label: 'Ações', field: 'actions', sortable: false, details: false, type: 'actions' },
        ]"
        :data="users"
        :description="`Você possui ${users.length} usuários cadastrados.`"
        :pagination="pagination"
        @prev="handlePagination('prev')"
        @next="handlePagination('next')"
        @page="handlePagination('page', $event)"
      >
        <template #actions>
          <div class="flex flex-row items-center gap-x-2">
            <span class="flex flex-col">
              <label>Busque por nome</label>
              <input type="text" class="input input-bordered" placeholder="Busque">
            </span>

            <span class="flex flex-col">
              <label>Mostrando</label>
              <select v-model="pagination.limit" class="input input-bordered w-40" @change="fetchUsers">
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
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, ArcElement, PointElement, Legend, BarElement, CategoryScale, LinearScale, LineElement } from "chart.js";
import { useAppStore } from "@/store/app";
import { getUsers } from "~/service/api";
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
const users = ref([]);
const pagination = ref({
  actual: 1,
  q: "",
  limit: 10,
  total: 0,
  pages: 0,
});

const usersActive = computed(() => {
  return users.value.filter(user => user.status);
});

const fetchUsers = () => {
  getUsers({
    _start: (pagination.value.actual - 1) * pagination.value.limit,
    _end: pagination.value.actual * pagination.value.limit,
    q: pagination.value.q || null,
  })
    .then((res) => {
      pagination.value.total = parseInt(res.length);
      pagination.value.pages = 5;
      users.value = res.map((user) => {
        return {
          ...user,
          status: user.status === "A",
        };
      });
    });
};

const handlePagination = (action, callback) => {
  if (action === "next") {
    pagination.value.actual++;
    fetchUsers();
  }
  if (action === "prev") {
    pagination.value.actual--;
    fetchUsers();
  }
  if (action === "page") {
    pagination.value.actual = callback;
    fetchUsers();
  }
  if (action === "limit") {
    pagination.value.limit = callback;
    fetchUsers();
  }
};

const handleSlide = (template, _value) => {
  getUsers({ idUsuario: _value.idUsuario })
    .then((res) => {
      if (template === "edit") {
        app.setSlide({
          show: true,
          template: "edit",
          title: "Editar usuário",
          data: { ..._value, ...res[0] },
        });
      }

      if (template === "filters") {
        app.setSlide({
          show: true,
          template: "edit",
          title: "Filtros usuário",
          data: { ..._value, ...res[0] },
        });
      }
    }).catch(() => {
      app.setToast({
        show: true,
        content: "Erro ao buscar usuário",
        title: "Erro",
      });
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

onMounted(() => {
  fetchUsers();
});

</script>
