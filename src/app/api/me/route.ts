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
  });
  return NextResponse.json(me);
}
