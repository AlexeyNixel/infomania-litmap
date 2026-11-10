<script setup lang="ts">
import type { Organization } from '~/types'
import { api } from '~/services/api'

type Section = 'journals' | 'publishers' | 'portals' | 'organizations'

const sections: Record<Section, { title: string, lead: string, kind?: Organization['kind'] }> = {
  journals: { title: 'Литературные издания', lead: 'Журналы и альманахи Новосибирска: кто редактирует, куда присылать рукописи.' },
  publishers: { title: 'Издательства', lead: 'Издательства и полиграфические предприятия, выпускающие книги новосибирских авторов.', kind: 'Издательство' },
  portals: { title: 'Порталы и сайты', lead: 'Другие литературные карты, краеведческие ресурсы и литературные порталы региона.', kind: 'Портал' },
  organizations: { title: 'Писательские организации', lead: 'Региональные отделения союзов писателей и литераторов.', kind: 'Писательская организация' }
}

const route = useRoute()
const section = route.params.section as Section

if (!(section in sections)) {
  throw createError({ statusCode: 404, statusMessage: 'Раздел не найден', fatal: true })
}

const meta = sections[section]
useSeoMeta({ title: meta.title })

const { data } = await useAsyncData(`library-${section}`, async () => {
  const [publications, organizations] = await Promise.all([api.getPublications(), api.getOrganizations()])
  return { publications, organizations: organizations.filter(o => o.kind === meta.kind) }
})

// Соседние разделы — те же четыре пункта, что в выпадающем меню «Издания»
const tabs = siteNav.find(g => g.label === 'Издания')!.children

const prettyHost = (url: string) => {
  try {
    return decodeURI(new URL(url).hostname).replace(/^www\./, '')
  } catch {
    return url
  }
}
</script>

<template>
  <UContainer
    v-if="data"
    class="max-w-6xl"
  >
    <PageIntro
      :title="meta.title"
      :lead="meta.lead"
    />

    <nav
      class="mb-10 flex gap-6 overflow-x-auto border-b border-default"
      aria-label="Разделы «Издания»"
    >
      <ULink
        v-for="t in tabs"
        :key="t.to"
        :to="t.to"
        raw
        class="-mb-px shrink-0 border-b-2 pb-3 text-sm font-medium whitespace-nowrap"
        :class="route.path === t.to ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-default'"
      >
        {{ t.label }}
      </ULink>
    </nav>

    <!-- Журналы и альманахи -->
    <div
      v-if="section === 'journals'"
      class="grid gap-px overflow-hidden rounded-lg border border-default bg-(--ui-border) md:grid-cols-2"
    >
      <article
        v-for="p in data.publications"
        :key="p.slug"
        class="bg-default p-6"
        :class="p.slug === 'sibirskie-ogni' && 'md:col-span-2'"
      >
        <p class="text-sm text-secondary">
          {{ p.kind }}<template v-if="p.founded">
            , с {{ p.founded }} года
          </template>
        </p>
        <h2 class="mt-1 font-serif text-2xl font-medium text-highlighted">
          {{ p.title }}
        </h2>
        <p class="mt-2 max-w-2xl text-pretty text-muted">
          {{ p.description }}
        </p>
        <dl
          v-if="p.editor || p.address"
          class="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]"
        >
          <template v-if="p.editor">
            <dt class="text-muted">
              Главный редактор
            </dt><dd>{{ p.editor }}</dd>
          </template>
          <template v-if="p.address">
            <dt class="text-muted">
              Адрес
            </dt><dd>{{ p.address }}</dd>
          </template>
          <template v-if="p.phone">
            <dt class="text-muted">
              Телефон
            </dt><dd>
              <a
                :href="`tel:${p.phone.replace(/\D/g, '')}`"
                class="hover:text-primary"
              >{{ p.phone }}</a>
            </dd>
          </template>
          <template v-if="p.email">
            <dt class="text-muted">
              Почта для рукописей
            </dt><dd>
              <a
                :href="`mailto:${p.email}`"
                class="text-primary hover:underline"
              >{{ p.email }}</a>
            </dd>
          </template>
        </dl>
        <ULink
          v-if="p.site"
          :to="p.site"
          target="_blank"
          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {{ prettyHost(p.site) }}
          <UIcon
            name="i-lucide-external-link"
            class="size-3.5"
          />
        </ULink>
      </article>
    </div>

    <!-- Издательства, порталы, организации — один формат списка -->
    <ul
      v-else
      class="border-t border-default"
      :class="section === 'publishers' && 'sm:columns-2 sm:gap-12'"
    >
      <li
        v-for="o in data.organizations"
        :key="o.slug"
        class="flex break-inside-avoid flex-col gap-1 border-b border-default py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
      >
        <div>
          <h2 class="font-serif text-lg font-medium text-highlighted">
            {{ o.name }}
          </h2>
          <p
            v-if="o.description"
            class="text-sm text-muted"
          >
            {{ o.description }}
          </p>
        </div>
        <ULink
          v-if="o.site"
          :to="o.site"
          target="_blank"
          class="inline-flex shrink-0 items-center gap-1 text-sm text-primary hover:underline"
        >
          {{ prettyHost(o.site) }}
          <UIcon
            name="i-lucide-external-link"
            class="size-3.5"
          />
        </ULink>
      </li>
    </ul>
  </UContainer>
</template>
