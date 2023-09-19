<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <section class="rounded border border-slate-100/60 p-2 ">
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

    <div class="mt-2 flow-root">
      <div class="scrollbar-thumb-gray-300 scrollbar-track-gray-100 -mx-4 max-h-[60vh] overflow-x-auto scrollbar scrollbar-thin sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle sm:px-6 lg:px-8">
          <table :class="['divide-gray-300 hidden divide-y rounded md:inline-table md:w-[94vw]']">
            <thead>
              <tr>
                <th
                  v-for="th, i in props.columns"
                  :key="`th_${i}`"
                  scope="col"
                  class="text-gray-900 whitespace-nowrap py-1 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                >
                  <button
                    v-if="th.sortable"
                    @click="emits('sort', {
                      field: th.field,
                      order: { [th.field]: 'asc' } })"
                  >
                    <Icon v-if="th.field !== 'actions'" :key="`${th.sortable}_${i}`" name="mdi:arrow-up" />
                    {{ th.label }}
                  </button>
                  <button
                    v-else-if="!th.sortable"
                    @click="emits('sort', {
                      field: th.field,
                      order: { [th.field]: 'desc' } })"
                  >
                    <Icon v-if="th.field !== 'actions'" :key="`${th.sortable}_${i}_`" name="mdi:arrow-down" />
                    {{ th.label }}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody class="divide-gray-200 divide-y">
              <tr
                v-for="tr, i in props.data"
                :key="`tr_${i}`"
                :class="[!props.darkMode ? 'hover:bg-slate-100' : 'hover:bg-slate-600']"
              >
                <td
                  v-for="td, j in props.columns"
                  :key="`td_${j}`"
                  :class="[
                    'text-gray-900 m-2 whitespace-nowrap rounded py-2 pl-4 pr-3 text-xs font-medium',
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
                      v-if="td.type === 'icon' "
                      :name="`mdi:${tr[td.field]}`"
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
                        <img
                          alt="Developer"
                          :src="`https://i.pravatar.cc/300?img=${i}`"
                          class="h-11 w-11 rounded-full object-cover"
                        >
                      </div>
                      <div class="ml-4">
                        <div
                          :class="[td.details ? 'cursor-pointer font-bold hover:underline' : 'font-medium', ' text-gray-900']"
                          @click="props.actions.find(i => i.template === 'details').action('details', tr)"
                        >
                          {{ tr[td.field] }}
                        </div>
                      </div>
                    </div>
                  </span>

                  <div v-if="td.type === 'boolean'">
                    <span
                      v-if="tr[td.field] === true"
                      :class="[!props.darkMode
                        ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                        : 'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20'
                      ]"
                    >
                      Ativo
                    </span>
                    <span
                      v-else
                      :class="[!props.darkMode
                        ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
                        : 'inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20'
                      ]"
                    >
                      Inativo
                    </span>
                  </div>

                  <div v-if="td.type === 'toggle'">
                    <div class="flex gap-x-2">
                      <span
                        v-if="tr[td.field] === true"
                        :class="[!props.darkMode
                          ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                          : 'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20'
                        ]"
                      >
                        Ativo
                      </span>
                      <span
                        v-else
                        :class="[!props.darkMode
                          ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
                          : 'inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20'
                        ]"
                      >
                        Inativo
                      </span>
                      <label class="swap">
                        <input
                          v-model="tr[td.field]"
                          type="checkbox"
                          class="hidden"
                          @change="props.toggle(String(!tr[td.field]), tr)"
                        >
                        <div class="swap-on">
                          <Icon name="line-md:switch-filled" size="2em" class="text-lime-800" />
                        </div>
                        <div class="swap-off">
                          <Icon name="line-md:switch-to-switch-off-transition" size="2em" class="text-red-600" />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div v-if="td.type === 'tags'">
                    <span
                      v-for="tag in tr[td.field]"
                      :key="`tag-${tag}`"
                      :class="[`bg-[${tag.color}] mx-1 flex w-fit truncate rounded p-0.5 text-xs`]"
                    >
                      <p :class="[!props.darkMode ? 'bg-white' : 'bg-slate-400', 'rounded p-2 text-xs']">
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
                    <div :class="[i === 0 ? 'dropdown-end' : 'dropdown-end dropdown-top', 'dropdown']">
                      <label tabindex="0" class="rounded p-1 transition duration-300 hover:bg-slate-200">
                        <Icon name="mdi:dots-horizontal" />
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
          </table>

          <div v-if="props.route === 'collaborators'" class="flex flex-col items-center p-4 md:hidden md:p-0">
            <div
              v-for="tr, i in props.data"
              :key="`card_${i}`"
              class="border-gray-200 bg-gray-800 my-2 w-full rounded-xl border p-4"
            >
              <div>
                <div class="flex items-center gap-4">
                  <img
                    alt="Developer"
                    :src="`https://i.pravatar.cc/300?img=${i}`"
                    class="h-16 w-16 rounded-full object-cover"
                  >
                  <h3 class="text-lg font-medium text-black">
                    {{ tr.nome }}
                  </h3>
                </div>

                <ul class="text-gray-300 mt-6 gap-y-2 text-base font-medium">
                  <li>
                    Login: <span class="truncate text-sm">
                      {{ tr.login }}
                    </span>
                  </li>
                  <li>
                    <span>
                      <div>
                        Status:
                        <span
                          v-if="tr.status === true"
                          :class="[!props.darkMode
                            ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                            : 'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20'
                          ]"
                        >
                          Ativo
                        </span>
                        <span
                          v-else
                          :class="[!props.darkMode
                            ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
                            : 'inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20'
                          ]"
                        >
                          Inativo
                        </span>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        v-if="props.pagination.actual !== 0"
        :class="[!props.darkMode ? 'border-gray-200 bg-white' : 'border-sky-600 bg-slate-700', 'my-4 flex justify-between rounded p-2 pb-20']"
        aria-label="Pagination"
      >
        <div :class="[!props.darkMode ? 'text-gray-700' : '', 'hidden sm:block']">
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
            class="btn btn-ghost hidden md:block"
            @click="emits('page', 1)"
          >
            <Icon name="mdi:chevron-double-left" size="2em" />
          </button>

          <button
            :disabled="props.pagination.actual === 1"
            class="btn btn-ghost hidden md:block"
            @click="emits('prev')"
          >
            <Icon name="mdi:chevron-left" size="2em" />
          </button>
          <button
            v-for="page in getVisiblePages"
            :key="`page_${page}`"
            class="btn btn-ghost "
            :class="{ 'bg-black text-white': page === props.pagination.actual }"
            @click="emits('page', page)"
          >
            <span>
              {{ page }}
            </span>
          </button>

          <button
            :disabled="props.pagination.actual === props.pagination.pages"
            class="btn btn-ghost hidden md:block"
            @click="emits('next')"
          >
            <Icon name="mdi:chevron-right" size="2em" />
          </button>
          <button
            class="btn btn-ghost hidden md:block"
            @click="emits('page', props.pagination.pages)"
          >
            <Icon name="mdi:chevron-double-right" size="2em" />
          </button>
        </div>
      </nav>
    </div>
  </section>
</template>

<script setup>

const emits = defineEmits(["next", "prev", "page", "sort"]);
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
  darkMode: { type: Boolean, required: false, default: false },
  action: { type: Function, required: false, default: () => { } },
  actions: { type: Array, required: false, default: () => [] },
  description: { type: String, required: true, default: "" },
  data: { type: Array, required: true, default: () => [] },
  pagination: { type: Object, required: true, default: () => { } },
  title: { type: String, required: true, default: "" },
  route: { type: String, required: true, default: "" },
  loading: { type: Boolean, required: false, default: false },
  template: { type: String, required: true, default: "" },
  toggle: { type: Function, required: false, default: () => { } },
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
