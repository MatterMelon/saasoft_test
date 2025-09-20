import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Entry } from './types/models'
import { LOCAL } from './types/entryTypes'

export const useEntriesStore = defineStore('entries', () => {
  const entries = reactive<Map<string, Entry>>(new Map())
  entries.set('1', {
    id: '1',
    tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
    type: LOCAL,
    login: 'Test User 1',
    password: '',
  })
  entries.set('2', {
    id: '2',
    tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
    type: LOCAL,
    login: 'Test User 2',
    password: '',
  })
  entries.set('3', {
    id: '3',
    tags: [{ text: 'Tag1' }, { text: 'Tag2' }],
    type: LOCAL,
    login: 'Test User 3',
    password: '',
  })

  const saveEntry = (entry: Entry) => {
    entries.set(entry.id, entry)
  }
  const deleteEntry = (id: string) => {
    entries.delete(id)
  }

  return { entries, saveEntry, deleteEntry }
})
