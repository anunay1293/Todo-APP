"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Task } from "./TaskCard";

export default function TaskForm({ initial }: { initial?: Partial<Task> }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [color, setColor] = useState<"RED"|"BLUE"|"GREEN">((initial?.color as any) ?? "RED");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const isEdit = !!initial?.id;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (isEdit) {
        await api(`/tasks/${initial!.id}`, { method: "PUT", body: JSON.stringify({ title, color }) });
      } else {
        await api("/tasks", { method: "POST", body: JSON.stringify({ title, color }) });
      }
      router.push("/");
    } finally { setBusy(false); }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title<span className="text-red-500">*</span></label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="e.g., Buy groceries"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <select
          className="w-full rounded-lg border px-3 py-2"
          value={color}
          onChange={e => setColor(e.target.value as any)}
        >
          <option value="RED">Red</option>
          <option value="BLUE">Blue</option>
          <option value="GREEN">Green</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={busy}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          {isEdit ? "Save Changes" : "Create Task"}
        </button>
        <button type="button" disabled={busy}
          onClick={() => history.back()}
          className="px-4 py-2 rounded-lg border hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
}