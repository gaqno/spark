<template>
  <div class="drawer drawer-end">
    <input
      id="my-drawer-3"
      v-model="app.slide.show"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar w-full bg-base-100">
        <div class="ml-2 flex-none">
          <label for="my-drawer-3" class="btn-ghost btn" @click="handleView">
            <img class="max-h-12 w-auto" src="@/static/img/logo.png">
          </label>
          <span class="text-xl">
            Rede ANCORA
          </span>
          <div class="ml-auto gap-4"></div>
        </div>

        <div class="ml-auto flex-none lg:block">
          <ul class="menu menu-horizontal">
            <header>
              <div class="mx-2 flex max-w-full items-center sm:justify-between sm:gap-4">
                <div class="flex flex-1 items-center justify-between gap-8 sm:justify-end">
                  <div class="w-full">
                    <div class="dropdown-end dropdown">
                      <label tabindex="0" class="m-1">
                        <button class="block shrink-0 rounded-lg bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-200 hover:text-slate-700">
                          <span class="sr-only">
                            Projetos
                          </span>
                          <Icon name="mdi:magnify" size="1.5em" />
                        </button>
                      </label>
                      <ul tabindex="0" class="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
                        <li class="text-xs">
                          <input class="input-ghost input w-48" placeholder="Buscar por">
                        </li>
                      </ul>
                    </div>

                    <div class="dropdown-end dropdown mx-4">
                      <label tabindex="0" class="m-1">
                        <button class="block shrink-0 rounded-lg bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-200 hover:text-slate-700">
                          <span class="sr-only">
                            Projetos
                          </span>
                          <Icon name="mdi:bell-outline" size="1.2em" />
                        </button>
                      </label>
                      <ul tabindex="0" class="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
                        <li class="text-xs">
                          <a>Item 1</a>
                          <a>Item 2</a>
                          <a>Item 3</a>
                          <a>Item 4</a>
                          <a>Item 5</a>
                        </li>
                      </ul>
                    </div>

                    <div class="dropdown-end dropdown">
                      <label tabindex="0" class="m-1">
                        <button type="button" class="group flex shrink-0 items-center rounded-lg transition">
                          <span class="sr-only">
                            Menu
                          </span>
                          <img
                            alt="Man"
                            src="https://avatars.githubusercontent.com/u/68374407?v=4"
                            class="h-10 w-10 rounded-full object-cover"
                          >

                          <p class="ms-2 hidden text-left text-xs sm:block">
                            <strong class="block font-medium text-primary">
                              Gabriel Aquino
                            </strong>

                            <span class="text-primary">
                              gabriel.aquino@outlook.com.br
                            </span>
                          </p>

                          <Icon name="mdi:chevron-down" class="ml-1" size="1em" />
                        </button>
                      </label>
                      <ul tabindex="0" :class="['dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow']">
                        <li>
                          <a class="whitespace-nowrap text-xs">
                            <Icon name="mdi:information" size="1.5em" />
                            Minhas informações
                          </a>
                        </li>
                        <li>
                          <a class="whitespace-nowrap text-xs">
                            <Icon name="fluent:people-team-24-regular" size="1.5em" />
                            Trocar de equipe
                          </a>
                        </li>
                        <li>
                          <a class="whitespace-nowrap text-xs">
                            <Icon name="octicon:request-changes" size="1.5em" />
                            Solicitar documento
                          </a>
                        </li>
                        <li>
                          <a class="whitespace-nowrap text-xs">
                            <Icon name="mdi:logout-variant" size="1.5em" />
                            Sair
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </ul>
        </div>
      </div>
      <slot name="content"></slot>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu h-full bg-base-200">
        <SlideAboutComponent v-if="app.slide.template === 'about_us'" />
        <SlideFiltersComponent v-if="app.slide.template === 'filters'" />
        <SlideEditComponent v-if="app.slide.template === 'edit'" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();

const handleView = () => {
  app.setSlide({
    show: false,
    template: "about_us",
    data: {},
  });
};
</script>
