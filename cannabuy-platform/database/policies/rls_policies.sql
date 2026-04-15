-- CannaBuy — Row Level Security Policies
-- Multi-tenant isolation: each club sees only its own data

create or replace function get_user_tenant_id()
returns uuid as $$
  select tenant_id from user_profiles where id = auth.uid()
$$ language sql security definer stable;

create or replace function user_has_role(required_role text)
returns boolean as $$
  select exists (select 1 from user_profiles where id = auth.uid() and role = required_role)
$$ language sql security definer stable;

-- TENANTS
create policy "View own tenant" on tenants for select using (id = get_user_tenant_id());
create policy "Super admin all" on tenants for all using (user_has_role('super_admin'));

-- MEMBERS
create policy "Staff view members"   on members for select using (tenant_id = get_user_tenant_id());
create policy "Admin insert members" on members for insert with check (tenant_id = get_user_tenant_id() and user_has_role('admin'));
create policy "Admin update members" on members for update using (tenant_id = get_user_tenant_id() and user_has_role('admin'));

-- PRODUCTS
create policy "Staff view products"  on products for select using (tenant_id = get_user_tenant_id());
create policy "Admin manage products" on products for all using (tenant_id = get_user_tenant_id() and user_has_role('admin'));

-- CULTIVATION BATCHES
create policy "Staff view batches"   on cultivation_batches for select using (tenant_id = get_user_tenant_id());
create policy "Admin manage batches" on cultivation_batches for all using (tenant_id = get_user_tenant_id() and user_has_role('admin'));

-- TRANSACTIONS
create policy "Staff view tx"    on transactions for select using (tenant_id = get_user_tenant_id());
create policy "Staff create tx"  on transactions for insert with check (tenant_id = get_user_tenant_id());
create policy "Admin update tx"  on transactions for update using (tenant_id = get_user_tenant_id() and user_has_role('admin'));

-- COMPLIANCE DOCS
create policy "Staff view docs"   on compliance_documents for select using (tenant_id = get_user_tenant_id());
create policy "Admin manage docs" on compliance_documents for all using (tenant_id = get_user_tenant_id() and user_has_role('admin'));
