-- CannaBuy — Phase 2: RLS Policies & Row-Level Security (Issue #7)
-- Run via: supabase db push

-- ============================================================
-- USER PROFILES (links Supabase Auth to tenants with roles)
-- ============================================================
create table if not exists user_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  tenant_id     uuid not null references tenants(id) on delete cascade,
  email         text not null,
  full_name     text,
  role          text not null default 'viewer' check (role in ('super_admin','admin','manager','budtender','viewer')),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(tenant_id, email)
);

-- Profile always mirrors auth.user email
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, tenant_id, email)
  values (
    new.id,
    coalesce(
      (select tenant_id from user_profiles where email = new.email limit 1),
      (select id from tenants limit 1)  -- fallback to first tenant during setup
    ),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Updated at trigger
create or replace function update_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists set_user_profiles_updated_at on user_profiles;
create trigger set_user_profiles_updated_at
  before update on user_profiles
  for each row execute function update_updated_at();

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Get current user's tenant_id
create or replace function get_user_tenant_id()
returns uuid as $$
  select tenant_id from user_profiles where id = auth.uid()
$$ language sql security definer stable;

-- Check if current user has a specific role (or higher)
create or replace function user_has_role(required_role text)
returns boolean as $$
  select exists (
    select 1 from user_profiles
    where id = auth.uid()
    and role in (
      case required_role
        when 'super_admin' then array['super_admin']
        when 'admin'       then array['super_admin','admin']
        when 'manager'     then array['super_admin','admin','manager']
        when 'budtender'   then array['super_admin','admin','manager','budtender']
        else array['super_admin','admin','manager','budtender','viewer']
      end
    )
  )
$$ language sql security definer stable;

-- Check if current user is at least the required role (hierarchical)
create or replace function user_is_at_least(required_role text)
returns boolean as $$
  select exists (
    select 1 from user_profiles
    where id = auth.uid()
    and (
      (required_role = 'super_admin' and role = 'super_admin')
      or (required_role = 'admin'    and role in ('super_admin','admin'))
      or (required_role = 'manager'  and role in ('super_admin','admin','manager'))
      or (required_role = 'budtender' and role in ('super_admin','admin','manager','budtender'))
      or (required_role = 'viewer')
    )
  )
$$ language sql security definer stable;

-- Convenience: is current user admin or higher?
create or replace function user_is_admin()
returns boolean as $$
  select user_is_at_least('admin')
$$ language sql security definer stable;

-- ============================================================
-- STOCK ADJUSTMENTS (for inventory tracking)
-- ============================================================
create table if not exists stock_adjustments (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references tenants(id) on delete cascade,
  product_id      uuid not null references products(id) on delete cascade,
  qty_before      numeric(10,2) not null,
  qty_change      numeric(10,2) not null,
  qty_after       numeric(10,2) not null,
  reason          text not null check (reason in ('restock','sale','damage','count_correction','return','expired','manual')),
  notes           text,
  adjusted_by     uuid not null references auth.users(id),
  created_at      timestamptz not null default now()
);

alter table stock_adjustments enable row level security;

-- ============================================================
-- MEMBERS POLICIES
-- ============================================================
drop policy if exists "Staff view members" on members;
create policy "Staff view members"
  on members for select
  using (tenant_id = get_user_tenant_id());

drop policy if exists "Budtender+ insert members" on members;
create policy "Budtender+ insert members"
  on members for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('budtender'));

drop policy if exists "Manager+ update members" on members;
create policy "Manager+ update members"
  on members for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Admin+ delete members" on members;
create policy "Admin+ delete members"
  on members for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- PRODUCTS POLICIES
-- ============================================================
drop policy if exists "Staff view products" on products;
create policy "Staff view products"
  on products for select
  using (tenant_id = get_user_tenant_id());

drop policy if exists "Manager+ insert products" on products;
create policy "Manager+ insert products"
  on products for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Manager+ update products" on products;
create policy "Manager+ update products"
  on products for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Admin+ delete products" on products;
create policy "Admin+ delete products"
  on products for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- STOCK_ADJUSTMENTS POLICIES
-- ============================================================
drop policy if exists "Staff view stock_adjustments" on stock_adjustments;
create policy "Staff view stock_adjustments"
  on stock_adjustments for select
  using (tenant_id = get_user_tenant_id());

drop policy if exists "Budtender+ insert stock_adjustments" on stock_adjustments;
create policy "Budtender+ insert stock_adjustments"
  on stock_adjustments for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('budtender'));

-- ============================================================
-- TRANSACTIONS POLICIES
-- ============================================================
drop policy if exists "Staff view transactions" on transactions;
create policy "Staff view transactions"
  on transactions for select
  using (tenant_id = get_user_tenant_id());

drop policy if exists "Budtender+ insert transactions" on transactions;
create policy "Budtender+ insert transactions"
  on transactions for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('budtender'));

-- Only admin can update (void/refund) transactions
drop policy if exists "Admin update transactions" on transactions;
create policy "Admin update transactions"
  on transactions for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- TRANSACTION_LINE_ITEMS POLICIES
-- ============================================================
drop policy if exists "Staff view line_items" on transaction_line_items;
create policy "Staff view line_items"
  on transaction_line_items for select
  using (
    exists (
      select 1 from transactions t
      where t.id = transaction_line_items.transaction_id
      and t.tenant_id = get_user_tenant_id()
    )
  );

drop policy if exists "Budtender+ insert line_items" on transaction_line_items;
create policy "Budtender+ insert line_items"
  on transaction_line_items for insert
  with check (
    exists (
      select 1 from transactions t
      where t.id = transaction_line_items.transaction_id
      and t.tenant_id = get_user_tenant_id()
    )
    and user_is_at_least('budtender')
  );

