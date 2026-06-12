/*
# Core Tables for Nava POS

1. New Tables
- `users`: App users (owner, admin, kasir) with credentials and roles
- `inventory`: Product stock items with pricing
- `customers`: Customer records with pricing levels
- `employees`: Employee records with salary info
- `suppliers`: Supplier/vendor records

2. Security
- RLS enabled on all tables
- Single-tenant app with own auth - policies allow anon/authenticated CRUD
- Data is shared across all users of the POS system

3. Notes
- Uses UUID primary keys for all tables
- Timestamps with timezone for all created_at fields
- Branch field for multi-location support
*/

-- Users table (app-specific auth, not Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'kasir')),
  branch text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id integer PRIMARY KEY,
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text,
  price1 integer NOT NULL DEFAULT 0,
  price2 integer NOT NULL DEFAULT 0,
  supplier_price integer DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  branch text,
  created_at timestamptz DEFAULT now()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id integer PRIMARY KEY,
  name text NOT NULL,
  address text DEFAULT '-',
  phone text DEFAULT '-',
  level integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id integer PRIMARY KEY,
  name text NOT NULL,
  position text,
  phone text DEFAULT '-',
  daily_salary integer DEFAULT 0,
  late_penalty_per_min numeric DEFAULT 0,
  branch text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  contact text,
  address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Users policies
DROP POLICY IF EXISTS "anon_crud_users" ON users;
CREATE POLICY "anon_crud_users" ON users FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_users" ON users FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_users" ON users FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_users" ON users FOR DELETE TO anon, authenticated USING (true);

-- Inventory policies
DROP POLICY IF EXISTS "anon_crud_inventory" ON inventory;
CREATE POLICY "anon_crud_inventory" ON inventory FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_inventory" ON inventory FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_inventory" ON inventory FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_inventory" ON inventory FOR DELETE TO anon, authenticated USING (true);

-- Customers policies
DROP POLICY IF EXISTS "anon_crud_customers" ON customers;
CREATE POLICY "anon_crud_customers" ON customers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_customers" ON customers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_customers" ON customers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_customers" ON customers FOR DELETE TO anon, authenticated USING (true);

-- Employees policies
DROP POLICY IF EXISTS "anon_crud_employees" ON employees;
CREATE POLICY "anon_crud_employees" ON employees FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_employees" ON employees FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_employees" ON employees FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_employees" ON employees FOR DELETE TO anon, authenticated USING (true);

-- Suppliers policies
DROP POLICY IF EXISTS "anon_crud_suppliers" ON suppliers;
CREATE POLICY "anon_crud_suppliers" ON suppliers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_suppliers" ON suppliers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_suppliers" ON suppliers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_suppliers" ON suppliers FOR DELETE TO anon, authenticated USING (true);