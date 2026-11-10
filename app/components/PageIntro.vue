<script setup lang="ts">
defineProps<{
  title: string
  lead?: string
}>()
</script>

<template>
  <header class="pt-12 pb-8 sm:pt-16">
    <slot name="above" />
    <h1 class="max-w-4xl font-serif text-4xl font-medium tracking-tight text-balance text-highlighted sm:text-5xl">
      {{ title }}
    </h1>
    <p
      v-if="lead"
      class="mt-4 max-w-2xl text-lg text-pretty text-muted"
    >
      {{ lead }}
    </p>
    <slot />
  </header>
</template>
