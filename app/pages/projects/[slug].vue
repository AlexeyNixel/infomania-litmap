<script setup lang="ts">
import { api } from '~/services/api'

const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(`project-${slug}`, async () => {
  const project = await api.getProject(slug)
  if (!project) return { project: null, author: null, posts: [] }
  const [author, posts] = await Promise.all([
    project.authorSlug ? api.getWriter(project.authorSlug) : Promise.resolve(null),
    project.tag ? api.getNews({ tag: project.tag, pageSize: 12 }).then(r => r.items) : Promise.resolve([])
  ])
  return { project, author, posts }
})

if (!data.value?.project) {
  throw createError({ statusCode: 404, statusMessage: 'Проект не найден', fatal: true })
}

const project = computed(() => data.value!.project!)
const siblings = siteNav.find(g => g.label === 'Проекты')!.children

useSeoMeta({ title: () => project.value.title, description: () => project.value.description })
</script>

<template>
  <UContainer class="max-w-6xl">
    <PageIntro
      :title="project.title"
      :lead="project.description"
    >
      <template #above>
        <p class="mb-3 text-secondary">
          {{ project.kind }}
        </p>
      </template>
    </PageIntro>

    <div class="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div class="min-w-0">
        <p
          v-if="project.about"
          class="prose-lit"
        >
          {{ project.about }}
        </p>

        <div
          v-if="data?.author"
          class="group relative mt-8 flex items-center gap-4"
        >
          <WriterMark :writer="data.author" />
          <div>
            <p class="text-sm text-muted">
              Автор рубрики
            </p>
            <NuxtLink
              :to="`/writers/${data.author.slug}`"
              class="font-serif text-lg font-medium text-highlighted after:absolute after:inset-0 group-hover:text-primary"
            >
              {{ writerFullName(data.author) }}
            </NuxtLink>
          </div>
        </div>

        <section class="mt-14">
          <h2 class="font-serif text-2xl font-medium text-highlighted">
            Материалы проекта
          </h2>
          <div
            v-if="data?.posts.length"
            class="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2"
          >
            <NewsCard
              v-for="p in data.posts"
              :key="p.id"
              :post="p"
            />
          </div>
          <UEmpty
            v-else
            icon="i-lucide-scroll-text"
            title="Публикаций пока нет"
            description="Новые материалы рубрики появятся здесь. Хотите предложить свой текст — напишите нам."
            :actions="[{ label: 'Обратная связь', to: '/feedback', variant: 'outline' }]"
            class="mt-6 rounded-lg border border-dashed border-default py-12"
          />
        </section>
      </div>

      <aside class="lg:border-l lg:border-default lg:pl-10">
        <h2 class="text-sm font-semibold text-highlighted">
          Другие проекты
        </h2>
        <ul class="mt-3 space-y-3">
          <li
            v-for="s in siblings"
            :key="s.to"
          >
            <ULink
              :to="s.to"
              raw
              class="font-serif leading-snug"
              :class="route.path === s.to ? 'text-primary' : 'text-highlighted hover:text-primary'"
            >
              {{ s.label }}
            </ULink>
            <p class="text-sm text-muted">
              {{ s.description }}
            </p>
          </li>
        </ul>
      </aside>
    </div>
  </UContainer>
</template>
