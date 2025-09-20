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
})

const typeOptions = [
  { value: LOCAL, label: 'Локальная' },
  { value: LDAP, label: 'LDAP' },
]

const updateEntry = () => {}

const validateFields = () => {}
</script>

<template>
  <div>
    <InputText v-model="state.tags" placeholder="Метки" maxlength="50" @blur="validateFields" />
    <Dropdown
      v-model="state.type"
      :options="typeOptions"
      option-label="label"
      placeholder="Выберите тип"
      @blur="validateFields"
    />
    <InputText v-model="state.login" placeholder="Логин" maxlength="100" @blur="validateFields" />
    <InputText
      v-model="state.password"
      placeholder="Пароль"
      maxlength="100"
      @blur="validateFields"
    />
    <div class="flex items-center justify-center pb-6">
      <button
        type="button"
        class="text-gray-500 hover:text-red-500"
        @click="() => deleteEntry(props.entry.id)"
      >
        X
      </button>
    </div>
  </div>
</template>
