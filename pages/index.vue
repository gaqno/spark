<template>
  <HeaderComponent>
    <template #content>
      <main class="flex flex-row overflow-x-hidden bg-[#f3f6fc]">
        <div class="flex flex-col w-full">
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
                <HomeComponent
                  v-if="app.route === 'home'"
                  @change-view="$event => handleView($event)"
                />

                <ChatComponent
                  v-else-if="app.route === 'assistant'"
                  :loading-steam="loadingSteam"
                  :response-stream="responseStream"
                  @ask="$event => ask($event)"
                  @tip="$event => handleTips($event)"
                />

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
import { useAppStore } from "~/store/app";
import { useChatCompletion } from "~/service/openai";

interface IResponse {
  data: string;
  role: string;
}

const app = useAppStore();
const loadingSteam = ref(false);
const response = ref({});
const responseStream = ref([] as IResponse[]);

const ask = (value: string) => {
  if (!value) { return; }
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
    .catch(err => console.warn(err));
};

const handleTips = (text: string) => {
  ask(text);
};

const handleView = (view: string) => {
  if (view === "") { return; }
  app.$patch({ route: view });
};

onMounted(() => {
  Promise.all([
    // fetchDummy(),
  ]);
});

</script>
