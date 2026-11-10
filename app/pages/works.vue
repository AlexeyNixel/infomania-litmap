<script setup lang="ts">
import { api } from '~/services/api'

useSeoMeta({ title: 'Произведения' })

const { data: works } = await useAsyncData('works', () => api.getWorks())

const genre = ref<string>('all')
const genres = computed(() => ['all', ...new Set((works.value ?? []).map(w => w.genre))])

// Группировка по автору — как на исходном сайте, но с жанром и форматом у каждого текста
const byAuthor = computed(() => {
  const map = new Map<string, NonNullable<typeof works.value>>()
  for (const w of works.value ?? []) {
    if (genre.value !== 'all' && w.genre !== genre.value) continue
    map.set(w.writerSlug, [...(map.get(w.writerSlug) ?? []), w])
  }
  return [...map.values()].sort((a, b) => a[0]!.writerName.split(' ').at(-1)!.localeCompare(b[0]!.writerName.split(' ').at(-1)!, 'ru'))
})
</script>

<template>
  <UContainer class="max-w-5xl">
    <PageIntro
      title="Произведения новосибирских писателей"
      lead="Полные тексты книг и подборок. Все произведения размещены с согласия авторов."
    >
      <div class="mt-8 flex flex-wrap gap-2">
        <UButton
          v-for="g in genres"
          :key="g"
          :label="g === 'all' ? 'Все жанры' : g"
          size="sm"
          :color="genre === g ? 'primary' : 'neutral'"
          :variant="genre === g ? 'solid' : 'outline'"
          @click="genre = g"
        />
      </div>
    </PageIntro>

    <section
      v-for="list in byAuthor"
      :key="list[0]!.writerSlug"
      class="grid gap-4 border-t border-default py-8 md:grid-cols-[14rem_1fr]"
    >
      <h2>
        <NuxtLink
          :to="`/writers/${list[0]!.writerSlug}`"
          class="font-serif text-xl font-medium text-highlighted hover:text-primary"
        >
          {{ list[0]!.writerName }}
        </NuxtLink>
      </h2>
      <ul class="space-y-4">
        <li
          v-for="w in list"
          :key="w.id"
          class="flex items-baseline justify-between gap-4"
        >
          <div>
            <span class="font-serif text-lg text-highlighted">«{{ w.title }}»</span>
            <span class="ml-2 text-sm text-muted">{{ w.genre }}<template v-if="w.year">, {{ w.year }}</template></span>
          </div>
          <UButton
            :label="w.format === 'PDF' ? 'Скачать PDF' : 'Читать'"
            :icon="w.format === 'PDF' ? 'i-lucide-download' : 'i-lucide-book-open'"
            size="sm"
            color="neutral"
            variant="outline"
            class="shrink-0"
          />
        </li>
      </ul>
    </section>
  </UContainer>
</template>
