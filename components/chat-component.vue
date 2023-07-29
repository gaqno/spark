<template>
  <div>
    <section :class="['mx-2 min-h-[70vh] flex flex-col justify-between px-4 text-black rounded-xl p-4 object-contain bg-[url(https://cdn.bitrix24.com.br/b13589949/landing/77f/77f9503f0e1c3c922d71a6806d08b413/Sem-titulo-2_1x.png)] bg-cover bg-center']">
      <article class="w-[50vw] w-full pt-auto bg-slate-800/80 rounded-xl p-4 sm:p-6 lg:p-8">
        <div class="flex mb-4 items-start sm:gap-8">
          <Icon name="mdi:star-four-points-small" class="text-6xl text-white" />
          <div class="w-full text-sm">
            <p class="text-white pr-6">
              Olá! Eu sou seu assistente virtual da <b>Rede Ancora</b>, como posso tirar suas dúvidas?
            </p>
            <p class="text-white">
              Pergunte-me qualquer coisa!
            </p>

            <div class="flex flex-col gap-y-2 mt-4 text-blue-400">
              <p class="hover:underline hover:cursor-pointer" @click.prevent="emit('tip', 'Qual o processo de compra?')">
                Qual o processo de compra?
              </p>

              <p class="hover:underline hover:cursor-pointer" @click.prevent="emit('tip', 'Quantos funcionários a Rede Ancora tem?')">
                Quantos funcionários a Rede Ancora tem?
              </p>
            </div>
          </div>
        </div>
      </article>

      <div ref="chatContainer" class="overflow-y-auto overflow-x-hidden max-h-[50vh] scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-2 my-6">
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
              class="flex mb-auto items-start my-2 sm:gap-8 w-[50vw] w-full pt-auto bg-slate-800/80 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <Icon v-if="res.role === 'user'" name="mdi:star-four-points-small" class="text-6xl text-white" />
              <Icon v-else name="mdi:account-circle-outline" class="text-3xl mr-4  md:mr-0 text-white" />
              <div class="w-full">
                <p class="text-white pr-6 text-xs md:text-base">
                  {{ res.data }}
                </p>
              </div>
            </div>
          </TransitionGroup>
        </article>
      </div>

      <article class="w-[20vw] w-full bg-slate-800/90 rounded-xl p-4 sm:p-6 lg:p-8">
        <div class="flex items-start sm:gap-8">
          <div class="w-full mt-auto">
            <textarea
              v-model="question"
              class="w-full text-sm h-12 bg-black/10 text-white mt-2 p-2 border-0 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
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
