<template>
  <div class="modal modal-open">
    <article class="text-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ app.modal.title }}
          </h2>
          <p class="text-left">
            {{ app.modal.content }}
          </p>
          <span v-if="app.modal.template === 'delete'" class="text-left">
            <p><b>Sistema</b>: {{ app.getModalData.nomeSistema }}</p>
            <p><b>ApiKey</b>: {{ app.getModalData.idApiKey }}</p>
          </span>
          <div class="card-actions justify-end">
            <button class="btn bg-primary" @click.prevent="app.toggleModal">
              Cancelar
            </button>
            <button class="btn bg-red-700">
              {{ app.modal.template === 'delete' ? 'Exluir' : null }}
              {{ app.modal.template === 'logout' ? 'Sair' : null }}
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();
</script>
