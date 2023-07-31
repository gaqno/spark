<template>
  <SkeletonComponent
    v-if="app.loading"
    :avatar="false"
    :columns="6"
    :lines="10"
  />
  <div v-else class="px-4 sm:px-6 lg:px-8 bg-white py-8 rounded">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">
          {{ props.title }}
        </h1>
        <p class="mt-2 text-sm text-gray-700">
          {{ props.description }}
        </p>
      </div>
      <div v-if="actionLabel !== ''" class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="z-0 ml-2 rounded-md whitespace-nowrap border border-gray-300 bg-lime-800 text-white px-4 py-2 text-base font-medium shadow-sm hover:bg-lime-900 focus:outline-none"
        >
          {{ props.actionLabel }}
        </button>
      </div>
      <slot name="actions"></slot>
    </div>

    <div class="mt-8 flow-root">
      <div class="max-h-[50vh] -mx-4 -my-2  scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-h-[48vh] min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full  divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  v-for="th, i in props.columns"
                  :key="`th_${i}`"
                  scope="col"
                  class="py-3.5 pl-4 pr-3 whitespace-nowrap text-left text-sm font-semibold text-gray-900 sm:pl-0"
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

            <tbody class="divide-y divide-gray-200 ">
              <tr v-for="tr, i in props.data" :key="`tr_${i}`" class="hover:bg-slate-100">
                <td
                  v-for="td, j in props.columns"
                  :key="`td_${j}`"
                  :class="[
                    'py-4 pl-4 pr-3 hover:bg-slate-200/50 rounded m-2 whitespace-nowrap text-sm font-medium text-gray-900',
                    // td.type === 'icon' ? 'flex items-center' : '',
                    // td.type === 'group_info' ? 'flex items-center' : '',
                    // td.type === 'boolean' ? 'flex items-center' : '',
                    // td.type === 'score' ? 'flex items-center' : '',
                    // td.type === 'tags' ? 'flex items-center' : '',
                    // td.type === 'string' ? 'flex items-center' : '',
                    td.type === 'number' ? 'text-center font-bold text-base' : '',
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
                      <div class="h-11 w-11 flex-shrink-0">
                        <img class="h-11 w-11 rounded-full" :src="tr[td.field[0]]" alt="">
                      </div>
                      <div class="ml-4">
                        <div
                          :class="[td.details ? 'cursor-pointer hover:underline font-bold' : 'font-medium', ' text-gray-900']"
                          @click="props.actions.find(i => i.template === 'details').action('details', tr)"
                        >
                          {{ tr[td.field[1]] }}
                        </div>

                        <span
                          v-if="td.field[2] === 'interested_customer' && tr[td.field[2]] === true"
                          class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                        >
                          <svg class="h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true">
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                          Favoritado
                        </span>

                        <span
                          v-if="td.field[2] !== 'interested_customer' && typeof tr[td.field[2]] === 'string'"
                          class="inline-flex items-center rounded-md  text-xs font-medium text-gray-900"
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
                          :class="[td.details ? 'cursor-pointer hover:underline font-bold' : 'font-medium', ' text-gray-900']"
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
                      :class="[`bg-[${tag.color}] w-fit flex truncate rounded mx-1 text-xs p-0.5`]"
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
                    <div :class="[i === 0 ? 'dropdown-end' : 'dropdown-end dropdown-top', 'dropdown']">
                      <label tabindex="0" class="btn btn-ghost">
                        <Icon name="mdi:dots-horizontal" class="h-5 w-5 x-2" />
                      </label>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-auto">
                        <li v-for="actionItem, ind in props.actions" :key="`tableModule_${ind}`" class="text-base">
                          <a v-if="actionItem.template !== 'chats'" @click="actionItem.action(actionItem.template, tr)">
                            <Icon :name="actionItem.icon" />
                            {{ actionItem.label }}
                          </a>

                          <a
                            v-else-if="actionItem.template === 'favorited'"
                            @click="actionItem.action(tr.customer_id, tr)"
                          >
                            <Icon :name="actionItem.icon" />
                            {{ tr[td.field] }}
                            {{ tr[td.field] === true ? 'Desfavoritar' : 'Favoritar' }}
                          </a>

                          <a v-else-if="actionItem.template === 'delete'" @click="actionItem.action(tr.customer_id, tr)">
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

            <tfoot>
            </tfoot>
          </table>
        </div>
      </div>

      <nav
        v-if="props.pagination.actual !== 0"
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
        <div class="flex flex-1 gap-x-4 justify-between sm:justify-end mt-auto">
          <button
            class="btn btn-ghost"
            @click="emits('update')"
          >
            <Icon name="mdi:chevron-double-left" size="2em" />
          </button>

          <button
            :disabled="props.pagination.actual === 1"
            class="btn btn-ghost"
            @click="emits('prev')"
          >
            Anterior
          </button>

          <button
            v-if="props.pagination.actual < props.pagination.pages"
            :disabled="props.pagination.actual === props.pagination.pages"
            class="relative ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="emits('next')"
          >
            Próximo
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";

const emits = defineEmits(["next", "prev"]);
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

const formatInt = (number) => {
  return new Intl.NumberFormat("pt-BR", { style: "decimal" }).format(number);
};

</script>
