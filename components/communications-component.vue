<template>
  <section class="mb-[10em] flex flex-col items-center rounded-xl p-4">
    <div class="w-full rounded-xl bg-primary">
      <div class="p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Eventos e Comunicações
          </h2>

          <p class="mx-auto hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            Acompanhe os eventos e comunicações da Ancora e fique por dentro de
            tudo que acontece na empresa.
          </p>
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-2">
      <a
        v-for="card in cards"
        :key="card.id"
        class="relative col-span-1 mt-4 block gap-4  rounded-lg border border-slate-100  "
      >
        <section :class="[!app.darkMode ? 'bg-white' : 'bg-slate-800 text-white', 'p-4 sm:p-6 lg:p-8']">
          <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div class="flex-col sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 class="text-lg font-bold sm:text-xl">
                {{ card.categoria }}
              </h3>
            </div>

            <div class="grid grid-cols-4 gap-1 ">
              <div v-for="video in card.videos" :key="`video_${video.id}`" class="card bg-base-100 shadow-xl hover:bg-base-200">
                <figure><img :src="card.categoria.includes('Mercado') ? MLBanner : GPBanner" alt="Event"></figure>
                <div class="card-body">
                  <h2 class="card-title truncate text-sm">
                    {{ video.tituloEvento }}

                  </h2>
                  <p>Assunto: <span>{{ video.assuntoEvento }}</span></p>
                  <p>Descrição:</p>
                  <span class="text-sm" :innerHTML="video.descricaoEvento"></span>
                  <div class="card-actions justify-end">
                    <div class="badge badge-outline">
                      {{ video.dataHoraEvento }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { getCommunications } from "~/service/api";
import MLBanner from "@/static/img/portal_capa_mercadolivre.png";
import GPBanner from "@/static/img/portal_capa_portal.png";

interface Videos {
  id: string;
  imagemCapa: string;
  tituloEvento: string;
  dataHoraEvento: string;
  assuntoEvento: string;
  descricaoEvento: string;
  idVideo: string;
  tituloVideo: string;
}

interface Card {
  categoria: string;
  id: number;
  videos: Videos[];
}

const app = useAppStore();
const cards = ref<Card[]>([]);
const emit = defineEmits(["change-view"]);

const onChangeView = (view: string) => emit("change-view", view);

onMounted(() => {
  getCommunications({})
    .then((res) => {
      cards.value = res.map((card: Card) => ({
        categoria: card.categoria,
        id: card.id,
        videos: card.videos,
      }));
    });
});
</script>
