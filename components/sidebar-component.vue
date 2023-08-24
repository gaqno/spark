<template>
  <div class="drawer">
    <input
      id="my-drawer"
      v-model="isOpen"
      type="checkbox"
      class="drawer-toggle"
    >

    <div class="drawer-content">
      <div class="ml-6 flex flex-row">
        <label
          for="my-drawer"
          class="drawer-button py-3 pl-2"
          @mouseover="isOpen = true"
        >
          <Icon
            name="line-md:menu-fold-right"
            class="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-slate-300 hover:bg-slate-50"
            size="2.5em"
          />
        </label>

        <BreadcrumbsComponent :action="props.action" />
      </div>
      <slot name="content"></slot>
    </div>

    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul :class="[app.sidebar.small ? 'w-20' : 'w-72', 'h-full bg-primary text-center text-base-content']">
        <div class="drawer-side bg-primary">
          <label for="my-drawer" class="drawer-overlay"></label>

          <div :class="['flex h-screen min-h-[auto] grow flex-col bg-slate-900 py-4']">
            <section :class="[app.sidebar.small ? 'flex-col' : 'flex-row', 'flex justify-center gap-x-2 text-white']">
              <button
                v-if="app.sidebar.small"
                data-tip="Abrir"
                class="btn-ghost tooltip tooltip-right btn"
                @click.prevent="app.toggleSidebarSmall"
              >
                <Icon name="line-md:chevron-double-right" size="1.5em" />
              </button>
              <button
                v-else
                data-tip="Encolher"
                class="btn-ghost tooltip tooltip-right btn"
                @click.prevent="app.toggleSidebarSmall"
              >
                <Icon name="line-md:chevron-double-left" size="1.5em" />
              </button>
              <button
                v-if="!app.darkMode"
                data-tip="Modo escuro"
                class="btn-ghost tooltip tooltip-right btn"
                @click.prevent="app.toggleDarkMode"
              >
                <Icon name="line-md:moon-filled-to-sunny-filled-loop-transition" size="1.5em" />
              </button>
              <button
                v-else
                data-tip="Modo claro"
                class="btn-ghost tooltip tooltip-right btn"
                @click.prevent="app.toggleDarkMode"
              >
                <Icon name="line-md:moon-rising-filled-alt-loop" size="1.5em" />
              </button>
            </section>

            <Icon name="octicon:dash-16" class="mx-auto text-white/50" />
            <nav>
              <ul role="list" class="-mx-2 mt-2 space-y-4">
                <li v-for="item in filteredViews()" :key="item.name">
                  <div class="dropdown-right dropdown-hover dropdown min-w-full">
                    <label
                      tabindex="0"
                      class="mx-2.5 flex px-4 text-white/50 hover:text-white active:bg-slate-200/50"
                      @click="props.action(item.screen)"
                    >
                      <a
                        :data-tip="item.name"
                        :class="[app.sidebar.small ? 'tooltip tooltip-right' : '', 'group w-full cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white']"
                      >
                        <span class="flex space-x-8">
                          <Icon :name="item.icon" size="1.7em" class="text-left" />
                          <p>{{ app.sidebar.small ? null : item.name }}</p>
                        </span>
                      </a>
                    </label>

                    <ul
                      v-if="item.child && item.child.length > 0"
                      tabindex="0"
                      class="dropdown-content menu rounded-box z-[1] -ml-2.5 w-auto bg-slate-700 p-2 shadow"
                    >
                      <li v-for="child in item.child" :key="child.name" class="flex w-auto flex-row gap-y-4">
                        <div class="w-full text-white/50 hover:text-white" @click.prevent="props.action(child.screen)">
                          <Icon :name="child.icon" size="1em" class="my-2 mr-2" />
                          <span class="truncate text-sm">
                            {{ child.name }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- Current: "bg-slate-800 text-white", Default: "text-slate-400 hover:text-white hover:bg-slate-800" -->
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
import { useClientStore } from "@/store/client";

const app = useAppStore();
const client = useClientStore();
const isOpen = ref(false);
const props = defineProps({
  action: {
    type: Function,
    default: () => { },
  },
});

const views = ref({
  main: [
    {
      name: "Portal ANCORA",
      icon: "mdi:home-outline",
      screen: "home",
      notifications: 5,
    },
    {
      name: "Admin SSO",
      icon: "material-symbols:settings-outline-rounded",
      screen: "admin_sso",
      notifications: 0,
      child: [
        {
          name: "Chaves de API",
          icon: "mdi:key-outline",
          screen: "admin_sso_keys",
          notifications: 2,
        },
        {
          name: "Usuários",
          icon: "mdi:account-multiple-outline",
          screen: "admin_sso_users",
          notifications: 2,
        },
        {
          name: "Grupos de permissão",
          icon: "mdi:account-group-outline",
          screen: "admin_sso_groups",
          notifications: 4,
        },
        {
          name: "Sistemas",
          icon: "mdi:application-settings-outline",
          screen: "admin_sso_systems",
          notifications: 1,
        },
      ],
    },
    {
      name: "Portal de Compras",
      icon: "ic:outline-shopping-cart",
      screen: "shopping_portal",
      notifications: 5,
    },
    {
      name: "Boas Práticas Admin",
      icon: "material-symbols:bookmark-added-outline-rounded",
      screen: "best_pratices",
      notifications: 0,
    },
    {
      name: "Comunicações",
      icon: "bi:megaphone",
      screen: "comunications",
      notifications: 5,
    },
    {
      name: "Minhas Franquias",
      icon: "eos-icons:project-outlined",
      screen: "my_franchises",
      notifications: 0,
    },
    {
      name: "PowerBI",
      icon: "ph:chart-bar-bold",
      screen: "powerbi",
      notifications: 0,
    },
    {
      name: "Relatórios",
      icon: "mdi:chart-line",
      screen: "reports",
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
    {
      name: "Catálogo de Produtos",
      icon: "codicon:tools",
      screen: "product_catalog",
      notifications: 5,
    },
    {
      name: "Gestão de colaboradores",
      icon: "material-symbols:groups-outline",
      screen: "employees",
      notifications: 5,
    },
    {
      name: "Assistente",
      icon: "material-symbols:assistant-outline",
      screen: "assistant",
      notifications: 5,
    },
  ],
});

const filteredViews = () => {
  const viewsFiltered = views.value.main.filter((item) => {
    if (client.user) {
      if (item.screen === "home") {
        return client.user?.roles?.includes("VISUALIZAR_PORTAL") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "reports") {
        return client.user?.roles?.includes("VISUALIZAR_RELATORIOS") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "best_pratices") {
        return client.user?.roles?.includes("VISUALIZAR_BOAS_PRATICAS") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "admin_sso") {
        return client.user?.roles?.includes("CRIAR_COLABORADOR") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "my_franchises") {
        return client.user?.roles?.includes("VISUALIZAR_FRANQUIAS") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "assistant") {
        return client.user?.roles?.includes("VISUALIZAR_ASSISTENTE") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "powerbi") {
        return client.user?.roles?.includes("VISUALIZAR_BI") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "product_catalog") {
        return client.user?.roles?.includes("VISUALIZAR_CATALOGO") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "shopping_portal") {
        return client.user?.roles?.includes("VISUALIZAR_PORTAL_COMPRAS") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "contact") {
        return client.user?.roles?.includes("VISUALIZAR_CONTATO") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "comunications") {
        return client.user?.roles?.includes("VISUALIZAR_COMUNICACOES") || client.user?.roles?.includes("ADMINISTRADORES");
      }
      if (item.screen === "employees") {
        return client.user?.roles?.includes("VISUALIZAR_COLABORADORES") || client.user?.roles?.includes("ADMINISTRADORES");
      }
    }
    return true;
  });
  return viewsFiltered;
};

</script>
