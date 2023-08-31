<template>
  <div class="carousel h-full w-full rounded">
    <TransitionGroup
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="(slide, index) in props.slides"
        v-show="currentIndex === index"
        :key="index"
        class="carousel-item relative w-full"
      >
        <LazyNuxtImg
          fit="cover"
          sizes="sm:100vw md:50vw lg:400px"
          :src="slide.path"
          :alt="`cr_banner_${index}`"
        />
        <div class="absolute inset-x-4 top-1/2 flex -translate-y-0 justify-between">
          <a class="cursor-pointer rounded-full bg-white/20 p-2 text-white hover:bg-white/60" @click="navigatePrev">
            ❮
          </a>
          <a class="cursor-pointer rounded-full bg-white/20 p-2 text-white hover:bg-white/60" @click="navigateNext">
            ❯
          </a>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      { path: "https://app.hmg.redeancora.com.br/portal/imagens/banner-web-slide_01.png" },
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
