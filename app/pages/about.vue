<script setup lang="ts">
useSeoMeta({ title: 'О проекте' })
</script>

<template>
  <UContainer class="max-w-6xl">
    <PageIntro title="О проекте" />

    <div class="grid gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div class="prose-lit">
        <p>
          «Литературная карта Новосибирска и Новосибирской области» — проект Новосибирской областной молодёжной библиотеки. С 2013 года мы собираем сведения о писателях, поэтах и литературоведах региона, о литературных объединениях, изданиях и местах, связанных с литературой.
        </p>
        <p>
          На сайте публикуются биографии и библиографии литераторов, фрагменты их произведений, новости литературной жизни, анонсы встреч и конкурсов.
        </p>
        <p>
          Если вы автор, исследователь или представитель литературного объединения и хотите дополнить карту, напишите нам — мы рады материалам, фотографиям и уточнениям.
        </p>
      </div>

      <aside class="space-y-8 lg:border-l lg:border-default lg:pl-10">
        <div>
          <h2 class="text-sm font-semibold text-highlighted">
            Документы
          </h2>
          <ULink
            to="http://infomania.ru/map/wp-content/uploads/2024/11/2022.07.01__Положение_о_проекте_Лит_карта_Нск_НСО.pdf"
            target="_blank"
            class="mt-3 inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <UIcon
              name="i-lucide-file-text"
              class="size-4"
            />
            Положение о проекте, PDF
          </ULink>
        </div>
        <div>
          <h2 class="text-sm font-semibold text-highlighted">
            Контакты
          </h2>
          <a
            href="mailto:omp-noub@mail.ru"
            class="mt-3 block text-primary hover:underline"
          >omp-noub@mail.ru</a>
          <p class="mt-1 text-sm text-muted">
            Новосибирская областная молодёжная библиотека, Красный проспект, 26
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton
            to="/partners"
            label="Партнёры проекта"
            color="neutral"
            variant="outline"
          />
          <UButton
            to="/feedback"
            label="Обратная связь"
            color="neutral"
            variant="outline"
          />
        </div>
      </aside>
    </div>
  </UContainer>
</template>
