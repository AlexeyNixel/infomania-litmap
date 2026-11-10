<script setup lang="ts">
import type { Association } from '~/types'
import { api } from '~/services/api'

useSeoMeta({ title: 'Литературные объединения' })

const { data: associations } = await useAsyncData('associations', () => api.getAssociations())

const scope = ref<Association['scope']>('city')
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return (associations.value ?? [])
    .filter(a => a.scope === scope.value)
    .filter(a => !q || `${a.name} ${a.type} ${a.settlement}`.toLowerCase().includes(q))
})
</script>

<template>
  <UContainer class="max-w-6xl">
    <PageIntro
      title="Литературные объединения"
      lead="ЛИТО, клубы и студии, где читают и обсуждают тексты. Большинство встреч открыты для новых участников."
    />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <UTabs
        v-model="scope"
        :items="[{ label: 'Новосибирск', value: 'city' }, { label: 'Область', value: 'region' }]"
        :content="false"
      />
      <UInput
        v-model="query"
        icon="i-lucide-search"
        placeholder="Название или тип"
        class="sm:w-72"
        aria-label="Поиск по объединениям"
      />
    </div>

    <ul class="mt-8 border-t border-default">
      <li
        v-for="a in filtered"
        :id="a.slug"
        :key="a.slug"
        class="grid scroll-mt-28 gap-3 border-b border-default py-6 target:bg-primary/5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        <div>
          <h2 class="font-serif text-xl font-medium text-highlighted">
            {{ a.name }}
          </h2>
          <p class="text-sm text-muted">
            {{ a.type }}<template v-if="a.scope === 'region'">
              , {{ a.settlement }}
            </template>
          </p>
        </div>
        <div class="text-sm">
          <p
            v-if="a.description"
            class="text-pretty"
          >
            {{ a.description }}
          </p>
          <dl
            v-if="a.venue || a.schedule || a.founded"
            class="mt-3 grid gap-x-6 gap-y-1 text-muted sm:grid-cols-[auto_1fr]"
          >
            <template v-if="a.venue">
              <dt>Где</dt><dd class="text-default">
                {{ a.venue }}
              </dd>
            </template>
            <template v-if="a.schedule">
              <dt>Когда</dt><dd class="text-default">
                {{ a.schedule }}
              </dd>
            </template>
            <template v-if="a.founded">
              <dt>С года</dt><dd class="text-default">
                {{ a.founded }}
              </dd>
            </template>
          </dl>
          <p
            v-if="!a.description && !a.venue"
            class="text-muted"
          >
            Расписание встреч уточняется.
          </p>
          <ULink
            v-if="a.link"
            :to="a.link"
            target="_blank"
            class="mt-3 inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            Сообщество объединения
            <UIcon
              name="i-lucide-external-link"
              class="size-3.5"
            />
          </ULink>
        </div>
      </li>
    </ul>

    <UEmpty
      v-if="!filtered.length"
      icon="i-lucide-users"
      title="Объединений не найдено"
      description="Попробуйте другое название или переключитесь между городом и областью."
      class="py-16"
    />
  </UContainer>
</template>
