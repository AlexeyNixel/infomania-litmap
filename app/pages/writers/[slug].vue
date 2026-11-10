<script setup lang="ts">
import { api } from '~/services/api'

const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(`writer-${slug}`, async () => {
  const [writer, all, places, news, associations] = await Promise.all([
    api.getWriter(slug),
    api.getWriters(),
    api.getPlacesByWriter(slug),
    api.getNewsByWriter(slug),
    api.getAssociations()
  ])
  const idx = all.findIndex(w => w.slug === slug)
  return {
    writer,
    places,
    news,
    associations: associations.filter(a => writer?.associations?.includes(a.slug)),
    prev: all[idx - 1],
    next: all[idx + 1]
  }
})

if (!data.value?.writer) {
  throw createError({ statusCode: 404, statusMessage: 'Литератор не найден', fatal: true })
}

const w = computed(() => data.value!.writer!)

const facts = computed(() => [
  w.value.born && { label: 'Родился', value: formatDate(w.value.born) + (w.value.birthPlace ? `, ${w.value.birthPlace}` : '') },
  w.value.died && { label: 'Умер', value: formatDate(w.value.died) },
  w.value.pseudonym && { label: 'Также известен как', value: w.value.pseudonym }
].filter(Boolean) as { label: string, value: string }[])

useSeoMeta({ title: () => writerFullName(w.value), description: () => w.value.summary })
</script>

