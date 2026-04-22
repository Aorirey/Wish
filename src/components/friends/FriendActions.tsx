"use client";

import { Gift, Share2 } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function FriendActions({ friendName }: { friendName: string }) {
  const firstName = friendName.split(" ")[0];
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
}
