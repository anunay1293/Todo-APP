import TaskForm from "@/components/TaskForm";
import type { Task } from "@/components/TaskCard";
import { API_BASE } from "@/lib/api";

async function getTask(id: string): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load task");
  const tasks: Task[] = await res.json();
  const task = tasks.find(t => String(t.id) === id);
  if (!task) throw new Error("Task not found");
  return task;
}

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Edit Task</h2>
      <TaskForm initial={task} />
    </div>
  );
}