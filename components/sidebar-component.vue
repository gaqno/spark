<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">

    <div class="drawer-content">
      <div class="flex flex-row ml-6">
        <label for="my-drawer" class="drawer-button py-3 pl-2">
          <Icon
            name="line-md:menu-fold-right"
            class="rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-50"
            size="2.5em"
          />
        </label>
        <div class="p-4 ml-4 text-sm breadcrumbs">
          <ul>
            <li>
              <a @click="props.action('home')">
                <Icon name="carbon:home" class="mr-2" />
                Início
              </a>
            </li>
            <li>
              <a>
                <Icon name="carbon:report" class="mr-2" />
                Relatórios
              </a>
            </li>
            <li>
              <Icon name="mdi:chart-bell-curve" class="mr-2" />
              Produtos
            </li>
          </ul>
        </div>
      </div>
      <slot name="content"></slot>
    </div>

    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul :class="[app.sidebar ? 'w-80' : 'w-20', 'text-center h-full bg-base-200 text-base-content']">
        <div class="drawer-side bg-primary">
          <label for="my-drawer" class="drawer-overlay"></label>

          <div class="flex grow w-20 md:w-62 h-screen flex-col bg-gray-900 py-4 min-h-auto">
            <nav class="flex flex-1 flex-col mx-auto">
              <ul role="list" class="flex flex-1 flex-col">
                <li v-for="item in views.main" :key="item.name">
                  <ul role="list" class="-mx-2 space-y-1">
                    <li>
                      <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
                      <div class="dropdown dropdown-hover dropdown-right w-full">
                        <label
                          tabindex="0"
                          class="text-white btn btn-ghost text-white/50 hover:text-white"
                          @click="props.action(item.screen)"
                        >
                          <button
                            :data-tip="item.name"
                            :class="[item.name === 'Equipes' || item.name === 'Relatórios' ? 'tooltip-top' : 'tooltip-right',
                                     'w-full tooltip']"
                          >
                            <Icon :name="item.icon" size="1.7em" />
                            <span class="hidden ">
                              {{ item.name }}
                            </span>
                          </button>
                        </label>
                        <ul v-if="item.child && item.child.length > 0" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-slate-700 rounded-box w-auto -ml-2.5">
                          <li v-for="child in item.child" :key="child.name" class="flex flex-row w-auto gap-y-4">
                            <div
                              class="w-full text-white/50 hover:text-white"
                              @click.prevent="props.action(child.screen)"
                            >
                              <Icon :name="child.icon" size="1em" class="mr-2 my-2" />
                              <span class="text-sm truncate">
                                {{ child.name }}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>

                <li>
                  <ul role="list" class="-mx-2 mt-2 space-y-1 mx-auto">
                    <Icon name="octicon:dash-16" size="1.7em" class="flex mx-4 text-white/10" />
                    <li v-for="team in views.teams" :key="team.name">
                      <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
                      <a :data-tip="team.name" class="tooltip tooltip-right text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                        <span class="btn btn-ghost text-slate-100/50 hover:text-white">
                          {{ team.name.at(0) }}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const props = defineProps({
  action: {
    type: Function,
    default: () => {},
  },
});

const app = useAppStore();

const views = ref({
  main: [
    {
      name: "Início",
      icon: "mdi:home-outline",
      screen: "home",
      notifications: 5,
    },
    {
      name: "Assistente",
      icon: "material-symbols:assistant-outline",
      screen: "assistant",
      notifications: 5,
    },
    {
      name: "Projetos",
      icon: "eos-icons:project-outlined",
      screen: "contact",
      notifications: 0,
    },
    {
      name: "Equipes",
      icon: "fluent:people-team-16-regular",
      screen: "contact",
      notifications: 0,
      child: [
        {
          name: "Recursos Humanos",
          icon: "mdi:folder-outline",
          screen: "contact",
          notifications: 0,
        },
        {
          name: "Marketing",
          icon: "mdi:folder-outline",
          screen: "contact",
          notifications: 0,
        },
        {
          name: "Vendas",
          icon: "mdi:folder-outline",
          screen: "contact",
          notifications: 0,
        },
      ],
    },
    {
      name: "Calendário",
      icon: "mdi:calendar",
      screen: "chat",
      notifications: 10,
    },
    {
      name: "Relatórios",
      icon: "mdi:chart-line",
      screen: "",
      notifications: 7,
      child: [
        {
          name: "Resumo Geral",
          icon: "mdi:monitor-dashboard",
          screen: "reports",
          notifications: 2,
        },
        {
          name: "Produtos",
          icon: "eos-icons:products",
          screen: "report_products",
          notifications: 2,
        },
        {
          name: "Financeiro",
          icon: "icon-park-outline:financing-one",
          screen: "report_financing",
          notifications: 4,
        },
        {
          name: "Estoque",
          icon: "material-symbols:inventory-2-outline",
          screen: "report_storage",
          notifications: 1,
        },
      ],
    },
  ],
  teams: [
    {
      name: "Vendas",
      icon: "mdi:home",
      screen: "home",
      notifications: 5,
    },
    {
      name: "Recursos Humanos",
      icon: "material-symbols:assistant-outline",
      screen: "assistant",
    },
    {
      name: "Marketing",
      icon: "mdi:folder-outline",
      screen: "contact",
    },
  ],
});
</script>
