<script setup lang="ts">
import type { Place, PlaceKind } from '~/types'
import { api } from '~/services/api'
import { placeKinds } from '~/mocks/places'

useSeoMeta({ title: 'Карта литературных мест' })

const route = useRoute()
const router = useRouter()

const { data } = await useAsyncData('places', async () => {
  const [places, writers] = await Promise.all([api.getPlaces(), api.getWriters()])
  return { places, writers }
})

const selected = computed<string | null>({
  get: () => (route.query.place as string) ?? null,
  set: v => router.replace({ query: { ...route.query, place: v ?? undefined } })
})

const scope = ref<Place['scope']>(data.value?.places.find(p => p.slug === selected.value)?.scope ?? 'city')
const kind = ref<PlaceKind | 'all'>('all')

watch(scope, (s) => {
  const current = data.value?.places.find(p => p.slug === selected.value)
  if (current && current.scope !== s) selected.value = null
})

const inScope = computed(() => (data.value?.places ?? []).filter(p => p.scope === scope.value))
const filtered = computed(() => inScope.value.filter(p => kind.value === 'all' || p.kind === kind.value))
const kindsInScope = computed(() => [...new Set(inScope.value.map(p => p.kind))])
const selectedPlace = computed(() => data.value?.places.find(p => p.slug === selected.value))
</script>

<template>
  <UContainer class="max-w-7xl">
    <PageIntro
      title="Карта литературных мест"
      lead="Мемориальные доски, улицы, памятники, музеи и библиотеки, связанные с писателями Новосибирска и области."
    />

    <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div class="lg:sticky lg:top-[calc(var(--ui-header-height)+1.5rem)] lg:self-start">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-4">
          <UTabs
            v-model="scope"
            :items="[{ label: 'Новосибирск', value: 'city' }, { label: 'Область', value: 'region' }]"
            :content="false"
            size="sm"
          />
          <p class="text-sm text-muted">
            {{ plural(filtered.length, ['место', 'места', 'мест']) }}
          </p>
        </div>
        <div class="overflow-hidden rounded-lg border border-default">
          <LitMap
            v-model:selected="selected"
            :places="filtered"
            :scope="scope"
          />
        </div>
        <p class="mt-3 text-xs text-muted">
          Схема условная. Точные координаты каждого места сохранены для интерактивной карты.
        </p>
      </div>

      <div>
        <div class="flex flex-wrap gap-2">
          <UButton
            label="Все"
            size="sm"
            :color="kind === 'all' ? 'primary' : 'neutral'"
            :variant="kind === 'all' ? 'solid' : 'outline'"
            @click="kind = 'all'"
          />
          <UButton
            v-for="k in kindsInScope"
            :key="k"
            :label="placeKinds[k].plural"
            :icon="placeKinds[k].icon"
            size="sm"
            :color="kind === k ? 'primary' : 'neutral'"
            :variant="kind === k ? 'solid' : 'outline'"
            @click="kind = k"
          />
        </div>

        <div
          v-if="selectedPlace"
          class="mt-6 rounded-lg border border-primary/30 bg-elevated p-6"
        >
          <PlaceCard
            :place="selectedPlace"
            :writers="data?.writers"
          >
            <UButton
              class="mt-6"
              size="sm"
              color="neutral"
              variant="link"
              icon="i-lucide-x"
              label="Закрыть"
              @click="selected = null"
            />
          </PlaceCard>
        </div>

        <ul class="mt-6 border-t border-default">
          <li
            v-for="p in filtered"
            :key="p.slug"
          >
            <button
              type="button"
              class="flex w-full items-start gap-3 border-b border-default py-4 text-left transition-colors hover:bg-elevated focus-visible:bg-elevated focus-visible:outline-none"
              :aria-pressed="selected === p.slug"
              @click="selected = p.slug"
            >
              <UIcon
                :name="placeKinds[p.kind].icon"
                class="mt-1 size-4 shrink-0"
                :class="selected === p.slug ? 'text-primary' : 'text-secondary'"
              />
              <span>
                <span
                  class="block font-serif leading-snug font-medium"
                  :class="selected === p.slug ? 'text-primary' : 'text-highlighted'"
                >{{ p.title }}</span>
                <span class="text-sm text-muted">{{ p.settlement }}, {{ p.address }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </UContainer>
</template>
