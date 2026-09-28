import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { db, users } from "@/db";

export const POST = async(req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if(!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 })
    };

  try {
    const result = await db.insert(users).values({ email: session?.user?.email, name: session?.user?.name })
    .onConflictDoNothing({ target: users?.email })
    .returning();

    if(result.length === 0) return NextResponse.json({ message : "User Already Exist" }, { status: 409 })

    return NextResponse.json({ message : "User Saved Successfully"}, { status: 201});
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error"}, { status: 500 })
  }
}