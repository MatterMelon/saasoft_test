import type { EntryTypes } from './entryTypes'

export interface Tag {
  text: string
}

export interface Entry {
  id: number
  tags: Tag[]
  type: EntryTypes
  login: string
  password: string | null
}
