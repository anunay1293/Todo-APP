import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Create Task</h2>
      <TaskForm />
    </div>
  );
}