# CannaBuy Production Deployment Checklist

This checklist is for bringing CannaBuy live in a commercially safe way.

## Required Environment Variables
Set these in Vercel for the production deployment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_NAME` (optional)

If the app is behind additional services, document those separately here.

## Pre-Deploy Checks
- [ ] Supabase project exists and is reachable
- [ ] Production database has the latest migrations applied
- [ ] RLS policies are enabled and tested
- [ ] `user_profiles` rows exist for all staff accounts
- [ ] Tenant data is loaded correctly in Supabase
- [ ] Demo fallback is not required for production traffic
- [ ] Admin diagnostics page loads
- [ ] Login works with a real user
- [ ] Active club selection persists correctly
- [ ] App build passes locally

## Vercel Deployment Checklist
- [ ] Add all required env vars in Vercel
- [ ] Confirm the correct production branch is deployed
- [ ] Trigger a new deployment
- [ ] Verify build completes without warnings
- [ ] Open `/admin/diagnostics` after deployment
- [ ] Confirm Supabase is shown as configured
- [ ] Confirm an authenticated tenant is loaded
- [ ] Confirm data pages are showing real tenant records

## Post-Deploy Smoke Test
1. Open the public home page.
2. Confirm the environment banner only appears when config is missing.
3. Visit `/login` and sign in with a real production user.
4. Confirm the active club loads.
5. Check `/dashboard`, `/members`, `/inventory`, `/pos`, and `/transactions`.
6. Confirm compliance pages load: `/admin/audit`, `/admin/fica`, `/reports/vat`, `/reports/daa`.
7. Open `/admin/diagnostics` and export the support bundle.

## Failure Response
If anything fails:
- Check the diagnostics page first.
- Verify the env vars in Vercel.
- Verify the user has a matching `user_profiles` record.
- Verify the relevant tenant exists and is active.
- Check RLS policies before changing UI code.

## Operational Notes
- Production should use real Supabase data.
- Demo mode is only for development and fallback operation.
- Missing env vars should be treated as a deployment issue, not a hidden failure.
