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
  <ul>
    <li v-for="entry in displayableEntries" :key="entry.id">
      <SingleEntry :entry="entry" :delete-entry="handleDelete" />
    </li>
  </ul>
</template>
