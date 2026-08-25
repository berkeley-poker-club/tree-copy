import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, eventsTable } from "@workspace/db";
import {
  CreateEventBody,
  DeleteEventParams,
  ListEventsResponse,
  ListEventsResponseItem,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/events", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(eventsTable)
    .orderBy(asc(eventsTable.eventDate));
  const mapped = rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  res.json(ListEventsResponse.parse(mapped));
});

router.post("/events", async (req, res): Promise<void> => {
  const parsed = CreateEventBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid event body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [event] = await db.insert(eventsTable).values(parsed.data).returning();
  res.status(201).json(ListEventsResponseItem.parse({ ...event, createdAt: event.createdAt.toISOString() }));
});

router.delete("/events/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteEventParams.safeParse({ id: Number(raw) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(eventsTable)
    .where(eq(eventsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