<template>
  <UContainer class="max-w-7xl">
    <UBreadcrumb
      :items="[{ label: 'Литераторы', to: '/writers' }, { label: writerFullName(w) }]"
      class="pt-10"
    />

    <header class="mt-8 grid items-center gap-8 border-b border-default pb-12 md:grid-cols-[auto_1fr]">
      <WriterMark
        :writer="w"
        size="lg"
      />
      <div>
        <p class="text-secondary">
          {{ w.roles.join(', ') }}
        </p>
        <h1 class="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight text-balance text-highlighted sm:text-6xl">
          {{ w.lastName }} {{ w.firstName }} <span class="text-muted">{{ w.middleName }}</span>
        </h1>
        <p
          v-if="lifeYears(w)"
          class="mt-2 font-serif text-xl text-muted tabular-nums"
        >
          {{ lifeYears(w) }}
        </p>
        <p class="mt-5 max-w-2xl text-lg text-pretty">
          {{ w.summary }}
        </p>
      </div>
    </header>

    <div class="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div class="min-w-0">
        <section
          v-if="w.biography"
          aria-labelledby="bio"
        >
          <h2
            id="bio"
            class="font-serif text-2xl font-medium text-highlighted"
          >
            Биография
          </h2>
          <div class="prose-lit mt-5">
            <p
              v-for="(p, i) in paragraphs(w.biography)"
              :key="i"
            >
              {{ p }}
            </p>
          </div>
        </section>
        <UEmpty
          v-else
          icon="i-lucide-scroll-text"
          title="Биография готовится"
          description="Если у вас есть материалы о литераторе, напишите нам — мы дополним страницу."
          :actions="[{ label: 'Написать', to: '/feedback', variant: 'outline' }]"
          variant="naked"
          class="items-start text-left"
        />

        <section
          v-if="w.works?.length"
          class="mt-14"
          aria-labelledby="works"
        >
          <h2
            id="works"
            class="font-serif text-2xl font-medium text-highlighted"
          >
            Произведения
          </h2>
          <div class="mt-6 grid gap-10 md:grid-cols-2">
            <div
              v-for="group in w.works"
              :key="group.title"
            >
              <h3 class="font-semibold text-highlighted">
                {{ group.title }}
              </h3>
              <ul class="mt-3 space-y-2 font-serif">
                <li
                  v-for="item in group.items"
                  :key="item"
                  class="text-pretty"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          v-if="w.excerpt"
          class="mt-14"
          aria-labelledby="excerpt"
        >
          <h2
            id="excerpt"
            class="font-serif text-2xl font-medium text-highlighted"
          >
            Творчество
          </h2>
          <figure class="mt-6 border-l-2 border-secondary pl-6 sm:pl-8">
            <figcaption class="text-sm text-muted">
              {{ w.excerpt.title }}
            </figcaption>
            <blockquote class="prose-lit mt-4 italic">
              <p
                v-for="(p, i) in paragraphs(w.excerpt.text)"
                :key="i"
                class="poem"
              >
                {{ p }}
              </p>
            </blockquote>
          </figure>
        </section>

        <section
          v-if="w.sources?.length"
          class="mt-14 text-sm text-muted"
          aria-labelledby="sources"
        >
          <h2
            id="sources"
            class="font-semibold text-highlighted"
          >
            Источники
          </h2>
          <ol class="mt-3 list-decimal space-y-1 pl-5">
            <li
              v-for="s in w.sources"
              :key="s"
            >
              {{ s }}
            </li>
          </ol>
        </section>
      </div>

      <aside class="space-y-10 lg:border-l lg:border-default lg:pl-10">
        <dl
          v-if="facts.length"
          class="space-y-4"
        >
          <div
            v-for="f in facts"
            :key="f.label"
          >
            <dt class="text-sm text-muted">
              {{ f.label }}
            </dt>
            <dd class="mt-0.5">
              {{ f.value }}
            </dd>
          </div>
        </dl>

        <div v-if="data?.places.length">
          <h2 class="text-sm font-semibold text-highlighted">
            На карте
          </h2>
          <ul class="mt-3 space-y-3">
            <li
              v-for="p in data.places"
              :key="p.slug"
              class="group relative flex gap-2"
            >
              <UIcon
                name="i-lucide-map-pin"
                class="mt-1 size-4 shrink-0 text-secondary"
              />
              <div>
                <NuxtLink
                  :to="`/places?place=${p.slug}`"
                  class="font-medium after:absolute after:inset-0 group-hover:text-primary"
                >
                  {{ p.title }}
                </NuxtLink>
                <p class="text-sm text-muted">
                  {{ p.settlement }}, {{ p.address }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="data?.associations.length">
          <h2 class="text-sm font-semibold text-highlighted">
            Литературные объединения
          </h2>
          <ul class="mt-3 space-y-2">
            <li
              v-for="a in data.associations"
              :key="a.slug"
            >
              <ULink
                :to="`/associations#${a.slug}`"
                class="hover:text-primary"
              >
                {{ a.name }}
              </ULink>
              <span class="text-sm text-muted">, {{ a.type.toLowerCase() }}</span>
            </li>
          </ul>
        </div>

        <div v-if="data?.news.length">
          <h2 class="text-sm font-semibold text-highlighted">
            В новостях
          </h2>
          <ul class="mt-3 space-y-3">
            <li
              v-for="n in data.news"
              :key="n.slug"
            >
              <ULink
                :to="`/news/${n.slug}`"
                class="font-serif leading-snug hover:text-primary"
              >
                {{ n.title }}
              </ULink>
              <p class="text-sm text-muted">
                {{ formatDate(n.date) }}
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <nav
      class="mt-20 grid gap-4 border-t border-default pt-8 sm:grid-cols-2"
      aria-label="Соседние литераторы"
    >
      <NuxtLink
        v-if="data?.prev"
        :to="`/writers/${data.prev.slug}`"
        class="group"
      >
        <span class="text-sm text-muted">Предыдущий в указателе</span>
        <span class="block font-serif text-lg text-highlighted group-hover:text-primary">{{ writerFullName(data.prev) }}</span>
      </NuxtLink>
      <span v-else />
      <NuxtLink
        v-if="data?.next"
        :to="`/writers/${data.next.slug}`"
        class="group sm:text-right"
      >
        <span class="text-sm text-muted">Следующий в указателе</span>
        <span class="block font-serif text-lg text-highlighted group-hover:text-primary">{{ writerFullName(data.next) }}</span>
      </NuxtLink>
    </nav>
  </UContainer>
</template>
