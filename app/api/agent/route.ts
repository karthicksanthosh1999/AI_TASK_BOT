import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AgentConfig, db } from "@/db";

export const POST = async(req: NextRequest, res: NextResponse) => {
    const { agentId, name, description, agentImage } = await req.json();

    const session = await getServerSession(authOptions);

    if(!session?.user?.email) return NextResponse.json({ message : "Unauthorized"}, { status: 401 });

    const newAgentConfig = await db.insert(AgentConfig).values({
        id: agentId,
        userEmail: session.user.email,
        agentImage,
        description,
        name
    }).returning();

    return NextResponse.json({ message: "Agent Creatd Successfully", data: newAgentConfig}, { status: 201 })
}