<template>
  <div class="flex h-full flex-col p-8">
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
import { useAppStore } from "@/store/app";
import { getPermissionGroups, getSystems } from "~/service/api";

const app = useAppStore();
const permissionGroups = ref([]);

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
      _start: (pagination.value.actual - 1) * pagination.value.limit,
      _end: pagination.value.actual * pagination.value.limit,
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
  getSystems({ idSistema: _value.idPerfil })
    .then((res) => {
      if (template === "edit") {
        app.setSlide({
          show: true,
          template: "edit",
          title: "Editar grupo de permissões",
          data: { ..._value, ...res[0] },
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
    }).catch((err) => {
      console.log(err);
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
  fetchPermissionGroups();
});
</script>
