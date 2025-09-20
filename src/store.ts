import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Entry } from './types/models'
import { LOCAL } from './types/entryTypes'

export const useEntriesStore = defineStore('entries', () => {
  const entries = reactive<Entry[]>([
    {
      id: '1',
      tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
      type: LOCAL,
      login: 'Test User 1',
      password: '',
    },
    {
      id: '2',
      tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
      type: LOCAL,
      login: 'Test User 2',
      password: '',
    },
    {
      id: '3',
      tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
      type: LOCAL,
      login: 'Test User 3',
      password: '',
    },
  ])

  const putEntry = () => {}
  const deleteEntry = (id: string) => {
    entries.splice(0, entries.length, ...entries.filter((e) => e.id !== id))
  }

  return { entries, putEntry, deleteEntry }
})
