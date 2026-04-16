-- CannaBuy — Initial Schema Migration
-- Run via: supabase db push

create extension if not exists "uuid-ossp";

create table tenants (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  name          text not null,
  vat_number    text not null,
  fica_officer  text not null,
  brand_color   text not null default '#1a7a4a',
  logo_url      text,
  domain        text unique,
  plan          text not null default 'starter' check (plan in ('starter','growth','enterprise')),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table members (
  id                  uuid primary key default uuid_generate_v4(),
  tenant_id           uuid not null references tenants(id) on delete cascade,
  member_number       text not null,
  first_name          text not null,
  last_name           text not null,
  id_number_encrypted text not null,
  date_of_birth       date not null,
  age_verified        boolean not null default false,
  phone               text not null,
  email               text not null,
  province            text not null,
  fica_status         text not null default 'pending' check (fica_status in ('verified','pending','expired','rejected')),
  fica_verified_at    timestamptz,
  fica_document_path  text,
  membership_tier     text not null default 'standard' check (membership_tier in ('standard','premium','founding')),
  membership_fee_zar  numeric(10,2) not null,
  monthly_gram_limit  integer not null default 30,
  status              text not null default 'pending' check (status in ('active','restricted','suspended','pending')),
  joined_at           timestamptz not null default now(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique(tenant_id, member_number),
  unique(tenant_id, email)
);

create table products (
  id                    uuid primary key default uuid_generate_v4(),
  tenant_id             uuid not null references tenants(id) on delete cascade,
  sku                   text not null,
  name                  text not null,
  category              text not null check (category in ('sativa','indica','hybrid','concentrate','edible','wellness','processed')),
  weight_grams          numeric(8,2),
  unit_label            text not null,
  price_incl_vat_zar    numeric(10,2) not null,
  price_excl_vat_zar    numeric(10,2) generated always as (round(price_incl_vat_zar / 1.15, 2)) stored,
  vat_amount_zar        numeric(10,2) generated always as (price_incl_vat_zar - round(price_incl_vat_zar / 1.15, 2)) stored,
  stock_qty             numeric(10,2) not null default 0,
  reorder_threshold     numeric(10,2) not null default 50,
  is_active             boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique(tenant_id, sku)
);

create table cultivation_batches (
  id                      uuid primary key default uuid_generate_v4(),
  tenant_id               uuid not null references tenants(id) on delete cascade,
  batch_code              text not null,
  strain                  text not null,
  plant_count             integer not null check (plant_count > 0),
  start_date              date not null,
  estimated_harvest_date  date not null,
  actual_harvest_date     date,
  yield_grams             numeric(10,2),
  stage                   text not null default 'germination' check (stage in ('germination','seedling','vegetative','flowering','harvested','destroyed')),
  notes                   text,
  created_by              uuid not null references auth.users(id),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  unique(tenant_id, batch_code)
);

create table transactions (
  id                    uuid primary key default uuid_generate_v4(),
  tenant_id             uuid not null references tenants(id) on delete cascade,
  invoice_number        text not null,
  member_id             uuid not null references members(id),
  subtotal_excl_vat_zar numeric(10,2) not null,
  vat_amount_zar        numeric(10,2) not null,
  total_incl_vat_zar    numeric(10,2) not null,
  payment_method        text not null check (payment_method in ('eft','cash','snapscan','yoco','payfast')),
  type                  text not null default 'sale' check (type in ('sale','refund','membership_fee')),
  status                text not null default 'completed' check (status in ('completed','pending','refunded','failed')),
  processed_by          uuid not null references auth.users(id),
  created_at            timestamptz not null default now(),
  unique(tenant_id, invoice_number)
);

create table transaction_line_items (
  id                        uuid primary key default uuid_generate_v4(),
  transaction_id            uuid not null references transactions(id) on delete cascade,
  product_id                uuid not null references products(id),
  product_name              text not null,
  qty                       numeric(8,2) not null,
  unit_price_incl_vat_zar   numeric(10,2) not null,
  unit_price_excl_vat_zar   numeric(10,2) not null,
  vat_amount_zar            numeric(10,2) not null,
  line_total                numeric(10,2) not null
);

create table compliance_documents (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  doc_type    text not null check (doc_type in ('club_constitution','vat_registration','zoning_approval','popia_officer','fica_member_pack','other')),
  label       text not null,
  file_path   text not null,
  uploaded_at timestamptz not null default now(),
  expiry_date date,
  is_valid    boolean not null default true,
  uploaded_by uuid not null references auth.users(id)
);

-- Row Level Security
alter table tenants               enable row level security;
alter table members               enable row level security;
alter table products              enable row level security;
alter table cultivation_batches   enable row level security;
alter table transactions          enable row level security;
alter table transaction_line_items enable row level security;
alter table compliance_documents  enable row level security;

-- updated_at trigger
create or replace function update_updated_at()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger set_updated_at before update on tenants           for each row execute function update_updated_at();
create trigger set_updated_at before update on members           for each row execute function update_updated_at();
create trigger set_updated_at before update on products          for each row execute function update_updated_at();
create trigger set_updated_at before update on cultivation_batches for each row execute function update_updated_at();
