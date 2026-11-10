import type { Writer } from '~/types'

const dateFmt = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
const dayMonthFmt = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
const timeFmt = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Novosibirsk' })
const weekdayFmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', timeZone: 'Asia/Novosibirsk' })
const monthShortFmt = new Intl.DateTimeFormat('ru-RU', { month: 'short', timeZone: 'Asia/Novosibirsk' })

export const formatDate = (iso: string) => dateFmt.format(new Date(iso))
export const formatDayMonth = (iso: string) => dayMonthFmt.format(new Date(iso))
export const formatTime = (iso: string) => timeFmt.format(new Date(iso))
export const formatWeekday = (iso: string) => weekdayFmt.format(new Date(iso))
export const formatMonthShort = (iso: string) => monthShortFmt.format(new Date(iso)).replace('.', '')
export const dayOfMonth = (iso: string) => Number(new Intl.DateTimeFormat('ru-RU', { day: 'numeric', timeZone: 'Asia/Novosibirsk' }).format(new Date(iso)))

export const writerFullName = (w: Pick<Writer, 'lastName' | 'firstName' | 'middleName'>) =>
  [w.lastName, w.firstName, w.middleName].filter(Boolean).join(' ')

export const writerShortName = (w: Pick<Writer, 'lastName' | 'firstName'>) => `${w.firstName} ${w.lastName}`

export const writerInitials = (w: Pick<Writer, 'lastName' | 'firstName'>) => `${w.firstName[0]}${w.lastName[0]}`

export const lifeYears = (w: Pick<Writer, 'born' | 'died'>) => {
  const b = w.born?.slice(0, 4)
  const d = w.died?.slice(0, 4)
  if (b && d) return `${b}–${d}`
  if (b) return `род. ${b}`
  return ''
}

export const paragraphs = (text?: string) => (text ?? '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

/** «1 писатель», «2 писателя», «5 писателей» */
export const plural = (n: number, forms: [string, string, string]) => {
  const mod10 = n % 10
  const mod100 = n % 100
  const form = mod10 === 1 && mod100 !== 11 ? forms[0] : mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20) ? forms[1] : forms[2]
  return `${n} ${form}`
}
