# Copilot Instructions

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run dev:host     # Start dev server accessible on LAN
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals)
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Apply Drizzle migrations
```

No test suite exists in this project.

## Architecture

Next.js 15 App Router portfolio site backed by a Neon (serverless PostgreSQL) database via Drizzle ORM.

**Data flow:**
- Dynamic data (projects, experiences) lives in the DB — two tables defined in `src/lib/db/schema.ts`
- Static data (education history, skills list, social links) lives in `src/lib/utils/const.ts`
- API routes at `src/app/api/projects/route.ts` and `src/app/api/experiences/route.ts` serve paginated data
- Client components fetch via SWR hooks (`src/lib/hooks/useProjects.ts`, `useExperiences.ts`) using `useSWRInfinite` for infinite scroll
- Pages (`src/app/`) delegate rendering to feature components in `src/lib/components/pages/`

**Component split:**
- `src/components/ui/` — shadcn/ui primitives (Button, Dialog, etc.)
- `src/lib/components/shared/` — reusable portfolio components (AnimatedTitle, CareerCard, TransitionEffect, etc.)
- `src/lib/components/pages/` — page-level feature components (`about/`, `projects/`)
- `src/lib/components/layout/` — `HomePageLayout` wraps all pages via `app/layout.tsx`

## Key Conventions

**Path alias:** `@/` maps to `src/` (configured in `tsconfig.json`).

**Styling:**
- Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging
- Custom Tailwind colors: `dark` (#1C2345), `light` (#f5f5f5), `lightBlue` (#3A58C8), `primaryDark` (#58E6D9)
- Custom font class: `font-mont` (Montserrat, loaded via `--font-mont` CSS variable in root layout)
- Background pattern utility: `bg-circular`

**Types:** Shared types live in `src/lib/utils/types.ts`. DB inferred types come from Drizzle's `$inferSelect` / `$inferInsert` on table schemas.

**API error shape:** `APIError` type (from `src/lib/hooks/hooksUtils.ts`) — `{ data: { success, message }, status, statusText }`. All API routes return `NextResponse.json` typed with either the response type or `APIError`.

**Pagination constants:** `PROJECTS_PER_PAGE = 3`, `EXPERIENCES_PER_PAGE = 4` — defined in `src/lib/utils/const.ts` and passed to SWR hooks.

**DB seeding:** Seed functions (`main`, `main2`) are in `src/lib/db/index.ts`, commented out by default. Uncomment the call and run with `npx tsx src/lib/db/index.ts` to reseed.

**Environment variables required:** `DATABASE_URL` (Neon connection string), `APP_URL` (used in OG metadata). See `.env.example`.
