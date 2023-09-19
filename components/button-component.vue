<template>
  <button :class="[props.ghost ? 'btn btn-ghost' : 'rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20', 'flex w-[12em] flex-row justify-between']">
    <Icon v-if="props.icon" :name="props.icon" :class="[!app.darkMode ? 'mr-2 text-slate-700' : 'm-2 text-white']" />
    <span>{{ props.text }}</span>
  </button>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();
const props = defineProps({
  text: {
    type: String,
    default: "Click me",
  },
  icon: {
    type: String,
    default: "",
  },
  ghost: {
    type: Boolean,
    default: false,
  },
});
</script>
