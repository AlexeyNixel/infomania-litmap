<script setup lang="ts">
import type { NewsCategory } from '~/types'
import { api } from '~/services/api'
import { newsCategories } from '~/mocks/news'

useSeoMeta({ title: 'Новости' })

const route = useRoute()
const router = useRouter()

const category = computed({
  get: () => (route.query.category as NewsCategory | undefined) ?? 'all',
  set: v => router.replace({ query: { ...route.query, category: v === 'all' ? undefined : v, page: undefined } })
})
const page = computed({
  get: () => Number(route.query.page ?? 1),
  set: v => router.replace({ query: { ...route.query, page: v === 1 ? undefined : v } })
})
const tag = computed(() => route.query.tag as string | undefined)

const { data, status } = await useAsyncData(
  'news',
  () => api.getNews({ category: category.value === 'all' ? undefined : category.value, tag: tag.value, page: page.value }),
  { watch: [category, page, tag] }
)

const tabs = [
  { label: 'Все', value: 'all' },
  ...Object.entries(newsCategories).map(([value, label]) => ({ label, value }))
]
</script>

<template>
  <UContainer class="max-w-7xl">
    <PageIntro
      title="Новости литературной жизни"
      lead="Встречи, конкурсы, семинары и новые книги Новосибирска и области."
    />

    <UTabs
      v-model="category"
      :items="tabs"
      :content="false"
      variant="link"
      class="mb-10 overflow-x-auto"
    />

    <div
      v-if="tag"
      class="mb-8 flex items-center gap-2 text-sm"
    >
      <span class="text-muted">Записи с тегом</span>
      <UBadge
        :label="tag"
        color="neutral"
        variant="soft"
      />
      <UButton
        :to="{ query: { ...route.query, tag: undefined } }"
        size="xs"
        color="neutral"
        variant="link"
        label="Сбросить"
      />
    </div>

    <div
      class="grid gap-x-8 gap-y-14 transition-opacity sm:grid-cols-2 lg:grid-cols-3"
      :class="status === 'pending' && 'opacity-50'"
    >
      <NewsCard
        v-for="post in data?.items"
        :key="post.id"
        :post="post"
      />
    </div>

    <UEmpty
      v-if="data && !data.items.length"
      icon="i-lucide-newspaper"
      title="В этой рубрике пока нет записей"
      description="Загляните в другие рубрики или посмотрите все новости."
      :actions="[{ label: 'Все новости', to: '/news' }]"
      class="py-16"
    />

    <div
      v-if="data && data.total > data.pageSize"
      class="mt-14 flex justify-center"
    >
      <UPagination
        v-model:page="page"
        :total="data.total"
        :items-per-page="data.pageSize"
      />
    </div>
  </UContainer>
</template>
