<template>
  <HeaderComponent>
    <template #content>
      <main class="flex flex-row overflow-x-hidden bg-[#f3f6fc]">
        <div class="flex flex-col w-full">
          <SidebarComponent :action="handleView">
            <template #content>
              <TransitionGroup
                :key="`${currentView}_transition`"
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <HomeComponent
                  v-if="currentView === 'home'"
                  @change-view="$event => handleView($event)"
                />

                <ChatComponent
                  v-else-if="currentView === 'assistant'"
                  :loading-steam="loadingSteam"
                  :response-stream="responseStream"
                  @ask="$event => ask($event)"
                  @tip="$event => handleTips($event)"
                />

                <ReportsComponent
                  v-else-if="currentView === 'reports'"
                  :data="reportData"
                  :pagination="pagination"
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
const currentView = ref("home");
const reportData = ref([]);
const pagination = ref({
  pages: 1,
  actual: 10,
  limit: 10,
  total: 10,
});

const fetchDummy = () => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then((json) => {
        pagination.value = {
          actual: 1,
          limit: 10,
          pages: 1,
          total: json.length,
        };
        reportData.value = json.map((i: any) => ({
          completed: i.completed,
          id: i.id,
          title: i.title,
          userId: i.userId,
        }));
        resolve(json);
      })
      .catch(err => reject(err));
  });
};

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
  currentView.value = view;
};

onMounted(() => {
  Promise.all([
    fetchDummy(),
  ]);
});

</script>
