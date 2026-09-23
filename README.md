# dxb.az — monorepo

Three independently deployed Next.js apps, one per subdomain, managed with pnpm workspaces + Turborepo.

| App | Path | Domain | Purpose |
| --- | --- | --- | --- |
| `main` | `apps/main` | `dxb.az` | Landing / hub page linking out to the other two |
| `mirza` | `apps/mirza` | `mirza.dxb.az` | Personal resume / CV |
| `lab` | `apps/lab` | `lab.dxb.az` | Experiments / side-project playground |

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (subtle animation)
- lucide-react (icons)

## Getting started

```powershell
pnpm install
pnpm dev           # runs all 3 apps in parallel (ports 3000/3001/3002)
pnpm dev:main      # just dxb.az            -> http://localhost:3000
pnpm dev:mirza     # just mirza.dxb.az       -> http://localhost:3001
pnpm dev:lab       # just lab.dxb.az         -> http://localhost:3002
```

## Deploying to Vercel

Each app in `apps/*` is deployed as its **own Vercel project**, all pointing at this same git repo, with the project's "Root Directory" set to `apps/main`, `apps/mirza`, or `apps/lab` respectively. Then attach the matching custom domain (`dxb.az`, `mirza.dxb.az`, `lab.dxb.az`) to each project in Vercel's dashboard.

Steps (per app):
1. Import the repo in Vercel → "Add New Project".
2. Set **Root Directory** to `apps/<app>`.
3. Framework preset: Next.js (auto-detected).
4. Add the custom domain under Project → Settings → Domains.
5. Repeat for the other two apps (same repo, different root directory).

## TODO before launch

- Replace placeholder resume content in `apps/mirza` (bio, skills, experience, projects, contact links).
- Replace placeholder experiment cards in `apps/lab`.
- Swap favicons / OG images and update metadata in each `app/layout.tsx`.
- Confirm real DNS / domain details, then wire up Vercel projects as above.
