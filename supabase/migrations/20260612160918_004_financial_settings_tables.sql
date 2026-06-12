/*
# Financial and Settings Tables for Nava POS

1. New Tables
- `wallets`: Store wallet balances (dana_laci, dana_bebas)
- `piutang`: Accounts receivable/credit records
- `store_settings`: System configuration (margins, branches, printer settings)
- `app_logs`: Activity log for tracking operations
- `bot_memory`: AI assistant memory storage
- `kewajiban_lain`: Other liabilities
- `hutang_supplier`: Supplier payables
- `supplier_returns`: Return records to suppliers

2. Security
- RLS enabled on all tables
- Single-tenant policies allowing anon/authenticated CRUD

3. Notes
- Wallets uses single row for current balance
- Store settings stored as JSONB for flexibility
- Piutang tracks credit sales with payment status
*/

-- Wallets table (stores current cash balances)
CREATE TABLE IF NOT EXISTS wallets (
  id integer PRIMARY KEY DEFAULT 1,
  dana_laci integer NOT NULL DEFAULT 0,
  dana_bebas integer NOT NULL DEFAULT 0,
  last_closed_date text,
  updated_at timestamptz DEFAULT now()
);

-- Piutang table (accounts receivable)
CREATE TABLE IF NOT EXISTS piutang (
  id text PRIMARY KEY,
  date text NOT NULL,
  iso_date timestamptz DEFAULT now(),
  customer text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]',
  total integer NOT NULL DEFAULT 0,
  paid integer DEFAULT 0,
  method text,
  sisa integer NOT NULL DEFAULT 0,
  retur_total integer DEFAULT 0,
  global_discount integer DEFAULT 0,
  branch text,
  note text,
  created_at timestamptz DEFAULT now()
);

-- Store settings table
CREATE TABLE IF NOT EXISTS store_settings (
  id integer PRIMARY KEY DEFAULT 1,
  store_name text DEFAULT 'NAVA POS',
  store_address text,
  store_phone text,
  footer_text text,
  printer_driver text,
  scanner_prefix text,
  scanner_suffix text,
  sync_enabled boolean DEFAULT false,
  branches jsonb DEFAULT '[]',
  active_branch text,
  margins jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- App logs table (activity tracking)
CREATE TABLE IF NOT EXISTS app_logs (
  id serial PRIMARY KEY,
  type text NOT NULL,
  description text NOT NULL,
  time bigint NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Bot memory table (AI assistant persistence)
CREATE TABLE IF NOT EXISTS bot_memory (
  id integer PRIMARY KEY DEFAULT 1,
  content text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Kewajiban lain table (other liabilities)
CREATE TABLE IF NOT EXISTS kewajiban_lain (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  amount integer NOT NULL,
  due_date text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Hutang supplier table (supplier payables)
CREATE TABLE IF NOT EXISTS hutang_supplier (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  supplier_id text,
  supplier_name text NOT NULL,
  amount integer NOT NULL,
  due_date text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Supplier returns table
CREATE TABLE IF NOT EXISTS supplier_returns (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  supplier_id text,
  items jsonb NOT NULL DEFAULT '[]',
  total integer NOT NULL DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE piutang ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE kewajiban_lain ENABLE ROW LEVEL SECURITY;
ALTER TABLE hutang_supplier ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_returns ENABLE ROW LEVEL SECURITY;

-- Wallets policies
DROP POLICY IF EXISTS "anon_crud_wallets" ON wallets;
CREATE POLICY "anon_crud_wallets" ON wallets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_wallets" ON wallets FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_wallets" ON wallets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_wallets" ON wallets FOR DELETE TO anon, authenticated USING (true);

-- Piutang policies
DROP POLICY IF EXISTS "anon_crud_piutang" ON piutang;
CREATE POLICY "anon_crud_piutang" ON piutang FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_piutang" ON piutang FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_piutang" ON piutang FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_piutang" ON piutang FOR DELETE TO anon, authenticated USING (true);

-- Store settings policies
DROP POLICY IF EXISTS "anon_crud_store_settings" ON store_settings;
CREATE POLICY "anon_crud_store_settings" ON store_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_store_settings" ON store_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_store_settings" ON store_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_store_settings" ON store_settings FOR DELETE TO anon, authenticated USING (true);

-- App logs policies
DROP POLICY IF EXISTS "anon_crud_app_logs" ON app_logs;
CREATE POLICY "anon_crud_app_logs" ON app_logs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_app_logs" ON app_logs FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_app_logs" ON app_logs FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_app_logs" ON app_logs FOR DELETE TO anon, authenticated USING (true);

-- Bot memory policies
DROP POLICY IF EXISTS "anon_crud_bot_memory" ON bot_memory;
CREATE POLICY "anon_crud_bot_memory" ON bot_memory FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_bot_memory" ON bot_memory FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_bot_memory" ON bot_memory FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_bot_memory" ON bot_memory FOR DELETE TO anon, authenticated USING (true);

-- Kewajiban lain policies
DROP POLICY IF EXISTS "anon_crud_kewajiban_lain" ON kewajiban_lain;
CREATE POLICY "anon_crud_kewajiban_lain" ON kewajiban_lain FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_kewajiban_lain" ON kewajiban_lain FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_kewajiban_lain" ON kewajiban_lain FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_kewajiban_lain" ON kewajiban_lain FOR DELETE TO anon, authenticated USING (true);

-- Hutang supplier policies
DROP POLICY IF EXISTS "anon_crud_hutang_supplier" ON hutang_supplier;
CREATE POLICY "anon_crud_hutang_supplier" ON hutang_supplier FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_hutang_supplier" ON hutang_supplier FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_hutang_supplier" ON hutang_supplier FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_hutang_supplier" ON hutang_supplier FOR DELETE TO anon, authenticated USING (true);

-- Supplier returns policies
DROP POLICY IF EXISTS "anon_crud_supplier_returns" ON supplier_returns;
CREATE POLICY "anon_crud_supplier_returns" ON supplier_returns FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_supplier_returns" ON supplier_returns FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_supplier_returns" ON supplier_returns FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_supplier_returns" ON supplier_returns FOR DELETE TO anon, authenticated USING (true);

-- Insert default rows for single-row tables
INSERT INTO wallets (id, dana_laci, dana_bebas) VALUES (1, 0, 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO store_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO bot_memory (id, content) VALUES (1, 'Saya adalah AI bot asisten cerdas untuk Nava POS.') ON CONFLICT (id) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_piutang_customer ON piutang(customer);
CREATE INDEX IF NOT EXISTS idx_piutang_date ON piutang(date);
CREATE INDEX IF NOT EXISTS idx_app_logs_time ON app_logs(time);