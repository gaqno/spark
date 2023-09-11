<template>
  <section class="pointer-events-auto flex min-h-screen w-screen max-w-[70vw] flex-col bg-white md:max-w-[46vw]">
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

    <form v-if="app.route === 'admin_sso_groups'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="group" class="block text-sm font-medium leading-6 text-slate-900">
                Nome do grupo
              </label>
              <div class="mt-2">
                <input
                  id="group"
                  v-model="ssoFormGroups.nomePerfil"
                  name="group"
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
                <select v-model="ssoFormGroups.nomeSistema" class="input input-bordered w-full" @change="handleFormSystems(ssoFormGroups.nomeSistema)">
                  <option v-for="system in app.getSlideData.sistemas" :key="`system_${system.id}`" :value="system.nome">
                    {{ system.nome }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-7">
              <label for="query" class="block text-sm font-medium leading-6 text-slate-900">
                Permissões
              </label>
              <Multiselect
                v-model="ssoFormGroups.permissoes"
                track-by="nome"
                label="nome"
                mode="tags"
                :disabled="ssoFormGroups.nomeSistema === ''"
                value-prop="nome"
                :searchable="true"
                :options="roles"
              >
                <template #option="{ option }">
                  <b>{{ option.nome }}</b> {{ option.descricao }}
                </template>
              </Multiselect>
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
          @click.prevent="handleFormSubmit(ssoFormGroups)"
        >
          Salvar
        </button>
      </div>
    </form>

    <form v-if="app.route === 'admin_sso_keys'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="nomeSistema" class="block text-sm font-medium leading-6 text-slate-900">
                Sistema
              </label>
              <div class="mt-2">
                <select v-model="ssoFormKeys.nomeSistema" class="input input-bordered w-full" @change="handleFormSystems(ssoFormKeys.nomeSistema)">
                  <option v-for="system in app.getSlideData.sistemas" :key="`system_${system.id}`" :value="system.nome">
                    {{ system.nome }}
                  </option>
                </select>
                <p class="mt-2 text-sm text-slate-500">
                  O sistema é o conjunto de permissões que o consumidor terá acesso.
                </p>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nomeSistema" class="block text-sm font-medium leading-6 text-slate-900">
                Grupo de permissão
              </label>
              <Multiselect
                v-model="ssoFormKeys.grupos"
                track-by="nome"
                label="nome"
                mode="tags"
                :disabled="ssoFormKeys.nomeSistema === ''"
                value-prop="nome"
                :searchable="true"
                :options="roles"
              >
                <template #option="{ option }">
                  {{ option.nome }}
                </template>
              </Multiselect>
              <p class="mt-2 text-sm text-slate-500">
                O grupo de permissão é o conjunto de permissões que o consumidor terá acesso.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label for="consumidor" class="block text-sm font-medium leading-6 text-slate-900">
                Consumidor
              </label>
              <fieldset class="grid grid-cols-2 gap-4">
                <legend class="sr-only">
                  Empresa
                </legend>

                <div>
                  <input
                    id="DeliveryStandard"
                    type="radio"
                    name="DeliveryOption"
                    value="DeliveryStandard"
                    class="peer hidden"
                    checked
                    @click.prevent="ssoFormKeys.sendCompanie = true"
                  >

                  <label for="DeliveryStandard" :class="[ssoFormKeys.sendCompanie && 'border-blue-500 ring-1 ring-blue-500 ', 'block cursor-pointer rounded-lg border border-slate-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-slate-200']">
                    <p class="text-slate-700">
                      Empresa
                    </p>
                  </label>
                </div>

                <div>
                  <input
                    id="DeliveryPriority"
                    v-model="ssoFormKeys.sendCompanie"
                    type="radio"
                    name="DeliveryOption"
                    class="peer hidden"
                    @click.prevent="ssoFormKeys.sendCompanie = false"
                  >

                  <label for="DeliveryPriority" :class="[!ssoFormKeys.sendCompanie && 'border-blue-500 ring-1 ring-blue-500 ', 'block cursor-pointer rounded-lg border border-slate-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-slate-200']">
                    <p class="text-slate-700">
                      Sistema
                    </p>
                  </label>
                </div>
              </fieldset>

              <div v-if="ssoFormKeys.sendCompanie" class="mt-2">
                <Multiselect
                  v-model="ssoFormKeys.consumidor"
                  track-by="cnpj"
                  label="nome"
                  :disabled="ssoFormKeys.nomeSistema === ''"
                  value-prop="cnpj"
                  :searchable="true"
                  :options="app.getSlideData.empresas"
                >
                  <template #option="{ option }">
                    <span class="text-left">
                      {{ option.cnpj }} - {{ option.nome }}
                    </span>
                  </template>
                </Multiselect>
              </div>

              <div v-else class="mt-2">
                <label for="nomeSistema" class="block text-sm font-medium leading-6 text-slate-900">
                  Sistema
                </label>
                <div class="mt-2">
                  <select v-model="ssoFormKeys.consumidor" class="input input-bordered w-full" @change="handleFormSystems(ssoFormKeys.consumidor)">
                    <option v-for="system in app.getSlideData.sistemas" :key="`system_${system.id}`" :value="system.nome">
                      {{ system.nome }}
                    </option>
                  </select>
                  <p class="mt-2 text-sm text-slate-500">
                    O sistema é o conjunto de permissões que o consumidor terá acesso.
                  </p>
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
            @click.prevent="handleFormSubmit(ssoFormKeys)"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>

    <form v-if="app.route === 'admin_sso_users'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="nome" class="block text-sm font-medium leading-6 text-slate-900">
                Nome
              </label>
              <div class="mt-2">
                <input
                  id="nome"
                  v-model="ssoFormUsers.nome"
                  name="nome"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="login" class="block text-sm font-medium leading-6 text-slate-900">
                Login
              </label>
              <div class="mt-2">
                <input
                  id="login"
                  v-model="ssoFormUsers.login"
                  name="login"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nickname" class="block text-sm font-medium leading-6 text-slate-900">
                Apelido
              </label>
              <div class="mt-2">
                <input
                  id="nickname"
                  v-model="ssoFormUsers.apelido"
                  name="nickname"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="status" class="block text-sm font-medium leading-6 text-slate-900">
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
                <dl class="-my-3 divide-y divide-slate-100 text-sm">
                  <div class="grid grid-cols-1 gap-1 py-3 even:bg-slate-50 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-slate-900">
                      Empresas
                    </dt>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 even:bg-slate-50 sm:grid-cols-3 sm:gap-4">
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

    <form v-if="app.route === 'admin_sso_systems'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <label for="icon" class="block text-sm font-medium leading-6 text-slate-900">
                Ícone
              </label>
              <div class="mt-2">
                <input
                  id="icon"
                  v-model="ssoFormSystems.nome"
                  name="icon"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="system" class="block text-sm font-medium leading-6 text-slate-900">
                Nome do sistema
              </label>
              <div class="mt-2">
                <input
                  id="login"
                  v-model="ssoFormSystems.nome"
                  name="login"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="status" class="block text-sm font-medium leading-6 text-slate-900">
                Status
              </label>
              <div class="mt-2">
                <select v-model="ssoFormSystems.status" class="select input-bordered select-ghost w-full">
                  <option :value="true">
                    Ativo
                  </option>
                  <option :value="false">
                    Inativo
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nickname" class="block text-sm font-medium leading-6 text-slate-900">
                URL
              </label>
              <div class="mt-2">
                <input
                  id="nickname"
                  v-model="ssoFormSystems.apelido"
                  name="nickname"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nickname" class="block text-sm font-medium leading-6 text-slate-900">
                Descrição
              </label>
              <div class="mt-2">
                <input
                  id="nickname"
                  v-model="ssoFormSystems.apelido"
                  name="nickname"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-7">
              <label for="query" class="block text-base font-medium leading-6 text-slate-900">
                Permissões
              </label>

              <button class="btn my-2 bg-primary" @click.prevent="ssoFormSystems.permissoes.push({ nome: '', descricao: ''})">
                <Icon name="line-md:plus" class="mr-2" />
                Adicionar permissão
              </button>

              <div class="mt-2 flex flex-col">
                <span class="mb-4 grid grid-cols-2">
                  <label class="col-span-1 block text-sm font-medium leading-6 text-slate-900">
                    Nome da permissão
                  </label>
                  <label class="col-span-1 block text-sm font-medium leading-6 text-slate-900">
                    Descrição da permissão
                  </label>
                </span>
                <span v-for="permission, ind in ssoFormSystems.permissoes" :key="`permission_${permission.nome}`" class="flex flex-row items-center gap-1">
                  <span>
                    <input
                      id="permission_name"
                      :value="permission.nome"
                      name="permission_name"
                      type="text"
                      placeholder="Nome da permissão"
                      class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                  </span>
                  <span>
                    <input
                      id="descricao"
                      :value="permission.descricao"
                      name="descricao"
                      type="text"
                      placeholder="Descrição da permissão"
                      class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                  </span>
                  <button class="btn btn-ghost" @click.prevent="ssoFormSystems.permissoes.splice(ind, 1)">
                    <Icon name="line-md:close" />
                  </button>
                </span>
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

    <form v-if="app.route === 'collaborators'" class="p-4">
      <div class="space-y-12">
        <div class="border-b border-slate-700/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="icon" class="block text-sm font-medium leading-6 text-slate-900">
                Nome completo do colaborador
              </label>
              <div class="mt-2">
                <input
                  id="icon"
                  v-model="collaboratorsForm.nome"
                  name="icon"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="system" class="block text-sm font-medium leading-6 text-slate-900">
                CPF
              </label>
              <div class="mt-2">
                <input
                  id="login"
                  v-model="collaboratorsForm.cpf"
                  name="login"
                  type="text"
                  placeholder="xxx.xxx.xxx-xx"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="status" class="block text-sm font-medium leading-6 text-slate-900">
                E-mail
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  v-model="collaboratorsForm.email"
                  name="email"
                  type="email"
                  placeholder="user@company.com"
                  class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="nickname" class="block text-sm font-medium leading-6 text-slate-900">
                Selecione qual empresa ele vai atuar
              </label>
              <div class="mt-2">
                <Multiselect
                  v-model="collaboratorsForm.empresas"
                  track-by="cnpj"
                  label="nome"
                  value-prop="cnpj"
                  :searchable="true"
                  :options="client.empresas"
                >
                  <template #option="{ option }">
                    <span class="text-left">
                      {{ option.cnpj }} - {{ option.nome }}
                    </span>
                  </template>
                </Multiselect>
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
import Multiselect from "@vueform/multiselect";
import { useAppStore } from "@/store/app";
import "@vueform/multiselect/themes/default.css";
import { getSystems } from "~/service/api";
import { useClientStore } from "~/store/client";

// const emits = defineEmits(["change-view"])
const app = useAppStore();
const client = useClientStore();
const roles = ref([]);
const ssoFormKeys = ref({
  consumidor: "",
  dataCriacao: "",
  grupos: [],
  sendCompanie: true,
  idApiKey: "",
  idSistema: "",
  nomeSistema: "",
  prefixo: "",
  status: "",
});

const ssoFormGroups = ref({
  idSistema: "",
  nomePerfil: "",
  nomeSistema: "",
  permissoes: [],
  grupos: [],
  sistemas: [],
});

const ssoFormUsers = ref({
  grupos: [],
  empresas: [],
  status: "",
});

const ssoFormSystems = ref({
  nome: "",
  permissoes: [],
  status: "",
});

const collaboratorsForm = ref({
  cpf: "",
  email: "",
  empresas: [],
  funcoes: [],
  nome: "",
  papeis: [],
});

const handleFormSubmit = (value) => {
  if (app.route === "admin_sso_keys") {
    console.log(ssoFormKeys.value);
  }

  if (app.route === "admin_sso_groups") {
    const obj = {
      idSistema: app.getSlideData.idSistema,
      nome: value.nome,
      permissoes: value.permissoes,
    };
    console.log("admin_sso_groups", obj);
  }
  if (app.route === "admin_sso_users") {
    console.log(ssoFormUsers.value);
  }
};

const handleFormSystems = (value) => {
  roles.value = [];
  getSystems({ nome: value })
    .then((res) => {
      roles.value = res[0].permissoes;
    })
    .catch((err) => {
      app.setToast({
        message: err.message,
        type: "error",
      });
    });
};

onMounted(() => {
  if (app.route === "admin_sso_keys") {
    roles.value = app.getSlideData.gruposArr.map(i => ({
      nome: i.nomePerfil,
      nomeSistema: i.nomeSistema,
      idPerfil: i.idPerfil,
    }));
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

    ssoFormKeys.value.grupos.forEach((i) => {
      roles.value.forEach((j) => {
        if (j.idPerfil === i) {
          ssoFormKeys.value.grupos.pop();
          ssoFormKeys.value.grupos.push(j.nome);
        }
      });
    });
  }

  if (app.route === "admin_sso_groups") {
    roles.value = app.getSlideData.sistemas.find(i => i.idSistema === app.getSlideData.idSistema).permissoes;
    ssoFormGroups.value = {
      idSistema: app.getSlideData.idPerfil,
      nomePerfil: app.getSlideData.nomePerfil,
      nomeSistema: app.getSlideData.nome,
      permissoes: app.getSlideData.permissoes || [],
    };
    console.log({ ssoFormGroups: ssoFormGroups.value });
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

  if (app.route === "admin_sso_systems") {
    ssoFormSystems.value = {
      nome: app.getSlideData.nome,
      permissoes: app.getSlideData.permissoes,
      status: app.getSlideData.status === "A",
    };
  }
  if (app.route === "collaborators") {
    collaboratorsForm.value = {
      cpf: app.getSlideData.cpf,
      email: app.getSlideData.login,
      empresas: client.empresas,
      funcoes: app.getSlideData.funcoes,
      nome: app.getSlideData.nome,
      papeis: app.getSlideData.papeis,
    };
  }
});
</script>
