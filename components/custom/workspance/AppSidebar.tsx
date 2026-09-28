"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Bot, Compass, Orbit, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const agents = [
  { name: "Research Assistant", color: "bg-violet-100 text-violet-700" },
  { name: "Writing Partner", color: "bg-amber-100 text-amber-700" },
  { name: "Code Reviewer", color: "bg-emerald-100 text-emerald-700" },
];

export default function AppSidebar() {
  const {push} = useRouter();
  const { data: session } = useSession();

  const [activeAgent, setActiveAgent] = useState(agents[0].name);
  const userName = session?.user?.name || "Your account";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 text-slate-900">
      <a href="/workSpace" className="mb-8 flex items-center gap-3 rounded-lg px-2 py-1.5" aria-label="Orbit home">
        <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <Orbit size={21} strokeWidth={2.2} />
        </span>
        <span className="text-lg font-semibold tracking-tight">JK-Bot</span>
      </a>

      <button
        type="button"
        onClick={()=>push("/workSpace/create-agent")}
        className="cursorpo mb-8 flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <Plus size={17} strokeWidth={2.2} />
        Create New Agent
      </button>

      <div className="mb-3 flex items-center justify-between px-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Agents</h2>
        <span className="text-xs font-medium text-slate-400">{agents.length}</span>
      </div>

      <nav aria-label="Your agents" className="space-y-1">
        {agents.map((agent) => {
          const isActive = activeAgent === agent.name;

          return (
            <button
              type="button"
              key={agent.name}
              onClick={() => setActiveAgent(agent.name)}
              aria-pressed={isActive}
              className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${agent.color}`}>
                <Bot size={19} strokeWidth={1.8} />
              </span>
              <span className="truncate text-sm font-medium">{agent.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200 pt-4">
        <a
          href="/marketplace"
          className="mb-3 flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Compass size={19} strokeWidth={1.8} />
          Marketplace
        </a>

        <div className="flex items-center gap-3 rounded-lg px-2.5 py-2.5">
          {session?.user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session?.user?.image}
              alt=""
              className="size-9 rounded-full object-cover ring-1 ring-slate-200"
            />
          ) : (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
              {userInitial}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">{userName}</span>
        </div>
      </div>
    </aside>
  );
}
