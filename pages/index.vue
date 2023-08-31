<template>
  <LoginComponent
    v-if="app.route === 'login'"
    @change-view="($event) => handleView($event)"
  />

  <HeaderComponent v-else>
    <template #content>
      <main class="flex flex-row overflow-x-hidden">
        <div class="flex w-full flex-col">
          <SidebarComponent :action="handleView">
            <template #content>
              <TransitionGroup
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <!-- PORTAL -->
                <HomeComponent
                  v-if="app.route === 'home'"
                  @change-view="($event) => handleView($event)"
                />

                <!-- ADMIN SSO -->
                <AdminSsoComponent
                  v-else-if="app.route === 'admin_sso' || app.route.includes('admin_sso')"
                  @change-view="($event) => handleView($event)"
                />

                <!-- ASSISTANT -->
                <ChatComponent
                  v-if="app.route === 'assistant'"
                  :loading-steam="loadingSteam"
                  :response-stream="responseStream"
                  @ask="($event) => ask($event)"
                  @tip="($event) => ask($event)"
                />

                <!-- MY ACCOUNT -->
                <MyAccountComponent v-else-if="app.route === 'my_account'" />
              </TransitionGroup>
            </template>
          </SidebarComponent>
        </div>
      </main>
    </template>
  </HeaderComponent>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { getUser } from "@/service/api";
import { useClientStore } from "@/store/client";
import { useCallAssistant } from "@/composables/useCallAssistant";

const app = useAppStore();
const client = useClientStore();
const { ask, responseStream, loadingSteam } = useCallAssistant();

const handleView = (view: string) => {
  if (view === "") { return; }
  app.$patch({ route: view });
};

const fetchUser = () => {
  getUser({})
    .then((res) => { client.setUser(res); })
    .catch(() => {
      app.setToast({
        show: true,
        title: "Erro ao carregar usuários",
        content: "Tente novamente",
      });
    });
};

onMounted(() => {
  Promise.all([
    fetchUser(),
    // fetchDummy(),
  ]);
});
</script>
