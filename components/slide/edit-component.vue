<template>
  <section class="pointer-events-auto flex min-h-screen w-screen max-w-[70vw] flex-col bg-white md:max-w-[30vw]">
    <div class="bg-primary px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <h2 id="slide-over-title" class="text-base font-semibold leading-6 text-white">
          {{ app.slide.title }}
        </h2>

        <button class="btn btn-ghost text-white" @click="app.toggleSlide">
          <Icon name="mdi:close" />
        </button>
      </div>
    </div>

    <form v-if="app.route === 'admin_sso_keys'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="prefix" class="block text-sm font-medium leading-6 text-slate-900">
                Prefixo
              </label>
              <div class="mt-2">
                <input
                  id="prefix"
                  v-model="ssoFormKeys.prefixo"
                  name="prefix"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nomeSistema" class="block text-sm font-medium leading-6 text-slate-900">
                Sistema
              </label>
              <div class="mt-2">
                <input
                  id="nomeSistema"
                  v-model="ssoFormKeys.nomeSistema"
                  name="nomeSistema"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="groups" class="block text-sm font-medium leading-6 text-slate-900">
                Grupo de permissão
              </label>
            </div>

            <div class="sm:col-span-6">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-900">
                Consumidor
              </label>
              <div>
                <label class="typo__label">
                  Simple select / dropdown
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-slate-900">
          Cancelar
        </button>
        <button
          type="submit"
          class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>
    </form>

    <form v-if="app.route === 'admin_sso_groups'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="prefix" class="block text-sm font-medium leading-6 text-slate-900">
                Nome do grupo
              </label>
              <div class="mt-2">
                <input
                  id="prefix"
                  v-model="ssoFormGroups.nome"
                  name="prefix"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nomeSistema" class="block text-sm font-medium leading-6 text-slate-900">
                Sistema
              </label>
              <div class="mt-2">
                <select v-model="ssoFormGroups.idSistema" class="input input-bordered w-full">
                  <option v-for="system in client.sistemas" :key="`system_${system.id}`" value="1">
                    {{ system.nome }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-7">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-900">
                Permissões
              </label>
              <TagsComponent v-model="ssoFormGroups.permissoes" :options="app.getSlideData.permissoes" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-slate-900" @click="app.toggleSlide">
          Cancelar
        </button>
        <button
          type="submit"
          class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>
    </form>

    <form v-if="app.route === 'admin_sso_users'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="prefix" class="block text-sm font-medium leading-6 text-slate-900">
                Nome
              </label>
              <div class="mt-2">
                <input
                  id="prefix"
                  v-model="ssoFormUsers.nome"
                  name="prefix"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="prefix" class="block text-sm font-medium leading-6 text-slate-900">
                Login
              </label>
              <div class="mt-2">
                <input
                  id="prefix"
                  v-model="ssoFormUsers.login"
                  name="prefix"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="prefix" class="block text-sm font-medium leading-6 text-slate-900">
                Apelido
              </label>
              <div class="mt-2">
                <input
                  id="prefix"
                  v-model="ssoFormUsers.apelido"
                  name="prefix"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="prefix" class="block text-sm font-medium leading-6 text-slate-900">
                Status
              </label>
              <div class="mt-2">
                <select v-model="ssoFormUsers.status" class="select select-ghost w-full">
                  <option :value="true">
                    Ativo
                  </option>
                  <option :value="false">
                    Inativo
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-7">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-900">
                Permissões
              </label>
              <TagsComponent v-model="ssoFormUsers.permissoes" :options="app.getSlideData.permissoes" />
            </div>

            <div class="sm:col-span-6">
              <div class="flow-root">
                <dl class="divide-gray-100 -my-3 divide-y text-sm">
                  <div class="even:bg-gray-50 grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-slate-900">
                      Empresas
                    </dt>
                  </div>

                  <div class="even:bg-gray-50 grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <span v-for="company in ssoFormUsers.empresas" :key="`company_${company}`" class="whitespace-nowrap font-medium text-slate-900">
                      {{ company.nome }}
                    </span>
                  </div>
                </dl>
                <button v-if="ssoFormUsers.empresas.length === 0" type="button" class="relative block w-full rounded-lg border-2 border-dashed border-slate-300 p-12 text-center hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <Icon name="mdi:close" />
                  <span class="mt-2 block text-sm font-semibold text-slate-900">
                    Sem empresas associadas!
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-slate-900" @click="app.toggleSlide">
          Cancelar
        </button>
        <button
          type="submit"
          class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useClientStore } from "~/store/client";
// const emits = defineEmits(["change-view"])
const app = useAppStore();
const client = useClientStore();
const ssoFormKeys = ref({
  consumidor: "",
  dataCriacao: "",
  grupos: [],
  idApiKey: "",
  idSistema: "",
  nomeSistema: "",
  prefixo: "",
  status: "",
});

const ssoFormGroups = ref({
  idSistema: "",
  nome: "",
  permissoes: [],
});

const ssoFormUsers = ref({
  grupos: [],
  empresas: [],
  status: "",
});

onMounted(() => {
  if (app.route === "admin_sso_keys") {
    ssoFormKeys.value = {
      consumidor: app.getSlideData.consumidor,
      dataCriacao: app.getSlideData.dataCriacao,
      grupos: app.getSlideData.grupos,
      idApiKey: app.getSlideData.idApiKey,
      idSistema: app.getSlideData.idSistema,
      nomeSistema: app.getSlideData.nomeSistema,
      prefixo: app.getSlideData.prefixo,
      status: app.getSlideData.status === "A",
    };
  }

  if (app.route === "admin_sso_groups") {
    ssoFormGroups.value = {
      idSistema: app.getSlideData.idSistema,
      nome: app.getSlideData.nome,
      permissoes: app.getSlideData.permissoes,
    };
  }

  if (app.route === "admin_sso_users") {
    ssoFormUsers.value = {
      idExterno: app.getSlideData.idExterno,
      idGrupo: app.getSlideData.idGrupo,
      idUsuario: app.getSlideData.idUsuario,
      nome: app.getSlideData.nome,
      login: app.getSlideData.login,
      grupos: app.getSlideData.idGrupo,
      empresas: app.getSlideData.empresas,
      status: app.getSlideData.status === "A",
    };
  }
});
</script>
