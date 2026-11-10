<script setup lang="ts">
import type { LitEvent } from '~/types'

const props = defineProps<{ event: LitEvent }>()

const multiDay = computed(() => props.event.endsAt && props.event.endsAt.slice(0, 10) !== props.event.startsAt.slice(0, 10))
</script>

<template>
  <article class="group relative grid grid-cols-[5.5rem_1fr] gap-5 border-t border-default py-6 sm:grid-cols-[7.5rem_1fr_auto]">
    <!-- Дата — главная информация анонса, поэтому она крупная -->
    <div class="text-secondary">
      <p class="font-serif text-4xl leading-none font-medium whitespace-nowrap tabular-nums sm:text-5xl">
        {{ dayOfMonth(event.startsAt) }}<span
          v-if="multiDay"
          class="text-xl sm:text-3xl"
        >–{{ dayOfMonth(event.endsAt!) }}</span>
      </p>
      <p class="mt-1 text-sm">
        {{ formatMonthShort(event.startsAt) }}, {{ formatWeekday(event.startsAt) }}
      </p>
    </div>
    <div class="min-w-0">
      <p class="text-sm text-muted">
        {{ event.kind }}
      </p>
      <h3 class="mt-1 font-serif text-xl leading-snug font-medium text-pretty text-highlighted">
        <NuxtLink
          v-if="event.newsSlug"
          :to="`/news/${event.newsSlug}`"
          class="after:absolute after:inset-0 group-hover:text-primary focus-visible:underline focus-visible:outline-none"
        >
          {{ event.title }}
        </NuxtLink>
        <template v-else>
          {{ event.title }}
        </template>
      </h3>
      <p class="mt-2 max-w-prose text-sm text-pretty text-muted">
        {{ event.description }}
      </p>
    </div>
    <div class="col-start-2 text-sm sm:col-start-3 sm:max-w-56 sm:text-right">
      <p class="font-medium text-highlighted">
        {{ formatTime(event.startsAt) }}
      </p>
      <p class="text-muted">
        {{ event.venue }}
      </p>
      <p class="text-muted">
        {{ event.address }}
      </p>
    </div>
  </article>
</template>
