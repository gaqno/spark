<template>
  <HeaderComponent>
    <template #content>
      <main class="flex flex-row overflow-x-hidden bg-[#f3f6fc]">
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
                <LoginComponent
                  v-if="app.route === 'login'"
                  @change-view="($event) => handleView($event)"
                />

                <!-- PORTAL -->
                <HomeComponent
                  v-if="app.route === 'home'"
                  @change-view="($event) => handleView($event)"
                />

                <!-- ADMIN SSO -->
                <AdminSsoComponent
                  v-if="app.route === 'admin_sso'"
                  @change-view="($event) => handleView($event)"
                />

                <AdminSsoKeysComponent
                  v-else-if="app.route === 'admin_sso_keys'"
                  @change-view="($event) => handleView($event)"
                />

                <AdminSsoUsersComponent
                  v-else-if="app.route === 'admin_sso_users'"
                  @change-view="($event) => handleView($event)"
                />

                <AdminSsoSystemsComponent
                  v-else-if="app.route === 'admin_sso_systems'"
                  @change-view="($event) => handleView($event)"
                />

                <AdminSsoGroupsComponent
                  v-else-if="app.route === 'admin_sso_groups'"
                  @change-view="($event) => handleView($event)"
                />

                <!-- ASSISTANT -->
                <ChatComponent
                  v-else-if="app.route === 'assistant'"
                  :loading-steam="loadingSteam"
                  :response-stream="responseStream"
                  @ask="($event) => ask($event)"
                  @tip="($event) => handleTips($event)"
                />

                <!-- REPORTS -->
                <ReportsComponent
                  v-else-if="app.route === 'reports' || app.route.includes('report')"
                />
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
import { useChatCompletion } from "@/service/openai";
import { getUser } from "@/service/api";
import { useClientStore } from "@/store/client";

interface IResponse {
  data: string;
  role: string;
}

const app = useAppStore();
const client = useClientStore();
const loadingSteam = ref(false);
const response = ref({});
const responseStream = ref([] as IResponse[]);

const ask = (value: string) => {
  if (!value) {
    return;
  }
  const questionText = value;
  responseStream.value.push({ data: questionText, role: "user" } as never);
  loadingSteam.value = true;
  app.setLoading(true);
  useChatCompletion(questionText)
    .then((data: any) => {
      app.setLoading(false);
      loadingSteam.value = false;
      response.value = data;
      responseStream.value.push({ data: data.content, role: "sys" } as never);
    })
    .catch(() => app.setToast({
      show: true,
      title: "Erro ao carregar usuários",
      content: "Tente novamente",
    }));
};

const handleTips = (text: string) => ask(text);

const handleView = (view: string) => {
  if (view === "") {
    return;
  }
  app.$patch({ route: view });
};

const fetchUser = () => {
  getUser({})
    .then((res) => {
      client.setUser(res);
    })
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
