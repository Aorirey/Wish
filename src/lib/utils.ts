import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Принимает ЦЕЛОЕ число рублей. Форматирует в российском стиле: "34 990 ₽".
export function formatPrice(rub: number, currency: string = "RUB") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(rub);
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function pluralRu(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

export function timeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "только что";
  if (m < 60) return `${m} ${pluralRu(m, ["минуту", "минуты", "минут"])} назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ${pluralRu(h, ["час", "часа", "часов"])} назад`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} ${pluralRu(d, ["день", "дня", "дней"])} назад`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w} ${pluralRu(w, ["неделю", "недели", "недель"])} назад`;
  const mo = Math.floor(d / 30);
  return `${mo} ${pluralRu(mo, ["месяц", "месяца", "месяцев"])} назад`;
}

export function pluralizeItems(n: number) {
  return `${n} ${pluralRu(n, ["товар", "товара", "товаров"])}`;
}

export function pluralizeFriends(n: number) {
  return `${n} ${pluralRu(n, ["друг", "друга", "друзей"])}`;
}
