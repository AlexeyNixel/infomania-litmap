import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface SiteNavLink {
  label: string
  to: string
  description: string
  icon: string
  /** Для ссылок, различающихся только query (рубрики новостей) */
  exactQuery?: boolean
}

export interface SiteNavGroup {
  label: string
  children: SiteNavLink[]
}

// Пункты и их порядок повторяют меню infomania.ru/map один в один:
// шесть колонок старой шапки стали шестью выпадающими списками.
export const siteNav: SiteNavGroup[] = [
  {
    label: 'События',
    children: [
      { label: 'Афиша', to: '/afisha', description: 'Ближайшие встречи, чтения и семинары', icon: 'i-lucide-calendar-days' },
      { label: 'Литературная жизнь', to: '/news?category=life', description: 'Новости и репортажи с мероприятий', icon: 'i-lucide-newspaper', exactQuery: true },
      { label: 'Конкурсы, фестивали', to: '/news?category=contests', description: 'Приём заявок, сроки и итоги', icon: 'i-lucide-trophy', exactQuery: true },
      { label: 'Семинары, мастер-классы', to: '/news?category=seminars', description: 'Занятия для пишущих людей', icon: 'i-lucide-pen-line', exactQuery: true }
    ]
  },
  {
    label: 'Люди и места',
    children: [
      { label: 'Литераторы', to: '/writers', description: 'Биографии, библиографии, фрагменты', icon: 'i-lucide-feather' },
      { label: 'Литературные объединения', to: '/associations', description: 'ЛИТО и клубы города и области', icon: 'i-lucide-users' },
      { label: 'Литературные достопримечательности', to: '/places', description: 'Доски, улицы и памятники на карте', icon: 'i-lucide-map-pin' },
      { label: 'Видеотека', to: '/video', description: 'Фильмы по книгам новосибирцев', icon: 'i-lucide-clapperboard' }
    ]
  },
  {
    label: 'Книги',
    children: [
      { label: 'Новинки новосибирской литературы', to: '/news?category=new-books', description: 'Свежие книги и презентации', icon: 'i-lucide-book-plus', exactQuery: true },
      { label: 'Произведения новосибирских писателей', to: '/works', description: 'Полные тексты с согласия авторов', icon: 'i-lucide-book-open-text' },
      { label: 'Рецензии', to: '/news?category=reviews', description: 'Отзывы и разборы новых книг', icon: 'i-lucide-message-square-quote', exactQuery: true }
    ]
  },
  {
    label: 'Издания',
    children: [
      { label: 'Литературные издания', to: '/library/journals', description: 'Журналы и альманахи', icon: 'i-lucide-book-marked' },
      { label: 'Издательства', to: '/library/publishers', description: 'Где издают книги в Новосибирске', icon: 'i-lucide-printer' },
      { label: 'Порталы и сайты', to: '/library/portals', description: 'Литературные ресурсы региона', icon: 'i-lucide-globe' },
      { label: 'Писательские организации', to: '/library/organizations', description: 'Союзы писателей и литераторов', icon: 'i-lucide-landmark' }
    ]
  },
  {
    label: 'Проекты',
    children: [
      { label: 'Проект «Сибирские строки»', to: '/projects/sibirskie-stroki', description: 'Тексты современных авторов', icon: 'i-lucide-scroll-text' },
      { label: 'Проект «Сибирская литература: от первого лица»', to: '/projects/ot-pervogo-litsa', description: 'Интервью с писателями', icon: 'i-lucide-mic' },
      { label: 'Литературные видеошколы', to: '/projects/videoshkoly', description: 'Мастер-классы в записи', icon: 'i-lucide-video' },
      { label: 'Сибирский литературный Ренессанс', to: '/projects/renessans', description: 'Очерки Бориса Тучина', icon: 'i-lucide-library-big' }
    ]
  },
  {
    label: 'О проекте',
    children: [
      { label: 'О проекте', to: '/about', description: 'Кто и зачем делает карту', icon: 'i-lucide-info' },
      { label: 'Партнёры проекта', to: '/partners', description: 'Библиотеки, союзы, журналы', icon: 'i-lucide-handshake' },
      { label: 'Обратная связь', to: '/feedback', description: 'Предложить материал или поправку', icon: 'i-lucide-mail' }
    ]
  }
]

/** Совпадает ли ссылка меню с текущим адресом, включая query для рубрик */
export function isNavLinkActive(link: SiteNavLink, route: RouteLocationNormalizedLoaded) {
  const [path, query] = link.to.split('?')
  if (link.exactQuery) {
    const params = new URLSearchParams(query)
    return route.path === path && [...params].every(([k, v]) => route.query[k] === v)
  }
  return route.path === path || route.path.startsWith(`${path}/`)
}
