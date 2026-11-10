<script setup lang="ts">
import type { Writer, WriterRole } from '~/types'
import { api } from '~/services/api'

useSeoMeta({ title: 'Литераторы' })

const { data: writers } = await useAsyncData('writers', () => api.getWriters())

const query = ref('')
const role = ref<WriterRole | 'all'>('all')

const roles = computed(() => ['all', ...new Set((writers.value ?? []).flatMap(w => w.roles))] as const)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return (writers.value ?? []).filter(w =>
    (role.value === 'all' || w.roles.includes(role.value))
    && (!q || `${writerFullName(w)} ${w.pseudonym ?? ''}`.toLowerCase().includes(q))
  )
})

const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ'.split('')

const groups = computed(() => {
  const map = new Map<string, Writer[]>()
  for (const w of filtered.value) {
    const letter = w.lastName[0]!.toUpperCase()
    map.set(letter, [...(map.get(letter) ?? []), w])
  }
  return map
})
</script>

<template>
  <UContainer class="max-w-7xl">
    <PageIntro
      title="Литераторы"
      lead="Писатели, поэты и литературоведы, чья жизнь связана с Новосибирском и областью: биографии, библиографии и фрагменты произведений."
    />

    <div class="flex flex-col gap-4 md:flex-row md:items-center">
      <UInput
        v-model="query"
        icon="i-lucide-search"
        placeholder="Фамилия, имя или псевдоним"
        size="lg"
        class="md:w-80"
        aria-label="Поиск по литераторам"
      />
      <USelect
        v-model="role"
        :items="roles.map(r => ({ label: r === 'all' ? 'Все роли' : r, value: r }))"
        size="lg"
        class="md:w-56"
        aria-label="Фильтр по роли"
      />
    </div>

    <!-- Указатель по алфавиту: буква неактивна, если на неё нет фамилий -->
    <nav
      class="sticky top-(--ui-header-height) z-10 -mx-4 mt-8 flex gap-0.5 overflow-x-auto border-y border-default bg-default/95 px-4 py-2 backdrop-blur sm:mx-0 sm:px-0"
      aria-label="Алфавитный указатель"
    >
      <template
        v-for="letter in alphabet"
        :key="letter"
      >
        <a
          v-if="groups.has(letter)"
          :href="`#letter-${letter}`"
          class="flex size-8 shrink-0 items-center justify-center rounded font-serif text-lg text-highlighted hover:bg-primary/10 hover:text-primary"
        >{{ letter }}</a>
        <span
          v-else
          class="flex size-8 shrink-0 items-center justify-center font-serif text-lg text-dimmed"
          aria-hidden="true"
        >{{ letter }}</span>
      </template>
    </nav>

    <div class="mt-6">
      <section
        v-for="[letter, list] in groups"
        :id="`letter-${letter}`"
        :key="letter"
        class="grid scroll-mt-40 gap-4 border-b border-default py-8 md:grid-cols-[6rem_1fr]"
      >
        <h2 class="font-serif text-5xl leading-none font-medium text-secondary">
          {{ letter }}
        </h2>
        <ul class="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="w in list"
            :key="w.slug"
            class="group relative"
          >
            <NuxtLink
              :to="`/writers/${w.slug}`"
              class="font-serif text-lg leading-snug font-medium text-highlighted after:absolute after:inset-0 group-hover:text-primary"
            >
              {{ writerFullName(w) }}
            </NuxtLink>
            <p class="text-sm text-muted">
              <template v-if="lifeYears(w)">
                {{ lifeYears(w) }},
              </template>
              {{ w.roles.join(', ') }}
            </p>
          </li>
        </ul>
      </section>
    </div>

    <UEmpty
      v-if="!filtered.length"
      icon="i-lucide-feather"
      title="Никого не нашли"
      description="Проверьте написание фамилии или сбросьте фильтр по роли."
      :actions="[{ label: 'Сбросить фильтры', onClick: () => { query = ''; role = 'all' } }]"
      class="py-16"
    />
  </UContainer>
</template>
