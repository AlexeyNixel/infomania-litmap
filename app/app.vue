<script setup lang="ts">
import { ru } from '@nuxt/ui/locale'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'ru'
  },
  titleTemplate: t => t ? `${t} — Литературная карта Новосибирска` : 'Литературная карта Новосибирска и Новосибирской области'
})

useSeoMeta({
  description: 'Писатели, книги, литературные объединения и памятные места Новосибирска и Новосибирской области.',
  ogTitle: 'Литературная карта Новосибирска и Новосибирской области'
})
</script>

<template>
  <UApp
    :locale="ru"
    :tooltip="{ delayDuration: 200 }"
  >
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
    <SearchPalette />
  </UApp>
</template>
