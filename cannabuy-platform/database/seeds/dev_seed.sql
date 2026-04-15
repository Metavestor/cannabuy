-- CannaBuy — Dev Seed Data
-- Run after migration to get a working local environment

insert into tenants (slug, name, vat_number, fica_officer, brand_color, plan) values
  ('greenleaf-jozi', 'GreenLeaf Club Johannesburg', '4550123456', 'Jane Smith', '#1a7a4a', 'growth'),
  ('cape-cannabis',  'Cape Cannabis Club',          '4550654321', 'John Doe',  '#8B2FC9', 'starter');

-- Products for greenleaf-jozi tenant
insert into products (tenant_id, sku, name, category, weight_grams, unit_label, price_incl_vat_zar, stock_qty, reorder_threshold)
select id, 'DP-001', 'Durban Poison', 'sativa', 3.5, '3.5g', 200, 220, 50 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'SG-002', 'Swazi Gold',    'sativa', 7.0, '7g',   300, 140, 70 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'OG-003', 'OG Kush',       'hybrid', 3.5, '3.5g', 210, 175, 50 from tenants where slug = 'greenleaf-jozi'
union all
select id, 'CBD-004','CBD Oil 30ml',  'wellness', null, '30ml', 200, 12, 20 from tenants where slug = 'greenleaf-jozi';
