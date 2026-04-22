import { NextRequest, NextResponse } from "next/server";
import { createFriend, listFriends } from "@/server/services/users.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await listFriends();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    return NextResponse.json({ error: "Имя обязательно" }, { status: 400 });
  }
  try {
    const friend = await createFriend({
      name: body.name,
      handle: typeof body.handle === "string" ? body.handle : undefined,
      bio: typeof body.bio === "string" ? body.bio : undefined,
      color: typeof body.color === "string" ? body.color : undefined,
      avatar: typeof body.avatar === "string" ? body.avatar : null,
      birthday:
        typeof body.birthday === "string" && body.birthday.length > 0
          ? body.birthday
          : null,
    });
    return NextResponse.json(friend, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 400 }
    );
  }
}
