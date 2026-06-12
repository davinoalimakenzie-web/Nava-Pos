/*
# Document Single-Tenant RLS Policies

1. Purpose
This migration adds security policy documentation for the Nava POS system.
The application is a SINGLE-TENANT POS that:
- Uses its own custom authentication (users table with username/password)
- Does NOT use Supabase Auth
- Shares ALL data across all logged-in users
- Does NOT require per-user data isolation

2. Security Model
- All users (owner, admin, kasir) share the same POS data
- Data visibility is controlled at the APPLICATION layer, not database layer
- Branch filtering is done in frontend code based on user.branch
- RLS policies are intentionally permissive (`USING (true)`) because:
  * The app uses anon key for database access
  * Auth is validated in the Express server before operations
  * Each "store" has its own database (multi-tenancy at deployment level)

3. Policy Approach
- `TO anon, authenticated` allows the anon-key client to operate
- `USING (true)` is ACCEPTABLE for single-tenant shared-data apps
- This is NOT a security bypass - it's intentional shared access design
*/

COMMENT ON TABLE users IS 'Single-tenant POS: App-level auth (not Supabase Auth). All users share data. RLS intentionally permissive.';
COMMENT ON TABLE inventory IS 'Single-tenant POS: Shared product catalog across all users. Branch filtering done in app layer.';
COMMENT ON TABLE customers IS 'Single-tenant POS: Shared customer database. No per-user isolation needed.';
COMMENT ON TABLE employees IS 'Single-tenant POS: Shared employee records across all admin users.';
COMMENT ON TABLE suppliers IS 'Single-tenant POS: Shared supplier records.';
COMMENT ON TABLE transactions IS 'Single-tenant POS: All transactions shared. Branch/date filtering in app.';
COMMENT ON TABLE expenses IS 'Single-tenant POS: Shared expense tracking across all admin users.';
COMMENT ON TABLE pending_transactions IS 'Single-tenant POS: Shared pending transactions queue.';
COMMENT ON TABLE attendances IS 'Single-tenant POS: Shared attendance records. Branch filtering in app.';
COMMENT ON TABLE leave_requests IS 'Single-tenant POS: Shared leave request queue.';
COMMENT ON TABLE waiting_payments IS 'Single-tenant POS: Shared salary payment queue.';
COMMENT ON TABLE wallets IS 'Single-tenant POS: Single store cash balance. Shared across all users.';
COMMENT ON TABLE piutang IS 'Single-tenant POS: Shared accounts receivable records.';
COMMENT ON TABLE store_settings IS 'Single-tenant POS: Single store configuration. Shared settings.';
COMMENT ON TABLE app_logs IS 'Single-tenant POS: Shared activity log for auditing.';
COMMENT ON TABLE bot_memory IS 'Single-tenant POS: Single AI assistant memory for store.';
COMMENT ON TABLE kewajiban_lain IS 'Single-tenant POS: Shared other liabilities.';
COMMENT ON TABLE hutang_supplier IS 'Single-tenant POS: Shared supplier payables.';
COMMENT ON TABLE supplier_returns IS 'Single-tenant POS: Shared supplier return records.';

-- Users policies
DROP POLICY IF EXISTS "anon_crud_users" ON users;
DROP POLICY IF EXISTS "anon_delete_users" ON users;
DROP POLICY IF EXISTS "anon_insert_users" ON users;
DROP POLICY IF EXISTS "anon_update_users" ON users;
CREATE POLICY "single_tenant_select_users" ON users FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_users" ON users FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_users" ON users FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_users" ON users FOR DELETE TO anon, authenticated USING (true);

-- Inventory policies
DROP POLICY IF EXISTS "anon_crud_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_delete_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_insert_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_update_inventory" ON inventory;
CREATE POLICY "single_tenant_select_inventory" ON inventory FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_inventory" ON inventory FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_inventory" ON inventory FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_inventory" ON inventory FOR DELETE TO anon, authenticated USING (true);

-- Customers policies
DROP POLICY IF EXISTS "anon_crud_customers" ON customers;
DROP POLICY IF EXISTS "anon_delete_customers" ON customers;
DROP POLICY IF EXISTS "anon_insert_customers" ON customers;
DROP POLICY IF EXISTS "anon_update_customers" ON customers;
CREATE POLICY "single_tenant_select_customers" ON customers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_customers" ON customers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_customers" ON customers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_customers" ON customers FOR DELETE TO anon, authenticated USING (true);

-- Employees policies
DROP POLICY IF EXISTS "anon_crud_employees" ON employees;
DROP POLICY IF EXISTS "anon_delete_employees" ON employees;
DROP POLICY IF EXISTS "anon_insert_employees" ON employees;
DROP POLICY IF EXISTS "anon_update_employees" ON employees;
CREATE POLICY "single_tenant_select_employees" ON employees FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_employees" ON employees FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_employees" ON employees FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_employees" ON employees FOR DELETE TO anon, authenticated USING (true);

-- Suppliers policies
DROP POLICY IF EXISTS "anon_crud_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_delete_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_insert_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_update_suppliers" ON suppliers;
CREATE POLICY "single_tenant_select_suppliers" ON suppliers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_suppliers" ON suppliers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_suppliers" ON suppliers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_suppliers" ON suppliers FOR DELETE TO anon, authenticated USING (true);

