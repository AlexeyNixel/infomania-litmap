import type { Association, Film, FullTextWork, LitEvent, Organization, Partner, Project, Publication, Quote } from '~/types'

export const events: LitEvent[] = [
  {
    id: 1,
    slug: 'poeticheskiy-marafon-2026',
    title: 'XX Поэтический марафон «Большие юбилеи»',
    description: 'Два дня авторских стихов: к столетию Новосибирской писательской организации и 50-летию молодёжной библиотеки.',
    startsAt: '2026-10-17T11:00:00+07:00',
    endsAt: '2026-10-18T18:00:00+07:00',
    venue: 'Областная молодёжная библиотека',
    address: 'Красный проспект, 26',
    kind: 'Фестиваль',
    free: true,
    newsSlug: 'marafon-bolshie-yubilei-2026'
  },
  {
    id: 2,
    slug: 'molodost-noyabr',
    title: 'Встреча ЛИТО «Молодость»',
    description: 'Обсуждение новых рассказов участников объединения.',
    startsAt: '2026-10-25T14:00:00+07:00',
    venue: 'Областная научная библиотека',
    address: 'Советская, 6',
    kind: 'Встреча',
    free: true
  },
  {
    id: 3,
    slug: 'seminar-ne-vorobey-noyabr',
    title: 'Семинар «НЕ ВОРОБЕЙ»: диалог в прозе',
    description: 'Как писать живую речь героев. Практика на текстах участников.',
    startsAt: '2026-11-08T16:00:00+07:00',
    venue: 'Областная молодёжная библиотека',
    address: 'Красный проспект, 26',
    kind: 'Семинар',
    free: true
  },
  {
    id: 4,
    slug: 'seminar-prashkevicha-noyabr',
    title: 'Литературный семинар Геннадия Прашкевича',
    description: 'Теоретическая часть и разбор произведений участников.',
    startsAt: '2026-11-14T14:00:00+07:00',
    venue: 'Областная научная библиотека',
    address: 'Советская, 6, к. 211',
    kind: 'Семинар',
    free: true,
    newsSlug: 'seminar-gennadiya-prashkevicha'
  },
  {
    id: 5,
    slug: 'lomonosovskie-chteniya-ochnyy-etap',
    title: '«Ломоносовские чтения»: очный этап',
    description: 'Участники, прошедшие отбор, представляют доклады о литературе.',
    startsAt: '2026-11-18T10:00:00+07:00',
    venue: 'Областная научная библиотека',
    address: 'Советская, 6',
    kind: 'Чтения',
    free: true,
    newsSlug: 'lomonosovskie-chteniya'
  },
  {
    id: 6,
    slug: 'barhatnyy-sezon-dedlayn',
    title: 'Последний день приёма рассказов на «Бархатный сезон 40+»',
    description: 'Один рассказ от автора, жанр — реализм.',
    startsAt: '2026-11-30T23:59:00+07:00',
    venue: 'Онлайн',
    address: 'Заявка через сообщество премии',
    kind: 'Конкурс',
    free: true,
    newsSlug: 'barhatnyy-sezon-40'
  }
]

