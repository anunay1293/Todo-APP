"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export type Task = {
  id: number;
  title: string;
  color: "RED" | "BLUE" | "GREEN";
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TaskCard({ task }: { task: Task }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const toggleCompleted = async () => {
    setBusy(true);
    try {
      await api(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !task.completed }),
      });
      router.refresh(); // tell the server component to re-render
    } finally {
      setBusy(false);
    }
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    setBusy(true);
    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  
      const res = await fetch(`${base}/tasks/${task.id}`, { method: "DELETE" });
  
      // Expect 204 No Content on success
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        alert(`Delete failed (${res.status}): ${text || "Unknown error"}`);
        return;
      }
  
      router.refresh(); // re-fetch list after successful delete
    } catch (e: any) {
      alert(`Delete error: ${e?.message || e}`);
    } finally {
      setBusy(false);
    }
  };

  const colorMap: Record<Task["color"], string> = {
    RED: "bg-red-100 text-red-800 border-red-300",
    BLUE: "bg-blue-100 text-blue-800 border-blue-300",
    GREEN: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <div className="rounded-xl border p-4 bg-white flex items-center gap-3 hover:shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompleted}
        disabled={busy}
        className="h-5 w-5 accent-blue-600"
        title="Mark complete/incomplete"
      />
      <a href={`/tasks/${task.id}`} className="flex-1">
        <div className="font-medium">{task.title}</div>
        <div className="text-xs text-gray-500">
          Updated {new Date(task.updatedAt).toLocaleString()}
        </div>
      </a>
      <span className={"text-xs px-2 py-1 rounded-full border " + colorMap[task.color]}>
        {task.color}
      </span>
      <button
  type="button"
  onClick={deleteTask}
  disabled={busy}
  className="px-2 py-1 text-sm rounded-lg border hover:bg-gray-50"
>
  Delete
</button>
    </div>
  );
}
