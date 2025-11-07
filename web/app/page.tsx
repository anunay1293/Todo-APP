import TaskCard, { type Task } from "@/components/TaskCard";
import { API_BASE } from "@/lib/api";

async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export default async function HomePage() {
  const tasks = await getTasks();
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Tasks: {total} &nbsp;·&nbsp; Completed: {completed} of {total}
        </div>
        <a
          href="/tasks/new"
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Task
        </a>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-sm text-gray-500 border rounded-xl p-6 bg-white">
            No tasks yet. Click{" "}
            <a className="text-blue-600 underline" href="/tasks/new">
              Create Task
            </a>{" "}
            to add one.
          </div>
        )}
      </div>
    </div>
  );
}
