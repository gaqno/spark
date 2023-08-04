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
      <div class="w-full navbar bg-base-100">
        <div class="flex-none ml-2 rounded hover:bg-black/10 p-4 cursor-pointer" @click="handleView">
          <span class="text-xl">
            Spark ✨
          </span>
          <div class="ml-auto gap-4">
          </div>
        </div>

        <div class="ml-auto flex-none lg:block">
          <ul class="menu menu-horizontal">
            <header>
              <div class="max-w-full mx-2 flex items-center sm:justify-between sm:gap-4">
                <div class="flex flex-1 items-center justify-between gap-8 sm:justify-end">
                  <div class="w-full">
                    <div class="dropdown dropdown-end">
                      <label tabindex="0" class="m-1">
                        <button class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 hover:bg-gray-200">
                          <span class="sr-only">
                            Projetos
                          </span>
                          <Icon name="mdi:magnify" size="1.5em" />
                        </button>
                      </label>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li class="text-xs">
                          <input class="input input-ghost w-48" placeholder="Buscar por">
                        </li>
                      </ul>
                    </div>

                    <div class="dropdown dropdown-end mx-4">
                      <label tabindex="0" class="m-1">
                        <button class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 hover:bg-gray-200">
                          <span class="sr-only">
                            Projetos
                          </span>
                          <Icon name="mdi:bell-outline" size="1.2em" />
                        </button>
                      </label>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li class="text-xs">
                          <a>Item 1</a>
                          <a>Item 2</a>
                          <a>Item 3</a>
                          <a>Item 4</a>
                          <a>Item 5</a>
                        </li>
                      </ul>
                    </div>

                    <div class="dropdown dropdown-end">
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
                      <ul tabindex="0" :class="['dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52']">
                        <li>
                          <a class="text-xs whtierow-nowrap">
                            <Icon name="mdi:information" size="1.5em" />
                            Minhas informações
                          </a>
                        </li>
                        <li>
                          <a class="text-xs whtierow-nowrap">
                            <Icon name="fluent:people-team-24-regular" size="1.5em" />
                            Trocar de equipe
                          </a>
                        </li>
                        <li>
                          <a class="text-xs whtierow-nowrap">
                            <Icon name="octicon:request-changes" size="1.5em" />
                            Solicitar documento
                          </a>
                        </li>
                        <li>
                          <a class="text-xs whtierow-nowrap">
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
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();

const handleView = () => {
  app.setSlide({
    show: true,
    template: "about_us",
    data: {},
  });
};
</script>
