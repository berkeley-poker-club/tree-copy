import { Pool } from "pg";

let pool: any;

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set");
  }

  pool ??= new Pool({ connectionString });
  return pool;
}

function sendJson(res: any, status: number, body: unknown) {
  res.status(status).json(body);
}

function requestBody(req: any): Record<string, unknown> {
  if (!req.body) return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  return req.body;
}

function eventPayload(row: any) {
  return {
    id: row.id,
    title: row.title,
    eventDate: row.event_date,
    eventTime: row.event_time,
    location: row.location,
    description: row.description,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function instagramPayload(row: any) {
  return {
    id: row.id,
    shortcode: row.shortcode,
    caption: row.caption,
    displayOrder: row.display_order,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
  const db = database();

  try {
    if (req.method === "GET" && pathname === "/api/healthz") {
      return sendJson(res, 200, { status: "ok" });
    }

    if (req.method === "GET" && pathname === "/api/events") {
      const { rows } = await db.query(
        "SELECT * FROM events ORDER BY event_date ASC",
      );
      return sendJson(res, 200, rows.map(eventPayload));
    }

    if (req.method === "POST" && pathname === "/api/events") {
      const body = requestBody(req);
      const required = ["title", "eventDate", "eventTime", "location"];
      if (required.some((key) => typeof body[key] !== "string" || !body[key])) {
        return sendJson(res, 400, { error: "Invalid event body" });
      }
      const { rows } = await db.query(
        "INSERT INTO events (title, event_date, event_time, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [body.title, body.eventDate, body.eventTime, body.location, body.description ?? null],
      );
      return sendJson(res, 201, eventPayload(rows[0]));
    }

    const eventId = pathname.match(/^\/api\/events\/(\d+)$/)?.[1];
    if (req.method === "DELETE" && eventId) {
      const { rowCount } = await db.query("DELETE FROM events WHERE id = $1", [eventId]);
      return rowCount ? res.status(204).end() : sendJson(res, 404, { error: "Event not found" });
    }

    if (req.method === "GET" && pathname === "/api/instagram-posts") {
      const { rows } = await db.query(
        "SELECT * FROM instagram_posts ORDER BY display_order ASC",
      );
      return sendJson(res, 200, rows.map(instagramPayload));
    }

    if (req.method === "POST" && pathname === "/api/instagram-posts") {
      const body = requestBody(req);
      if (typeof body.shortcode !== "string" || typeof body.displayOrder !== "number") {
        return sendJson(res, 400, { error: "Invalid Instagram post body" });
      }
      const shortcode = body.shortcode.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/)?.[1] ?? body.shortcode;
      const { rows } = await db.query(
        "INSERT INTO instagram_posts (shortcode, caption, display_order) VALUES ($1, $2, $3) RETURNING *",
        [shortcode, typeof body.caption === "string" ? body.caption : null, body.displayOrder],
      );
      return sendJson(res, 201, instagramPayload(rows[0]));
    }

    const instagramId = pathname.match(/^\/api\/instagram-posts\/(\d+)$/)?.[1];
    if (req.method === "DELETE" && instagramId) {
      const { rowCount } = await db.query("DELETE FROM instagram_posts WHERE id = $1", [instagramId]);
      return rowCount ? res.status(204).end() : sendJson(res, 404, { error: "Instagram post not found" });
    }

    return sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Internal server error" });
  }
}