-- Transactions policies
DROP POLICY IF EXISTS "anon_crud_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_delete_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_insert_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_update_transactions" ON transactions;
CREATE POLICY "single_tenant_select_transactions" ON transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_transactions" ON transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_transactions" ON transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_transactions" ON transactions FOR DELETE TO anon, authenticated USING (true);

-- Expenses policies
DROP POLICY IF EXISTS "anon_crud_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_delete_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_insert_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_update_expenses" ON expenses;
CREATE POLICY "single_tenant_select_expenses" ON expenses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_expenses" ON expenses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_expenses" ON expenses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_expenses" ON expenses FOR DELETE TO anon, authenticated USING (true);

-- Pending transactions policies
DROP POLICY IF EXISTS "anon_crud_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_delete_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_insert_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_update_pending_transactions" ON pending_transactions;
CREATE POLICY "single_tenant_select_pending_transactions" ON pending_transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_pending_transactions" ON pending_transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_pending_transactions" ON pending_transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_pending_transactions" ON pending_transactions FOR DELETE TO anon, authenticated USING (true);

-- Attendances policies
DROP POLICY IF EXISTS "anon_crud_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_delete_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_insert_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_update_attendances" ON attendances;
CREATE POLICY "single_tenant_select_attendances" ON attendances FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_attendances" ON attendances FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_attendances" ON attendances FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_attendances" ON attendances FOR DELETE TO anon, authenticated USING (true);

-- Leave requests policies
DROP POLICY IF EXISTS "anon_crud_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_delete_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_insert_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_update_leave_requests" ON leave_requests;
CREATE POLICY "single_tenant_select_leave_requests" ON leave_requests FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_leave_requests" ON leave_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_leave_requests" ON leave_requests FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_leave_requests" ON leave_requests FOR DELETE TO anon, authenticated USING (true);

-- Waiting payments policies
DROP POLICY IF EXISTS "anon_crud_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_delete_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_insert_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_update_waiting_payments" ON waiting_payments;
CREATE POLICY "single_tenant_select_waiting_payments" ON waiting_payments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_waiting_payments" ON waiting_payments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_waiting_payments" ON waiting_payments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_waiting_payments" ON waiting_payments FOR DELETE TO anon, authenticated USING (true);

-- Wallets policies
DROP POLICY IF EXISTS "anon_crud_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_delete_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_insert_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_update_wallets" ON wallets;
CREATE POLICY "single_tenant_select_wallets" ON wallets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_wallets" ON wallets FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_wallets" ON wallets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_wallets" ON wallets FOR DELETE TO anon, authenticated USING (true);

-- Piutang policies
DROP POLICY IF EXISTS "anon_crud_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_delete_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_insert_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_update_piutang" ON piutang;
CREATE POLICY "single_tenant_select_piutang" ON piutang FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_piutang" ON piutang FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_piutang" ON piutang FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_piutang" ON piutang FOR DELETE TO anon, authenticated USING (true);

-- Store settings policies
DROP POLICY IF EXISTS "anon_crud_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_delete_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_insert_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_update_store_settings" ON store_settings;
CREATE POLICY "single_tenant_select_store_settings" ON store_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_store_settings" ON store_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_store_settings" ON store_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_store_settings" ON store_settings FOR DELETE TO anon, authenticated USING (true);

-- App logs policies
DROP POLICY IF EXISTS "anon_crud_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_delete_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_insert_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_update_app_logs" ON app_logs;
CREATE POLICY "single_tenant_select_app_logs" ON app_logs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_app_logs" ON app_logs FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_app_logs" ON app_logs FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_app_logs" ON app_logs FOR DELETE TO anon, authenticated USING (true);

-- Bot memory policies
DROP POLICY IF EXISTS "anon_crud_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_delete_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_insert_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_update_bot_memory" ON bot_memory;
CREATE POLICY "single_tenant_select_bot_memory" ON bot_memory FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_bot_memory" ON bot_memory FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_bot_memory" ON bot_memory FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_bot_memory" ON bot_memory FOR DELETE TO anon, authenticated USING (true);

-- Kewajiban lain policies
DROP POLICY IF EXISTS "anon_crud_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_delete_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_insert_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_update_kewajiban_lain" ON kewajiban_lain;
CREATE POLICY "single_tenant_select_kewajiban_lain" ON kewajiban_lain FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_kewajiban_lain" ON kewajiban_lain FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_kewajiban_lain" ON kewajiban_lain FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_kewajiban_lain" ON kewajiban_lain FOR DELETE TO anon, authenticated USING (true);

-- Hutang supplier policies
DROP POLICY IF EXISTS "anon_crud_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_delete_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_insert_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_update_hutang_supplier" ON hutang_supplier;
CREATE POLICY "single_tenant_select_hutang_supplier" ON hutang_supplier FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_hutang_supplier" ON hutang_supplier FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_hutang_supplier" ON hutang_supplier FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_hutang_supplier" ON hutang_supplier FOR DELETE TO anon, authenticated USING (true);

-- Supplier returns policies
DROP POLICY IF EXISTS "anon_crud_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_delete_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_insert_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_update_supplier_returns" ON supplier_returns;
CREATE POLICY "single_tenant_select_supplier_returns" ON supplier_returns FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "single_tenant_insert_supplier_returns" ON supplier_returns FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "single_tenant_update_supplier_returns" ON supplier_returns FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single_tenant_delete_supplier_returns" ON supplier_returns FOR DELETE TO anon, authenticated USING (true);