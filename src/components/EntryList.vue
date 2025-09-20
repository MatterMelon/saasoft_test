<script setup lang="ts">
import type { Entry } from '@/types/models'
import SingleEntry from './SingleEntry.vue'
import { reactive } from 'vue'

const entries = reactive<Entry[]>([
  {
    id: 1,
    tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
    type: 'local',
    login: 'Test User 1',
    password: '',
  },
  {
    id: 2,
    tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
    type: 'local',
    login: 'Test User 2',
    password: '',
  },
])

const deleteEntry = (id: number) => {
  entries.splice(0, entries.length, ...entries.filter((e) => e.id !== id))
}
</script>

<template>
  <ul>
    <li v-for="entry in entries" :key="entry.id">
      <SingleEntry :entry="entry" :delete-entry="deleteEntry" />
    </li>
  </ul>
</template>
