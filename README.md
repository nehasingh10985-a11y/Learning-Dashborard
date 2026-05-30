# LearnOS — Student Learning Dashboard

A futuristic, highly animated student dashboard built with Next.js 15, Supabase, and Framer Motion.

## Live Demo

[Deploy link here]

## Tech Stack

- **Next.js 15** — App Router, Server Components
- **Supabase** — PostgreSQL database, real-time data
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — spring physics animations
- **Lucide React** — icons

## Architecture

### Server / Client Split

Data fetching happens exclusively in `app/page.tsx` (Server Component) using `async/await`.
No data fetching on the client — zero waterfall requests.
Animation wrappers (`CourseGrid`, `CourseTile`, `HeroTile`) are marked `'use client'` for Framer Motion.

### Component Tree

\`\`\`
page.tsx (Server)
├── Sidebar (Client)
├── HeroTile (Client)
├── ActivityTile (Client)
├── OverallProgressTile (Client)
└── CourseGrid (Client)
└── CourseTile (Client)
\`\`\`

## Setup

1. Clone the repo
2. Copy \`.env.example\` to \`.env.local\`
3. Add your Supabase credentials
4. \`npm install && npm run dev\`

## Challenges

- Keeping Server/Client boundary clean while passing Supabase data to animated components
- Achieving zero layout shifts with Framer Motion spring animations
- Tailwind CSS v4 config differences from v3
