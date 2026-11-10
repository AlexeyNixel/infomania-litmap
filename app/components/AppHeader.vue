<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const searchOpen = useState('search-open', () => false)

const groupActive = (group: SiteNavGroup) => group.children.some(link => isNavLinkActive(link, route))

// Каждая колонка старого меню — выпадающий список с собственной панелью
const items = computed<NavigationMenuItem[]>(() => siteNav.map((group, i) => ({
  label: group.label,
  value: String(i),
  slot: 'group' as const,
  active: groupActive(group),
  children: group.children.map(link => ({ label: link.label, to: link.to }))
})))

const mobileOpen = ref<string[]>([])
watch(() => route.fullPath, () => {
  mobileOpen.value = siteNav.flatMap((g, i) => groupActive(g) ? [String(i)] : [])
}, { immediate: true })
</script>

<template>
  <UHeader
    :ui="{ root: 'bg-default/90 border-default', container: 'max-w-7xl', center: 'lg:flex' }"
    mode="slideover"
    :menu="{ title: 'Меню' }"
  >
    <template #title>
      <AppLogo />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{
        link: 'text-[0.9375rem] px-2.5',
        content: 'w-auto',
        viewportWrapper: 'justify-start',
        viewport: 'w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)'
      }"
    >
      <template #group-content="{ index }">
        <ul
          class="grid gap-1 p-2"
          :class="siteNav[index]!.children.length > 3 ? 'w-[36rem] grid-cols-2' : 'w-[22rem]'"
        >
          <li
            v-for="link in siteNav[index]!.children"
            :key="link.to"
          >
            <ULink
              :to="link.to"
              :exact-query="link.exactQuery"
              class="group flex h-full gap-3 rounded-md p-3 transition-colors hover:bg-elevated focus-visible:bg-elevated focus-visible:outline-none"
              :class="isNavLinkActive(link, route) && 'bg-primary/8'"
              raw
            >
              <UIcon
                :name="link.icon"
                class="mt-0.5 size-5 shrink-0"
                :class="isNavLinkActive(link, route) ? 'text-primary' : 'text-muted group-hover:text-secondary'"
              />
              <span>
                <span
                  class="block leading-snug font-medium text-pretty"
                  :class="isNavLinkActive(link, route) ? 'text-primary' : 'text-highlighted'"
                >{{ link.label }}</span>
                <span class="mt-0.5 block text-sm text-muted">{{ link.description }}</span>
              </span>
            </ULink>
          </li>
        </ul>
      </template>
    </UNavigationMenu>

    <template #right>
      <UButton
        icon="i-lucide-search"
        color="neutral"
        variant="ghost"
        aria-label="Поиск по сайту"
        @click="searchOpen = true"
      />
      <UColorModeButton />
    </template>

    <!-- Мобильное меню: те же шесть групп, раскрываются как аккордеон -->
    <template #body>
      <UAccordion
        v-model="mobileOpen"
        type="multiple"
        :items="siteNav.map((g, i) => ({ label: g.label, value: String(i), slot: 'links' as const }))"
        :ui="{ trigger: 'text-base font-semibold', label: 'text-highlighted' }"
      >
        <template #links-body="{ index }">
          <ul class="space-y-1 pb-2">
            <li
              v-for="link in siteNav[index]!.children"
              :key="link.to"
            >
              <ULink
                :to="link.to"
                :exact-query="link.exactQuery"
                class="flex items-center gap-3 rounded-md px-2 py-2"
                :class="isNavLinkActive(link, route) ? 'bg-primary/8 text-primary' : 'text-default'"
                raw
              >
                <UIcon
                  :name="link.icon"
                  class="size-5 shrink-0 text-muted"
                />
                {{ link.label }}
              </ULink>
            </li>
          </ul>
        </template>
      </UAccordion>
    </template>
  </UHeader>
</template>
