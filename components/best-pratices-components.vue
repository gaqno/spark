<template>
  <div>
    <div class="flex h-full flex-col px-8">
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
          { label: 'API Key', field: 'idApiKey', sortable: false, details: false, type: 'string' },
          { label: 'Consumidor', field: 'consumidor', sortable: false, details: false, type: 'string' },
          { label: 'Criada em', field: 'dataCriacao', sortable: false, details: false, type: 'string' },
          { label: 'Status', field: 'status', sortable: false, details: false, type: 'boolean' },
          { label: 'Ações', field: 'actions', sortable: false, details: false, type: 'actions' },
        ]"
        :data="data"
        :description="`Você possui ${AdminSsoMock.length} produtos cadastrados.`"
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
              <select v-model="pagination.limit" class="input input-bordered w-40" @change="fetchApiKeys">
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
import AdminSsoMock from "@/mocks/admin_sso.json";
import { useAppStore } from "@/store/app";
import { getApiKeys } from "@/service/api";

const app = useAppStore();
const data = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  actual: 1,
  limit: 10,
});

const fetchApiKeys = () => {
  return new Promise((resolve, reject) => {
    getApiKeys({
      actual: pagination.value.actual,
      limit: pagination.value.limit,
    })
      .then((res) => {
        pagination.value = {
          total: res.total,
          pages: res.pages,
          actual: res.actual,
          limit: res.limit,
        };
        data.value = res.map(i => ({
          ...i,
          consumidor: i.consumidor,
          dataCriacao: i.dataCriacao,
          grupos: i.grupos,
          idApiKey: i.idApiKey,
          idSistema: i.idSistema,
          prefixo: i.prefixo,
          status: i.status,
        }));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const handlePagination = (action, callback) => {
  data.value = [];
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
    fetchApiKeys();
  }
};

const handleSlide = (template, _value) => {
  if (template === "edit") {
    app.setSlide({
      show: true,
      title: "Editar boas práticas",
      template: "edit",
      data: { ..._value },
    });
  }

  if (template === "filters") {
    app.setSlide({
      show: true,
      title: "Filtros boas práticas",
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
  Promise.all([
    fetchApiKeys(),
  ]);
});
</script>
