<template>
  <footer class="mt-24 border-t border-default bg-elevated">
    <UContainer class="max-w-7xl py-12">
      <div class="flex flex-col gap-6 border-b border-default pb-10 sm:flex-row sm:items-start sm:justify-between">
        <div class="max-w-sm">
          <AppLogo />
          <p class="mt-4 text-sm text-muted">
            Проект Новосибирской областной молодёжной библиотеки о писателях, книгах и литературных местах Новосибирска и области.
          </p>
        </div>
        <div class="flex gap-1">
          <UButton
            to="https://vk.com/litkarta_nsk"
            target="_blank"
            icon="i-simple-icons-vk"
            color="neutral"
            variant="ghost"
            aria-label="Литературная карта ВКонтакте"
          />
          <UButton
            to="mailto:omp-noub@mail.ru"
            icon="i-lucide-mail"
            color="neutral"
            variant="ghost"
            aria-label="Написать на почту"
          />
        </div>
      </div>

      <!-- Карта сайта: те же шесть групп, что и в шапке -->
      <nav
        class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 xl:grid-cols-6"
        aria-label="Карта сайта"
      >
        <div
          v-for="group in siteNav"
          :key="group.label"
        >
          <h2 class="text-sm font-semibold text-highlighted">
            {{ group.label }}
          </h2>
          <ul class="mt-3 space-y-2">
            <li
              v-for="link in group.children"
              :key="link.to"
            >
              <ULink
                :to="link.to"
                :exact-query="link.exactQuery"
                class="text-sm text-pretty text-muted hover:text-default"
                raw
              >
                {{ link.label }}
              </ULink>
            </li>
          </ul>
        </div>
      </nav>
    </UContainer>
    <UContainer class="max-w-7xl border-t border-default py-5 text-xs text-muted">
      © 2013–{{ new Date().getFullYear() }} Литературная карта Новосибирска и Новосибирской области
    </UContainer>
  </footer>
</template>
