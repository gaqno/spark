<template>
  <div class="breadcrumbs ml-4 p-4 text-sm">
    <ul>
      <li>
        <a @click="props.action('home')">
          <Icon name="carbon:home" class="mr-2" />
          Início
        </a>
      </li>
      <li v-if="formatBreadcrumbs(app.route).father !== '' && app.route !== 'home'">
        <a @click.prevent="props.action(formatBreadcrumbs(app.route).view)">
          <Icon :name="formatBreadcrumbs(app.route).icon" class="mr-2" />
          {{ formatBreadcrumbs(app.route).father || '' }}
        </a>
      </li>
      <li v-if="app.route !== 'home'">
        <a @click.prevent="props.action(formatBreadcrumbs(app.route).view)">
          <Icon :name="formatBreadcrumbs(app.route).icon" class="mr-2" />
          {{ formatBreadcrumbs(app.route).name || '' }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();
const props = defineProps({
  action: {
    type: Function,
    default: () => { },
  },
});
const { formatBreadcrumbs } = useFormatBreadcrumbs();
</script>
