<script setup lang="ts">
import type { Entry } from '@/types/models'
import SingleEntry from './SingleEntry.vue'
import { computed, reactive } from 'vue'
import { useEntriesStore } from '@/store'
import { Button } from 'primevue'
import { LOCAL } from '@/types/entryTypes'

const store = useEntriesStore()
const newEntries = reactive<Entry[]>([])
const displayableEntries = computed(() => [...store.entries, ...newEntries])

const deleteNewEntry = (id: string) => {
  const index = newEntries.findIndex((e) => e.id === id)
  newEntries.splice(index, 1)
}

const handleDelete = (id: string) => {
  const isNew = newEntries.some((e) => e.id === id)
  if (isNew) {
    deleteNewEntry(id)
    return
  }

  store.deleteEntry(id)
}

const addNewEntry = () => {
  newEntries.push({
    id: crypto.randomUUID().toString(),
    tags: [],
    type: LOCAL,
    login: '',
    password: '',
  })
}
</script>

<template>
  <Button label="" icon="pi pi-plus" type="button" class="p-button-outlined" @click="addNewEntry" />
  <div class="grid grid-cols-[1fr_0.4fr_1fr_1fr_40px] gap-2 font-bold text-gray-700">
    <div>Метки</div>
    <div>Тип записи</div>
    <div>Логин</div>
    <div>Пароль</div>
    <div></div>
  </div>
  <ul class="flex flex-col gap-4">
    <li
      v-for="entry in displayableEntries"
      :key="entry.id"
      :class="
        entry.type !== LOCAL
          ? 'grid grid-cols-[1fr_0.4fr_2fr_40px] gap-2 items-stretch'
          : 'grid grid-cols-[1fr_0.4fr_1fr_1fr_40px] gap-2 items-stretch'
      "
    >
      <SingleEntry :entry="entry" :delete-entry="handleDelete" />
    </li>
  </ul>
</template>
