<template>
  <div>
    <div class="flex h-full flex-col p-8">
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
              <input type="text" class="input input-bordered" placeholder="Busque">
            </span>

            <span class="flex flex-col">
              <label>Mostrando</label>
              <select v-model="pagination.limit" class="input input-bordered w-40" @change="fetchSystems">
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
import { getSystems } from "~/service/api";

const app = useAppStore();
const systems = ref([]);
const pagination = ref({
  total: 0,
  pages: 0,
  q: "",
  actual: 1,
  limit: 10,
});

const fetchSystems = () => {
  return new Promise((resolve, reject) => {
    getSystems({
      _start: (pagination.value.actual - 1) * pagination.value.limit,
      _end: pagination.value.actual * pagination.value.limit,
      q: pagination.value.q || null,
    }).then((res) => {
      pagination.value.total = parseInt(res.length);
      pagination.value.pages = 5;
      systems.value = res.map(i => ({
        descricao: i.descricao,
        icone: i.icone,
        nome: i.nome,
        permissoes: i.permissoes,
        status: i.status,
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
