/*
# Clean Up All Legacy RLS Policies

1. Purpose
Remove ALL remaining "anon_*" and "anon_crud_*" policies that were created
in earlier migrations. These duplicate policies are triggering security warnings.

2. What This Migration Does
- Drops all policies starting with "anon_" or "anon_crud_" from all tables
- The "single_tenant_*" policies created in migration 005 remain
- This eliminates the duplicate policy issue

3. Tables Affected
All 18 tables in the single-tenant POS system.
*/

-- Users - remove all anon policies
DROP POLICY IF EXISTS "anon_crud_users" ON users;
DROP POLICY IF EXISTS "anon_select_users" ON users;
DROP POLICY IF EXISTS "anon_insert_users" ON users;
DROP POLICY IF EXISTS "anon_update_users" ON users;
DROP POLICY IF EXISTS "anon_delete_users" ON users;

-- Inventory
DROP POLICY IF EXISTS "anon_crud_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_select_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_insert_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_update_inventory" ON inventory;
DROP POLICY IF EXISTS "anon_delete_inventory" ON inventory;

-- Customers
DROP POLICY IF EXISTS "anon_crud_customers" ON customers;
DROP POLICY IF EXISTS "anon_select_customers" ON customers;
DROP POLICY IF EXISTS "anon_insert_customers" ON customers;
DROP POLICY IF EXISTS "anon_update_customers" ON customers;
DROP POLICY IF EXISTS "anon_delete_customers" ON customers;

-- Employees
DROP POLICY IF EXISTS "anon_crud_employees" ON employees;
DROP POLICY IF EXISTS "anon_select_employees" ON employees;
DROP POLICY IF EXISTS "anon_insert_employees" ON employees;
DROP POLICY IF EXISTS "anon_update_employees" ON employees;
DROP POLICY IF EXISTS "anon_delete_employees" ON employees;

-- Suppliers
DROP POLICY IF EXISTS "anon_crud_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_select_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_insert_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_update_suppliers" ON suppliers;
DROP POLICY IF EXISTS "anon_delete_suppliers" ON suppliers;

-- Transactions
DROP POLICY IF EXISTS "anon_crud_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_select_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_insert_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_update_transactions" ON transactions;
DROP POLICY IF EXISTS "anon_delete_transactions" ON transactions;

-- Expenses
DROP POLICY IF EXISTS "anon_crud_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_select_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_insert_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_update_expenses" ON expenses;
DROP POLICY IF EXISTS "anon_delete_expenses" ON expenses;

-- Pending Transactions
DROP POLICY IF EXISTS "anon_crud_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_select_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_insert_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_update_pending_transactions" ON pending_transactions;
DROP POLICY IF EXISTS "anon_delete_pending_transactions" ON pending_transactions;

-- Attendances
DROP POLICY IF EXISTS "anon_crud_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_select_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_insert_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_update_attendances" ON attendances;
DROP POLICY IF EXISTS "anon_delete_attendances" ON attendances;

-- Leave Requests
DROP POLICY IF EXISTS "anon_crud_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_select_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_insert_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_update_leave_requests" ON leave_requests;
DROP POLICY IF EXISTS "anon_delete_leave_requests" ON leave_requests;

-- Waiting Payments
DROP POLICY IF EXISTS "anon_crud_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_select_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_insert_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_update_waiting_payments" ON waiting_payments;
DROP POLICY IF EXISTS "anon_delete_waiting_payments" ON waiting_payments;

-- Wallets
DROP POLICY IF EXISTS "anon_crud_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_select_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_insert_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_update_wallets" ON wallets;
DROP POLICY IF EXISTS "anon_delete_wallets" ON wallets;

-- Piutang
DROP POLICY IF EXISTS "anon_crud_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_select_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_insert_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_update_piutang" ON piutang;
DROP POLICY IF EXISTS "anon_delete_piutang" ON piutang;

-- Store Settings
DROP POLICY IF EXISTS "anon_crud_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_select_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_insert_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_update_store_settings" ON store_settings;
DROP POLICY IF EXISTS "anon_delete_store_settings" ON store_settings;

-- App Logs
DROP POLICY IF EXISTS "anon_crud_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_select_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_insert_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_update_app_logs" ON app_logs;
DROP POLICY IF EXISTS "anon_delete_app_logs" ON app_logs;

-- Bot Memory
DROP POLICY IF EXISTS "anon_crud_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_select_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_insert_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_update_bot_memory" ON bot_memory;
DROP POLICY IF EXISTS "anon_delete_bot_memory" ON bot_memory;

-- Kewajiban Lain
DROP POLICY IF EXISTS "anon_crud_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_select_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_insert_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_update_kewajiban_lain" ON kewajiban_lain;
DROP POLICY IF EXISTS "anon_delete_kewajiban_lain" ON kewajiban_lain;

-- Hutang Supplier
DROP POLICY IF EXISTS "anon_crud_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_select_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_insert_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_update_hutang_supplier" ON hutang_supplier;
DROP POLICY IF EXISTS "anon_delete_hutang_supplier" ON hutang_supplier;

-- Supplier Returns
DROP POLICY IF EXISTS "anon_crud_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_select_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_insert_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_update_supplier_returns" ON supplier_returns;
DROP POLICY IF EXISTS "anon_delete_supplier_returns" ON supplier_returns;