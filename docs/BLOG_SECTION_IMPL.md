# Plan: Blog/Articles Section

## Overview

Add a blog/articles section to the portfolio that allows publishing articles without redeployment. Content is stored in Neon PostgreSQL via Drizzle ORM. Mermaid diagrams embedded in Markdown are rendered client-side using the `mermaid` npm package via a custom `react-markdown` code renderer (dynamic import, no SSR).

### Goals

- Dynamic article list and detail pages at `/blog` and `/blog/[slug]`
- No redeployment required to publish new articles (data-driven, Neon SQL console or Drizzle Studio)
- Draft support via a `published` boolean flag
- Mermaid diagrams in article body render as SVGs in the browser
- Consistent styling and UX with the existing Projects section
- "Blog" nav link added to desktop and mobile navigation (auto-highlighted on `/blog/*`)

### Success Criteria

- [ ] `articles` table exists in Neon with all required fields
- [ ] `GET /api/articles` returns paginated published articles (default `limit = ARTICLES_PER_PAGE`)
- [ ] `GET /api/articles/[slug]` returns a single published article; 404 for unpublished/missing
- [ ] `/blog` page lists articles with infinite scroll, loading skeleton, empty state, and error/retry
- [ ] `/blog/[slug]` renders full Markdown with Mermaid diagrams rendered as inline SVGs
- [ ] Mermaid code blocks degrade gracefully to a `<pre><code>` fallback on render error
- [ ] "Blog" nav item appears and is active-styled on all `/blog/*` routes (desktop + mobile)
- [ ] All TypeScript types are correct with no `any` casts

### Out of Scope

- Admin/write UI (content managed via Neon SQL console or `npx drizzle-kit studio`)
- Authentication
- Comments system
- RSS feed
- Tag filter pages

---

## Technical Approach

Follow the established pattern: **DB table → Drizzle schema → migration → API route → SWR hook → page → feature components**. The detail page uses a server component to query the DB directly (no SWR), consistent with `src/app/projects/[id]/page.tsx`. A `'use client'` `ArticleDetailContent` component receives the article as a prop and handles Markdown + Mermaid rendering.

**Background color note:** Both the list and detail pages use `bg-light` (`#f5f5f5`) — the same as the projects pages. `@tailwindcss/typography`'s `prose` class (light-mode) is correct; no `prose-invert` needed. Brand color overrides are applied via utility classes.

### New Files

| File                                                        | Purpose                                                         |
| ----------------------------------------------------------- | --------------------------------------------------------------- |
| `src/lib/db/schema.ts`                                      | Extended with `articlesTable`                                   |
| `src/lib/utils/types.ts`                                    | Extended with `Article` type                                    |
| `src/lib/utils/const.ts`                                    | Extended with `ARTICLES_PER_PAGE = 5`                           |
| `src/app/api/articles/route.ts`                             | `GET` paginated published articles                              |
| `src/app/api/articles/[slug]/route.ts`                      | `GET` single published article by slug                          |
| `src/lib/hooks/useArticles.ts`                              | `useSWRInfinite` hook mirroring `useProjects.ts`                |
| `src/lib/components/shared/MermaidDiagram.tsx`              | Client component: Mermaid string → SVG                          |
| `src/lib/components/shared/MarkdownRenderer.tsx`            | Client component: `react-markdown` wrapper with Mermaid support |
| `src/lib/components/pages/blog/ArticlesLoadingSkeleton.tsx` | Skeleton for list loading state                                 |
| `src/lib/components/pages/blog/ArticleCard.tsx`             | Card for the articles list                                      |
| `src/lib/components/pages/blog/index.tsx`                   | `BlogList` client component (infinite scroll)                   |
| `src/lib/components/pages/blog/ArticleDetailContent.tsx`    | Client component: full article view                             |
| `src/app/blog/page.tsx`                                     | Server page: `/blog` list                                       |
| `src/app/blog/[slug]/page.tsx`                              | Server page: `/blog/[slug]` detail                              |

### Modified Files

| File                                                     | Change                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| `src/lib/components/layout/home-page-layout/nav-bar.tsx` | Add "Blog" to `NAV_ITEMS`; update active-link logic to `startsWith` |

---

## Implementation Phases

### Phase 1: Database & API Layer

**Goal:** DB schema, migration, and two REST endpoints.

