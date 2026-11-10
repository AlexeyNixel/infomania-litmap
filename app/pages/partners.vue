<script setup lang="ts">
import { api } from '~/services/api'

useSeoMeta({ title: 'Партнёры проекта' })

const { data: partners } = await useAsyncData('partners', () => api.getPartners())
</script>

<template>
  <UContainer class="max-w-6xl">
    <PageIntro
      title="Партнёры проекта"
      lead="Организации, которые помогают собирать и распространять материалы «Литературной карты»."
    />

    <ul class="grid border-t border-default sm:grid-cols-2">
      <li
        v-for="p in partners"
        :key="p.name"
        class="group relative border-b border-default py-6 sm:pr-8"
      >
        <p class="text-sm text-secondary">
          {{ p.description }}
        </p>
        <ULink
          :to="p.site"
          target="_blank"
          class="mt-1 block font-serif text-xl font-medium text-highlighted after:absolute after:inset-0 group-hover:text-primary"
        >
          {{ p.name }}
        </ULink>
      </li>
    </ul>

    <p class="mt-10 text-muted">
      Хотите стать партнёром проекта?
      <ULink
        to="/feedback"
        class="font-medium text-primary hover:underline"
      >
        Напишите нам
      </ULink>
    </p>
  </UContainer>
</template>
