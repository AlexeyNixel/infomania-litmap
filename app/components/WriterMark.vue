<script setup lang="ts">
import type { Writer } from '~/types'

// Портрет литератора; пока фото нет — инициалы, набранные антиквой, как экслибрис
const props = withDefaults(defineProps<{
  writer: Pick<Writer, 'firstName' | 'lastName' | 'photo'>
  size?: 'sm' | 'md' | 'lg'
}>(), { size: 'md' })

const sizes = {
  sm: 'size-10 text-sm',
  md: 'size-14 text-lg',
  lg: 'size-32 text-4xl sm:size-40 sm:text-5xl'
}
</script>

<template>
  <img
    v-if="props.writer.photo"
    :src="props.writer.photo"
    :alt="`${props.writer.firstName} ${props.writer.lastName}`"
    class="shrink-0 rounded-full object-cover grayscale"
    :class="sizes[size]"
    loading="lazy"
  >
  <span
    v-else
    aria-hidden="true"
    class="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/8 font-serif text-primary"
    :class="sizes[size]"
  >
    {{ writerInitials(props.writer) }}
  </span>
</template>