1. **Extend `src/lib/db/schema.ts`:**
   - Add `text` to the `drizzle-orm/pg-core` import list (existing imports: `boolean, integer, jsonb, pgTable, timestamp, varchar`)
   - Add `articlesTable` with columns:
     - `id`: `integer().primaryKey().generatedAlwaysAsIdentity()`
     - `slug`: `varchar({ length: 255 }).notNull().unique()`
     - `title`: `varchar({ length: 255 }).notNull()`
     - `excerpt`: `varchar({ length: 500 }).notNull()`
     - `body`: `text().notNull()` — unlimited length, stores raw Markdown
     - `tags`: `varchar({ length: 255 }).array()` — same pattern as `technologies` on projects
     - `cover_image_url`: `varchar({ length: 500 })` — optional, stores absolute URL
     - `published`: `boolean().default(false).notNull()`
     - `published_at`: `timestamp("published_at", { precision: 3, mode: "string" })`
     - `createdAt`: `timestamp("createdAt", { precision: 3, mode: "string" }).defaultNow().notNull()`

2. **Add `Article` type to `src/lib/utils/types.ts`:**

   ```ts
   export type Article = {
     id: number;
     slug: string;
     title: string;
     excerpt: string;
     body: string;
     tags: string[] | null;
     cover_image_url: string | null;
     published: boolean;
     published_at: string | null;
     createdAt: string;
   };
   ```

3. **Add `ARTICLES_PER_PAGE = 5` to `src/lib/utils/const.ts`.**

4. **Run migration:**

   ```bash
   npm run db:generate   # creates new drizzle/000X_*.sql file
   npm run db:migrate    # applies migration to Neon
   ```

5. **Create `src/app/api/articles/route.ts`:**
   - Export type `ArticlesResponse = { success: boolean; message?: string; articles: Article[]; hasMore: boolean }`
   - `GET(request: NextRequest)`:
     - Parse `page` (default `"1"`) and `limit` (default `"5"` — must match `ARTICLES_PER_PAGE`) from query params
     - Query: `where(eq(articlesTable.published, true))`, `orderBy(desc(articlesTable.published_at))`
     - Return `{ success: true, articles, hasMore }` or `APIError` on catch

6. **Create `src/app/api/articles/[slug]/route.ts`:**
   - `GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> })`:
     - Query: `where(and(eq(articlesTable.slug, slug), eq(articlesTable.published, true)))`
     - If not found: return `NextResponse.json<APIError>({ data: { success: false, message: "Article not found" }, status: 404, statusText: "Not Found" })`
     - Otherwise return `{ success: true, article }`

---

### Phase 2: SWR Hook

**Goal:** A reusable data-fetching hook for the articles list.

