import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Entry } from './types/models'

const STORAGE_KEY = 'entries'
const stored = localStorage.getItem(STORAGE_KEY)

export const useEntriesStore = defineStore('entries', () => {
  const entries = reactive<Map<string, Entry>>(new Map(stored ? JSON.parse(stored) : []))

  const saveEntry = (entry: Entry) => {
    entries.set(entry.id, entry)
  }
  const deleteEntry = (id: string) => {
    entries.delete(id)
  }

  return { entries, saveEntry, deleteEntry }
})
