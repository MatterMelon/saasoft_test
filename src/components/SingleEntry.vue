<script setup lang="ts">
import { type Entry } from '@/types/models'

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

import { reactive } from 'vue'
import { LDAP, LOCAL } from '@/types/entryTypes'

interface Props {
  entry: Entry
  deleteEntry: (id: string) => void
}

const props = defineProps<Props>()

const state = reactive({
  tags: props.entry.tags.map((tag) => tag.text).join(';'),
  type: props.entry.type,
  login: props.entry.login,
  password: props.entry.password,
  errors: {
    login: '',
    password: '',
  },
})

const typeOptions = [
  { value: LOCAL, label: 'Локальная' },
  { value: LDAP, label: 'LDAP' },
]

const updateEntry = () => {}

const validateFields = () => {
  for (const key in state.errors) {
    state.errors[key as keyof typeof state.errors] = ''
  }

  if (!state.login) state.errors.login = 'Обязательное поле'
  if (!state.password) state.errors.password = 'Обязательное поле'

  for (const key in state.errors) {
    if (state.errors[key as keyof typeof state.errors] !== '') return
  }

  updateEntry()
}
</script>

<template>
  <div class="flex flex-col">
    <InputText
      v-model="state.tags"
      placeholder="Метки"
      maxlength="50"
      @blur="validateFields"
      class="h-10"
    />
  </div>
  <div class="flex flex-col">
    <Dropdown
      v-model="state.type"
      :options="typeOptions"
      option-label="label"
      placeholder="Выберите тип"
      @blur="validateFields"
      class="w-full h-10"
    />
  </div>
  <div class="flex flex-col">
    <InputText
      v-model="state.login"
      placeholder="Логин"
      maxlength="100"
      @blur="validateFields"
      class="h-10"
    />
    <span class="text-red-500 text-sm min-h-[1.25rem]">
      {{ state.errors?.login || '' }}
    </span>
  </div>
  <div class="flex flex-col">
    <InputText
      v-model="state.password"
      placeholder="Пароль"
      maxlength="100"
      @blur="validateFields"
      class="h-10"
    />
    <span class="text-red-500 text-sm min-h-[1.25rem]">
      {{ state.errors?.password || '' }}
    </span>
  </div>
  <div class="flex items-center justify-center pb-6">
    <button
      type="button"
      class="text-gray-500 hover:text-red-500"
      @click="() => deleteEntry(props.entry.id)"
    >
      <i class="pi pi-trash text-lg"></i>
    </button>
  </div>
</template>
