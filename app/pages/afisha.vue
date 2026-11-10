<script setup lang="ts">
import type { LitEvent } from '~/types'
import { api } from '~/services/api'

useSeoMeta({ title: 'Афиша' })

const { data: events } = await useAsyncData('events', () => api.getEvents())

const kind = ref<LitEvent['kind'] | 'all'>('all')
const kinds = computed(() => ['all', ...new Set((events.value ?? []).map(e => e.kind))] as const)
const filtered = computed(() => (events.value ?? []).filter(e => kind.value === 'all' || e.kind === kind.value))

// Группируем по месяцам: «Октябрь 2026», «Ноябрь 2026»
const byMonth = computed(() => {
  const fmt = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric', timeZone: 'Asia/Novosibirsk' })
  const groups = new Map<string, LitEvent[]>()
  for (const e of filtered.value) {
    const key = fmt.format(new Date(e.startsAt)).replace(' г.', '')
    groups.set(key, [...(groups.get(key) ?? []), e])
  }
  return [...groups.entries()]
})
</script>

<template>
  <UContainer class="max-w-5xl">
    <PageIntro
      title="Афиша"
      lead="Чтения, семинары, презентации и сроки конкурсов. Вход на встречи в библиотеках свободный."
    >
      <div class="mt-8 flex flex-wrap gap-2">
        <UButton
          v-for="k in kinds"
          :key="k"
          :label="k === 'all' ? 'Все события' : k"
          size="sm"
          :color="kind === k ? 'primary' : 'neutral'"
          :variant="kind === k ? 'solid' : 'outline'"
          @click="kind = k"
        />
      </div>
    </PageIntro>

    <section
      v-for="[month, list] in byMonth"
      :key="month"
      class="mt-10"
    >
      <h2 class="mb-2 font-serif text-2xl font-medium text-highlighted first-letter:uppercase">
        {{ month }}
      </h2>
      <EventRow
        v-for="e in list"
        :key="e.id"
        :event="e"
      />
    </section>

    <UEmpty
      v-if="!filtered.length"
      icon="i-lucide-calendar"
      title="Ближайших событий этого типа нет"
      description="Выберите «Все события» или подпишитесь на новости в сообществе ВКонтакте."
      class="py-16"
    />
  </UContainer>
</template>
