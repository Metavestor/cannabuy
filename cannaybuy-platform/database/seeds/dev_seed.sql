-- CannaBuy — Dev Seed Data (Phase 2)
-- Run after migration to get a working local environment

-- ============================================================
-- TENANTS
-- ============================================================
insert into tenants (slug, name, vat_number, fica_officer, brand_color, plan) values
  ('greenleaf-jozi', 'GreenLeaf Club Johannesburg', '4550123456', 'Jane Smith', '#1a7a4a', 'growth'),
  ('cape-cannabis',  'Cape Cannabis Club',          '4550654321', 'John Doe',  '#8B2FC9', 'starter');

-- ============================================================
-- MEMBERS (for greenleaf-jozi)
-- ============================================================
insert into members (tenant_id, member_number, first_name, last_name, id_number_encrypted, date_of_birth, age_verified, phone, email, province, fica_status, membership_tier, membership_fee_zar, monthly_gram_limit, status, joined_at)
select id, 'MBR-001', 'Thabo', 'Mokoena', '8801010101083', '1988-01-01', true, '0821234567', 'thabo.mokoena@email.com', 'Gauteng', 'verified', 'premium', 500.00, 200, 'active', '2024-01-15'
from tenants where slug = 'greenleaf-jozi'
union all
select id, 'MBR-002', 'Lisa', 'van der Berg', '9105050202087', '1991-05-05', true, '0832345678', 'lisa.vdb@email.com', 'Western Cape', 'verified', 'standard', 300.00, 100, 'active', '2024-02-20'
from tenants where slug = 'greenleaf-jozi'
union all
select id, 'MBR-003', 'Kgosi', 'Malema', '8708080503081', '1987-08-08', true, '0843456789', 'kgosi.malema@email.com', 'Limpopo', 'pending', 'founding', 1000.00, 500, 'pending', '2024-04-01'
from tenants where slug = 'greenleaf-jozi';

-- ============================================================
-- PRODUCTS (for greenleaf-jozi)
-- ============================================================
insert into products (tenant_id, sku, name, category, weight_grams, unit_label, price_incl_vat_zar, stock_qty, reorder_threshold)
select id, 'FLW-001', 'Durban Poison',   'sativa',     3.5,  '3.5g',  200.00, 220, 50 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'FLW-002', 'Swazi Gold',      'sativa',     7.0,  '7g',    350.00, 140, 70 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'FLW-003', 'OG Kush',         'hybrid',     3.5,  '3.5g',  210.00, 175, 50 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'FLW-004', 'Northern Lights',  'indica',     3.5,  '3.5g',  190.00, 200, 50 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'FLW-005', 'Sour Diesel',      'sativa',    14.0,  '14g',   650.00,  80, 40 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'EDB-001', 'THC Gummies 10pk', 'edible',   100.0,  '100g',  350.00,  42, 20 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'CON-001', 'Water Hash',       'concentrate', 7.0, '7g',  1200.00,   8, 15 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'WEL-001', 'CBD Oil 30ml',     'wellness',   null, '30ml',  200.00,  12, 20 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'FLW-006', 'Purple Haze',      'sativa',     3.5,  '3.5g',  220.00,   0, 50 from tenants where slug = 'greenleaf-jozi'  -- out of stock
union all
select id, 'FLW-007', 'Blue Dream',       'hybrid',     3.5,  '3.5g',  205.00,   6, 50 from tenants where slug = 'greenleaf-jozi'; -- critical

-- ============================================================
-- USER PROFILES (roles for RLS - link to auth.users by email)
-- Note: In production, these are auto-created via trigger on auth.users insert.
-- For local dev, create manual entries after creating auth users.
-- 
-- To test RLS locally:
-- 1. Create auth user: supabase auth.admin.createUser({ email: 'admin@greenleaf.co.za', ... })
-- 2. The trigger will auto-create user_profiles entry
-- 3. Then update role: update user_profiles set role = 'admin' where email = 'admin@greenleaf.co.za'
--
-- Quick dev setup (run after creating test users in Supabase dashboard):
-- update user_profiles set role = 'admin' where email = 'your-admin@email.com';
-- update user_profiles set role = 'manager' where email = 'your-manager@email.com';
-- update user_profiles set role = 'budtender' where email = 'your-budtender@email.com';
-- update user_profiles set role = 'viewer' where email = 'your-viewer@email.com';

-- Pre-create entries for known dev emails (these won't auto-link without actual auth.users):
insert into user_profiles (tenant_id, email, role)
select id, 'admin@greenleaf-jozi.local', 'admin' from tenants where slug = 'greenleaf-jozi'
on conflict (tenant_id, email) do update set role = 'admin';

insert into user_profiles (tenant_id, email, role)
select id, 'manager@greenleaf-jozi.local', 'manager' from tenants where slug = 'greenleaf-jozi'
on conflict (tenant_id, email) do update set role = 'manager';

insert into user_profiles (tenant_id, email, role)
select id, 'budtender@greenleaf-jozi.local', 'budtender' from tenants where slug = 'greenleaf-jozi'
on conflict (tenant_id, email) do update set role = 'budtender';
