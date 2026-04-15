# CannaBuy — Manage. Comply. Grow.

The complete cannabis club management platform built for the South African market.

## Stack
- Frontend: Next.js 14 + React + TypeScript + Tailwind CSS
- Backend: Supabase Edge Functions
- Database: PostgreSQL (Supabase) with Row Level Security
- Hosting: Vercel + Cloudflare
- Payments: PayFast (ZAR) + Stripe (SaaS subscriptions)
- Monorepo: Turborepo + pnpm workspaces

## Structure
```
cannabuy-platform/
├── apps/
│   ├── web/          Next.js frontend
│   └── api/          Supabase Edge Functions
├── packages/
│   ├── ui/           Shared component library
│   ├── compliance/   ZA regulatory logic
│   ├── types/        Shared TypeScript types
│   └── config/       Shared configs
├── database/
│   ├── migrations/   SQL schema migrations
│   ├── seeds/        Dev seed data
│   └── policies/     Row Level Security policies
└── docs/             Architecture and setup guides
```

## Quick Start
```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
supabase start
supabase db push
pnpm dev
```

## Compliance
Built for South African cannabis clubs operating under the Cannabis for Private Purposes Act.
Includes FICA/KYC, DAA cultivation tracking, SARS VAT 15%, and POPIA data handling.

© 2025 CannaBuy (Pty) Ltd — All rights reserved. Proprietary commercial software.
