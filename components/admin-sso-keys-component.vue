<template>
  <div>
    <div class="flex h-full flex-col p-8">
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
  </div>
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, ArcElement, PointElement, Legend, BarElement, CategoryScale, LinearScale, LineElement } from "chart.js";
import { useAppStore } from "@/store/app";
import { getApiKeys } from "~/service/api";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);
const app = useAppStore();
const apiKeys = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  q: "",
  actual: 1,
  limit: 10,
});

const fetchApiKeys = () => {
  return new Promise((resolve, reject) => {
    getApiKeys({
      _start: (pagination.value.actual - 1) * pagination.value.limit,
      _end: pagination.value.actual * pagination.value.limit,
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
          status: i.status,
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
    app.setSlide({
      show: true,
      template: "edit",
      data: { ..._value },
    });
  }

  if (template === "filters") {
    app.setSlide({
      show: true,
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
  fetchApiKeys();
});
</script>
