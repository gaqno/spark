]<template>
  <NuxtLayout>
    <div>
      <ModalComponent v-if="app.modal.show" />
      <LoadingComponent v-if="app.loading" />
      <NuxtPage :data-theme="app.darkMode ? 'dark' : 'light'" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAppStore } from "./store/app";
import "./global.css";

const app = useAppStore();
useHead({ title: "Rede ANCORA" });

</script>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}

.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>
