<script setup lang="ts">
import type { NewsPost } from '~/types'
import { newsCategories } from '~/mocks/news'

withDefaults(defineProps<{
  post: NewsPost
  variant?: 'lead' | 'card' | 'row'
}>(), { variant: 'card' })
</script>

<template>
  <!-- Главная новость: крупная обложка и заголовок антиквой -->
  <article
    v-if="variant === 'lead'"
    class="group relative grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-end"
  >
    <div class="aspect-[4/3] overflow-hidden rounded-lg bg-elevated">
      <img
        v-if="post.cover"
        :src="post.cover"
        alt=""
        class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      >
    </div>
    <div>
      <p class="text-sm text-muted">
        <span class="font-medium text-secondary">{{ newsCategories[post.category] }}</span>,
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </p>
      <h3 class="mt-3 font-serif text-3xl leading-tight font-medium text-balance text-highlighted">
        <NuxtLink
          :to="`/news/${post.slug}`"
          class="after:absolute after:inset-0 focus-visible:underline focus-visible:outline-none"
        >
          {{ post.title }}
        </NuxtLink>
      </h3>
      <p class="mt-3 text-pretty text-muted">
        {{ post.excerpt }}
      </p>
    </div>
  </article>

  <!-- Строка в ленте: дата слева, без обложки -->
  <article
    v-else-if="variant === 'row'"
    class="group relative grid grid-cols-[5.5rem_1fr] gap-4 border-t border-default py-5"
  >
    <time
      :datetime="post.date"
      class="pt-1 text-sm text-muted tabular-nums"
    >{{ formatDayMonth(post.date) }}</time>
    <div>
      <h3 class="font-serif text-lg leading-snug font-medium text-highlighted group-hover:text-primary">
        <NuxtLink
          :to="`/news/${post.slug}`"
          class="after:absolute after:inset-0 focus-visible:underline focus-visible:outline-none"
        >
          {{ post.title }}
        </NuxtLink>
      </h3>
      <p class="mt-1 text-sm text-muted">
        {{ newsCategories[post.category] }}
      </p>
    </div>
  </article>

  <article
    v-else
    class="group relative flex flex-col"
  >
    <div class="aspect-[3/2] overflow-hidden rounded-md bg-elevated">
      <img
        v-if="post.cover"
        :src="post.cover"
        alt=""
        loading="lazy"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      >
      <div
        v-else
        class="flex size-full items-center justify-center p-6 text-center font-serif text-lg text-muted italic"
      >
        {{ newsCategories[post.category] }}
      </div>
    </div>
    <p class="mt-4 text-sm text-muted">
      <span class="text-secondary">{{ newsCategories[post.category] }}</span>,
      <time :datetime="post.date">{{ formatDayMonth(post.date) }}</time>
    </p>
    <h3 class="mt-1.5 font-serif text-xl leading-snug font-medium text-pretty text-highlighted group-hover:text-primary">
      <NuxtLink
        :to="`/news/${post.slug}`"
        class="after:absolute after:inset-0 focus-visible:underline focus-visible:outline-none"
      >
        {{ post.title }}
      </NuxtLink>
    </h3>
    <p class="mt-2 line-clamp-3 text-sm text-pretty text-muted">
      {{ post.excerpt }}
    </p>
  </article>
</template>