export const associations: Association[] = [
  { id: 1, slug: 'molodost', name: '«Молодость»', type: 'Областное литературное объединение', scope: 'city', settlement: 'Новосибирск', leader: 'Руководитель уточняется', venue: 'Областная научная библиотека', schedule: 'Второе воскресенье месяца, 14:00', founded: 1957, description: 'Одно из старейших ЛИТО города: прозаики и поэты всех возрастов, от студентов до 94-летнего Альберта Кайкова.' },
  { id: 2, slug: 'ne-vorobey', name: '«НЕ ВОРОБЕЙ»', type: 'Литературное объединение', scope: 'city', settlement: 'Новосибирск', venue: 'Областная молодёжная библиотека', schedule: 'Раз в месяц по субботам, 16:00', description: 'Семинары по саморедактуре, композиции и языку для молодых авторов.', link: 'https://vk.com/club127788016' },
  { id: 3, slug: 'sibirskiy-parnas', name: '«Сибирский Парнас»', type: 'Литературное объединение', scope: 'city', settlement: 'Новосибирск', description: 'Объединение, выпускающее одноимённый литературный журнал.' },
  { id: 4, slug: 'amalteya', name: '«Амальтея»', type: 'Клуб любителей фантастики', scope: 'city', settlement: 'Новосибирск', description: 'Встречи, обсуждения и конкурсы фантастического рассказа.' },
  { id: 5, slug: 'art-kuhnya', name: '«Арт-кухня»', type: 'Литературно-поэтический клуб', scope: 'city', settlement: 'Новосибирск' },
  { id: 6, slug: 'barre', name: '«Баррэ»', type: 'Клуб авторов', scope: 'city', settlement: 'Новосибирск' },
  { id: 7, slug: 'bez-pyati-dvenadtsat', name: '«Без пяти двенадцать»', type: 'Клуб музыки и поэзии', scope: 'city', settlement: 'Новосибирск' },
  { id: 8, slug: 'gelikon', name: '«Геликон»', type: 'Литературное объединение', scope: 'city', settlement: 'Новосибирск' },
  { id: 9, slug: 'grafit', name: '«Графит»', type: 'Литературный клуб СГУВТ', scope: 'city', settlement: 'Новосибирск' },
  { id: 10, slug: 'dom-tsvetaevoy', name: 'Дом Цветаевой', type: 'Культурный центр', scope: 'city', settlement: 'Новосибирск' },
  { id: 11, slug: 'zemlya-sibirskaya', name: '«Земля Сибирская»', type: 'Творческое объединение', scope: 'city', settlement: 'Новосибирск' },
  { id: 12, slug: 'klyuch', name: '«КЛЮЧ»', type: 'Клуб любителей чтения', scope: 'city', settlement: 'Новосибирск' },
  { id: 13, slug: 'liga-svobodnyh-avtorov', name: '«Лига Свободных Авторов»', type: 'Литературное объединение', scope: 'city', settlement: 'Новосибирск' },
  { id: 14, slug: 'mechta', name: '«Мечта»', type: 'Поэтический клуб', scope: 'city', settlement: 'Новосибирск' },
  { id: 15, slug: 'odissey', name: '«Одиссей»', type: 'Творческая группа', scope: 'region', settlement: 'Новосибирская область', description: 'Поэты и авторы песен со всей области.' },
  { id: 16, slug: 'berdskie-strofy', name: '«Бердские строфы»', type: 'Литературное объединение', scope: 'region', settlement: 'Бердск' },
  { id: 17, slug: 'iskitimskie-zori', name: '«Искитимские зори»', type: 'Литературный клуб', scope: 'region', settlement: 'Искитим' },
  { id: 18, slug: 'kolyvanskaya-lira', name: '«Колыванская лира»', type: 'Поэтический клуб', scope: 'region', settlement: 'Колывань' },
  { id: 19, slug: 'karasukskiy-rodnik', name: '«Родник»', type: 'Литературное объединение', scope: 'region', settlement: 'Карасук' }
]

export const publications: Publication[] = [
  { id: 1, slug: 'sibirskie-ogni', title: '«Сибирские огни»', kind: 'Журнал', editor: 'Михаил Владимирович Хлебников', address: 'Новосибирск, ул. Чаплыгина, 25, вход со двора', phone: '(383) 223-10-15', site: 'https://сибирскиеогни.рф', email: 'sibogni@sibogni.ru', founded: 1922, description: 'Старейший литературно-художественный журнал Сибири. Принимает тексты в форматах doc/docx по электронной почте.' },
  { id: 2, slug: 'sibirskiy-parnas', title: '«Сибирский Парнас»', kind: 'Журнал', description: 'Литературный журнал одноимённого объединения: поэзия, проза, критика.' },
  { id: 3, slug: 'pushkinskiy-almanah', title: '«Пушкинский альманах»', kind: 'Альманах', description: 'Ежегодник стихов и прозы новосибирских авторов.' },
  { id: 4, slug: 'moloko', title: '«Молоко» («Молодое Око»)', kind: 'Журнал', description: 'Литературный журнал, информационный партнёр конкурса «Есть только музыка одна».' },
  { id: 5, slug: 'almanah-knigolyubov', title: 'Альманах Новосибирского общества книголюбов', kind: 'Альманах', description: 'Площадка для дебютов и мемуарной прозы.' }
]

