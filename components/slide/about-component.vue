<template>
  <section class="pointer-events-auto flex min-h-screen w-screen max-w-[80vw] flex-col bg-white md:max-w-[40vw]">
    <div class="bg-primary px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <h2 id="slide-over-title" class="text-base font-semibold leading-6 text-white">
          Rede ANCORA
        </h2>

        <button class="btn btn-ghost text-white" @click="app.toggleSlide">
          <Icon name="mdi:close" />
        </button>
      </div>
    </div>

    <form>
      <div class="m-8 items-center overflow-hidden sm:rounded-md">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl">
              Sobre nós
            </h1>

            <span class="mt-4 flex flex-col gap-y-4 text-left text-sm text-slate-500">
              A Rede ANCORA nasceu no dia 21 de maio de 1998, em São Paulo - SP, quando um de seus idealizadores, Álvaro Pereira, uniu-se a outros doze empresários com o objetivo de elaborar soluções conjuntas para a administração de suas empresas a partir de um conceito de rede de cooperação. O grupo foi desenvolvido com base no modelo norte-americano de redes de varejo de autopeças. Manteve-se a individualidade e a autonomia de cada membro, cuja administração é independente. Em contrapartida a gestão integrada de produtos e a atuação em conjunto possibilitam elevar o volume de negócios, gerando custos menores, entre outros benefícios.
              Em uma breve linha do tempo, temos o seguinte histórico:
              Atendendo tanto o setor de Linha Leve, para compra e revenda de reposição de autopeças, quanto o setor de Linha Pesada, de peças diesel e pick up, a Rede ANCORA está presente em 14 estados nacionais, mais o Distrito Federal. Sua estrutura conta com 12 Centros de Distribuição regionalizados, denominados Franqueadas Máster, onde é possível encontrar amplos estoques para pronta entrega, e um Portal de Compras, para pedidos, que funciona 24 horas por dia, 7 dias por semana, contendo mais de 200 mil itens cadastrados, além de contar com parcerias com mais de 100 fábricas. O número de pontos de venda da Rede ANCORA e o seu negócio como um todo fazem com que ela seja uma das maiores redes em seu segmento no país, exercendo a sua missão de unir, fortalecer e rentabilizar o franqueado, disponibilizando acesso a grandes marcas, parcerias e negociações.
            </span>

            <iframe
              width="560"
              height="315"
              class="mt-4 rounded"
              src="https://www.youtube.com/embed/JaS2fI7TKj8?controls=0"
              title="YouTube video player"
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
