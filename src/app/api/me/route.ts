import { NextRequest, NextResponse } from "next/server";
import { getMe, updateMe } from "@/server/services/users.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const me = await getMe();
  return NextResponse.json(me);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const me = await updateMe({
    name: typeof body.name === "string" ? body.name : undefined,
    handle: typeof body.handle === "string" ? body.handle : undefined,
    bio: typeof body.bio === "string" ? body.bio : undefined,
    color: typeof body.color === "string" ? body.color : undefined,
    // avatar: строка (URL / data URL) или null — чтобы удалить.
    avatar:
      body.avatar === null
        ? null
        : typeof body.avatar === "string"
        ? body.avatar
        : undefined,
    // birthday: ISO-дата ("1995-04-20") или null чтобы очистить.
    birthday:
      body.birthday === null
        ? null
        : typeof body.birthday === "string" && body.birthday.length > 0
        ? body.birthday
        : undefined,
  });
  return NextResponse.json(me);
}
