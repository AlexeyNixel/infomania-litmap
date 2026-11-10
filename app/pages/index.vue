<script setup lang="ts">
import type { Place } from '~/types'
import { api } from '~/services/api'

useSeoMeta({ title: '' })

const { data } = await useAsyncData('home', async () => {
  const [places, news, events, writers, quote] = await Promise.all([
    api.getPlaces(),
    api.getNews({ pageSize: 7 }),
    api.getEvents(),
    api.getWriters(),
    api.getQuoteOfTheDay()
  ])
  return { places, news: news.items, events: events.slice(0, 3), writers, quote }
})

const searchOpen = useState('search-open', () => false)
const scope = ref<Place['scope']>('city')
const selected = ref<string | null>('nomb')
const selectedPlace = computed(() => data.value?.places.find(p => p.slug === selected.value))

watch(scope, () => {
  selected.value = null
})

const featuredWriters = computed(() => (data.value?.writers ?? []).filter(w => w.born).slice(0, 8))

const sections = [
  { to: '/associations', title: 'Литературные объединения', text: 'Где собираются пишущие люди: ЛИТО, клубы и студии города и области.' },
  { to: '/library/journals', title: 'Литературные издания', text: 'Журналы, альманахи, издательства и союзы писателей.' },
  { to: '/works', title: 'Произведения новосибирских писателей', text: 'Полные тексты книг, размещённые с согласия авторов.' },
  { to: '/video', title: 'Видеотека', text: 'Фильмы, снятые по книгам новосибирских писателей.' },
  { to: '/projects', title: 'Проекты', text: '«Сибирские строки», интервью, видеошколы и очерки.' },
  { to: '/about', title: 'О проекте', text: 'Кто делает карту и как предложить материал.' }
]
</script>

