-- CannaBuy — Row Level Security Policies (Consolidated)
-- Multi-tenant isolation + role-based access control
-- Issue #7: RLS Policies & Row-Level Security

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

create or replace function get_user_tenant_id()
returns uuid as $$
  select tenant_id from user_profiles where id = auth.uid()
$$ language sql security definer stable;

create or replace function user_has_role(required_role text)
returns boolean as $$
  select exists (
    select 1 from user_profiles
    where id = auth.uid()
    and role = required_role
  )
$$ language sql security definer stable;

-- Hierarchical role check: 'admin' includes super_admin, etc.
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

create or replace function user_is_admin()
returns boolean as $$
  select user_is_at_least('admin')
$$ language sql security definer stable;

-- ============================================================
-- MEMBERS
-- ============================================================
create policy "Staff view members" on members for select
  using (tenant_id = get_user_tenant_id());

create policy "Budtender+ insert members" on members for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('budtender'));

create policy "Manager+ update members" on members for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Admin+ delete members" on members for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- PRODUCTS
-- ============================================================
create policy "Staff view products" on products for select
  using (tenant_id = get_user_tenant_id());

create policy "Manager+ insert products" on products for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Manager+ update products" on products for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Admin+ delete products" on products for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- STOCK ADJUSTMENTS
-- ============================================================
create policy "Staff view stock_adjustments" on stock_adjustments for select
  using (tenant_id = get_user_tenant_id());

create policy "Budtender+ insert stock_adjustments" on stock_adjustments for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('budtender'));

-- ============================================================
-- TRANSACTIONS
-- ============================================================
create policy "Staff view transactions" on transactions for select
  using (tenant_id = get_user_tenant_id());

create policy "Budtender+ insert transactions" on transactions for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('budtender'));

create policy "Admin update transactions" on transactions for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- TRANSACTION LINE ITEMS (via parent transaction)
-- ============================================================
create policy "Staff view line_items" on transaction_line_items for select
  using (
    exists (
      select 1 from transactions t
      where t.id = transaction_line_items.transaction_id
      and t.tenant_id = get_user_tenant_id()
    )
  );

create policy "Budtender+ insert line_items" on transaction_line_items for insert
  with check (
    exists (
      select 1 from transactions t
      where t.id = transaction_line_items.transaction_id
      and t.tenant_id = get_user_tenant_id()
    )
    and user_is_at_least('budtender')
  );

create policy "Admin+ delete line_items" on transaction_line_items for delete
  using (
    exists (
      select 1 from transactions t
      where t.id = transaction_line_items.transaction_id
      and t.tenant_id = get_user_tenant_id()
    )
    and user_is_at_least('admin')
  );

-- ============================================================
-- CULTIVATION BATCHES
-- ============================================================
create policy "Staff view batches" on cultivation_batches for select
  using (tenant_id = get_user_tenant_id());

create policy "Manager+ insert batches" on cultivation_batches for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Manager+ update batches" on cultivation_batches for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Admin+ delete batches" on cultivation_batches for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- COMPLIANCE DOCUMENTS
-- ============================================================
create policy "Staff view compliance_docs" on compliance_documents for select
  using (tenant_id = get_user_tenant_id());

create policy "Manager+ insert compliance_docs" on compliance_documents for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Manager+ update compliance_docs" on compliance_documents for update
  using (tenant_id = get_user_tenant_id() and user_is_at_least('manager'));

create policy "Admin+ delete compliance_docs" on compliance_documents for delete
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- USER PROFILES
-- ============================================================
create policy "Users view own profile" on user_profiles for select
  using (id = auth.uid());

create policy "Users update own profile" on user_profiles for update
  using (id = auth.uid());

create policy "Admin view tenant profiles" on user_profiles for select
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

create policy "Admin manage tenant profiles" on user_profiles for all
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

-- ============================================================
-- COMPLIANCE LOGS (append-only, admin read)
-- ============================================================
create policy "Admin view compliance_logs" on compliance_logs for select
  using (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

create policy "Admin insert compliance_logs" on compliance_logs for insert
  with check (tenant_id = get_user_tenant_id() and user_is_at_least('admin'));

create policy "No update compliance_logs" on compliance_logs for update using (false);
create policy "No delete compliance_logs" on compliance_logs for delete using (false);
