#!/usr/bin/env node
// Запускается на Render при каждом старте контейнера.
// Ответственность:
//   1) дождаться готовности Postgres,
//   2) синхронизировать схему (prisma db push),
//   3) идемпотентно засеять каталог,
//   4) запустить `next start`.
//
// Мы делаем это на старте, а не в buildCommand, чтобы не упасть в тот момент,
// когда БД ещё поднимается первый раз (при первом blueprint deploy).

const { spawn, spawnSync } = require("node:child_process");

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      env: process.env,
      ...opts,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(`${cmd} ${args.join(" ")} exited with code ${code}`)
        );
    });
  });
}

async function runWithRetry(label, fn, attempts = 6, delayMs = 5000) {
  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`\n→ ${label} (attempt ${i}/${attempts})…`);
      await fn();
      return;
    } catch (e) {
      console.error(`✗ ${label} failed: ${e.message}`);
      if (i === attempts) throw e;
      console.log(`  retrying in ${delayMs}ms…`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error(
      "❌ DATABASE_URL is not set. The web service must be linked to a Postgres database (see render.yaml)."
    );
    process.exit(1);
  }

  // Шаги, которые должны пройти до того, как мы примем трафик.
  await runWithRetry("prisma db push", () =>
    run("npx", ["prisma", "db", "push", "--accept-data-loss", "--skip-generate"])
  );
  await runWithRetry("seed", () =>
    run("npx", ["tsx", "prisma/seed.ts"])
  );

  // Стартуем Next на том порту и интерфейсе, на котором Render ожидает трафик.
  const port = process.env.PORT || "3000";
  console.log(`\n🚀 Starting Next.js on 0.0.0.0:${port}`);
  const next = spawn(
    "npx",
    ["next", "start", "-p", port, "-H", "0.0.0.0"],
    { stdio: "inherit", env: process.env }
  );
  // Проксируем сигналы, чтобы Render мог корректно останавливать контейнер.
  ["SIGINT", "SIGTERM"].forEach((sig) => {
    process.on(sig, () => next.kill(sig));
  });
  next.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
