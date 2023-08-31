<template>
  <form class="p-12">
    <div class="space-y-12">
      <div class="border-b border-slate-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-slate-900">
          Minhas informações
        </h2>
        <p class="mt-1 text-sm leading-6 text-slate-600">
          Informações básicas sobre você.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="username" class="block text-sm font-medium leading-6 text-slate-900">
              Nome
            </label>
            <div class="mt-2">
              <div class="focus-within:ring-primary-600 flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                <input
                  id="username"
                  v-model="client.nome"
                  type="text"
                  name="username"
                  autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith"
                >
              </div>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="username" class="block text-sm font-medium leading-6 text-slate-900">
              E-mail
            </label>
            <div class="mt-2">
              <div class="focus-within:ring-primary-600 flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                <input
                  id="username"
                  v-model="client.login"
                  type="text"
                  name="username"
                  autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith"
                >
                <span class="flex select-none items-center pr-3 text-slate-500 sm:text-sm">
                  @redeancora.com.br
                </span>
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="photo" class="block text-sm font-medium leading-6 text-slate-900">
              Foto
            </label>
            <div class="mt-2 flex items-center gap-x-3">
              <button
                type="button"
                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
              >
                Alterar foto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-slate-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-slate-900">
          Trocar senha
        </h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-slate-900">
              Senha atual
            </label>
            <div class="mt-2">
              <input
                id="first-name"
                type="text"
                name="first-name"
                autocomplete="given-name"
                class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-slate-900">
              Nova senha
            </label>
            <div class="mt-2">
              <input
                id="last-name"
                type="text"
                name="last-name"
                autocomplete="family-name"
                class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-slate-900">
              Confirmar nova senha
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
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
        class="focus-visible:outline-primary-600 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline hover:bg-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Salvar
      </button>
    </div>
  </form>
</template>

<script setup>
import { useClientStore } from "~/store/client";

const client = useClientStore();

const myInfo = ref({
  nome: "",
  login: "",
  senha: "",
  novaSenha: "",
  confirmarNovaSenha: "",
});

onMounted(() => {
  myInfo.value = {
    nome: client.nome,
    login: client.login,
    senha: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  };
});
</script>
