import "./../styles/globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white">
            <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Todo List</h1>
              <a href="/tasks/new" className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create Task</a>
            </div>
          </header>
          <main className="flex-1">
            <div className="max-w-3xl mx-auto px-4 py-6">{children}</div>
          </main>
          <footer className="mt-auto border-t bg-white">
            <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-gray-500">
              Built with Next.js, Tailwind, Express, Prisma & MySQL.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}