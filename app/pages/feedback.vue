<script setup lang="ts">
useSeoMeta({ title: 'Обратная связь' })
</script>

<template>
  <UContainer class="max-w-6xl">
    <PageIntro
      title="Обратная связь"
      lead="Предложите материал о литераторе, сообщите о неточности или расскажите о событии — мы ответим на почту."
    />

    <div class="grid gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div class="rounded-lg border border-default bg-elevated p-6 sm:p-8">
        <FeedbackForm />
      </div>
      <aside class="space-y-6 text-sm">
        <div>
          <h2 class="font-semibold text-highlighted">
            Почта
          </h2>
          <a
            href="mailto:omp-noub@mail.ru"
            class="mt-1 block text-base text-primary hover:underline"
          >omp-noub@mail.ru</a>
        </div>
        <div>
          <h2 class="font-semibold text-highlighted">
            Сообщество ВКонтакте
          </h2>
          <a
            href="https://vk.com/litkarta_nsk"
            target="_blank"
            class="mt-1 block text-base text-primary hover:underline"
          >vk.com/litkarta_nsk</a>
        </div>
        <div>
          <h2 class="font-semibold text-highlighted">
            Что можно прислать
          </h2>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-muted">
            <li>биографию и фотографию литератора</li>
            <li>анонс встречи или конкурса</li>
            <li>сведения о памятном месте</li>
            <li>поправку к опубликованному материалу</li>
          </ul>
        </div>
      </aside>
    </div>
  </UContainer>
</template>
