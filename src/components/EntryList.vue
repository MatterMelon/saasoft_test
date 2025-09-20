<script setup lang="ts">
import type { Entry } from '@/types/models'
import SingleEntry from './SingleEntry.vue'

interface Props {
  entries: Entry[]
  handleDelete: (id: string) => void
  handleSave: (entry: Entry) => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-[1fr_0.4fr_1fr_1fr_40px] gap-2 font-bold text-gray-700">
    <div class="h-10">Метки</div>
    <div class="w-full h-10 min-w-60">Тип записи</div>
    <div>Логин</div>
    <div>Пароль</div>
    <div></div>
  </div>
  <ul class="flex flex-col gap-4">
    <li v-for="entry in entries" :key="entry.id">
      <SingleEntry
        :entry="entry"
        :delete-entry="props.handleDelete"
        :save-entry="props.handleSave"
      />
    </li>
  </ul>
</template>
