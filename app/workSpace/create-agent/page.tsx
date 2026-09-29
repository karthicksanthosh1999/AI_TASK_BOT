"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, Dices, Loader2, Sparkles } from "lucide-react";
import axios from "axios";

export default function CreateAgentPage() {
  const router = useRouter();
  const [avatarIndex, setAvatarIndex] = useState<string>(crypto.randomUUID());
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", description: "", agentImage: "" });

  function shuffleAvatar() {
    const seed = crypto.randomUUID()
      setAvatarIndex(seed)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const agentImage = `https://api.dicebear.com/10.x/bottts/svg?seed=${avatarIndex}`;
    const newAgentId = crypto.randomUUID();
    setIsLoading(true)
      try {
          const response = await axios.post("/api/agent", {
          name: data.name,
          description: data.description,
          agentImage,
          agentId:newAgentId
        });
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    console.log("data:", data);
  }

  return (
    <div className="flex min-h-screen items-center bg-slate-50 px-4 py-5 sm:px-8 sm:py-6">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-5 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Welcome Back Chief !</h1>
          <p className="mx-auto mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
            Set up your AI agent by choosing an avatar, name, and description. You can configure its tools and behavior later.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <section aria-labelledby="avatar-heading" className="mb-5 text-center">
            <h2 id="avatar-heading" className="mb-2 text-sm font-medium text-slate-700">Agent Image</h2>
            <div className={`mx-auto flex size-20 items-center justify-center rounded-3xl shadow-lg shadow-indigo-950/10 ring-4 ring-white`}>
             <img src={`https://api.dicebear.com/10.x/bottts/svg?seed=${avatarIndex}`} alt="icons" className="h-32 w-32" />
            </div>
            <button
              type="button"
              onClick={shuffleAvatar}
              className="mx-auto mt-3 inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <Dices size={16} strokeWidth={1.8} />
              Shuffle Image
            </button>
          </section>

          <div className="space-y-4">
            <div>
              <label htmlFor="agent-name" className="mb-1.5 block text-sm font-medium text-slate-700">Agent Name</label>
              <input
                id="agent-name"
                name="name"
                type="text"
                required
                value={data.name}
                onChange={handleChange}
                placeholder="e.g. Research Assistant"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="agent-description" className="text-sm font-medium text-slate-700">Agent Description</label>
                <span className="text-xs text-slate-400">Optional</span>
              </div>
              <textarea
                id="agent-description"
                name="description"
                rows={3}
                placeholder="Describe what this agent will help you with..."
                value={data.description}
                onChange={handleChange}
                className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/workSpace")}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {
                isLoading ? <Loader2 size={16} className="animate-spin" /> : 
              <Sparkles size={16} strokeWidth={1.9} />
              }
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

