"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gift, Heart, Link2, Sparkles, Users } from "lucide-react";
import { useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { products } from "@/data/products";
import { friends } from "@/data/friends";
import { Avatar } from "@/components/ui/Avatar";
import { formatPrice } from "@/lib/utils";

const floats = [
  { id: "p_airpods_pro_2", x: "8%", y: "12%", size: 120, delay: 0 },
  { id: "p_laneige_mask", x: "70%", y: "6%", size: 100, delay: 0.2 },
  { id: "p_sony_wh1000xm5", x: "82%", y: "42%", size: 150, delay: 0.4 },
  { id: "p_lego_orchid", x: "4%", y: "48%", size: 140, delay: 0.1 },
  { id: "p_nb_574", x: "16%", y: "72%", size: 115, delay: 0.25 },
  { id: "p_jbl_flip", x: "76%", y: "74%", size: 120, delay: 0.3 },
];

function HeroFloats() {
  const prods = floats
    .map((f) => ({ ...f, product: products.find((p) => p.id === f.id)! }))
    .filter((x) => x.product);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
    >
      {prods.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -6 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + f.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ left: f.x, top: f.y }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_20px_60px_-20px_rgba(16,24,40,.25)]"
            style={{
              width: f.size,
              height: f.size,
              transform: `rotate(${i % 2 === 0 ? -6 : 6}deg)`,
            }}
          >
            <Image
              src={f.product.image}
              alt=""
              width={f.size * 2}
              height={f.size * 2}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-10 sm:pt-16">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_60%_at_50%_0%,#ffe3ea_0%,transparent_60%)]"
      />
      <div className="noise -z-10" />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="chip mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Новое — совместные списки для тех, кого любите
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-display text-[44px] font-medium leading-[1.02] tracking-tight text-ink-950 sm:text-6xl md:text-7xl"
        >
          Списки, которыми
          <span className="relative inline-block px-2">
            <span className="relative z-10 italic text-accent-600">делятся.</span>
            <svg
              aria-hidden
              viewBox="0 0 220 24"
              className="absolute -bottom-2 left-0 w-full text-accent-300"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1.1, ease: "easeInOut" }}
                d="M4 16 C 60 4, 160 4, 216 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <br className="hidden sm:block" />
          Подарки без головной боли.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 max-w-xl text-pretty text-base text-ink-500 sm:text-lg"
        >
          Wishly — уютное место, где можно собрать всё, что вам нравится, и заглянуть в мечты своих близких. Товары из реальных российских магазинов с настоящими ценами.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/app" className="btn-accent">
            Начать свой список <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/app/friends" className="btn-ghost">
            Посмотреть списки друзей
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center gap-3 text-sm text-ink-500"
        >
          <div className="flex -space-x-2">
            {friends.slice(0, 4).map((f) => (
              <Avatar key={f.id} src={f.avatar} name={f.name} size={28} ring="#fff" />
            ))}
          </div>
          <span>
            <span className="font-medium text-ink-900">12 480</span> новых списков в этом месяце
          </span>
        </motion.div>
      </div>

      <HeroFloats />
    </section>
  );
}

function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const items = [
    {
      icon: Heart,
      title: "Сохраняйте что угодно",
      body:
        "Бросьте ссылку из Яндекс Маркета, Золотого Яблока, OZON или DNS — мы подтянем цену, фото и всё сложим аккуратно.",
    },
    {
      icon: Users,
      title: "Следите за своими людьми",
      body:
        "Вы видите, что сохраняют друзья — до их дней рождения. Никакой неловкости в семейном чате.",
    },
    {
      icon: Link2,
      title: "Одна опрятная ссылка",
      body:
        "Ваш список живёт по ссылке, которая выглядит так, будто над ней сидел дизайнер. Без рекламы. Навсегда.",
    },
    {
      icon: Gift,
      title: "Бронь вместо сюрпризов",
      body:
        "Друзья могут тихо забронировать подарок, чтобы двое не пришли с одинаковым свитером.",
    },
  ];

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div style={{ y }} className="mb-16 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Что внутри
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
          Вишлисты, похожие на <span className="italic text-accent-600">любовное письмо</span>, а не на табличку.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="card flex h-full flex-col gap-4 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 text-white">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-medium text-ink-950">
                {it.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">{it.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Showcase() {
  const picks = [
    "p_sony_wh1000xm5",
    "p_stanley_quencher",
    "p_dyson_airwrap",
    "p_lego_orchid",
    "p_nb_574",
    "p_fujifilm_xt30",
    "p_at_turntable",
    "p_letique_lip",
  ]
    .map((id) => products.find((p) => p.id === id)!)
    .filter(Boolean);

  return (
    <section className="relative border-y border-ink-200/70 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
              Сейчас в тренде
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink-950 sm:text-4xl">
              Что сохраняет сообщество
            </h2>
          </div>
          <Link
            href="/app/discover"
            className="hidden items-center gap-1 text-sm font-medium text-ink-700 hover:text-ink-950 sm:inline-flex"
          >
            Смотреть всё <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {picks.map((p, i) => (
            <motion.a
              key={p.id}
              href={`/app/product/${p.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100"
              style={{ backgroundColor: p.color }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="text-[11px] opacity-80">{p.brand}</p>
                <p className="mt-0.5 line-clamp-1 text-sm font-medium">{p.title}</p>
                <p className="mt-1 text-sm font-semibold">{formatPrice(p.price)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800 p-10 text-white sm:p-16">
        <div className="noise opacity-30" />
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent-500/40 blur-3xl"
        />
        <div className="relative max-w-xl">
          <Sparkles className="h-6 w-6 text-accent-300" />
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Ваши близкие уже знают, чего хотят.
          </h2>
          <p className="mt-4 text-ink-200">
            Нужно лишь красивое место, где это хранить. Бесплатно, навсегда, без алгоритмов, которые пытаются продать вам чувства.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/app" className="btn bg-white text-ink-950 hover:bg-accent-500 hover:text-white">
              Начать свой список <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-ink-300">Регистрация не требуется — можно просто попробовать.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-200/70 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-12 sm:flex-row sm:items-center">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-ink-500">
            Сделано с любовью в однокомнатной студии. © {new Date().getFullYear()} Wishly.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-500">
          <Link href="/app" className="hover:text-ink-950">
            Приложение
          </Link>
          <Link href="/app/discover" className="hover:text-ink-950">
            Каталог
          </Link>
          <Link href="/app/friends" className="hover:text-ink-950">
            Друзья
          </Link>
          <a href="mailto:hi@wishly.app" className="hover:text-ink-950">
            Контакты
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-ink-600 md:flex">
            <Link href="/app/discover" className="hover:text-ink-950">
              Каталог
            </Link>
            <Link href="/app/friends" className="hover:text-ink-950">
              Друзья
            </Link>
            <Link href="#features" className="hover:text-ink-950">
              Как это работает
            </Link>
          </nav>
          <Link href="/app" className="btn-primary !py-2 text-xs">
            Открыть приложение <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>
      <Hero />
      <div id="features">
        <Features />
      </div>
      <Showcase />
      <CTA />
      <Footer />
    </div>
  );
}