export const organizations: Organization[] = [
  { id: 1, slug: 'sp-rossii', name: 'Новосибирское отделение Союза писателей России', kind: 'Писательская организация', description: 'Родоначальница — Новосибирская писательская организация, основана в 1926 году.', site: 'http://www.litnsk.narod.ru/' },
  { id: 2, slug: 'rsp', name: 'Российский союз писателей, Новосибирское отделение', kind: 'Писательская организация' },
  { id: 3, slug: 'slr', name: 'Союз литераторов России, Новосибирское отделение', kind: 'Писательская организация' },
  { id: 4, slug: 'sp-xxi', name: 'Союз писателей XXI века', kind: 'Писательская организация' },
  { id: 11, slug: 'avtograf', name: '«Автограф»', kind: 'Издательство' },
  { id: 12, slug: 'akademizdat', name: '«Академиздат»', kind: 'Издательство' },
  { id: 13, slug: 'garamond', name: '«Гарамонд»', kind: 'Издательство' },
  { id: 14, slug: 'zdes', name: '«Здесь.»', kind: 'Издательство', description: 'Издательская инициатива.' },
  { id: 15, slug: 'nauka', name: '«Наука»', kind: 'Издательство', description: 'Сибирская издательская фирма РАН.' },
  { id: 16, slug: 'nid', name: 'Новосибирский издательский дом', kind: 'Издательство' },
  { id: 17, slug: 'svinyin', name: '«Свиньин и сыновья»', kind: 'Издательство' },
  { id: 18, slug: 'so-ran', name: 'Издательство СО РАН', kind: 'Издательство' },
  { id: 19, slug: 'tseris', name: '«ЦЭРИС»', kind: 'Издательство' },
  { id: 21, slug: 'bsk', name: 'Библиотека сибирского краеведения', kind: 'Портал', site: 'http://bsk.nios.ru', description: 'Краеведческие ресурсы Новосибирской области.' },
  { id: 22, slug: 'zhurnalnyy-mir', name: 'Журнальный мир', kind: 'Портал', site: 'http://xn--80alhdjhdcxhy5hl.xn--p1ai/', description: 'Каталог литературных журналов России.' },
  { id: 23, slug: 'lit-novcbs', name: 'Литературный Новосибирск', kind: 'Портал', site: 'https://lit.novcbs.ru/', description: 'Ресурс городской библиотечной системы.' }
]

export const films: Film[] = [
  { id: 1, title: 'Вечный зов', year: 1973, director: 'Валерий Усков, Владимир Краснопольский', basedOn: 'роман «Вечный зов»', writer: 'Анатолий Иванов', writerSlug: 'ivanov-anatoliy' },
  { id: 2, title: 'Тени исчезают в полдень', year: 1971, director: 'Валерий Усков, Владимир Краснопольский', basedOn: 'роман «Тени исчезают в полдень»', writer: 'Анатолий Иванов', writerSlug: 'ivanov-anatoliy' },
  { id: 3, title: 'Злой дух Ямбуя', year: 1977, director: 'Борис Бунеев', basedOn: 'повесть «Злой дух Ямбуя»', writer: 'Григорий Федосеев', writerSlug: 'fedoseev-grigoriy' },
  { id: 4, title: 'Звездопад', year: 1981, director: 'Игорь Таланкин', basedOn: 'повесть «Звездопад»', writer: 'Виктор Астафьев', writerSlug: 'astafyev-viktor' },
  { id: 5, title: 'Где-то гремит война', year: 1986, basedOn: 'рассказ «Где-то гремит война»', writer: 'Виктор Астафьев', writerSlug: 'astafyev-viktor' },
  { id: 6, title: 'Красный газ', year: 1924, basedOn: 'пьеса «Власть»', writer: 'Вивиан Итин', writerSlug: 'itin-vivian' },
  { id: 7, title: 'Акентьево озеро', year: 2016, basedOn: 'повесть' },
  { id: 8, title: 'Далёкая от солнца', year: 2022, basedOn: 'повесть' },
  { id: 9, title: 'Мамка', year: 2016, basedOn: 'рассказ' }
]

