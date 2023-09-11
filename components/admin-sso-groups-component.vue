<template>
  <div class="flex h-full flex-col px-8">
    <div class="flex justify-between gap-x-6 py-4">
      <div class="my-auto flex flex-row gap-x-4">
        <article class="rounded-lg border border-slate-100 bg-white p-6">
          <div>
            <p class="truncate text-sm text-slate-500">
              Total de grupos de permissões
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ permissionGroups.length }}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-green-600">
            <Icon name="material-symbols:show-chart" class="h-4 w-4" />

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                67.81%
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
              Total de grupos de sistemas
            </p>

            <p class="text-2xl font-medium text-slate-900">
              {{ systems.length }}
            </p>
          </div>

          <div class="mt-1 flex gap-1 text-red-600">
            <Icon name="material-symbols:show-chart" class="h-4 w-4 rotate-180" />

            <p class="flex gap-2 text-xs">
              <span class="font-medium">
                67.81%
              </span>
              <span class="truncate text-slate-500">
                Maior que mês passado
              </span>
            </p>
          </div>
        </article>
      </div>

      <Bar :data="props.chartData.data" :options="props.chartData.options" class="max-w-lg" />
    </div>

    <TableComponent
      template="stock"
      title="Grupos de permissões"
      :action="handleSlide"
      :actions="[
        { label: 'Editar', icon: 'mdi:square-edit-outline', template: 'edit', action: handleSlide },
        { label: 'Excluir', icon: 'mdi:trash-can-outline', template: 'delete', action: handleModal },
      ]"
      :columns="[
        { label: 'Grupo de permissão', field: 'nomePerfil', sortable: false, details: false, type: 'string' },
        { label: 'Sistema', field: 'nomeSistema', sortable: false, details: false, type: 'string' },
        { label: 'Ações', field: 'actions', sortable: false, details: false, type: 'actions' },
      ]"
      :data="permissionGroups"
      :description="`Você possui ${permissionGroups.length} grupos de permissões cadastrados.`"
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
              @keyup.enter="fetchPermissionGroups"
            >
          </span>

          <span class="flex flex-col">
            <label>Mostrando</label>
            <select v-model="pagination.limit" class="input input-bordered w-40" @change="fetchPermissionGroups">
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
import { getPermissionGroups, getSystems } from "~/service/api";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);

definePageMeta({ title: "Grupos de permissões" });

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
const permissionGroups = ref([]);
const systems = ref([]);
const pagination = ref({
  actual: 1,
  q: "",
  limit: 10,
  total: 0,
  pages: 0,
});

const fetchPermissionGroups = () => {
  return new Promise((resolve, reject) => {
    getPermissionGroups({
      _page: pagination.value.actual,
      _limit: pagination.value.limit,
      q: pagination.value.q || null,
    })
      .then((res) => {
        pagination.value.total = parseInt(res.length);
        pagination.value.pages = 5;
        permissionGroups.value = res.map(i => ({
          idPerfil: i.idPerfil,
          nomePerfil: i.nomePerfil,
          nomeSistema: i.nomeSistema,
        }));
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
  });
};

const fetchSystems = () => {
  return new Promise((resolve, reject) => {
    getSystems()
      .then((res) => {
        systems.value = res.map(i => ({
          ...i,
          idSistema: i.idSistema,
          nomeSistema: i.nomeSistema,
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
    fetchPermissionGroups();
  }
  if (action === "prev") {
    pagination.value.actual--;
    fetchPermissionGroups();
  }
  if (action === "page") {
    pagination.value.actual = callback;
    fetchPermissionGroups();
  }
  if (action === "limit") {
    pagination.value.limit = callback;
    fetchPermissionGroups();
  }
};

const handleSlide = (template, _value) => {
  getPermissionGroups({ idPerfil: _value.idPerfil })
    .then((res) => {
      if (template === "edit") {
        app.toggleSlide();
        console.log(res[0].permissoes);
        app.setSlide({
          show: true,
          template: "edit",
          title: "Editar grupo de permissões",
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

onMounted(() => {
  Promise.all([
    fetchPermissionGroups(),
    fetchSystems(),
  ]);
});
</script>
