<template>
  <div class="hero min-h-[40vh] min-w-[70vw] rounded-lg mt-6 aspect-video" :style="{ backgroundImage: `url(${props.src})` }">
    <div class="hero-overlay rounded-lg bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl text-white font-bold">
          {{ props.title }}
        </h1>
        <p class="mb-5 text-white">
          {{ props.subtitle }}
        </p>
        <button class="btn bg-primary text-white" @click="emit('change-view', 'reports')">
          <Icon :name="props.icon" class="w-4 h-4 stroke-current mr-3" />
          {{ props.buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["change-view"]);
const props = defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
  subtitle: {
    type: String,
    default: "Acompanhe os dados da sua empresa em tempo real!",
  },
  icon: {
    type: String,
    default: "mdi:chart-line",
  },
  buttonText: {
    type: String,
    default: "Ver relatórios",
  },
  src: {
    type: String,
    default: "https://cdn.bitrix24.com.br/b13589949/landing/752/75237a3538fbde58202e90d90bb298d0/bg_2x.jpg",
  },
});
</script>
