<template>
  <div class="border shadow rounded-md mx-auto mt-12 ">
    <div
      v-for="_x, ind in props.lines"
      :key="'skeleton-h-' + ind"
      class="animate-pulse mx-4 my-2 flex border-b border-base-300"
    >
      <div
        v-show="props.avatar"
        :class="[!app.darkMode ? 'bg-slate-500' : 'bg-white', 'rounded-full h-10 w-10 mx-6 mb-4']"
      ></div>
      <div class="flex-1">
        <div class="space-y-3">
          <div class="grid grid-cols-6 gap-4 align-center justify-center my-3 mr-4">
            <div
              v-for="_y, inx in props.columns"
              :key="'skeleton-w-' + inx"
              :class="[!app.darkMode ? 'bg-slate-500' : 'bg-white', 'h-2 rounded col-span-1']"
            ></div>
          </div>
        </div>
      </div>
      <span class="divide"></span>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";

const app = useAppStore();
const props = defineProps({
  lines: { type: Number, default: 1, required: true },
  avatar: { type: Boolean, default: true, required: true },
  columns: { type: Number, default: 1, required: true },
});
</script>