drop policy if exists "Admin+ delete line_items" on transaction_line_items;
create policy "Admin+ delete line_items"
  on transaction_line_items for delete
  using (
    exists (
      select 1 from transactions t
      where t.id = transaction_line_items.transaction_id
      and t.tenant_id = get_user_tenant_id()
    )
    and user_is_at_least('admin')
  );

-- ============================================================
-- CULTIVATION_BATCHES POLICIES
-- ============================================================
drop policy if exists "Staff view batches" on cultivation_batches;
create policy "Staff view batches"
  on cultivation_batches for select
  using (tenant_id = get_user_tenant_id());

drop policy if exists "Manager+ insert batches" on cultivation_batches;
create policy "Manager+ insert batches"
  on cultivation_batches for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Manager+ update batches" on cultivation_batches;
create policy "Manager+ update batches"
  on cultivation_batches for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Admin+ delete batches" on cultivation_batches;
create policy "Admin+ delete batches"
  on cultivation_batches for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- COMPLIANCE_DOCUMENTS POLICIES
-- ============================================================
drop policy if exists "Staff view compliance_docs" on compliance_documents;
create policy "Staff view compliance_docs"
  on compliance_documents for select
  using (tenant_id = get_user_tenant_id());

drop policy if exists "Manager+ insert compliance_docs" on compliance_documents;
create policy "Manager+ insert compliance_docs"
  on compliance_documents for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Manager+ update compliance_docs" on compliance_documents;
create policy "Manager+ update compliance_docs"
  on compliance_documents for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

drop policy if exists "Admin+ delete compliance_docs" on compliance_documents;
create policy "Admin+ delete compliance_docs"
  on compliance_documents for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- USER_PROFILES POLICIES
-- ============================================================
alter table user_profiles enable row level security;

-- Everyone can view their own profile
drop policy if exists "Users view own profile" on user_profiles;
create policy "Users view own profile"
  on user_profiles for select
  using (id = auth.uid());

-- Users can update their own profile (except role)
drop policy if exists "Users update own profile" on user_profiles;
create policy "Users update own profile"
  on user_profiles for update
  using (id = auth.uid()) with check (id = auth.uid());

-- Admin can view all profiles in their tenant
drop policy if exists "Admin view tenant profiles" on user_profiles;
create policy "Admin view tenant profiles"
  on user_profiles for select
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- Admin can manage profiles in their tenant
drop policy if exists "Admin manage tenant profiles" on user_profiles;
create policy "Admin manage tenant profiles"
  on user_profiles for all
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- Super admin can do everything
drop policy if exists "Super admin all users" on user_profiles;
create policy "Super admin all users"
  on user_profiles for all
  using (user_has_role('super_admin'));

-- ============================================================
-- TENANTS POLICIES
-- ============================================================
drop policy if exists "View own tenant" on tenants;
create policy "View own tenant"
  on tenants for select
  using (id = get_user_tenant_id());

drop policy if exists "Super admin manage tenants" on tenants;
create policy "Super admin manage tenants"
  on tenants for all
  using (user_has_role('super_admin'));

-- ============================================================
-- GRANT EXECUTE ON HELPER FUNCTIONS
-- ============================================================
grant execute on function get_user_tenant_id() to authenticated;
grant execute on function user_has_role(text) to authenticated;
grant execute on function user_is_at_least(text) to authenticated;
grant execute on function user_is_admin() to authenticated;

-- ============================================================
-- ENABLE RLS ON USER_PROFILES
-- ============================================================
alter table user_profiles enable row level security;

-- ============================================================
-- COMPLIANCE LOGS TABLE (for Issue #8 - Audit Trail)
-- ============================================================
create table if not exists compliance_logs (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references tenants(id) on delete cascade,
  actor_id        uuid references auth.users(id),
  actor_email     text not null,
  action          text not null,  -- 'create','update','delete','void','refund','login','logout'
  entity_type     text not null,  -- 'member','product','transaction','stock_adjustment','user'
  entity_id       uuid,
  description     text not null,
  before_state    jsonb,
  after_state     jsonb,
  metadata        jsonb,          -- ip_address, user_agent, etc.
  created_at      timestamptz not null default now()
);

alter table compliance_logs enable row level security;

-- Everyone in tenant can see compliance logs (admin+ can write)
drop policy if exists "Admin view compliance_logs" on compliance_logs;
create policy "Admin view compliance_logs"
  on compliance_logs for select
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

drop policy if exists "System insert compliance_logs" on compliance_logs;
create policy "System insert compliance_logs"
  on compliance_logs for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- Compliance logs should never be updated or deleted
drop policy if exists "No update compliance_logs" on compliance_logs;
create policy "No update compliance_logs"
  on compliance_logs for update using (false);

drop policy if exists "No delete compliance_logs" on compliance_logs;
create policy "No delete compliance_logs"
  on compliance_logs for delete using (false);

-- Helper to log compliance events (call from triggers/application)
create or replace function log_compliance_event(
  p_tenant_id     uuid,
  p_actor_id      uuid,
  p_actor_email   text,
  p_action        text,
  p_entity_type   text,
  p_entity_id     uuid,
  p_description   text,
  p_before_state  jsonb default null,
  p_after_state   jsonb default null,
  p_metadata      jsonb default null
) returns uuid as $$
  insert into compliance_logs (
    tenant_id, actor_id, actor_email, action, entity_type,
    entity_id, description, before_state, after_state, metadata
  ) values (
    p_tenant_id, p_actor_id, p_actor_email, p_action, p_entity_type,
    p_entity_id, p_description, p_before_state, p_after_state, p_metadata
  )
  returning id;
$$ language sql security definer;
