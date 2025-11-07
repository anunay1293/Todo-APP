import { Router } from "express";
import { PrismaClient, Color } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: z.enum(["RED","BLUE","GREEN"]).optional().default("RED"),
  completed: z.boolean().optional().default(false)
});

const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  color: z.enum(["RED","BLUE","GREEN"]).optional(),
  completed: z.boolean().optional()
});

// GET /tasks
router.get("/", async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const parsed = CreateTaskSchema.parse(req.body);
    const task = await prisma.task.create({
      data: {
        title: parsed.title,
        color: parsed.color as Color,
        completed: parsed.completed
      }
    });
    res.status(201).json(task);
  } catch (e: any) {
    if (e?.issues) return res.status(400).json({ error: e.issues[0].message });
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const parsed = UpdateTaskSchema.parse(req.body);
    const task = await prisma.task.update({
      where: { id },
      data: parsed
    });
    res.json(task);
  } catch (e: any) {
    if (e?.issues) return res.status(400).json({ error: e.issues[0].message });
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (_e) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;