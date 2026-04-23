import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toaster } from "@/components/ui/Toaster";
import { AppBootstrap } from "@/components/AppBootstrap";
import { listFriends, getMe } from "@/server/services/users.service";
import { getMyWishlist } from "@/server/services/wishlist.service";

// Внутри оболочки приложения всегда нужен доступ к БД (получаем `me`, вишлист,
// список друзей). Пререндер на билде без DATABASE_URL не имеет смысла —
// просим Next рендерить на запросе.
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [me, wishlist, friends] = await Promise.all([
    getMe(),
    getMyWishlist(),
    listFriends(),
  ]);

  return (
    <div className="flex min-h-dvh">
      <Sidebar friends={friends.slice(0, 5)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar me={me} />
        <main className="flex-1 pb-24 md:pb-12">{children}</main>
      </div>
      <MobileNav />
      <Toaster />
      <AppBootstrap me={me} wishlist={wishlist} />
    </div>
  );
}
