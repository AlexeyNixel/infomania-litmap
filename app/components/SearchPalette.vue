<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'
import type { SearchResult } from '~/types'
import { api } from '~/services/api'

const open = useState('search-open', () => false)
const query = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)

defineShortcuts({
  meta_k: () => { open.value = !open.value }
})

let timer: ReturnType<typeof setTimeout> | undefined
watch(query, (q) => {
  clearTimeout(timer)
  loading.value = true
  timer = setTimeout(async () => {
    results.value = await api.search(q)
    loading.value = false
  }, 150)
})

const groupMeta: Record<SearchResult['type'], { label: string, icon: string }> = {
  writer: { label: 'Литераторы', icon: 'i-lucide-feather' },
  place: { label: 'Места', icon: 'i-lucide-map-pin' },
  association: { label: 'Объединения', icon: 'i-lucide-users' },
  news: { label: 'Новости', icon: 'i-lucide-newspaper' }
}

const groups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() =>
  (Object.keys(groupMeta) as SearchResult['type'][])
    .map(type => ({
      id: type,
      label: groupMeta[type].label,
      ignoreFilter: true,
      items: results.value.filter(r => r.type === type).map(r => ({
        label: r.label,
        suffix: r.description,
        icon: groupMeta[type].icon,
        to: r.to,
        onSelect: () => { open.value = false }
      }))
    }))
    .filter(g => g.items.length)
)
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{ content: 'sm:max-w-2xl' }"
    title="Поиск"
    description="Литераторы, места, объединения и новости"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="query"
        :groups="groups"
        :loading="loading"
        placeholder="Фамилия писателя, улица, название ЛИТО…"
        close
        class="h-96"
        @update:open="open = $event"
      >
        <template #empty>
          <p class="px-4 py-8 text-center text-sm text-muted">
            {{ query ? 'Ничего не нашлось. Попробуйте фамилию или название улицы.' : 'Начните вводить — например, «Стюарт» или «Красный проспект».' }}
          </p>
        </template>
      </UCommandPalette>
    </template>
  </UModal>
</template>
