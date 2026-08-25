import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, instagramPostsTable } from "@workspace/db";
import {
  CreateInstagramPostBody,
  DeleteInstagramPostParams,
  ListInstagramPostsResponse,
  ListInstagramPostsResponseItem,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/instagram-posts", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(instagramPostsTable)
    .orderBy(asc(instagramPostsTable.displayOrder));
  const mapped = rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  res.json(ListInstagramPostsResponse.parse(mapped));
});

router.post("/instagram-posts", async (req, res): Promise<void> => {
  const parsed = CreateInstagramPostBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid instagram post body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  // Extract shortcode from full URL if user pastes a URL instead of just shortcode
  let { shortcode } = parsed.data;
  const match = shortcode.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  if (match) shortcode = match[1];

  const [post] = await db
    .insert(instagramPostsTable)
    .values({ ...parsed.data, shortcode })
    .returning();

  res.status(201).json(
    ListInstagramPostsResponseItem.parse({ ...post, createdAt: post.createdAt.toISOString() })
  );
});

router.delete("/instagram-posts/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteInstagramPostParams.safeParse({ id: Number(raw) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(instagramPostsTable)
    .where(eq(instagramPostsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
