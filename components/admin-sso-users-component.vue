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
import { useAppStore } from "@/store/app";
import { getUsers } from "~/service/api";

const app = useAppStore();
const users = ref([]);
const pagination = ref({
  actual: 1,
  q: "",
  limit: 10,
  total: 0,
  pages: 0,
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
