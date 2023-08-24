<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <main
        class="flex flex-col items-center justify-center p-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="mb-auto mr-auto flex">
          <img src="@/static/img/logo.png">
        </div>
        <div class="mb-auto max-w-xl lg:max-w-3xl">
          <div class="relative -mt-16 block lg:hidden">
            <a
              class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
              href="/"
            >
              <span class="sr-only">
                Home
              </span>
            </a>
          </div>

          <form action="#" class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6 text-center">
              <h1 class="text-2xl">
                Faça seu login
              </h1>
              <p class="text-sm">
                Tenha acesso a todas
                as plataformas da Rede ANCORA.
              </p>
            </div>

            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-slate-700">
                Usuário
              </label>

              <input
                id="Email"
                v-model="form.login"
                type="email"
                name="email"
                class="mt-1 w-full rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-sm"
              >
            </div>

            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-slate-700">
                Senha
              </label>

              <input
                id="Email"
                v-model="form.senha"
                type="email"
                name="email"
                class="mt-1 w-full rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-sm"
              >
            </div>

            <div class="col-span-6">
              <label for="MarketingAccept" class="flex gap-4">
                <input
                  id="MarketingAccept"
                  v-model="rememberMe"
                  type="checkbox"
                  name="marketing_accept"
                  class="h-5 w-5 rounded-md border-slate-200 bg-white shadow-sm"
                >

                <span class="text-sm text-slate-700">
                  Continuar conectado
                </span>
              </label>
            </div>
          </form>

          <button :class="['btn mt-2 flex w-full gap-x-4 bg-primary']" @click.prevent="handleLogin">
            <Icon name="material-symbols:login" />
            Entrar
          </button>
        </div>
      </main>

      <section class="relative hidden h-32 items-end bg-slate-900 lg:col-span-5 lg:flex lg:h-full xl:col-span-6">
        <img alt="Night" src="@/static/img/login_banner.png" class="absolute inset-0 h-full w-full object-cover">
      </section>
    </div>
  </section>
</template>

<script setup>
import { login } from "@/service/UsuarioService";
const form = ref({
  login: "",
  senha: "",
});
const rememberMe = ref(false);

const handleLogin = () => {
  return new Promise((resolve, reject) => {
    login(form.value)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

</script>
