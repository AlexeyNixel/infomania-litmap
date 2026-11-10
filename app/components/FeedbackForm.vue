<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { api } from '~/services/api'

const schema = z.object({
  name: z.string().min(2, 'Как к вам обращаться?'),
  email: z.email('Проверьте адрес почты'),
  message: z.string().min(10, 'Напишите хотя бы пару предложений')
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ name: '', email: '', message: '' })
const sending = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  sending.value = true
  await api.sendFeedback(event.data)
  sending.value = false
  Object.assign(state, { name: '', email: '', message: '' })
  toast.add({ title: 'Сообщение отправлено', description: 'Ответим на указанную почту в течение нескольких дней.', color: 'success', icon: 'i-lucide-check' })
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      label="Имя"
      name="name"
    >
      <UInput
        v-model="state.name"
        class="w-full"
        autocomplete="name"
      />
    </UFormField>
    <UFormField
      label="Почта"
      name="email"
    >
      <UInput
        v-model="state.email"
        type="email"
        class="w-full"
        autocomplete="email"
      />
    </UFormField>
    <UFormField
      label="Сообщение"
      name="message"
    >
      <UTextarea
        v-model="state.message"
        :rows="6"
        autoresize
        class="w-full"
      />
    </UFormField>
    <UButton
      type="submit"
      label="Отправить сообщение"
      :loading="sending"
      block
    />
  </UForm>
</template>
