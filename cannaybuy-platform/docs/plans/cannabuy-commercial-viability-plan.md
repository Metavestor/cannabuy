# CannaBuy Commercial Viability Plan

> **For Hermes:** Use this plan to guide the next product phase toward a commercially viable, pilot-ready, and scalable POS platform.

**Goal:** Turn CannaBuy from a functional internal POS into a secure, supportable, tenant-ready product that can be sold, onboarded, operated, and audited in production.

**Architecture:** Keep the current Next.js + Supabase + Vercel stack, but harden it for real customers: tenant isolation, reliable auth, observability, billing, onboarding, and compliance. Preserve demo fallback for development, but production should prefer authenticated Supabase data, strict RLS, and clear operational safeguards.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Lucide React, Supabase Auth/DB/RLS, Vercel, GitHub, CSV/PDF exports, browser/client-side telemetry where needed.

---

## Commercial Viability Definition

CannaBuy is commercially viable when a new club can:
- sign up or be provisioned safely,
- authenticate users with correct roles,
- access only its own data,
- process sales and inventory reliably,
- complete compliance reporting,
- export records for audits,
- receive support when something breaks,
- and be billed for the service.

---

## Launch Gates

Before calling the product pilot-ready, these must be true:
1. Production env vars are configured in Vercel and Supabase.
2. Authenticated users can log in and load only tenant-scoped data.
3. RLS policies are verified against real users.
4. POS, inventory, members, and transactions work without mock masking in production.
5. Compliance pages export usable reports.
6. Error logging / incident visibility exists.
7. Backups and restore steps are documented.
8. There is a basic billing / subscription story.
9. Onboarding a new tenant is repeatable.
10. The UI is polished enough for customer demos.

---

## Priority Phases

### Phase 3: Production Hardening
**Objective:** Make the hosted app stable, observable, and safe for real usage.

**Must ship:**
- Vercel env setup validation
- Supabase auth/session reliability
- tenant-safe loading states
- error logging and UI fallback behavior
- build/deploy verification checklist
- backup/restore notes
- security pass on route guards and RLS assumptions

**Exit criteria:**
- App runs in production without demo masking real failures.
- Login/logout/session restore are dependable.
- Every tenant-facing page respects auth and tenant boundaries.

### Phase 4: Customer Onboarding + Billing
**Objective:** Make it possible to sell and provision the product.

**Must ship:**
- tenant onboarding wizard or setup flow
- role-based admin setup
- organization branding settings
- subscription plan model
- billing/invoice records
- support contact path
- customer handoff checklist

**Exit criteria:**
- A new club can be onboarded without developer intervention.
- Billing can be tracked per tenant.

### Phase 5: Compliance Completion
**Objective:** Finish the parts that make the product defensible in the cannabis space.

**Must ship:**
- complete audit log coverage
- FICA verification workflow polish
- VAT report accuracy and export
- DAA/cannabis compliance report polish
- retention policy notes
- immutable compliance history expectations

**Exit criteria:**
- A compliance officer can produce the required records without manual data stitching.

### Phase 6: Operations and Control
**Objective:** Support day-to-day running of a real club.

**Must ship:**
- daily close / shift close workflow
- cash-up and variance handling
- stock reconciliation
- low-stock alerts and reorder actions
- expiry / batch / recall handling
- staff activity tracking
- branch or location support if needed

**Exit criteria:**
- Operators can run the business cleanly without spreadsheet workarounds.

### Phase 7: Revenue Growth Features
**Objective:** Add features that improve retention and upsell value.

**Must ship:**
- analytics dashboard
- member loyalty / rewards
- member communication tooling
- advanced product/member search
- sales trends and product performance insights
- exports/integration hooks

**Exit criteria:**
- The product helps clubs sell more and keep members engaged.

### Phase 8: Go-To-Market Readiness
**Objective:** Make the product easy to demo, document, and support.

**Must ship:**
- demo environment
- onboarding docs
- training docs
- support SOPs
- deployment checklist
- QA checklist
- pricing / packaging copy
- pilot feedback loop

**Exit criteria:**
- Sales and pilots can happen repeatably.

---

## Immediate Next Workstream

Recommended order from here:

1. Production hardening
2. Billing / onboarding
3. Compliance completion
4. Ops workflows
5. Growth features
6. GTM assets

---

## Current Gaps to Close First

These are the biggest blockers to commercial readiness:
- No explicit billing/subscription system
- No tenant onboarding wizard
- Production env health is not verified in a customer-like setup
- Compliance exports need a final polish pass
- Monitoring/alerting is still minimal
- Support and handoff docs are thin

---

## Suggested Issue Breakdown

### Blocker: Production Hardening
- Verify Vercel env vars and deployment health
- Add runtime diagnostics page for admins
- Audit route guards and Supabase config handling
- Add error boundary / failure messaging
- Document backup and restore procedure

### Blocker: Billing + Tenant Provisioning
- Define subscription tiers
- Build tenant setup flow
- Persist billing status per tenant
- Add invoice / payment records
- Add admin provisioning checklist

### Blocker: Compliance Confidence
- Audit all compliance log write paths
- Validate FICA workflow end-to-end
- Validate VAT export end-to-end
- Validate DAA export end-to-end
- Add compliance documentation page

### Blocker: Operational Readiness
- Inventory reconciliation workflow
- Cash-up workflow
- Shift close workflow
- Stock alerts / reorder workflow
- Staff activity reporting

---

## Definition of Done for “Commercially Viable”

CannaBuy is commercially viable when:
- a club can be onboarded without code changes,
- the app is safe under multi-tenant Supabase RLS,
- customers can use POS and inventory daily,
- compliance reports can be generated on demand,
- the business can charge and support tenants,
- and failures are visible and recoverable.

---

## Notes

- Demo fallback remains useful for development, but production should not rely on it.
- Commercial readiness is not only features; it is reliability, compliance, onboarding, support, and billing.
- The fastest path to revenue is to harden the current stack rather than rewrite it.
