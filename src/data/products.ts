export type Category =
  | "tech"
  | "fashion"
  | "home"
  | "beauty"
  | "books"
  | "outdoors"
  | "kitchen"
  | "music";

export type Product = {
  id: string;
  title: string;
  brand: string;
  store: string;
  storeUrl: string;
  price: number; // RUB, рубли (целое число)
  originalPrice?: number;
  currency?: string;
  category: Category;
  image: string;
  color?: string;
  tags?: string[];
  description: string;
};

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "tech", label: "Техника", emoji: "◎" },
  { id: "fashion", label: "Мода", emoji: "◇" },
  { id: "home", label: "Дом", emoji: "◈" },
  { id: "beauty", label: "Красота", emoji: "✦" },
  { id: "books", label: "Книги", emoji: "☰" },
  { id: "outdoors", label: "Спорт", emoji: "△" },
  { id: "kitchen", label: "Кухня", emoji: "◐" },
  { id: "music", label: "Музыка", emoji: "♫" },
];

// Цены — приблизительная российская розница. Ссылки ведут на карточку
// или поиск в магазине, где товар действительно продаётся в РФ.
export const products: Product[] = [
  {
    id: "p_station_mini_2",
    title: "Умная колонка Яндекс Станция Мини 2 с часами",
    brand: "Яндекс",
    store: "Яндекс Маркет",
    storeUrl:
      "https://market.yandex.ru/search?text=%D0%AF%D0%BD%D0%B4%D0%B5%D0%BA%D1%81+%D0%A1%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F+%D0%9C%D0%B8%D0%BD%D0%B8+2",
    price: 7990,
    originalPrice: 9990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    color: "#2e2e2e",
    tags: ["Алиса", "Zigbee"],
    description:
      "Компактная колонка с Алисой, часами и Zigbee‑хабом — управляет умным домом и будит по утрам.",
  },
  {
    id: "p_airpods_pro_2",
    title: "Наушники Apple AirPods Pro (2‑го поколения) с USB‑C",
    brand: "Apple",
    store: "re:Store",
    storeUrl: "https://re-store.ru/catalog/airpods/airpods-pro/",
    price: 22990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=80",
    color: "#F2F2F2",
    tags: ["Шумоподавление", "Spatial Audio"],
    description:
      "Адаптивный звук, чип H2 и удобный зарядный кейс с USB‑C. Любимые беспроводные наушники на каждый день.",
  },
  {
    id: "p_sony_wh1000xm5",
    title: "Беспроводные наушники Sony WH‑1000XM5",
    brand: "Sony",
    store: "DNS",
    storeUrl:
      "https://www.dns-shop.ru/search/?q=sony+wh-1000xm5&p=1&order=popular",
    price: 42999,
    originalPrice: 49990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1200&q=80",
    color: "#111",
    tags: ["ANC", "30 ч"],
    description:
      "Флагманское шумоподавление Sony с восемью микрофонами и самыми мягкими амбушюрами в линейке.",
  },
  {
    id: "p_onyx_palma",
    title: "Электронная книга ONYX BOOX Palma 2",
    brand: "ONYX BOOX",
    store: "ONYX BOOX",
    storeUrl: "https://onyxboox.ru/palma-2",
    price: 34990,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=1200&q=80",
    color: "#1b1b1d",
    tags: ["6.13\"", "Android"],
    description:
      "Компактная читалка в форм‑факторе смартфона: E‑Ink, Android и полноценный браузер в кармане.",
  },
  {
    id: "p_xiaomi_redmi_note",
    title: "Смартфон Xiaomi Redmi Note 13 Pro 8/256 ГБ",
    brand: "Xiaomi",
    store: "Ситилинк",
    storeUrl:
      "https://www.citilink.ru/search/?text=xiaomi%20redmi%20note%2013%20pro",
    price: 24990,
    originalPrice: 29990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80",
    color: "#3a3a3a",
    tags: ["200 МП", "AMOLED 120 Гц"],
    description:
      "Матрица на 200 МП, быстрый AMOLED 120 Гц и зарядка 67 Вт за вменяемые деньги.",
  },
  {
    id: "p_lego_orchid",
    title: "Конструктор LEGO Icons «Орхидея» 10311",
    brand: "LEGO",
    store: "Мир Кубиков",
    storeUrl: "https://mir-kubikov.ru/catalog/detail.php?ID=14210",
    price: 6999,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    color: "#d4b0ff",
    tags: ["608 деталей"],
    description:
      "Собранная вручную орхидея, которая никогда не завянет. Тихий акцент на полку или подоконник.",
  },
  {
    id: "p_stanley_quencher",
    title: "Термокружка Stanley Quencher H2.0 0.9 л",
    brand: "Stanley",
    store: "OZON",
    storeUrl:
      "https://www.ozon.ru/search/?text=stanley+quencher+h2.0+0.9&from_global=true",
    price: 4990,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?auto=format&fit=crop&w=1200&q=80",
    color: "#e9cfc2",
    tags: ["Влезает в подстаканник"],
    description:
      "Та самая тамблер‑кружка из TikTok: двойная стенка, соломинка и 24 часа холода.",
  },
  {
    id: "p_contigo_bottle",
    title: "Термобутылка Contigo Autoseal West Loop 0.47 л",
    brand: "Contigo",
    store: "Спортмастер",
    storeUrl: "https://www.sportmaster.ru/search/?q=contigo+west+loop",
    price: 2499,
    originalPrice: 2999,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    color: "#2f5d8a",
    tags: ["Autoseal"],
    description:
      "Кнопка Autoseal — и ни капли мимо. Держит кофе горячим до 5 часов, идеально для такси и переговорок.",
  },
  {
    id: "p_demix_leggings",
    title: "Леггинсы женские Demix Essentials",
    brand: "Demix",
    store: "Спортмастер",
    storeUrl: "https://www.sportmaster.ru/search/?q=demix+leggings",
    price: 2499,
    originalPrice: 3299,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80",
    color: "#2a2a2a",
    tags: ["Высокая посадка"],
    description:
      "Тянутся куда нужно, нигде не сползают. Рабочая лошадка для зала, йоги и прогулок по городу.",
  },
  {
    id: "p_outventure_down",
    title: "Пуховик женский Outventure Ultra Light",
    brand: "Outventure",
    store: "Спортмастер",
    storeUrl: "https://www.sportmaster.ru/search/?q=outventure+%D0%BF%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D0%BA",
    price: 4999,
    originalPrice: 6999,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=80",
    color: "#0f1b2d",
    tags: ["Компактный"],
    description:
      "Лёгкий пуховик, который складывается в собственный мешочек. Секрет любого городского путешественника.",
  },
  {
    id: "p_columbia_powder",
    title: "Куртка мужская Columbia Powder Lite",
    brand: "Columbia",
    store: "Спортмастер",
    storeUrl: "https://www.sportmaster.ru/search/?q=columbia+powder+lite",
    price: 12999,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
    color: "#2b4f2b",
    tags: ["Omni‑Heat"],
    description:
      "Тёплая синтетика с отражающей подкладкой Omni‑Heat. От ноября до марта как родная.",
  },
  {
    id: "p_nb_574",
    title: "Кроссовки New Balance 574 Core",
    brand: "New Balance",
    store: "Lamoda",
    storeUrl: "https://www.lamoda.ru/p/rtladw544801/shoes-newbalance-krossovki/",
    price: 12999,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
    color: "#dce7ef",
    tags: ["Замша"],
    description:
      "Бессмертный силуэт конца 80‑х. Замша, ENCAP‑подошва и бесконечная совместимость с любыми джинсами.",
  },
  {
    id: "p_dyson_airwrap",
    title: "Стайлер Dyson Airwrap Complete Long",
    brand: "Dyson",
    store: "Золотое Яблоко",
    storeUrl:
      "https://goldapple.ru/search?q=dyson+airwrap",
    price: 64990,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aaa5f1c9b087?auto=format&fit=crop&w=1200&q=80",
    color: "#c8afff",
    tags: ["Coanda"],
    description:
      "Сушит, завивает, выпрямляет и приподнимает у корней — воздухом, а не экстремальным нагревом.",
  },
  {
    id: "p_laneige_mask",
    title: "Ночная маска для губ Laneige — Berry",
    brand: "Laneige",
    store: "Золотое Яблоко",
    storeUrl:
      "https://goldapple.ru/search?q=laneige+lip+sleeping+mask",
    price: 2290,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
    color: "#f6bfcf",
    tags: ["На ночь"],
    description:
      "Ягодная маска с витамином C. К утру губы выглядят так, будто вы спали восемь часов (даже если нет).",
  },
  {
    id: "p_letique_lip",
    title: "Бальзам для губ Letique Nude Kiss",
    brand: "Letique Cosmetics",
    store: "Золотое Яблоко",
    storeUrl: "https://goldapple.ru/search?q=letique+%D0%B1%D0%B0%D0%BB%D1%8C%D0%B7%D0%B0%D0%BC+%D0%B4%D0%BB%D1%8F+%D0%B3%D1%83%D0%B1",
    price: 890,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1631730486572-226d1f595b68?auto=format&fit=crop&w=1200&q=80",
    color: "#c79271",
    tags: ["Vegan"],
    description:
      "Лёгкий питательный бальзам с маслом ши — приятный карамельный оттенок и никакого блеска.",
  },
  {
    id: "p_ps5_slim",
    title: "Игровая консоль Sony PlayStation 5 Slim (с дисководом)",
    brand: "Sony",
    store: "DNS",
    storeUrl: "https://www.dns-shop.ru/search/?q=playstation+5+slim",
    price: 54999,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
    color: "#fafafa",
    tags: ["1 ТБ", "4K"],
    description:
      "Та самая PS5, но тоньше и тише. 1 ТБ SSD, снимаемый дисковод и два беспроводных контроллера в подарок от воображения.",
  },
  {
    id: "p_switch_oled",
    title: "Игровая приставка Nintendo Switch OLED (белая)",
    brand: "Nintendo",
    store: "OZON",
    storeUrl: "https://www.ozon.ru/search/?text=nintendo+switch+oled",
    price: 37990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1200&q=80",
    color: "#f6f6f6",
    tags: ["OLED 7\""],
    description:
      "Сочный OLED‑экран, широкая подставка и 64 ГБ памяти. Для поездов и долгих вечеров.",
  },
  {
    id: "p_moleskine",
    title: "Блокнот Moleskine Classic Large, точка",
    brand: "Moleskine",
    store: "Подписные издания",
    storeUrl: "https://podpisnie.ru/search/?q=moleskine",
    price: 2490,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=1200&q=80",
    color: "#222",
    tags: ["240 стр.", "Точка"],
    description:
      "240 страниц цвета слоновой кости, резинка и кармашек сзади — как у всех приличных людей.",
  },
  {
    id: "p_atomic_habits",
    title: "Книга «Атомные привычки» — Джеймс Клир",
    brand: "Эксмо",
    store: "Читай‑город",
    storeUrl:
      "https://www.chitai-gorod.ru/search?phrase=%D0%B0%D1%82%D0%BE%D0%BC%D0%BD%D1%8B%D0%B5+%D0%BF%D1%80%D0%B8%D0%B2%D1%8B%D1%87%D0%BA%D0%B8",
    price: 790,
    originalPrice: 1090,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    color: "#eee3cf",
    tags: ["Твёрдый переплёт"],
    description:
      "Книга, которую подарили в офисе все всем. Небольшие шаги, которые правда работают.",
  },
  {
    id: "p_manson_book",
    title: "Книга «Тонкое искусство пофигизма» — Марк Мэнсон",
    brand: "Альпина Паблишер",
    store: "Читай‑город",
    storeUrl:
      "https://www.chitai-gorod.ru/search?phrase=%D1%82%D0%BE%D0%BD%D0%BA%D0%BE%D0%B5+%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%BE+%D0%BF%D0%BE%D1%84%D0%B8%D0%B3%D0%B8%D0%B7%D0%BC%D0%B0",
    price: 690,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    color: "#ffdd55",
    tags: ["Бестселлер"],
    description:
      "Про то, как выбирать, ради чего стоит волноваться — и честно признаваться себе в том, чего не стоит.",
  },
  {
    id: "p_laric_diffuser",
    title: "Аромадиффузор La Ric «Инжир и молочай»",
    brand: "La Ric",
    store: "OZON",
    storeUrl: "https://www.ozon.ru/search/?text=%D0%B0%D1%80%D0%BE%D0%BC%D0%B0%D0%B4%D0%B8%D1%84%D1%84%D1%83%D0%B7%D0%BE%D1%80+la+ric",
    price: 1990,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1598900438360-1c5b8a0fd0d9?auto=format&fit=crop&w=1200&q=80",
    color: "#ede6da",
    tags: ["120 мл"],
    description:
      "Тёплый инжирный аромат на два месяца фоновой работы. Хорошо встаёт в прихожей и на рабочем столе.",
  },
  {
    id: "p_hoff_table",
    title: "Прикроватный столик Hoff Ergo (дуб)",
    brand: "Hoff",
    store: "Hoff",
    storeUrl: "https://hoff.ru/search/?q=%D0%BF%D1%80%D0%B8%D0%BA%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D0%BD%D1%8B%D0%B9+%D1%81%D1%82%D0%BE%D0%BB%D0%B8%D0%BA",
    price: 8490,
    originalPrice: 10990,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    color: "#b9a389",
    tags: ["Дуб сонома"],
    description:
      "Небольшой столик‑спутник для чашки кофе и книги. Собирается за пятнадцать минут и не мешается.",
  },
  {
    id: "p_lodge_cast_iron",
    title: "Чугунная сковорода Lodge 26 см с ручкой",
    brand: "Lodge",
    store: "OZON",
    storeUrl: "https://www.ozon.ru/search/?text=lodge+%D1%87%D1%83%D0%B3%D1%83%D0%BD%D0%BD%D0%B0%D1%8F+%D1%81%D0%BA%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B4%D0%B0",
    price: 5990,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    color: "#1b1b1b",
    tags: ["Предзаводская прошивка"],
    description:
      "Американская классика: литой чугун, предобработанный маслом. Переживёт вас, ваши блинчики и ремонт кухни.",
  },
  {
    id: "p_opinel_12",
    title: "Нож шеф‑повара Opinel №12 с деревянной ручкой",
    brand: "Opinel",
    store: "OZON",
    storeUrl: "https://www.ozon.ru/search/?text=opinel+12+%D1%88%D0%B5%D1%84",
    price: 3490,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1200&q=80",
    color: "#a06a3b",
    tags: ["Sandvik 12C27"],
    description:
      "Французская сталь Sandvik и тёплая бук‑ручка. Нож, за который берутся, когда нужен один‑единственный.",
  },
  {
    id: "p_aeropress",
    title: "Кофеварка AeroPress Original",
    brand: "AeroPress",
    store: "Tasty Coffee",
    storeUrl: "https://tastycoffee.ru/catalog/dlya_zavarivaniya/aeropress/",
    price: 4990,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    color: "#2e2e2e",
    tags: ["1 чашка, 1 минута"],
    description:
      "Культовый «поршень» для чистой чашки фильтра на офисной кухне, в поезде или на даче.",
  },
  {
    id: "p_bialetti",
    title: "Гейзерная кофеварка Bialetti Moka Express на 6 чашек",
    brand: "Bialetti",
    store: "OZON",
    storeUrl: "https://www.ozon.ru/search/?text=bialetti+moka+express+6",
    price: 3990,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784e6a?auto=format&fit=crop&w=1200&q=80",
    color: "#8a8a8a",
    tags: ["Made in Italy"],
    description:
      "Восьмигранная итальянская классика с 1933 года. Один щелчок пламени — и вся квартира пахнет утром.",
  },
  {
    id: "p_fujifilm_xt30",
    title: "Фотоаппарат Fujifilm X‑T30 II Kit 15–45mm",
    brand: "Fujifilm",
    store: "М.Видео",
    storeUrl: "https://www.mvideo.ru/product-list-page?q=fujifilm+x-t30+ii",
    price: 99990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1606986601547-b0e2f8d14f0f?auto=format&fit=crop&w=1200&q=80",
    color: "#b7b7b7",
    tags: ["26 МП", "X‑Trans"],
    description:
      "Беззеркалка с легендарной плёночной цветопередачей Fuji. Лёгкая, красивая, влезает в рюкзак.",
  },
  {
    id: "p_instax_mini",
    title: "Плёночный фотоаппарат Fujifilm Instax Mini 12",
    brand: "Fujifilm",
    store: "OZON",
    storeUrl: "https://www.ozon.ru/search/?text=instax+mini+12",
    price: 7990,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1200&q=80",
    color: "#a9c7ef",
    tags: ["Авто‑экспозиция"],
    description:
      "Навёл, повернул объектив — и получил крошечную распечатку вечера до того, как он закончился.",
  },
  {
    id: "p_at_turntable",
    title: "Виниловый проигрыватель Audio‑Technica AT‑LP60X",
    brand: "Audio‑Technica",
    store: "Pult.ru",
    storeUrl: "https://www.pult.ru/catalog/vinilovie-proigrivateli/audio-technica-at-lp60x",
    price: 19990,
    category: "music",
    image:
      "https://images.unsplash.com/photo-1542456882-6bebfd3d0a44?auto=format&fit=crop&w=1200&q=80",
    color: "#0e0e0e",
    tags: ["Автомат", "33/45"],
    description:
      "Автоматический вертак с готовым фонокорректором. Достал из коробки, поставил пластинку — играет.",
  },
  {
    id: "p_sberboom",
    title: "Умная колонка SberBoom (с Салютом)",
    brand: "Сбер",
    store: "Мегамаркет",
    storeUrl: "https://megamarket.ru/catalog/details/sberboom/",
    price: 14999,
    originalPrice: 17999,
    category: "music",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80",
    color: "#0b0b0b",
    tags: ["Салют", "90 Вт"],
    description:
      "Большая колонка с мощным басом и тремя виртуальными ассистентами. Дома звучит как небольшой клуб.",
  },
  {
    id: "p_jbl_flip",
    title: "Портативная колонка JBL Flip 6",
    brand: "JBL",
    store: "DNS",
    storeUrl: "https://www.dns-shop.ru/search/?q=jbl+flip+6",
    price: 9990,
    originalPrice: 12999,
    category: "music",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80",
    color: "#101820",
    tags: ["IP67", "12 ч"],
    description:
      "Водонепроницаемая, с честным басом и 12 часами автономки. Катается с вами на пляж и в горы.",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
