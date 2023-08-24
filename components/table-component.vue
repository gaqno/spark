<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <section>
    <div class="rounded bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-gray-900 text-base font-semibold leading-6">
            {{ props.title }}
          </h1>
          <p class="text-gray-700 mt-2 text-sm">
            {{ props.description }}
          </p>
        </div>
        <div v-if="actionLabel !== ''" class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            class="border-gray-300 z-0 ml-2 whitespace-nowrap rounded-md border bg-lime-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-900 focus:outline-none"
          >
            {{ props.actionLabel }}
          </button>
        </div>
        <slot name="actions"></slot>
      </div>

      <SkeletonComponent
        v-if="app.loading"
        :avatar="false"
        :columns="6"
        :lines="14"
      />

      <div v-else class="mt-8 flow-root">
        <div class="scrollbar-thumb-gray-300 scrollbar-track-gray-100 -mx-4  -my-2 max-h-[50vh] overflow-x-auto scrollbar scrollbar-thin sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-h-[48vh] min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="divide-gray-300  min-w-full divide-y rounded">
              <thead>
                <tr>
                  <th
                    v-for="th, i in props.columns"
                    :key="`th_${i}`"
                    scope="col"
                    class="text-gray-900 whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                    @click="th.sortable ? emits('sort', th.field) : ''"
                  >
                    <button v-if="th.sortable" @click="props.action('filters', { order: { [th.field]: 1 } })">
                      <Icon :key="`${th.sortable}_${i}`" name="mdi:arrow-up" />
                    </button>
                    <button v-else @click="props.action('filters', { order: { [th.field]: -1 } })">
                      <Icon :key="`${th.sortable}_${i}_`" name="mdi:arrow-down" />
                      {{ th.label }}
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-gray-200 divide-y ">
                <tr v-for="tr, i in props.data" :key="`tr_${i}`" class="hover:bg-slate-100">
                  <td
                    v-for="td, j in props.columns"
                    :key="`td_${j}`"
                    :class="[
                      'text-gray-900 m-2 whitespace-nowrap rounded pl-4 pr-3 text-sm font-medium hover:bg-slate-200/50',
                      // td.type === 'icon' ? 'flex items-center' : '',
                      // td.type === 'group_info' ? 'flex items-center' : '',
                      // td.type === 'boolean' ? 'flex items-center' : '',
                      // td.type === 'score' ? 'flex items-center' : '',
                      // td.type === 'tags' ? 'flex items-center' : '',
                      // td.type === 'string' ? 'flex items-center' : '',
                      td.type === 'number' ? 'text-center text-base font-bold' : '',
                    ]"
                  >
                    <div v-if="td.type === 'icon'">
                      <Icon
                        v-if="td.type === 'icon' && tr[td.field] !== 'webpush'"
                        :name="`mdi:${tr[td.field]}`"
                        size="1.4em"
                        class="mr-4"
                      />

                      <Icon
                        v-else-if="td.type === 'icon' && tr[td.field] === 'webpush'"
                        :name="`mdi:web`"
                        size="1.4em"
                        class="mr-4"
                      />
                      <span class="capitalize">
                        {{ tr[td.field] }}
                      </span>
                    </div>

                    <span v-if="td.type === 'group_info'">
                      <div class="flex items-center">
                        <div class="h-11 w-11 shrink-0">
                          <img class="h-11 w-11 rounded-full ring ring-primary" :src="tr[td.field[0]]" alt="">
                        </div>
                        <div class="ml-4">
                          <div
                            :class="[td.details ? 'cursor-pointer font-bold hover:underline' : 'font-medium', ' text-gray-900']"
                            @click="props.actions.find(i => i.template === 'details').action('details', tr)"
                          >
                            {{ tr[td.field[1]] }}
                          </div>

                          <span
                            v-if="td.field[2] === 'interested_customer' && tr[td.field[2]] === true"
                            class="text-gray-900 ring-gray-200 inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                          >
                            <svg class="h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true">
                              <circle cx="3" cy="3" r="3" />
                            </svg>
                            Favoritado
                          </span>

                          <span
                            v-if="td.field[2] !== 'interested_customer' && typeof tr[td.field[2]] === 'string'"
                            class="text-gray-900 inline-flex items-center  rounded-md text-xs font-medium"
                          >
                            {{ tr[td.field[2]] }}
                          </span>
                        </div>
                      </div>
                    </span>

                    <span v-if="td.type === 'contacts_tags'">
                      <div class="flex items-center">
                        <Icon name="mdi:square-inc" size="1.5em" :style="{ color: tr[td.field[0]] }" />
                        <div class="ml-4">
                          <div
                            :class="[td.details ? 'cursor-pointer font-bold hover:underline' : 'font-medium', ' text-gray-900']"
                            @click="props.actions.find(i => i.template === 'details').action('details', tr)"
                          >
                            {{ tr[td.field[1]] }}
                          </div>
                        </div>
                      </div>
                    </span>

                    <div v-if="td.type === 'boolean'">
                      <span
                        v-if="tr[td.field] === true"
                        :class="[!app.darkMode
                          ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                          : 'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20'
                        ]"
                      >
                        Ativo
                      </span>
                      <span
                        v-else
                        :class="[!app.darkMode
                          ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
                          : 'inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20'
                        ]"
                      >
                        Inativo
                      </span>
                    </div>

                    <div v-if="td.type === 'tags'">
                      <span
                        v-for="tag in tr[td.field]"
                        :key="`tag-${tag}`"
                        :class="[`bg-[${tag.color}] mx-1 flex w-fit truncate rounded p-0.5 text-xs`]"
                      >
                        <p :class="[!app.darkMode ? 'bg-white' : 'bg-slate-400', 'rounded p-2 text-xs']">
                          {{ tag.name }}
                        </p>
                      </span>
                    </div>

                    <span v-if="td.type === 'string'">
                      {{ tr[td.field] }}
                    </span>

                    <span v-if="td.type === 'number'">
                      {{ tr[td.field] }}
                    </span>

                    <div v-if="td.type === 'actions'">
                      <div :class="[i === 0 ? 'dropdown-end' : 'dropdown-top dropdown-end', 'dropdown']">
                        <label tabindex="0" class="btn-ghost btn">
                          <Icon name="mdi:dots-horizontal" class="x-2 h-5 w-5" />
                        </label>
                        <ul tabindex="0" class="dropdown-content menu rounded-box z-[1] w-auto bg-white p-2 shadow">
                          <li v-for="actionItem, ind in props.actions" :key="`tableModule_${ind}`" class="text-base">
                            <a v-if="actionItem.template === 'delete'" @click="actionItem.action(actionItem.template, tr)">
                              <Icon :name="actionItem.icon" />
                              {{ actionItem.label }}
                            </a>
                            <a v-if="actionItem.template === 'edit'" @click="actionItem.action(actionItem.template, tr)">
                              <Icon :name="actionItem.icon" />
                              {{ actionItem.label }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>

              <tfoot></tfoot>
            </table>
          </div>
        </div>

        <nav
          v-if="props.pagination.actual !== 0 && props.pagination.limit < props.pagination.total"
          :class="[!app.darkMode ? 'border-gray-200 bg-white' : 'border-sky-600 bg-slate-600', 'flex justify-between pt-8']"
          aria-label="Pagination"
        >
          <div :class="[!app.darkMode ? 'text-gray-700' : '', 'hidden sm:block']">
            <p class="text-sm">
              Página
              <span class="font-medium">
                {{ formatInt(props.pagination.actual) }}
              </span>
              de
              <span class="font-medium">
                {{ formatInt(props.pagination.pages) }}
              </span>
            </p>
            <p>
              Total
              <span class="font-medium">
                {{ formatInt(props.pagination.total) }}
              </span>
            </p>
          </div>
          <div class="mt-auto flex flex-1 justify-between gap-x-4 sm:justify-end">
            <button
              class="btn-ghost btn"
              @click="emits('page', 1)"
            >
              <Icon name="mdi:chevron-double-left" size="2em" />
            </button>

            <button
              :disabled="props.pagination.actual === 1"
              class="btn-ghost btn"
              @click="emits('prev')"
            >
              <Icon name="mdi:chevron-left" size="2em" />
            </button>
            <button
              v-for="page in getVisiblePages"
              :key="`page_${page}`"
              class="btn-ghost btn"
              :class="{ 'bg-black text-white': page === props.pagination.actual }"
              @click="emits('page', page)"
            >
              <span>
                {{ page }}
              </span>
            </button>

            <button
              v-if="props.pagination.actual < props.pagination.pages"
              :disabled="props.pagination.actual === props.pagination.pages"
              class="btn-ghost btn"
              @click="emits('next')"
            >
              <Icon name="mdi:chevron-right" size="2em" />
            </button>
            <button
              class="btn-ghost btn"
              @click="emits('page', props.pagination.pages)"
            >
              <Icon name="mdi:chevron-double-right" size="2em" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from "~/store/app";

const emits = defineEmits(["next", "prev", "page"]);
// const { formatTag } = useFormatTag();
const app = useAppStore();
const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default: () => [{
      label: "Canal",
      field: "name",
      sortable: false,
    }],
  },
  actionLabel: { type: String, required: false, default: "" },
  action: { type: Function, required: false, default: () => { } },
  actions: { type: Array, required: false, default: () => [] },
  description: { type: String, required: true, default: "" },
  data: { type: Array, required: true, default: () => [] },
  pagination: { type: Object, required: true, default: () => { } },
  title: { type: String, required: true, default: "" },
  template: { type: String, required: true, default: "" },
});

const getVisiblePages = computed(() => {
  const currentPage = props.pagination.actual;
  const totalPages = props.pagination.pages;
  const visiblePages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
  }
  return visiblePages;
});

const formatInt = (number) => {
  return new Intl.NumberFormat("pt-BR", { style: "decimal" }).format(number);
};

</script>
