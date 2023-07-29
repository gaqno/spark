<template>
  <section class="pointer-events-auto flex flex-col bg-white w-screen max-w-[80vw] md:max-w-[40vw] min-h-screen">
    <div class="bg-primary px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <h2 id="slide-over-title" class="text-base font-semibold leading-6 text-white">
          Rede Ancora
        </h2>

        <button class="btn btn-ghost text-white" @click="app.toggleSlide">
          <Icon name="mdi:close" />
        </button>
      </div>
    </div>

    <form>
      <div class="items-center overflow-hidden sm:rounded-md m-8">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl">
              Sobre nós
            </h1>

            <span class="flex flex-col gap-y-4 mt-4 text-left text-gray-500 text-sm">
              <p>
                A Rede ANCORA foi fundada em 1998 em São Paulo, Brasil, por Álvaro Pereira e outros 12 empresários com o objetivo de criar soluções conjuntas para seus negócios com base em um modelo de rede de cooperação.
              </p>
              <p>
                A rede opera na indústria de autopeças, com franquias em 14 estados brasileiros e no Distrito Federal.
              </p>
              <p>
                A rede tem 12 centros de distribuição regional e um portal de compras online com mais de 200.000 itens.
              </p>
              <p>
                ANCORA é uma das maiores redes em seu segmento no Brasil e oferece condições exclusivas e acesso a grandes fabricantes de autopeças para seus franqueados.
              </p>
              <p>
                A rede também fornece treinamento e disseminação de conhecimento técnico para seus franqueados. A rede está em expansão e aceitando novos franqueados.
              </p>
            </span>
            <iframe
              class="w-full aspect-video mt-4 rounded"
              src="https://www.youtube.com/embed/JaS2fI7TKj8"
              title="Rede Ancora"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();
</script>
