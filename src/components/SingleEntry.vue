<script setup lang="ts">
import { type Entry } from '@/types/models'

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

import { reactive, watch } from 'vue'
import { LDAP, LOCAL } from '@/types/entryTypes'

interface Props {
  entry: Entry
  deleteEntry: (id: string) => void
  saveEntry: (entry: Entry) => void
}

const props = defineProps<Props>()

const state = reactive({
  tags: props.entry.tags.map((tag) => tag.text).join(';'),
  type: props.entry.type,
  login: props.entry.login,
  password: props.entry.password,
  isPasswordVisible: false,
  errors: {
    login: '',
    password: '',
  },
})

const typeOptions = [
  { value: LOCAL, label: 'Локальная' },
  { value: LDAP, label: 'LDAP' },
]

const getFormatedTags = (tags: string) => {
  return tags.split(';').map((tag) => {
    return { text: tag }
  })
}

const validateFields = () => {
  state.errors.login = state.login ? '' : 'Обязательное поле'
  if (state.type === LOCAL) {
    state.errors.password = state.password ? '' : 'Обязательное поле'
  } else {
    state.errors.password = ''
  }

  for (const key in state.errors) {
    if (state.errors[key as keyof typeof state.errors] !== '') return
  }

  props.saveEntry({
    id: props.entry.id,
    tags: getFormatedTags(state.tags),
    type: state.type,
    login: state.login,
    password: state.type === LOCAL ? state.password : null,
  })
}

// Update local state on store update
watch(
  () => props.entry,
  (newEntry) => {
    state.tags = newEntry.tags.map((t) => t.text).join(';')
    state.type = newEntry.type
    state.login = newEntry.login
    state.password = newEntry.password
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div
    :class="
      state.type !== LOCAL
        ? 'grid gap-2 grid-cols-1 mb:10 lg:grid-cols-[1fr_0.4fr_2fr_40px] items-stretch'
        : 'grid gap-2 grid-cols-1 mb-10 lg:grid-cols-[1fr_0.4fr_1fr_1fr_40px] lg:mb-0'
    "
  >
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
        option-value="value"
        placeholder="Выберите тип"
        @blur="validateFields"
        class="w-full h-10 min-w-60"
      />
    </div>
    <div class="flex flex-col">
      <InputText
        v-model="state.login"
        placeholder="Логин"
        maxlength="100"
        @blur="validateFields"
        :class="`h-10 ${state.errors.login ? 'error' : ''}`"
      />
      <span v-if="state.errors.login" class="text-red-500 text-sm min-h-[1.25rem]">
        {{ state.errors?.login || '' }}
      </span>
    </div>
    <div v-if="state.type === LOCAL" class="flex flex-col">
      <div class="relative flex h-10 items-center">
        <InputText
          v-model="state.password"
          placeholder="Пароль"
          maxlength="100"
          :type="state.isPasswordVisible ? 'text' : 'password'"
          @blur="validateFields"
          :class="`pr-10 h-full w-full ${state.errors.password ? 'error' : ''}`"
        />
        <button
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          @click="state.isPasswordVisible = !state.isPasswordVisible"
        >
          <i :class="state.isPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
        </button>
      </div>

      <span v-if="state.errors.password" class="text-red-500 text-sm min-h-[1.25rem]">
        {{ state.errors?.password || '' }}
      </span>
    </div>
    <div class="flex items-center justify-center h-10">
      <button
        type="button"
        class="text-gray-500 hover:text-red-500 p-3"
        @click="() => deleteEntry(props.entry.id)"
      >
        <i class="pi pi-trash text-lg"></i>
      </button>
    </div>
  </div>
</template>

<style>
.error {
  border: 1px solid rgb(170, 27, 27) !important;
}
.error:hover,
.error:focus {
  border: 1px solid rgb(209, 20, 20) !important ;
}
</style>
