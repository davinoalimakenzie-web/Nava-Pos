/*
# Transaction Tables for Nava POS

1. New Tables
- `transactions`: Sales/purchase records with items, payment methods, totals
- `expenses`: Operational expenses, kasbon, gaji, prive
- `pending_transactions`: Held transactions waiting to be processed

2. Security
- RLS enabled on all tables
- Single-tenant policies allowing anon/authenticated CRUD

3. Notes
- Transactions use text ID for custom formatting (TRX-YYYYMMDD-XXXX)
- Items stored as JSONB array for flexibility
- Expenses have is_bon flag for employee kasbon tracking
*/

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id text PRIMARY KEY,
  date text NOT NULL,
  iso_date timestamptz DEFAULT now(),
  customer text DEFAULT 'Pelanggan Umum',
  items jsonb NOT NULL DEFAULT '[]',
  total integer NOT NULL DEFAULT 0,
  retur_total integer DEFAULT 0,
  global_discount integer DEFAULT 0,
  method text NOT NULL,
  paid integer DEFAULT 0,
  change integer DEFAULT 0,
  cashier text,
  branch text,
  cash_received integer DEFAULT 0,
  type text DEFAULT 'PENJUALAN',
  status text DEFAULT 'Selesai',
  note text,
  created_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id text PRIMARY KEY,
  date text NOT NULL,
  iso_date timestamptz DEFAULT now(),
  name text NOT NULL,
  amount integer NOT NULL,
  cashier text,
  branch text,
  wallet text DEFAULT 'Dana Laci',
  is_bon boolean DEFAULT false,
  bon_employee text,
  bon_reason text,
  status text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Pending transactions table
CREATE TABLE IF NOT EXISTS pending_transactions (
  id text PRIMARY KEY,
  time text,
  date_string text,
  customer_name text,
  customer_id integer,
  sales text,
  items jsonb NOT NULL DEFAULT '[]',
  total integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_transactions ENABLE ROW LEVEL SECURITY;

-- Transactions policies
DROP POLICY IF EXISTS "anon_crud_transactions" ON transactions;
CREATE POLICY "anon_crud_transactions" ON transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_transactions" ON transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_transactions" ON transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_transactions" ON transactions FOR DELETE TO anon, authenticated USING (true);

-- Expenses policies
DROP POLICY IF EXISTS "anon_crud_expenses" ON expenses;
CREATE POLICY "anon_crud_expenses" ON expenses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_expenses" ON expenses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_expenses" ON expenses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_expenses" ON expenses FOR DELETE TO anon, authenticated USING (true);

-- Pending transactions policies
DROP POLICY IF EXISTS "anon_crud_pending_transactions" ON pending_transactions;
CREATE POLICY "anon_crud_pending_transactions" ON pending_transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_pending_transactions" ON pending_transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_pending_transactions" ON pending_transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_pending_transactions" ON pending_transactions FOR DELETE TO anon, authenticated USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_branch ON transactions(branch);
CREATE INDEX IF NOT EXISTS idx_transactions_method ON transactions(method);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_branch ON expenses(branch);