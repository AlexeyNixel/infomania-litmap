<script setup lang="ts">
import type { Place } from '~/types'
import { regionTowns } from '~/mocks/places'

const props = withDefaults(defineProps<{
  places: Place[]
  scope?: Place['scope']
  /** Подписи и дорожная сетка; на главной карта чуть проще */
  detailed?: boolean
}>(), {
  scope: 'city',
  detailed: true
})

const selected = defineModel<string | null>('selected', { default: null })

const visible = computed(() => props.places.filter(p => p.scope === props.scope))

function select(slug: string) {
  selected.value = selected.value === slug ? null : slug
}
</script>

<template>
  <div class="relative aspect-[10/7] w-full select-none">
    <!-- Город: Обь делит Новосибирск на два берега, внизу — Обское море и Академгородок -->
    <svg
      v-if="scope === 'city'"
      viewBox="0 0 1000 700"
      class="absolute inset-0 size-full"
      role="img"
      aria-label="Схема Новосибирска с литературными местами"
    >
      <rect
        width="1000"
        height="700"
        fill="var(--map-land)"
      />

      <g
        v-if="detailed"
        stroke="var(--map-road)"
        stroke-width="5"
        fill="none"
        stroke-linecap="round"
      >
        <!-- Красный проспект -->
        <path d="M625 0 L622 250 L615 560" />
        <!-- поперечные улицы правого берега -->
        <path d="M455 240 C560 230 720 245 1000 230" />
        <path d="M470 340 C600 330 760 345 1000 330" />
        <path d="M480 420 C620 410 800 430 1000 400" />
        <path d="M720 0 L740 640" />
        <!-- левый берег -->
        <path d="M0 300 C120 310 260 300 380 290" />
        <path d="M0 470 C140 460 280 470 400 460" />
        <path d="M200 0 C220 200 230 450 250 700" />
      </g>

      <!-- Транссиб -->
      <path
        d="M0 210 C200 220 330 250 420 262 S560 270 560 270 L1000 150"
        fill="none"
        stroke="var(--map-ink)"
        stroke-opacity="0.35"
        stroke-width="2"
        stroke-dasharray="10 7"
      />

      <!-- Обское море -->
      <path
        d="M300 700 C320 655 380 620 450 625 C520 630 560 600 600 640 C620 660 610 690 630 700 Z"
        fill="var(--map-water)"
        stroke="var(--map-ink)"
        stroke-opacity="0.25"
        stroke-width="2"
      />

      <!-- Обь: тушевой контур под водой даёт эффект пера -->
      <path
        d="M455 640 C470 580 400 540 410 470 S490 360 440 280 S300 150 250 0"
        fill="none"
        stroke="var(--map-ink)"
        stroke-opacity="0.22"
        stroke-width="52"
        stroke-linecap="round"
      />
      <path
        d="M455 640 C470 580 400 540 410 470 S490 360 440 280 S300 150 250 0"
        fill="none"
        stroke="var(--map-water)"
        stroke-width="46"
        stroke-linecap="round"
      />

      <path
        id="ob-label"
        d="M285 70 Q370 170 425 245"
        fill="none"
      />

      <!-- мосты -->
      <g
        v-if="detailed"
        stroke="var(--map-ink)"
        stroke-opacity="0.45"
        stroke-width="4"
        stroke-linecap="round"
      >
        <path d="M398 262 L482 268" />
        <path d="M410 345 L490 340" />
        <path d="M380 430 L462 428" />
      </g>

      <g
        class="font-serif italic"
        fill="var(--map-ink)"
      >
        <text
          font-size="26"
          fill-opacity="0.55"
        >
          <textPath
            href="#ob-label"
            startOffset="30%"
          >Обь</textPath>
        </text>
        <text
          x="400"
          y="680"
          font-size="20"
          fill-opacity="0.5"
        >Обское море</text>
        <template v-if="detailed">
          <text
            x="60"
            y="400"
            font-size="22"
            fill-opacity="0.4"
          >Левый берег</text>
          <text
            x="720"
            y="660"
            font-size="20"
            fill-opacity="0.4"
          >Академгородок</text>
          <text
            x="636"
            y="420"
            font-size="16"
            fill-opacity="0.45"
            transform="rotate(90 636 420)"
          >Красный проспект</text>
        </template>
      </g>
    </svg>

    <!-- Область: Обь, озеро Чаны и Транссиб как опорные ориентиры -->
    <svg
      v-else
      viewBox="0 0 1000 700"
      class="absolute inset-0 size-full"
      role="img"
      aria-label="Схема Новосибирской области с литературными местами"
    >
      <rect
        width="1000"
        height="700"
        fill="var(--ui-bg)"
      />
      <path
        d="M40 250 Q70 190 120 170 L260 140 Q330 100 380 90 L520 60 Q590 30 640 40 L760 90 Q840 120 880 170 L960 300 Q950 370 930 420 L900 520 Q870 580 820 600 L700 640 Q620 640 560 610 L460 680 Q400 700 340 690 L220 640 Q160 610 120 560 L60 450 Q20 390 30 340 Z"
        fill="var(--map-land)"
        stroke="var(--map-ink)"
        stroke-opacity="0.35"
        stroke-width="2"
      />
      <ellipse
        cx="250"
        cy="470"
        rx="70"
        ry="34"
        fill="var(--map-water)"
        transform="rotate(-18 250 470)"
      />
      <path
        d="M830 690 C790 590 760 500 735 450 C710 400 690 380 680 340 S650 250 630 180 S600 60 590 0"
        fill="none"
        stroke="var(--map-water)"
        stroke-width="16"
        stroke-linecap="round"
      />
      <path
        d="M80 322 C200 310 280 296 330 294 S520 330 700 364"
        fill="none"
        stroke="var(--map-ink)"
        stroke-opacity="0.35"
        stroke-width="2"
        stroke-dasharray="10 7"
      />
      <g
        class="font-serif italic"
        fill="var(--map-ink)"
        fill-opacity="0.5"
      >
        <text
          x="190"
          y="530"
          font-size="18"
        >оз. Чаны</text>
        <text
          x="600"
          y="120"
          font-size="20"
        >Обь</text>
      </g>
      <g
        class="font-sans"
        fill="var(--map-ink)"
      >
        <template
          v-for="town in regionTowns"
          :key="town.name"
        >
          <circle
            :cx="town.x * 10"
            :cy="town.y * 7"
            :r="town.capital ? 7 : 4"
            fill="var(--map-ink)"
            fill-opacity="0.6"
          />
          <text
            :x="town.x * 10 + 12"
            :y="town.y * 7 - 10"
            :font-size="town.capital ? 20 : 15"
            :font-weight="town.capital ? 600 : 400"
            fill-opacity="0.7"
          >{{ town.name }}</text>
        </template>
      </g>
    </svg>

    <!-- Метки — HTML-кнопки поверх SVG: фокус с клавиатуры и подписи работают из коробки -->
    <button
      v-for="(place, i) in visible"
      :key="place.slug"
      type="button"
      class="group absolute animate-pin-drop motion-reduce:animate-none -translate-x-1/2 -translate-y-full focus-visible:outline-none"
      :style="{ left: `${place.x}%`, top: `${place.y}%`, animationDelay: `${120 + i * 45}ms` }"
      :aria-pressed="selected === place.slug"
      :aria-label="place.title"
      @click="select(place.slug)"
    >
      <svg
        viewBox="0 0 24 32"
        class="w-5 drop-shadow-sm transition-transform duration-150 group-hover:scale-125 group-focus-visible:scale-125 sm:w-6"
        :class="selected === place.slug && 'scale-140'"
      >
        <path
          d="M12 31 C12 31 2 18.5 2 11.5 A10 10 0 0 1 22 11.5 C22 18.5 12 31 12 31 Z"
          :class="selected === place.slug ? 'fill-primary' : 'fill-secondary'"
          stroke="var(--ui-bg-elevated)"
          stroke-width="2"
        />
        <circle
          cx="12"
          cy="11.5"
          r="3.6"
          fill="var(--ui-bg-elevated)"
        />
      </svg>
      <span
        class="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-inverted px-2 py-1 text-xs font-medium whitespace-nowrap text-inverted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {{ place.title }}
      </span>
    </button>
  </div>
</template>
