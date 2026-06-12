
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
export const defaultDate = `${yyyy}-${mm}-${dd}`;
export const currentMonthStr = `${yyyy}-${mm}`;
export const todayStrDisplay = `${yyyy}-${mm}-${dd} 10:00:00`;
export const todayIso = today.toISOString();

export const initialUsers = [
  {
    "id": "u0",
    "username": "owner",
    "password": "123",
    "name": "Owner",
    "role": "owner",
    "branch": "Kudus"
  },
  {
    "id": "u1",
    "username": "admin",
    "password": "123",
    "name": "Budi (Admin Kudus)",
    "role": "admin",
    "branch": "Kudus"
  },
  {
    "id": "u2",
    "username": "kasir",
    "password": "123",
    "name": "Siti (Kasir Kudus)",
    "role": "kasir",
    "branch": "Kudus"
  },
  {
    "id": "u3",
    "username": "admin2",
    "password": "123",
    "name": "Joko (Admin Pati)",
    "role": "admin",
    "branch": "Pati"
  },
  {
    "id": "u4",
    "username": "kasir2",
    "password": "123",
    "name": "Rina (Kasir Pati)",
    "role": "kasir",
    "branch": "Pati"
  }
];
export const initialCustomers = [
  {
    "id": 1,
    "name": "Pelanggan Umum",
    "address": "-",
    "phone": "-",
    "level": 1
  }
];
export const initialEmployees: any[] = [];
export const initialInventory: any[] = [];

export const initialAttendances: any[] = [];
export const initialTransactions: any[] = [];
export const initialExpenses: any[] = [];
export const initialPiutang: any[] = [];
export const initialOrderData: any[] = [];
export const initialPendingTransactions: any[] = [];
export const initialLeaveRequests: any[] = [];

