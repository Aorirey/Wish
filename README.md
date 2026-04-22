# Wishly

Небольшое уютное веб‑приложение для вишлистов. Люди собирают то, что им нравится, и видят, о чём мечтают их друзья. Сайт полностью на русском, каталог — из российских магазинов с реальными ценами.

## Стек

- **Next.js 14** (App Router, RSC) + **TypeScript**
- **Prisma + SQLite** — база данных, миграции, сид
- **REST API** на Route Handlers (`/api/*`)
- **Tailwind CSS**, **Framer Motion**, **Zustand** + оптимистичные апдейты
- **lucide-react**
- Inter + Lora — обе шрифта с кириллицей

## Архитектура

```
src/
  app/
    page.tsx               # RSC — лендинг
    app/                   # RSC-оболочка приложения (подтягивает me + wishlist)
      page.tsx             # Главная: статистика, активность друзей, тренды
      wishlist/            # Мой вишлист (клиентский, всё через Zustand + API)
      discover/            # Каталог: фильтры + API-запросы с дебаунсом
      friends/             # Список друзей + детальная страница
      product/[id]/        # Карточка товара (RSC) — связанные, «тоже сохранили»
      profile/             # Редактор профиля (PATCH /api/me)
    api/                   # Route Handlers
      products/            # GET /api/products?q=&category=&sort=
      products/[id]        # GET + related
      categories/          # GET — категории с количеством
      stores/              # GET — список магазинов
      friends/             # GET — все, GET /[id] — детально
      me/                  # GET / PATCH
      me/wishlist/         # GET, POST, PATCH, DELETE
      reservations/[id]/   # GET, POST (toggle)
      activity/            # GET — лента
      stats/               # GET — агрегированные показатели
  components/
    layout/                # Sidebar, TopBar (принимают props от RSC)
    product/               # ProductCard, HeartButton (Zustand + toast)
    discover/              # DiscoverClient — клиентская панель фильтров
    friends/               # FriendActions, WishItemList (reservations)
    home/                  # AmbientHello
    landing/               # LandingClient
    ui/                    # Avatar, Logo, Toaster
    AppBootstrap.tsx       # гидратация stores из серверных props
  server/
    db.ts                  # Prisma singleton
    dto.ts                 # row → DTO
    services/              # products / users / wishlist — вся бизнес-логика
  store/                   # Zustand — wishlist + profile, оба с оптимистичными апдейтами
  types/api.ts             # DTO-контракт фронта и бэка
  lib/utils.ts             # formatPrice (₽, копейки), timeAgo (ru), plurals
prisma/
  schema.prisma            # Category, Store, Product, User, WishItem, Reservation
  catalog.ts               # 120 товаров (отдельный файл — проще поддерживать)
  seed.ts                  # полный сид: категории, магазины, товары, пользователи
  dev.db                   # локальная SQLite-база (в .gitignore)
```

## Данные

- **210 товаров** в **10 категориях** (Техника, Мода, Дом, Красота, Книги, Спорт, Кухня, Музыка, Детям, Игры).
- **26 магазинов**: Яндекс Маркет, OZON, Wildberries, DNS, М.Видео, Ситилинк, Мегамаркет, re:Store, Lamoda, Спортмастер, Золотое Яблоко, Л'Этуаль, Hoff, Дивано/IKEA, Подписные издания, Читай‑город, Лабиринт, Республика, Tasty Coffee, Pult.ru, Мир Кубиков, MyToys, Детский мир, ONYX BOOX, Steam, Epic Games.
- В БД при старте — только пользователь `me` (`u_me`), список друзей пустой. Каждого друга создаёт сам пользователь в разделе «Добавить друга».
- Цены в БД хранятся **в копейках** (`Int`) — надёжно и без float‑ошибок. `formatPrice` выводит «34 990 ₽».

## API

Все эндпойнты возвращают JSON, используют Prisma и идут через тонкий слой сервисов.

| Метод  | URL                                    | Что делает                                    |
| ------ | -------------------------------------- | --------------------------------------------- |
| GET    | `/api/products?q=&category=&sort=`     | Поиск + фильтры + сортировка                  |
| GET    | `/api/products/:id`                    | Карточка товара                               |
| GET    | `/api/products/:id/related`            | Похожие (по категории)                        |
| GET    | `/api/categories`                      | Категории + счётчики + диапазон цен           |
| GET    | `/api/stores`                          | Список магазинов                              |
| GET    | `/api/friends`                         | Все друзья, добавленные пользователем         |
| POST   | `/api/friends`                         | Создать друга (имя обязательно)               |
| GET    | `/api/friends/:id`                     | Один друг + его wishlist                      |
| DELETE | `/api/friends/:id`                     | Удалить друга                                 |
| POST   | `/api/uploads/avatar`                  | Загрузить аватарку (multipart, до 3 МБ)       |
| GET    | `/api/activity?limit=`                 | Лента сохранений                              |
| GET    | `/api/stats`                           | Агрегированные показатели для Главной         |
| GET    | `/api/me`                              | Текущий пользователь                          |
| PATCH  | `/api/me`                              | Обновление профиля                            |
| GET    | `/api/me/wishlist`                     | Мой вишлист                                   |
| POST   | `/api/me/wishlist`                     | Добавить `{productId, priority?}`             |
| PATCH  | `/api/me/wishlist`                     | Обновить приоритет/заметку                    |
| DELETE | `/api/me/wishlist?productId=` / `all=true` | Удалить один / очистить всё                 |
| GET    | `/api/reservations/:friendId`          | Что я забронировал у друга                    |
| POST   | `/api/reservations/:friendId`          | Toggle бронь `{productId}`                    |

## Запуск

```bash
# 1. Зависимости
npm install

# 2. Переменные окружения
cp .env.example .env     # DATABASE_URL="file:./dev.db"

# 3. БД: схема + данные
npm run db:reset         # = prisma db push --force-reset + npm run db:seed

# 4. Старт
npm run dev              # http://localhost:3000
```

Продакшн:

```bash
npm run build            # prisma generate + next build
npm run start
```

Ещё скрипты:

```bash
npm run db:push          # обновить схему (без потери данных)
npm run db:seed          # перезаписать данные
```

## Что можно проверить

- Добавить и удалить товар через сердечко — смотрите Network: `POST /api/me/wishlist`, `DELETE ?productId=…`.
- На странице друга забронировать подарок — `POST /api/reservations/:friendId`.
- В каталоге фильтры сразу летят в `GET /api/products?q=&category=&sort=`.
- Отредактировать профиль — `PATCH /api/me` с откатом при ошибке.
- На главной показатели пересчитываются из БД (`getMonthlyStats`, `getHotCategory`).

## License

MIT.
