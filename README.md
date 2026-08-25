# Poker at Berkeley

Vite single-page app with an Express API and PostgreSQL database, deployed as a Vercel project.

## Local development

```sh
pnpm install
pnpm --filter @workspace/poker-at-berkeley run dev
```

The frontend runs at `http://localhost:5173`. To use API-backed pages locally, run `vercel dev` after linking the project with `vercel link`; it serves both the Vite app and the serverless API routes.

## Deploy to Vercel

1. Import this repository into Vercel with the repository root as the project root.
2. Set `DATABASE_URL` for Preview and Production. Use a PostgreSQL connection string from your preferred hosted provider.
3. Deploy. `vercel.json` installs workspace dependencies, builds the Vite app, serves SPA routes, and maps `/api/*` to the Express application.

The API is a Vercel Serverless Function, so it must not use `app.listen()`. The local-only Express entrypoint remains in `artifacts/api-server/src/index.ts`; Vercel uses `api/[...path].ts` instead.

## Useful commands

```sh
pnpm run typecheck
pnpm run build
pnpm --filter @workspace/db run push
```
