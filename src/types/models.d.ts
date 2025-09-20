import type { EntryTypes } from './entryTypes'

export interface Tag {
  text: string
}

export interface Entry {
  id: string
  tags: Tag[]
  type: EntryTypes
  login: string
  password: string | null
}
