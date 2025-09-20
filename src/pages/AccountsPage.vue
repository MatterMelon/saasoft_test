<script setup lang="ts">
import { Button } from 'primevue'

import Message from 'primevue/message'
import EntryList from '@/components/EntryList.vue'

import { computed, reactive } from 'vue'
import { useEntriesStore } from '@/store'
import { LOCAL } from '@/types/entryTypes'
import type { Entry } from '@/types/models'

const store = useEntriesStore()
store.$subscribe((_mutation, state) => {
  localStorage.setItem('entries', JSON.stringify(Array.from(state.entries.entries())))
})

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
  <div class="flex gap-2 mt-20 mb-4">
    <h1 class="font-semibold text-2xl leading-normal">Учетные записи</h1>
    <Button
      label=""
      icon="pi pi-plus"
      type="button"
      class="p-button-outlined"
      @click="addNewEntry"
    />
  </div>
  <Message class="mb-4"
    ><i class="pi pi-question-circle"></i> Для указания нескольких меток одной пары логин/пароль
    используйте разделитель ;</Message
  >

  <EntryList
    :entries="displayableEntries"
    :handle-save="handleSave"
    :handle-delete="handleDelete"
  />
</template>
