export type Friend = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  color: string;
  wishlist: string[]; // id товаров
  lastActive: string; // ISO
};

export const me = {
  id: "me",
  name: "Вы",
  handle: "you",
  avatar: "https://i.pravatar.cc/160?img=68",
  bio: "Собираю маленькие приятные мелочи.",
  color: "#ff5d83",
};

export const friends: Friend[] = [
  {
    id: "u_maya",
    name: "Майя Линдгрен",
    handle: "maya",
    avatar: "https://i.pravatar.cc/160?img=47",
    bio: "Архитектор. Ведёт список вещей, от которых понедельник становится легче.",
    color: "#f6bfcf",
    wishlist: [
      "p_dyson_airwrap",
      "p_laneige_mask",
      "p_letique_lip",
      "p_laric_diffuser",
      "p_lego_orchid",
      "p_demix_leggings",
    ],
    lastActive: "2026-04-21T09:14:00.000Z",
  },
  {
    id: "u_kenji",
    name: "Кирилл Окафор",
    handle: "kirill",
    avatar: "https://i.pravatar.cc/160?img=15",
    bio: "Продуктовый дизайнер, велосипедист, посредственный гитарист.",
    color: "#c2d6ff",
    wishlist: [
      "p_sony_wh1000xm5",
      "p_airpods_pro_2",
      "p_fujifilm_xt30",
      "p_jbl_flip",
      "p_nb_574",
      "p_columbia_powder",
    ],
    lastActive: "2026-04-22T18:02:00.000Z",
  },
  {
    id: "u_sana",
    name: "Саша Делакруа",
    handle: "sasha",
    avatar: "https://i.pravatar.cc/160?img=32",
    bio: "Пишет книги о еде. Готова умереть на холме «Staub против Le Creuset».",
    color: "#ffd0a8",
    wishlist: [
      "p_lodge_cast_iron",
      "p_opinel_12",
      "p_aeropress",
      "p_bialetti",
      "p_atomic_habits",
    ],
    lastActive: "2026-04-22T13:47:00.000Z",
  },
  {
    id: "u_theo",
    name: "Тимофей Альбан",
    handle: "tim",
    avatar: "https://i.pravatar.cc/160?img=12",
    bio: "Рюкзак, поезд, палатка. 47 стран и одни кроссовки.",
    color: "#b6dac3",
    wishlist: [
      "p_columbia_powder",
      "p_outventure_down",
      "p_contigo_bottle",
      "p_stanley_quencher",
      "p_instax_mini",
    ],
    lastActive: "2026-04-20T22:11:00.000Z",
  },
  {
    id: "u_iris",
    name: "Ирина Наумова",
    handle: "irina",
    avatar: "https://i.pravatar.cc/160?img=48",
    bio: "Читает запоем. Составляет идеальные плейлисты. Щепетильна насчёт бумаги.",
    color: "#d4b0ff",
    wishlist: [
      "p_onyx_palma",
      "p_atomic_habits",
      "p_manson_book",
      "p_moleskine",
      "p_at_turntable",
      "p_sberboom",
    ],
    lastActive: "2026-04-22T07:31:00.000Z",
  },
  {
    id: "u_diego",
    name: "Данила Марин",
    handle: "danila",
    avatar: "https://i.pravatar.cc/160?img=60",
    bio: "По выходным паяет синтезаторы. Знает, что такое Signal Chain.",
    color: "#ffe3a8",
    wishlist: [
      "p_sberboom",
      "p_at_turntable",
      "p_jbl_flip",
      "p_ps5_slim",
      "p_switch_oled",
      "p_station_mini_2",
    ],
    lastActive: "2026-04-19T16:25:00.000Z",
  },
];

export function getFriend(id: string) {
  return friends.find((f) => f.id === id);
}
