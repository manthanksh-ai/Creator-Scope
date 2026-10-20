# CreatorScope

Creator discovery and campaign planning for Indian brand partnerships teams.

## Features

- Campaign brief interpretation through a server-side OpenAI endpoint, with a local rules parser when no AI backend is configured.
- Manual filters for city, language, genre, followers, gender, budget, reel views and verified content mandates.
- Searchable Instagram usernames and YouTube IDs with creator cards and source evidence.
- Server-based browsing:24 profiles per page; campaign matching returns up to300 candidates.
- Weighted match scores, editable plan rates, planning KPIs and selected-plan XLSX/CSV/PDF exports.
- Browser-local saved plans and manually entered or screenshot-extracted audience Insights.
- No full-database export endpoint; the former `/database.json` path returns410.

## Private data and credentials

This repository contains application source, not the production creator database. Creator records, agency quotes, original roster extracts, Excel/PDF inputs, research records and audits are intentionally excluded. Publishing them here would make them downloadable independently of the website.

`src/database.example.json` is an empty schema template with no invented creator rows. Keep your authorized production data in the ignored `src/database.json` file. The running public website is unaffected by this source export.

API keys belong only in ignored local env files and hosted runtime secrets. Do not commit credentials or put them in browser JavaScript. `.env.example` contains names only.

## Local setup

Requires Node.js 22.x and npm.

1. `npm ci`
2. Copy `src/database.example.json` to `src/database.json`, or restore your authorized private database at that path.
3. Copy `.env.example` to `.env.local` and configure server credentials privately if using AI. No API key is required for manual filtering and the local parser.
4. `node build-site.mjs`
5. `npm run dev`

Build with `npm run build`. The GitHub copy uses native Next.js for Vercel. Browser assets are prepared by `build-site.mjs`; database JSON is imported only into server routes. The build uses the empty template when no private database is supplied.

## Layout

| Path | Purpose |
|---|---|
| `src/page.html`, `src/app.js`, `src/styles.css` | Browser interface |
| `src/core.mjs` | Query parsing, scoring and KPI calculations |
| `server/catalog.mjs` | Metadata, paginated browsing, profile lookup and matching |
| `server/ai-endpoint.mjs` | Server-only AI brief interpretation |
| `app/api/` | Hosted API routes |
| `src/database.example.json` | Empty database structure |
| `*-rosters.mjs`, `extract-pdf-rosters.py`, `merge-current-imports.mjs` | Import utilities requiring private source inputs |

## Hosting

The existing production site is https://creator-scope.citrusgnat32.chatgpt.site/ . Hosting remains managed by Sites; pushing to this GitHub repository does not automatically deploy it. Keep the existing `sites()` Vite integration when using that hosting workflow. `.openai/hosting.json` contains a project identifier, not a credential.

## Data quality

Missing facts stay Unknown. Source dates are not live metric dates. City, management status, rates and audience claims require appropriate evidence. Historical LVC quotes need reconfirmation; agency-listed profiles are not proof of exclusive representation. See `DATABASE_ACCESS.md`, `PUBLIC_RESEARCH.md` and `AI_SETUP.md` for details.

The public site exposes individual search results; visible profile information can still be copied. Removing a bulk export is not a guarantee against scraping.

## Vercel deployment

- Framework: Next.js; root: `./`; install: `npm ci`; build: `npm run build`; output: default.
- Node.js: 22.x.
- AI variables: `OPENAI_API_KEY` and `AI_MODEL` (server only).
- Optional `CREATOR_DATABASE_URL`: HTTPS endpoint serving the authorized private JSON database. Optional `CREATOR_DATABASE_TOKEN`: Bearer credential for that endpoint. Set these as sensitive deployment variables, never NEXT_PUBLIC variables.
- Database downloads happen at build time. Redeploy after changing data or database settings. Failed configured downloads fail the build rather than silently clearing the catalog.
- Without a private source, deployment works with zero creator records. The public repository intentionally contains no production roster.
- The original Sites deployment is a separate Cloudflare build and is unaffected by these GitHub changes.
