export interface Tag {
  text: string
}

export interface Entry {
  id: number
  tags: Tag[]
  type: string
  login: string
  password: string | null
  showPassword: boolean
  errors?: {
    label?: string
    type?: string
    login?: string
    password?: string
  }
}
