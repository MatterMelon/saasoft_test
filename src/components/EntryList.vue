<script setup lang="ts">
import type { Entry } from '@/types/models'
import SingleEntry from './SingleEntry.vue'
import { computed, reactive } from 'vue'
import { useEntriesStore } from '@/store'
import { Button } from 'primevue'
import { LOCAL } from '@/types/entryTypes'

const store = useEntriesStore()
const newEntries = reactive<Map<string, Entry>>(new Map())
const displayableEntries = computed(() => [...store.entries.values(), ...newEntries.values()])

const handleDelete = (id: string) => {
  newEntries.delete(id)
  store.deleteEntry(id)
}

const handleSave = (entry: Entry) => {
  newEntries.delete(entry.id)
  store.saveEntry(entry)
}

const addNewEntry = () => {
  const entry: Entry = {
    id: crypto.randomUUID().toString(),
    tags: [],
    type: LOCAL,
    login: '',
    password: '',
  }
  newEntries.set(entry.id, entry)
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
    <li v-for="entry in displayableEntries" :key="entry.id">
      <SingleEntry :entry="entry" :delete-entry="handleDelete" :save-entry="handleSave" />
    </li>
  </ul>
</template>
