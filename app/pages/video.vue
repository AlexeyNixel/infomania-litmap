<script setup lang="ts">
import { api } from '~/services/api'

useSeoMeta({ title: 'Видеотека' })

const { data: films } = await useAsyncData('films', () => api.getFilms())
</script>

<template>
  <UContainer class="max-w-5xl">
    <PageIntro
      title="Видеотека"
      lead="Фильмы, снятые по произведениям новосибирских писателей, от немого кино 1920-х до наших дней."
    />

    <!-- Хронология: год — это реальная последовательность, поэтому он вынесен в отдельную колонку -->
    <ol class="border-t border-default">
      <li
        v-for="f in films"
        :key="f.id"
        class="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-default py-6 sm:grid-cols-[6rem_1fr]"
      >
        <p class="font-serif text-2xl text-secondary tabular-nums">
          {{ f.year ?? '—' }}
        </p>
        <div>
          <h2 class="font-serif text-2xl font-medium text-highlighted">
            «{{ f.title }}»
          </h2>
          <p class="mt-1 text-muted">
            По мотивам: {{ f.basedOn }}<template v-if="f.writer">
              ,
              <ULink
                v-if="f.writerSlug"
                :to="`/writers/${f.writerSlug}`"
                class="text-default underline decoration-(--ui-border) underline-offset-4 hover:text-primary"
              >
                {{ f.writer }}
              </ULink>
              <span v-else>{{ f.writer }}</span>
            </template>
          </p>
          <p
            v-if="f.director"
            class="mt-1 text-sm text-muted"
          >
            Режиссёр: {{ f.director }}
          </p>
        </div>
      </li>
    </ol>
  </UContainer>
</template>
