/*
# Attendance and HR Tables for Nava POS

1. New Tables
- `attendances`: Employee clock in/out records with late penalties
- `leave_requests`: Employee leave/cuti requests with approval status
- `waiting_payments`: Pending salary payments (THP) awaiting approval

2. Security
- RLS enabled on all tables
- Single-tenant policies allowing anon/authenticated CRUD

3. Notes
- Attendances track late_mins for penalty calculations
- Leave requests have status workflow (Pending, Disetujui, Ditolak)
- Waiting payments used for salary disbursement queue
- "employee_name" used instead of "user" (reserved keyword)
*/

-- Attendances table
CREATE TABLE IF NOT EXISTS attendances (
  id integer PRIMARY KEY,
  date text NOT NULL,
  iso_date timestamptz DEFAULT now(),
  employee_name text NOT NULL,
  time_in text,
  time_out text,
  status text NOT NULL DEFAULT 'Clock In',
  late_mins integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Leave requests table
CREATE TABLE IF NOT EXISTS leave_requests (
  id text PRIMARY KEY,
  employee_name text NOT NULL,
  date text NOT NULL,
  start_date text,
  end_date text,
  reason text,
  status text NOT NULL DEFAULT 'Pending',
  request_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Waiting payments table (salary payment queue)
CREATE TABLE IF NOT EXISTS waiting_payments (
  id text PRIMARY KEY,
  name text NOT NULL,
  salary integer NOT NULL DEFAULT 0,
  bonus integer DEFAULT 0,
  details text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiting_payments ENABLE ROW LEVEL SECURITY;

-- Attendances policies
DROP POLICY IF EXISTS "anon_crud_attendances" ON attendances;
CREATE POLICY "anon_crud_attendances" ON attendances FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_attendances" ON attendances FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_attendances" ON attendances FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_attendances" ON attendances FOR DELETE TO anon, authenticated USING (true);

-- Leave requests policies
DROP POLICY IF EXISTS "anon_crud_leave_requests" ON leave_requests;
CREATE POLICY "anon_crud_leave_requests" ON leave_requests FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_leave_requests" ON leave_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_leave_requests" ON leave_requests FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_leave_requests" ON leave_requests FOR DELETE TO anon, authenticated USING (true);

-- Waiting payments policies
DROP POLICY IF EXISTS "anon_crud_waiting_payments" ON waiting_payments;
CREATE POLICY "anon_crud_waiting_payments" ON waiting_payments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_waiting_payments" ON waiting_payments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_waiting_payments" ON waiting_payments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_waiting_payments" ON waiting_payments FOR DELETE TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_attendances_date ON attendances(date);
CREATE INDEX IF NOT EXISTS idx_attendances_employee ON attendances(employee_name);
CREATE INDEX IF NOT EXISTS idx_leave_requests_date ON leave_requests(date);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);