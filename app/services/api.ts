import type { Association, Film, FullTextWork, LitEvent, NewsCategory, NewsPost, Organization, Partner, Place, Project, Publication, Quote, SearchResult, Writer } from '~/types'
import { writers } from '~/mocks/writers'
import { news } from '~/mocks/news'
import { places } from '~/mocks/places'
import { associations, events, films, organizations, partners, projects, publications, quotes, works } from '~/mocks/catalog'
import { formatDate } from '~/utils/format'

/**
 * Слой доступа к данным. Сейчас отдаёт моки; при появлении backend
 * достаточно заменить тело каждой функции на `$fetch('/api/...')` —
 * сигнатуры и типы ответов остаются прежними.
 */

const delay = <T>(value: T, ms = 120): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(structuredClone(value)), ms))

const byDateDesc = (a: NewsPost, b: NewsPost) => b.date.localeCompare(a.date)

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export const api = {
  // Новости
  getNews(params: { category?: NewsCategory, tag?: string, page?: number, pageSize?: number } = {}): Promise<Paginated<NewsPost>> {
    const { category, tag, page = 1, pageSize = 9 } = params
    const filtered = news
      .filter(n => !category || n.category === category)
      .filter(n => !tag || n.tags.includes(tag))
      .sort(byDateDesc)
    return delay({ items: filtered.slice((page - 1) * pageSize, page * pageSize), total: filtered.length, page, pageSize })
  },
  getNewsPost(slug: string): Promise<NewsPost | null> {
    return delay(news.find(n => n.slug === slug) ?? null)
  },
  getNewsByWriter(writerSlug: string): Promise<NewsPost[]> {
    return delay(news.filter(n => n.writers?.includes(writerSlug)).sort(byDateDesc))
  },

  // Афиша
  getEvents(params: { from?: string } = {}): Promise<LitEvent[]> {
    const from = params.from ?? new Date().toISOString()
    return delay(events.filter(e => (e.endsAt ?? e.startsAt) >= from).sort((a, b) => a.startsAt.localeCompare(b.startsAt)))
  },

  // Литераторы
  getWriters(): Promise<Writer[]> {
    return delay([...writers].sort((a, b) => a.lastName.localeCompare(b.lastName, 'ru')))
  },
  getWriter(slug: string): Promise<Writer | null> {
    return delay(writers.find(w => w.slug === slug) ?? null)
  },

  // Места
  getPlaces(params: { scope?: Place['scope'] } = {}): Promise<Place[]> {
    return delay(places.filter(p => !params.scope || p.scope === params.scope))
  },
  getPlacesByWriter(writerSlug: string): Promise<Place[]> {
    return delay(places.filter(p => p.writers?.includes(writerSlug)))
  },

  // Объединения, издания, организации
  getAssociations(): Promise<Association[]> {
    return delay(associations)
  },
  getPublications(): Promise<Publication[]> {
    return delay(publications)
  },
  getOrganizations(): Promise<Organization[]> {
    return delay(organizations)
  },

  // Тексты и медиа
  getWorks(): Promise<FullTextWork[]> {
    return delay(works)
  },
  getFilms(): Promise<Film[]> {
    return delay([...films].sort((a, b) => (a.year ?? 0) - (b.year ?? 0)))
  },
  getProjects(): Promise<Project[]> {
    return delay(projects)
  },
  getProject(slug: string): Promise<Project | null> {
    return delay(projects.find(p => p.slug === slug) ?? null)
  },
  getQuoteOfTheDay(): Promise<Quote> {
    return delay(quotes[new Date().getDate() % quotes.length]!)
  },
  getPartners(): Promise<Partner[]> {
    return delay(partners)
  },

  sendFeedback(_payload: { name: string, email: string, message: string }): Promise<{ ok: true }> {
    return delay({ ok: true }, 400)
  },

  search(query: string): Promise<SearchResult[]> {
    const q = query.trim().toLowerCase()
    if (!q) return delay([])
    const has = (s: string) => s.toLowerCase().includes(q)
    const results: SearchResult[] = [
      ...writers.filter(w => has(`${w.lastName} ${w.firstName} ${w.middleName ?? ''} ${w.pseudonym ?? ''}`)).map(w => ({
        type: 'writer' as const,
        label: `${w.lastName} ${w.firstName} ${w.middleName ?? ''}`.trim(),
        description: w.roles.join(', '),
        to: `/writers/${w.slug}`
      })),
      ...places.filter(p => has(p.title) || has(p.address)).map(p => ({
        type: 'place' as const,
        label: p.title,
        description: `${p.settlement}, ${p.address}`,
        to: `/places?place=${p.slug}`
      })),
      ...associations.filter(a => has(a.name)).map(a => ({
        type: 'association' as const,
        label: a.name,
        description: a.type,
        to: `/associations#${a.slug}`
      })),
      ...news.filter(n => has(n.title)).map(n => ({
        type: 'news' as const,
        label: n.title,
        description: formatDate(n.date),
        to: `/news/${n.slug}`
      }))
    ]
    return delay(results.slice(0, 20), 60)
  }
}
