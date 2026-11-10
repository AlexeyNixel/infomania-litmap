<script setup lang="ts">
import type { Place, Writer } from '~/types'
import { placeKinds } from '~/mocks/places'

const props = defineProps<{
  place: Place
  writers?: Writer[]
}>()

const related = computed(() => (props.writers ?? []).filter(w => props.place.writers?.includes(w.slug)))
</script>

<template>
  <div>
    <p class="flex items-center gap-1.5 text-sm text-secondary">
      <UIcon
        :name="placeKinds[place.kind].icon"
        class="size-4"
      />
      {{ placeKinds[place.kind].label }}
    </p>
    <h3 class="mt-2 font-serif text-2xl leading-tight font-medium text-balance text-highlighted">
      {{ place.title }}
    </h3>
    <p class="mt-1 text-sm text-muted">
      {{ place.settlement }}, {{ place.address }}
    </p>
    <p class="mt-4 text-pretty">
      {{ place.description }}
    </p>
    <div
      v-if="related.length"
      class="mt-5 flex flex-wrap gap-2"
    >
      <UButton
        v-for="w in related"
        :key="w.slug"
        :to="`/writers/${w.slug}`"
        color="neutral"
        variant="soft"
        size="sm"
        icon="i-lucide-feather"
        :label="writerShortName(w)"
      />
    </div>
    <slot />
  </div>
</template>
