# GitHub Setup Guide — Get live in 30 minutes

## Step 1: Create GitHub Organisation
1. Go to https://github.com/organizations/new
2. Name: **cannabuy**
3. Visibility: Private
4. Click "Create organisation"

## Step 2: Create the repository
1. New repository → name: **cannabuy-platform**
2. Visibility: **Private**
3. Do NOT initialise with README

## Step 3: Push this scaffold
```bash
cd cannabuy-platform
git init
git branch -M main
git add .
git commit -m "chore: initial CannaBuy platform scaffold"
git remote add origin https://github.com/cannabuy/cannabuy-platform.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```

## Step 4: Branch protection (Settings → Branches)
- Branch: `main` — require PR + CI passing, no bypassing
- Branch: `develop` — require CI passing

## Step 5: Add GitHub Secrets (Settings → Secrets → Actions)
| Secret | Where to get it |
|---|---|
| SUPABASE_URL | Supabase → Project Settings → API |
| SUPABASE_ANON_KEY | Supabase → Project Settings → API |
| SUPABASE_URL_TEST | Same or test project |
| SUPABASE_ANON_KEY_TEST | Same or test project |
| VERCEL_TOKEN | vercel.com → Account Settings → Tokens |
| VERCEL_ORG_ID | Vercel project settings |
| VERCEL_PROJECT_ID | Vercel project settings |
| APP_URL | https://cannabuy.co.za |

## Step 6: Set up Supabase
1. https://supabase.com → New project
2. Name: cannabuy-production
3. Region: **South Africa (Cape Town)**
4. After creation: `supabase link --project-ref YOUR_REF`
5. `supabase db push` to apply migrations

## Step 7: Set up Vercel
1. vercel.com → Add New Project → import cannabuy-platform
2. Framework: Next.js — Root directory: apps/web
3. Add all env vars from apps/web/.env.example
4. Deploy

## Next steps after go-live
- [ ] Register cannabuy.co.za (domains.co.za or afrihost.com)
- [ ] Connect PayFast merchant account
- [ ] Connect Stripe for SaaS billing
- [ ] Onboard first beta club as tenant
