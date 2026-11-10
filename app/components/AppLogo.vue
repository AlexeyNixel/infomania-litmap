<template>
  <span class="inline-flex items-center gap-2.5">
    <svg
      viewBox="0 0 32 40"
      class="h-8 w-auto shrink-0"
      aria-hidden="true"
    >
      <path
        d="M16 39 C16 39 2 23 2 14 A14 14 0 0 1 30 14 C30 23 16 39 16 39 Z"
        class="fill-primary"
      />
      <!-- раскрытая книга внутри метки -->
      <path
        d="M8 10.5 C10.5 9.5 13.5 9.8 16 11.5 C18.5 9.8 21.5 9.5 24 10.5 V19.5 C21.5 18.6 18.5 18.9 16 20.5 C13.5 18.9 10.5 18.6 8 19.5 Z"
        fill="none"
        stroke="var(--ui-bg)"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path
        d="M16 11.5 V20.5"
        stroke="var(--ui-bg)"
        stroke-width="1.6"
      />
    </svg>
    <span class="flex flex-col leading-none">
      <span class="font-serif text-[1.05rem] font-semibold tracking-tight text-highlighted">Литературная карта</span>
      <span class="mt-0.5 text-xs text-muted">Новосибирск и область</span>
    </span>
  </span>
</template>
