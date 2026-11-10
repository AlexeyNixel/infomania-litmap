// Доменные сущности «Литературной карты Новосибирска и Новосибирской области».
// Повторяют разделы исходного сайта infomania.ru/map — пригодятся как контракт для backend.

export type NewsCategory = 'life' | 'contests' | 'seminars' | 'new-books' | 'reviews'

export interface NewsPost {
  id: number
  slug: string
  title: string
  excerpt: string
  /** Полный текст, абзацы разделены пустой строкой */
  body: string
  date: string
  category: NewsCategory
  tags: string[]
  cover?: string
  /** slug-и упомянутых литераторов */
  writers?: string[]
}

export interface LitEvent {
  id: number
  slug: string
  title: string
  description: string
  startsAt: string
  endsAt?: string
  venue: string
  address: string
  kind: 'Чтения' | 'Семинар' | 'Конкурс' | 'Презентация' | 'Фестиваль' | 'Встреча'
  free: boolean
  newsSlug?: string
}

export type WriterRole = 'поэт' | 'прозаик' | 'литературовед' | 'драматург' | 'переводчик' | 'детский писатель' | 'критик'

export interface WorkGroup {
  title: string
  items: string[]
}

export interface Writer {
  id: number
  slug: string
  lastName: string
  firstName: string
  middleName?: string
  pseudonym?: string
  born?: string
  died?: string
  birthPlace?: string
  roles: WriterRole[]
  photo?: string
  summary: string
  biography?: string
  works?: WorkGroup[]
  excerpt?: { title: string, text: string }
  associations?: string[]
  sources?: string[]
}

export type PlaceKind = 'plaque' | 'street' | 'monument' | 'museum' | 'library' | 'house'

export interface Place {
  id: number
  slug: string
  title: string
  kind: PlaceKind
  address: string
  settlement: string
  scope: 'city' | 'region'
  /** Позиция на стилизованной SVG-карте, 0–100 по каждой оси */
  x: number
  y: number
  lat: number
  lng: number
  description: string
  writers?: string[]
  year?: number
}

export interface Association {
  id: number
  slug: string
  name: string
  type: string
  scope: 'city' | 'region'
  settlement: string
  leader?: string
  venue?: string
  schedule?: string
  founded?: number
  description?: string
  link?: string
}

export interface Publication {
  id: number
  slug: string
  title: string
  kind: 'Журнал' | 'Альманах' | 'Газета'
  editor?: string
  address?: string
  phone?: string
  site?: string
  email?: string
  founded?: number
  description: string
}

export interface Organization {
  id: number
  slug: string
  name: string
  kind: 'Издательство' | 'Писательская организация' | 'Портал'
  description?: string
  site?: string
}

export interface Film {
  id: number
  title: string
  year?: number
  director?: string
  basedOn: string
  writer?: string
  writerSlug?: string
}

export interface FullTextWork {
  id: number
  title: string
  genre: string
  year?: number
  writerSlug: string
  writerName: string
  format: 'PDF' | 'Онлайн'
}

export interface Project {
  id: number
  slug: string
  title: string
  description: string
  kind: string
  itemsCount: number
  /** Тег новостей, по которому собираются материалы проекта */
  tag?: string
  /** Ведущий рубрики */
  authorSlug?: string
  about?: string
}

export interface Quote {
  id: number
  text: string
  author: string
  writerSlug?: string
}

export interface Partner {
  name: string
  description: string
  site: string
}

export interface SearchResult {
  type: 'writer' | 'place' | 'news' | 'association'
  label: string
  description?: string
  to: string
}
