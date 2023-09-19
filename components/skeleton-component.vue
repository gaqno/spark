<template>
  <div class="mx-auto mt-12 rounded-md border shadow ">
    <div
      v-for="_x, ind in props.lines"
      :key="'skeleton-h-' + ind"
      class="mx-4 my-2 flex animate-pulse border-b border-base-300"
    >
      <div
        v-show="props.avatar"
        :class="[!app.darkMode ? 'bg-slate-500' : 'bg-white', 'mx-6 mb-4 h-10 w-10 rounded-full']"
      ></div>
      <div class="flex-1">
        <div class="space-y-3">
          <div class="my-3 mr-4 grid grid-cols-6 justify-center gap-4">
            <div
              v-for="_y, inx in props.columns"
              :key="'skeleton-w-' + inx"
              :class="[!app.darkMode ? 'bg-slate-500' : 'bg-white', 'col-span-1 h-2 rounded']"
            ></div>
          </div>
        </div>
      </div>
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