export const works: FullTextWork[] = [
  { id: 1, title: 'Потерянное детство', genre: 'Повесть', year: 2010, writerSlug: 'kaykov-albert', writerName: 'Альберт Кайков', format: 'PDF' },
  { id: 2, title: 'Черная пурга', genre: 'Роман', year: 2015, writerSlug: 'kaykov-albert', writerName: 'Альберт Кайков', format: 'PDF' },
  { id: 3, title: 'Избранные стихотворения', genre: 'Стихи', writerSlug: 'bersenyova-elena', writerName: 'Елена Берсенёва', format: 'Онлайн' },
  { id: 4, title: 'Рассказы разных лет', genre: 'Рассказы', writerSlug: 'gorshenin-aleksey', writerName: 'Алексей Горшенин', format: 'PDF' },
  { id: 5, title: 'Тексты о Ренессансе', genre: 'Очерки', writerSlug: 'tuchin-boris', writerName: 'Борис Тучин', format: 'Онлайн' },
  { id: 6, title: 'Стихи', genre: 'Стихи', writerSlug: 'dobrolyubova-polina', writerName: 'Полина Добролюбова', format: 'Онлайн' },
  { id: 7, title: 'Повести', genre: 'Повести', writerSlug: 'glushkov-roman', writerName: 'Роман Глушков', format: 'PDF' },
  { id: 8, title: 'Секретный дьяк', genre: 'Роман', year: 1991, writerSlug: 'prashkevich-gennadiy', writerName: 'Геннадий Прашкевич', format: 'PDF' }
]

export const projects: Project[] = [
  { id: 1, slug: 'tochka-slova', title: 'Точка слова', kind: 'Интерактивная карта', itemsCount: 120, description: 'Литературная топография Новосибирской области: места, связанные с писателями, на одной карте.' },
  { id: 2, slug: 'sibirskie-stroki', title: 'Сибирские строки', kind: 'Цикл публикаций', itemsCount: 64, tag: 'Сибирские строки', description: 'Стихи и проза современных новосибирских авторов — по одному тексту в неделю.', about: 'Каждую неделю мы публикуем одно стихотворение или рассказ современного автора из Новосибирска или области. Прислать текст для рубрики можно через форму обратной связи.' },
  { id: 3, slug: 'ot-pervogo-litsa', title: 'Сибирская литература: от первого лица', kind: 'Интервью', itemsCount: 38, tag: 'Сибирская литература: от первого лица', description: 'Писатели рассказывают о себе, своих книгах и о том, как устроена литературная жизнь Сибири.', about: 'Цикл интервью с литераторами Новосибирска и области: о первых книгах, учителях, литературных объединениях и о том, зачем сегодня писать.' },
  { id: 4, slug: 'videoshkoly', title: 'Литературные видеошколы', kind: 'Видеокурсы', itemsCount: 22, tag: 'видеошкола', description: 'Записи мастер-классов о стихосложении, композиции и редактуре.', about: 'Видеозаписи занятий, которые ведут писатели и редакторы. Подходят для самостоятельной работы над текстом.' },
  { id: 5, slug: 'renessans', title: 'Сибирский литературный Ренессанс', kind: 'Авторская рубрика', itemsCount: 47, authorSlug: 'tuchin-boris', tag: 'Сибирский литературный Ренессанс', description: 'Очерки литературоведа Бориса Тучина о писателях советской Сибири.', about: 'Экспертом и автором всех текстов рубрики является Борис Иосифович Тучин — новосибирский писатель, литературовед, врач, член Союза журналистов РФ. В 60–80-е годы его литературоведческие статьи публиковались во многих газетах и в журнале «Сибирские огни». Сейчас он руководит «Литературной мастерской» в Доме учёных Академгородка.' }
]

export const quotes: Quote[] = [
  {
    id: 1,
    text: `У проводов учиться прямоте.
Впитать в себя радушие колодца.
И облака всегда на высоте,
Не знаю, как — им это удаётся.

У муравья учусь смотреть вперёд,
Всё находить блестящим — у сороки.
Уменья жить мне так недостаёт,
Но не беда — мне все дают уроки.`,
    author: 'Юрий Татаренко',
    writerSlug: 'tatarenko-yuriy'
  }
]

export const partners: Partner[] = [
  { name: 'Новосибирская областная молодёжная библиотека', description: 'Создатель и куратор проекта', site: 'http://dev.infomania.ru/' },
  { name: 'Новосибирское отделение Союза писателей России', description: 'Экспертная поддержка', site: 'http://www.litnsk.narod.ru/' },
  { name: 'Журнал «Сибирские огни»', description: 'Информационный партнёр', site: 'https://сибирскиеогни.рф' },
  { name: 'Портал «Журнальный мир»', description: 'Информационный партнёр', site: 'http://xn--80alhdjhdcxhy5hl.xn--p1ai/' }
]
