<template>
  <div>
    <section :class="['mx-2 flex max-h-[80vh] min-h-[70vh] flex-col justify-between rounded-xl bg-[url(https://images.unsplash.com/photo-1530151368975-0179454159af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)] bg-cover bg-center object-contain p-4 text-black']">
      <article class="rounded-xl bg-slate-800/80 p-4 sm:p-6 lg:p-8">
        <div class="flex items-start sm:gap-8">
          <Icon name="mdi:star-four-points-small" class="text-6xl text-white" />
          <div class="w-full text-sm">
            <p class="pr-6 text-white">
              Olá! Eu sou seu assistente virtual da <b class="text-red-600">
                Rede ANCORA
              </b>, como posso te ajudar?
            </p>
            <p class="text-white">
              Pergunte-me qualquer coisa!
            </p>

            <div class="mt-4 flex flex-col gap-y-2 text-blue-400">
              <p class="hover:cursor-pointer hover:underline" @click.prevent="emit('tip', 'Quais produtos você tem?')">
                Quais produtos você tem?
              </p>
            </div>

            <div class="mt-4 flex flex-col gap-y-2 text-blue-400">
              <p class="hover:cursor-pointer hover:underline" @click.prevent="emit('tip', 'Quais produtos que custam menos de R$50,00?')">
                Quais produtos que custam menos de R$50,00?
              </p>
            </div>

            <div class="mt-4 flex flex-col gap-y-2 text-blue-400">
              <p class="hover:cursor-pointer hover:underline" @click.prevent="emit('tip', 'Qual o item com menor quantidade em estoque?')">
                Qual o item com menor quantidade em estoque?
              </p>
            </div>
          </div>
        </div>
      </article>

      <div ref="chatContainer" class="my-6 mt-2 max-h-[50vh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-400">
        <article>
          <TransitionGroup
            enter-active-class="transition ease-out duration-300 transform"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in duration-300 transform"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-for="res, ind in responseStream"
              :key="`response_${ind}`"
              class="my-2 mb-auto flex  w-full items-start rounded-xl bg-slate-800/80 p-4 sm:gap-8 sm:p-6 lg:p-8"
            >
              <Icon v-if="res.role === 'user'" name="mdi:star-four-points-small" class="text-6xl text-white" />
              <Icon v-else name="mdi:account-circle-outline" class="mr-4 text-3xl  text-white md:mr-0" />
              <div class="w-full">
                <p class="pr-6 text-xs text-white md:text-base">
                  {{ res.data }}
                </p>
              </div>
            </div>
          </TransitionGroup>
        </article>
      </div>

      <article class="w-full rounded-xl bg-slate-800/90 p-4 sm:p-6 lg:p-8">
        <div class="flex items-start sm:gap-8">
          <div class="mt-auto w-full">
            <textarea
              v-model="question"
              class="mt-2 h-12 w-full rounded-md border border-slate-300 bg-black/10 p-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Pergunte-me algo"
              @keyup.enter="emit('ask', question)"
            ></textarea>
          </div>

          <button class="btn btn-ghost mt-4" @click="emit('ask', question)">
            <Icon
              name="mdi:send-outline"
              :disabled="props.loadingSteam || !question"
              class="text-white"
              size="2em"
            />
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>

const emit = defineEmits(["tip", "ask"]);
const question = ref("");
const props = defineProps({
  responseStream: {
    type: Array,
    default: () => [],
  },
  loadingSteam: {
    type: Boolean,
    default: false,
  },
});
</script>
