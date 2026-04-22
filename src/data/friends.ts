export type Friend = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  color: string;
  wishlist: string[]; // product ids
  lastActive: string; // ISO
};

export const me = {
  id: "me",
  name: "Вы",
  handle: "you",
  avatar: "https://i.pravatar.cc/160?img=68",
  bio: "Собираю маленькие спокойные апгрейды.",
  color: "#ff5d83",
};

export const friends: Friend[] = [
  {
    id: "u_maya",
    name: "Maya Lindgren",
    handle: "maya",
    avatar: "https://i.pravatar.cc/160?img=47",
    bio: "Архитектор. Ведёт список вещей, из‑за которых понедельники становятся лучше.",
    color: "#f6bfcf",
    wishlist: [
      "p_dyson_airwrap",
      "p_laneige_mask",
      "p_rhode_peptide",
      "p_muji_diffuser",
      "p_lego_orchid",
      "p_lululemon_align",
    ],
    lastActive: "2026-04-21T09:14:00.000Z",
  },
  {
    id: "u_kenji",
    name: "Kenji Okafor",
    handle: "kenji",
    avatar: "https://i.pravatar.cc/160?img=15",
    bio: "Продуктовый дизайнер, велосипедист и ужасный гитарист.",
    color: "#c2d6ff",
    wishlist: [
      "p_sony_wh1000xm5",
      "p_airpods_pro_2",
      "p_fujifilm_x100vi",
      "p_marshall_emberton",
      "p_onitsuka_mexico",
      "p_patagonia_nano",
    ],
    lastActive: "2026-04-22T18:02:00.000Z",
  },
  {
    id: "u_sana",
    name: "Sana Delacroix",
    handle: "sana",
    avatar: "https://i.pravatar.cc/160?img=32",
    bio: "Пишет кулинарные книги. Умрёт на холме «Staub против Le Creuset».",
    color: "#ffd0a8",
    wishlist: [
      "p_lodge_cast_iron",
      "p_opinel_12",
      "p_aeropress",
      "p_bialetti",
      "p_kindle_colorsoft",
      "p_the_creative_act",
    ],
    lastActive: "2026-04-22T13:47:00.000Z",
  },
  {
    id: "u_theo",
    name: "Theo Alban",
    handle: "theo",
    avatar: "https://i.pravatar.cc/160?img=12",
    bio: "Бэкпекер. 47 стран — одна пара кроссовок.",
    color: "#b6dac3",
    wishlist: [
      "p_arcteryx_beta",
      "p_hydroflask",
      "p_stanley_quencher",
      "p_patagonia_nano",
      "p_instax",
    ],
    lastActive: "2026-04-20T22:11:00.000Z",
  },
  {
    id: "u_iris",
    name: "Iris Nakamura",
    handle: "iris",
    avatar: "https://i.pravatar.cc/160?img=48",
    bio: "Читает. Собирает идеальные плейлисты. У неё сильное мнение про бумагу.",
    color: "#d4b0ff",
    wishlist: [
      "p_kindle_paperwhite",
      "p_the_creative_act",
      "p_moleskine",
      "p_vinyl_turntable",
      "p_sonos_era_300",
    ],
    lastActive: "2026-04-22T07:31:00.000Z",
  },
  {
    id: "u_diego",
    name: "Diego Marín",
    handle: "diego",
    avatar: "https://i.pravatar.cc/160?img=60",
    bio: "По выходным паяет синты. Фанат сигнальной цепи.",
    color: "#ffe3a8",
    wishlist: [
      "p_sonos_era_300",
      "p_vinyl_turntable",
      "p_marshall_emberton",
      "p_steam_deck",
      "p_nintendo_switch_oled",
    ],
    lastActive: "2026-04-19T16:25:00.000Z",
  },
];

export function getFriend(id: string) {
  return friends.find((f) => f.id === id);
}
