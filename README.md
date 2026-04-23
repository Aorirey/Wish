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

## Запуск локально

Нужен **Postgres 14+**. Самый быстрый способ:

```bash
# В отдельном терминале
docker run --name wishly-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
```

Потом:

```bash
# 1. Зависимости
npm install

# 2. Переменные окружения
cp .env.example .env
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wishly?schema=public"

# 3. БД: схема + данные (идемпотентно)
npm run db:deploy

# 4. Старт
npm run dev              # http://localhost:3000
```

## Деплой на Render

В репозитории есть `render.yaml` — Blueprint для бесплатного плана. Один клик — и Render создаёт веб-сервис, бесплатный Postgres, прокидывает `DATABASE_URL`, на каждом пуше выполняет миграции + идемпотентный сид.

```
https://dashboard.render.com/blueprint/new?repo=https://github.com/Aorirey/Wish
```

См. раздел «Render deploy» ниже.

## Ещё скрипты

```bash
npm run db:push          # обновить схему (без потери данных)
npm run db:seed          # upsert каталога (не трогает пользовательские данные)
npm run db:reset         # полная перезапись — ТОЛЬКО локально
```

## Что можно проверить

- Добавить и удалить товар через сердечко — смотрите Network: `POST /api/me/wishlist`, `DELETE ?productId=…`.
- На странице друга забронировать подарок — `POST /api/reservations/:friendId`.
- В каталоге фильтры сразу летят в `GET /api/products?q=&category=&sort=`.
- Отредактировать профиль — `PATCH /api/me` с откатом при ошибке.
- На главной показатели пересчитываются из БД (`getMonthlyStats`, `getHotCategory`).

## Render deploy

### 1. Запушить изменения в GitHub

```bash
git add render.yaml
git commit -m "Add Render blueprint"
git push origin main
```

### 2. Открыть Blueprint-страницу

```
https://dashboard.render.com/blueprint/new?repo=https://github.com/Aorirey/Wish
```

### 3. Что произойдёт

Render прочитает `render.yaml` и создаст:

- **Web Service** `wishly` — Node.js, план Free, регион Frankfurt.
- **Postgres** `wishly-db` — план Free, регион Frankfurt.
- `DATABASE_URL` автоматически прокинется в веб-сервис.

### 4. Билд и старт

При каждом пуше Render:

1. `npm ci` — зависимости.
2. `npx prisma generate` — Prisma клиент.
3. `npm run db:deploy` — применяет схему к Postgres и сидит каталог (идемпотентно).
4. `npm run build` — билд Next.
5. Старт: `next start -p $PORT -H 0.0.0.0`.

### 5. Что проверить после первого деплоя

- Открыть `https://<your-service>.onrender.com/` — должен быть лендинг.
- Перейти в `/app` — товаров 210, друзей 0.
- В профиле загрузить аватарку — сохранится в БД как data URL.
- Добавить друга — создастся в Postgres.

### Особенности плана Free

- Сервис **засыпает через 15 минут бездействия**. Первый запрос после простоя разбудит его за ~30 секунд.
- Postgres Free **удаляется через 30 дней** с момента создания — это ограничение Render. Если нужна постоянная БД, переключите `wishly-db` на план Basic ($7/мес).

## License

MIT.