1. **Create `src/lib/hooks/useArticles.ts`** — mirrors `useProjects.ts`:
   - Uses `useSWRInfinite` with `getData<ArticlesResponse>`
   - Key factory: page 0 → `/api/articles`, subsequent pages → `/api/articles?page=${pageIndex + 1}&limit=${limit}`
   - Flattens pages into `articles: Article[]` array (map each response's `.articles`, spread `tags: article.tags ?? []`)
   - Returns: `{ articles, isLoadingInitialData, isLoadingMore, isReachingEnd, isEmpty, setSize, size, error, mutate, isLoading, isValidating }`

---

### Phase 3: Mermaid & Markdown Components

**Goal:** Client-side Mermaid rendering with graceful fallback, wrapped in a reusable Markdown renderer.

1. **Install `mermaid`:**

   ```bash
   npm install mermaid
   ```

2. **Create `src/lib/components/shared/MermaidDiagram.tsx`:**
   - `'use client'` directive
   - Props: `{ code: string }`
   - State: `svg: string | null`, `error: boolean`, `loading: boolean`
   - Two `useEffect` hooks:
     - **First** (empty dependency array — runs once on mount): dynamically import and initialize mermaid:
       ```ts
       useEffect(() => {
         import("mermaid").then((m) => {
           m.default.initialize({ startOnLoad: false, theme: "neutral" });
         });
       }, []);
       ```
     - **Second** (dependency: `[code, id]`): render the diagram:
       ```ts
       useEffect(() => {
         let cancelled = false;
         setLoading(true);
         setError(false);
         import("mermaid").then(async (m) => {
           try {
             const { svg } = await m.default.render(id, code);
             if (!cancelled) {
               setSvg(svg);
               setLoading(false);
             }
           } catch {
             if (!cancelled) {
               setError(true);
               setLoading(false);
             }
           }
         });
         return () => {
           cancelled = true;
         };
       }, [code, id]);
       ```
   - ID generation: use `useId()` and sanitize colons — `const id = 'mermaid-' + useId().replace(/:/g, '')` — colons in React IDs break CSS selector-based lookups inside Mermaid.
   - Render logic:
     - `loading`: show a subtle spinner or `<span className="text-sm text-gray-400">Rendering diagram…</span>`
     - `error`: show `<pre><code>{code}</code></pre>` fallback with a small warning label
     - `svg`: render `<div dangerouslySetInnerHTML={{ __html: svg }} />` — safe because the SVG is generated by the mermaid library from controlled content, not from user-supplied HTML

3. **Create `src/lib/components/shared/MarkdownRenderer.tsx`:**
   - `'use client'` directive
   - Props: `{ content: string }`
   - Renders:
     ```tsx
     <article className="prose max-w-none font-mont prose-headings:text-dark prose-a:text-lightBlue prose-code:text-dark prose-strong:text-dark">
       <ReactMarkdown
         remarkPlugins={[remarkGfm]}
         components={{
           code({ className, children, ...props }) {
             if (className === "language-mermaid") {
               return <MermaidDiagram code={String(children).trim()} />;
             }
             return (
               <code className={className} {...props}>
                 {children}
               </code>
             );
           },
         }}
       >
         {content}
       </ReactMarkdown>
     </article>
     ```

---

### Phase 4: Page Components

**Goal:** All UI components for the `/blog` list and `/blog/[slug]` detail pages.

1. **Create `src/lib/components/pages/blog/ArticlesLoadingSkeleton.tsx`:**
   - Mirrors `ProjectsLoadingSkeleton.tsx`
   - Renders 3 skeleton cards using `<Skeleton>` from `@/components/ui/skeleton`

2. **Create `src/lib/components/pages/blog/ArticleCard.tsx`:**
   - Props: `{ article: Article }`
   - Displays: cover image (fallback to `/images/coming-soon-placeholder.avif`), title, excerpt, formatted `published_at` date, tags as `<Badge>` chips
   - Links to `/blog/[article.slug]` via a "Read More" `<Button>` (same dark style as project cards)
   - Uses `cn()`, `Card`, `CardContent`, `CardHeader` from existing UI primitives

3. **Create `src/lib/components/pages/blog/index.tsx` (`BlogList`):**
   - `'use client'`
   - Uses `useArticles(ARTICLES_PER_PAGE)`
   - Renders states:
     - **Error**: message + "Retry" button calling `mutate()`
     - **Loading initial**: `<ArticlesLoadingSkeleton />`
     - **Empty**: `<p>No articles yet. Check back soon.</p>` (centered, consistent with site typography)
     - **Loaded**: responsive grid of `<ArticleCard>` components
   - "Load More" button when `!isReachingEnd && !isLoadingMore`
   - Loading-more skeleton below existing cards

4. **Create `src/lib/components/pages/blog/ArticleDetailContent.tsx`:**
   - `'use client'`
   - Props: `{ article: Article }`
   - Layout mirrors `ProjectDetailContent.tsx`:
     - Back link → `/blog` (ArrowLeft icon)
     - Title (`h1`)
     - `published_at` formatted date + tags as badges
     - Optional cover image (full-width, rounded, using `next/image` with `unoptimized` for external URLs)
     - `<MarkdownRenderer content={article.body} />`

5. **Create `src/app/blog/page.tsx`:**

   ```tsx
   export const metadata = {
     title: "Blog | Zakaria BAQASSE",
     description: "Zakaria BAQASSE's articles and writings",
   };
   export default function BlogPage() {
     return (
       <>
         <TransitionEffect />
         <main className="min-h-screen bg-light">
           <div className="container mx-auto px-4 py-20 text-center">
             <AnimatedTitle text="Thoughts, Guides & Deep Dives." />
           </div>
           <Suspense fallback={<ArticlesLoadingSkeleton />}>
             <BlogList />
           </Suspense>
         </main>
       </>
     );
   }
   ```

6. **Create `src/app/blog/[slug]/page.tsx`:**
   - Server component
   - `generateMetadata`: query DB for `{ title, excerpt }` by slug; return `{ title: '... | Zakaria BAQASSE', description: excerpt }` or `{}` if not found
   - Default export: query DB with `where(and(eq(articlesTable.slug, slug), eq(articlesTable.published, true)))` — both conditions required to prevent exposing drafts via direct URL
   - Call `notFound()` if result is empty
   - Map DB row to `Article` type (spreading `tags: row.tags ?? []`)
   - Return `<><TransitionEffect /><ArticleDetailContent article={typedArticle} /></>`

---

### Phase 5: Navigation

**Goal:** "Blog" link visible in both desktop nav and mobile nav overlay, with correct active styling.

1. **Modify `src/lib/components/layout/home-page-layout/nav-bar.tsx`:**
   - Add `{ label: "Blog", href: "/blog" }` to `NAV_ITEMS` (mobile nav picks this up automatically from the same array)
   - Update the active-link class logic to use `startsWith` for all non-home routes:
     ```tsx
     const isActive =
       item.href === "/"
         ? pathname === item.href
         : pathname.startsWith(item.href);
     ```
   - Apply `isActive` in the className conditional (both desktop and mobile link renderers)

---

## Testing Strategy

No automated test suite exists. Manual verification checklist:

| Test             | Steps                                    | Expected                                              |
| ---------------- | ---------------------------------------- | ----------------------------------------------------- |
| Empty state      | Open `/blog` with 0 published articles   | "No articles yet." message shown                      |
| List + skeleton  | Open `/blog` with 1–5 published articles | Cards render; no "Load More" button                   |
| Infinite scroll  | Insert 6+ articles                       | "Load More" button appears; clicking loads next batch |
| Article detail   | Click an article card                    | `/blog/[slug]` renders full content                   |
| Mermaid render   | Insert article with ` ```mermaid ` block | SVG diagram renders, not raw text                     |
| Mermaid fallback | Insert invalid Mermaid syntax            | Raw code block displayed with fallback warning        |
| Draft hidden     | Insert article with `published = false`  | Does not appear on `/blog`; direct URL returns 404    |
| Nav active state | Navigate to `/blog` and `/blog/[slug]`   | "Blog" nav item has active border on both routes      |
| Mobile nav       | Toggle mobile menu on `/blog/*`          | "Blog" link highlighted correctly                     |

---

## Risks

| Risk                                                                   | Impact   | Mitigation                                                                                                          |
| ---------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `mermaid` static import crashes SSR                                    | Critical | Dynamic `import('mermaid')` only inside `useEffect`, never at module top-level                                      |
| `useId()` colon characters break Mermaid's CSS selector lookups        | High     | Sanitize: `'mermaid-' + useId().replace(/:/g, '')`                                                                  |
| `mermaid.initialize()` called on every code change (multiple diagrams) | Medium   | Initialize once in a separate `useEffect([])`, render in a second `useEffect([code, id])`                           |
| `published` filter missing from server page DB query                   | High     | Explicitly use `and(eq(slug, ...), eq(published, true))` in `[slug]/page.tsx` — prevents draft leaks via direct URL |
| Article body too large for varchar limits                              | Low      | Use `text` column type (unlimited) instead of `varchar`                                                             |
| `prose` color classes unreadable (if page background changes)          | Low      | Explicit overrides: `prose-headings:text-dark prose-a:text-lightBlue`                                               |
| Mermaid v10+ async `render()` unhandled rejection                      | Medium   | Always `await mermaid.render()` inside a try/catch; set `error` state on failure                                    |

---

## Open Questions

All resolved as explicit assumptions before implementation:

| Question                        | Resolution                                                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Admin UI?                       | Out of scope. Use Neon SQL console or `npx drizzle-kit studio` locally.                                                                 |
| Tags storage?                   | `varchar(255).array()` — same pattern as `technologies` on `projectsTable`. Rendered as decorative `<Badge>` chips; no tag-filter page. |
| Cover image storage?            | Optional `varchar(500)`, stores an absolute URL. `varchar(500)` chosen to accommodate long CDN URLs.                                    |
| Mermaid theme?                  | `'neutral'` — closest match to the `bg-light` palette.                                                                                  |
| `Article` type fields?          | All DB columns included, including `published` (for potential future admin UI), `published_at` (for display), and `createdAt`.          |
| First-page API `limit` default? | Must be `"5"` (matching `ARTICLES_PER_PAGE`) so page-0 SWR call (which omits the `limit` param) returns the correct count.              |

---

## Final Status

_(To be updated after implementation)_
