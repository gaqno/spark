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
      :data="data"
      :description="`Você possui ${data.length} grupos de permissões cadastrados.`"
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
            <select v-model="pagination.limit" class="input-bordered input w-40" @change="fetchGruposPermissao">
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
import { getPermissionGroups } from "@/service/api";

const app = useAppStore();
const data = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  actual: 1,
  limit: 10,
});

const fetchGruposPermissao = () => {
  return new Promise((resolve, reject) => {
    getPermissionGroups({
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
          idPerfil: i.idPerfil,
          nomePerfil: i.nomePerfil,
          nomeSistema: i.nomeSistema,
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
    fetchGruposPermissao();
  }
  if (action === "prev") {
    pagination.value.actual--;
    fetchGruposPermissao();
  }
  if (action === "page") {
    pagination.value.actual = callback;
    fetchGruposPermissao();
  }
  if (action === "limit") {
    fetchGruposPermissao();
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
    fetchGruposPermissao(),
  ]);
});
</script>
