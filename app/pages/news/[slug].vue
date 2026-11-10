<script setup lang="ts">
import { api } from '~/services/api'
import { newsCategories } from '~/mocks/news'

const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(`news-${slug}`, async () => {
  const [post, writers, more] = await Promise.all([api.getNewsPost(slug), api.getWriters(), api.getNews({ pageSize: 4 })])
  return { post, writers, more: more.items.filter(p => p.slug !== slug).slice(0, 3) }
})

if (!data.value?.post) {
  throw createError({ statusCode: 404, statusMessage: 'Запись не найдена', fatal: true })
}

const post = computed(() => data.value!.post!)
const mentioned = computed(() => data.value!.writers.filter(w => post.value.writers?.includes(w.slug)))

useSeoMeta({ title: () => post.value.title, description: () => post.value.excerpt, ogImage: () => post.value.cover })
</script>

<template>
  <UContainer class="max-w-7xl">
    <article class="mx-auto max-w-3xl pt-12 sm:pt-16">
      <UBreadcrumb
        :items="[{ label: 'Новости', to: '/news' }, { label: newsCategories[post.category], to: `/news?category=${post.category}` }]"
        class="mb-6"
      />
      <h1 class="font-serif text-4xl leading-tight font-medium tracking-tight text-balance text-highlighted sm:text-5xl">
        {{ post.title }}
      </h1>
      <p class="mt-4 text-muted">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </p>

      <img
        v-if="post.cover"
        :src="post.cover"
        alt=""
        class="mt-10 aspect-[16/10] w-full rounded-lg object-cover"
      >

      <div class="prose-lit mt-10">
        <p
          v-for="(p, i) in paragraphs(post.body)"
          :key="i"
        >
          {{ p }}
        </p>
      </div>

      <div
        v-if="mentioned.length"
        class="mt-12 border-t border-default pt-8"
      >
        <h2 class="text-sm font-semibold text-highlighted">
          Упомянутые литераторы
        </h2>
        <ul class="mt-4 flex flex-wrap gap-6">
          <li
            v-for="w in mentioned"
            :key="w.slug"
            class="group relative flex items-center gap-3"
          >
            <WriterMark
              :writer="w"
              size="sm"
            />
            <NuxtLink
              :to="`/writers/${w.slug}`"
              class="font-serif font-medium text-highlighted after:absolute after:inset-0 group-hover:text-primary"
            >
              {{ writerFullName(w) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="mt-10 flex flex-wrap gap-2">
        <UButton
          v-for="t in post.tags"
          :key="t"
          :to="`/news?tag=${encodeURIComponent(t)}`"
          :label="t"
          size="sm"
          color="neutral"
          variant="soft"
        />
      </div>
    </article>

    <section
      v-if="data?.more.length"
      class="mt-24 border-t border-default pt-10"
    >
      <h2 class="font-serif text-2xl font-medium text-highlighted">
        Другие новости
      </h2>
      <div class="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <NewsCard
          v-for="p in data.more"
          :key="p.id"
          :post="p"
        />
      </div>
    </section>
  </UContainer>
</template>
