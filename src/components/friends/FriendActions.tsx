"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Gift, Loader2, Share2, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function FriendActions({
  friendId,
  friendName,
}: {
  friendId: string;
  friendName: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const firstName = friendName.split(" ")[0];

  const onDelete = async () => {
    if (!confirm(`Удалить ${friendName} из друзей?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/friends/${friendId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Fail");
      toast({ title: "Друг удалён", description: friendName });
      router.push("/app/friends");
      router.refresh();
    } catch {
      toast({ title: "Не получилось удалить" });
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() =>
          toast({
            title: "Напоминание установлено",
            description: `Мы напомним перед днём рождения: ${firstName}.`,
            tone: "success",
          })
        }
        className="btn-outline"
      >
        <Gift className="h-4 w-4" /> Напомнить мне
      </button>
      <button
        onClick={() =>
          toast({
            title: "Приглашение отправлено",
            description: `${friendName} получил(а) мягкий пинг.`,
          })
        }
        className="btn-primary"
      >
        <Share2 className="h-4 w-4" /> Пинг
      </button>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="btn-ghost text-accent-600 hover:!bg-accent-50"
        aria-label="Удалить друга"
      >
        {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
