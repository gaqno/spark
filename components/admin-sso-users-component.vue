<template>
  <div>
    <div class="flex h-full flex-col p-8">
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
        :data="data"
        :description="`Você possui ${AdminSsoUsersMock.length} usuários cadastrados.`"
        :pagination="pagination"
        @prev="handlePagination('prev')"
        @next="handlePagination('next')"
        @page="handlePagination('page', $event)"
      >
        <template #actions>
          <div class="flex flex-row items-center gap-x-2">
            <span class="flex flex-col">
              <label>Busque por nome</label>
              <input type="text" class="input-bordered input" placeholder="Busque">
            </span>

            <span class="flex flex-col">
              <label>Mostrando</label>
              <select v-model="pagination.limit" class="input-bordered input w-40" @change="fetchUsers">
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
import AdminSsoUsersMock from "@/mocks/usuarios.json";
import { useAppStore } from "@/store/app";
import { getUsers } from "@/service/api";

const app = useAppStore();
const data = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  actual: 1,
  limit: 10,
});

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    getUsers({
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
        data.value = res.data.map(i => ({
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
    fetchUsers();
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
  Promise.all([
    fetchUsers(),
  ]);
});
</script>
