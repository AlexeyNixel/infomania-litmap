<script setup lang="ts">
import { api } from '~/services/api'

useSeoMeta({ title: 'Проекты' })

const { data: projects } = await useAsyncData('projects', () => api.getProjects())
</script>

<template>
  <UContainer class="max-w-6xl">
    <PageIntro
      title="Проекты"
      lead="Постоянные рубрики и спецпроекты «Литературной карты»."
    />

    <div class="grid gap-x-12 gap-y-4 md:grid-cols-2">
      <article
        v-for="(p, i) in projects"
        :key="p.slug"
        class="group relative border-t border-default py-8"
        :class="i === 0 && 'md:col-span-2'"
      >
        <p class="text-sm text-secondary">
          {{ p.kind }}
        </p>
        <h2
          class="mt-2 font-serif font-medium text-balance text-highlighted group-hover:text-primary"
          :class="i === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl'"
        >
          <NuxtLink
            :to="p.slug === 'tochka-slova' ? '/places' : `/projects/${p.slug}`"
            class="after:absolute after:inset-0"
          >
            {{ p.title }}
          </NuxtLink>
        </h2>
        <p
          class="mt-3 max-w-2xl text-pretty text-muted"
          :class="i === 0 && 'text-lg'"
        >
          {{ p.description }}
        </p>
        <p class="mt-4 text-sm text-muted">
          {{ plural(p.itemsCount, ['материал', 'материала', 'материалов']) }}
        </p>
      </article>
    </div>
  </UContainer>
</template>