<template>
  <div v-if="data">
    <!-- Первый экран: сама карта -->
    <section class="border-b border-default">
      <UContainer class="grid max-w-7xl gap-10 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:py-16">
        <div>
          <h1 class="font-serif text-5xl leading-[1.05] font-medium tracking-tight text-balance text-highlighted sm:text-6xl">
            Литературная карта Новосибирска и области
          </h1>
          <p class="mt-6 max-w-md text-lg text-pretty text-muted">
            Где жили и о чём писали сибирские литераторы, какие улицы носят их имена и где сегодня читают стихи.
          </p>
          <button
            type="button"
            class="mt-8 flex w-full max-w-md items-center gap-3 rounded-md border border-default bg-elevated px-4 py-3 text-left text-muted transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary"
            @click="searchOpen = true"
          >
            <UIcon
              name="i-lucide-search"
              class="size-5"
            />
            <span class="flex-1">Писатель, улица или ЛИТО</span>
            <span class="hidden gap-1 sm:flex"><UKbd value="ctrl" /><UKbd value="K" /></span>
          </button>
          <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <ULink
              to="/writers"
              class="font-medium text-primary underline-offset-4 hover:underline"
            >
              {{ plural(data.writers.length, ['литератор', 'литератора', 'литераторов']) }}
            </ULink>
            <ULink
              to="/places"
              class="font-medium text-primary underline-offset-4 hover:underline"
            >
              {{ plural(data.places.length, ['место', 'места', 'мест']) }} на карте
            </ULink>
          </div>
        </div>

        <figure>
          <div class="overflow-hidden rounded-lg border border-default">
            <LitMap
              v-model:selected="selected"
              :places="data.places"
              :scope="scope"
            />
          </div>
          <figcaption class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div
              v-if="selectedPlace"
              class="min-w-0"
            >
              <p class="font-serif text-lg font-medium text-highlighted">
                {{ selectedPlace.title }}
              </p>
              <p class="text-sm text-muted">
                {{ selectedPlace.settlement }}, {{ selectedPlace.address }}.
                <ULink
                  :to="`/places?place=${selectedPlace.slug}`"
                  class="text-primary underline-offset-4 hover:underline"
                >Подробнее о месте</ULink>
              </p>
            </div>
            <p
              v-else
              class="text-sm text-muted"
            >
              Нажмите на метку, чтобы узнать о месте.
            </p>
            <UTabs
              v-model="scope"
              :items="[{ label: 'Город', value: 'city' }, { label: 'Область', value: 'region' }]"
              :content="false"
              size="xs"
              class="shrink-0"
            />
          </figcaption>
        </figure>
      </UContainer>
    </section>

    <UContainer class="max-w-7xl">
      <!-- Афиша -->
      <section
        v-if="data.events.length"
        class="mt-20"
        aria-labelledby="afisha-title"
      >
        <div class="mb-4 flex items-baseline justify-between gap-4">
          <h2
            id="afisha-title"
            class="font-serif text-3xl font-medium text-highlighted"
          >
            Ближайшие события
          </h2>
          <ULink
            to="/afisha"
            class="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >Вся афиша</ULink>
        </div>
        <EventRow
          v-for="event in data.events"
          :key="event.id"
          :event="event"
        />
      </section>

      <!-- Новости -->
      <section
        class="mt-20"
        aria-labelledby="news-title"
      >
        <div class="mb-8 flex items-baseline justify-between gap-4">
          <h2
            id="news-title"
            class="font-serif text-3xl font-medium text-highlighted"
          >
            Литературная жизнь
          </h2>
          <ULink
            to="/news"
            class="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >Все новости</ULink>
        </div>
        <NewsCard
          v-if="data.news[0]"
          :post="data.news[0]"
          variant="lead"
        />
        <div class="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <NewsCard
            v-for="post in data.news.slice(1, 4)"
            :key="post.id"
            :post="post"
          />
        </div>
        <div class="mt-12 grid gap-x-12 lg:grid-cols-2">
          <NewsCard
            v-for="post in data.news.slice(4)"
            :key="post.id"
            :post="post"
            variant="row"
          />
        </div>
      </section>
    </UContainer>

    <!-- Цитата дня: стихотворение получает полосу целиком -->
    <section
      class="mt-24 bg-primary text-white dark:bg-pine-900"
      aria-labelledby="quote-title"
    >
      <UContainer class="grid max-w-7xl gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20">
        <h2
          id="quote-title"
          class="font-serif text-lg text-pine-200 italic"
        >
          Строки дня
        </h2>
        <figure>
          <blockquote class="poem font-serif text-2xl leading-relaxed sm:text-3xl sm:leading-relaxed">
            {{ data.quote.text }}
          </blockquote>
          <figcaption class="mt-8">
            <ULink
              v-if="data.quote.writerSlug"
              :to="`/writers/${data.quote.writerSlug}`"
              class="font-medium text-white underline decoration-pine-300/60 underline-offset-4 hover:decoration-white"
            >
              {{ data.quote.author }}
            </ULink>
            <span v-else>{{ data.quote.author }}</span>
          </figcaption>
        </figure>
      </UContainer>
    </section>

    <UContainer class="max-w-7xl">
      <!-- Литераторы -->
      <section
        class="mt-20"
        aria-labelledby="writers-title"
      >
        <div class="mb-8 flex items-baseline justify-between gap-4">
          <h2
            id="writers-title"
            class="font-serif text-3xl font-medium text-highlighted"
          >
            Литераторы
          </h2>
          <ULink
            to="/writers"
            class="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >Указатель от А до Я</ULink>
        </div>
        <ul class="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="w in featuredWriters"
            :key="w.slug"
            class="group relative flex items-center gap-4"
          >
            <WriterMark :writer="w" />
            <div class="min-w-0">
              <NuxtLink
                :to="`/writers/${w.slug}`"
                class="font-serif text-lg leading-tight font-medium text-highlighted after:absolute after:inset-0 group-hover:text-primary"
              >
                {{ writerShortName(w) }}
              </NuxtLink>
              <p class="text-sm text-muted">
                {{ lifeYears(w) }}, {{ w.roles[0] }}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Остальные разделы -->
      <section
        class="mt-20"
        aria-labelledby="sections-title"
      >
        <h2
          id="sections-title"
          class="font-serif text-3xl font-medium text-highlighted"
        >
          Ещё на сайте
        </h2>
        <ul class="mt-6 grid border-t border-default sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="s in sections"
            :key="s.to"
            class="group relative border-b border-default py-6 sm:pr-8"
          >
            <NuxtLink
              :to="s.to"
              class="font-serif text-xl font-medium text-highlighted after:absolute after:inset-0 group-hover:text-primary"
            >
              {{ s.title }}
            </NuxtLink>
            <p class="mt-1 text-sm text-pretty text-muted">
              {{ s.text }}
            </p>
          </li>
        </ul>
      </section>
    </UContainer>
  </div>
</template>
