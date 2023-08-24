<template>
  <div class="carousel w-full rounded">
    <div
      v-for="(slide, index) in props.slides"
      v-show="currentIndex === index"
      :key="index"
      class="carousel-item relative w-full"
    >
      <img :src="slide.path" class="w-full">
      <div class="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
        <a class="btn-circle btn" @click="navigatePrev">
          ❮
        </a>
        <a class="btn-circle btn" @click="navigateNext">
          ❯
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      {
        path: "https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_01.png",
      },
    ],
  },
});

const currentIndex = ref(0);

const navigatePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const navigateNext = () => {
  if (currentIndex.value < props.slides.length - 1) {
    currentIndex.value++;
  }
};
</script>
