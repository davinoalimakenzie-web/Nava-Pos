
export const defaultDate = '2026-06-03';
export const currentMonthStr = '2026-06';
export const todayStrDisplay = '2026-06-03 10:00:00';
export const todayIso = '2026-06-03T05:38:58.896Z';

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
  },
  {
    "id": 2,
    "name": "Toko Langganan 1",
    "address": "Jl. Melati",
    "phone": "081",
    "level": 2
  },
  {
    "id": 3,
    "name": "Toko Langganan 2",
    "address": "Jl. Mawar",
    "phone": "082",
    "level": 2
  }
];
export const initialEmployees = [
  {
    "id": 1,
    "name": "Budi (Admin Kudus)",
    "position": "Admin / Manager",
    "dailySalary": 100000,
    "latePenaltyPerMin": 166.66666666666666,
    "branch": "Kudus"
  },
  {
    "id": 2,
    "name": "Siti (Kasir Kudus)",
    "position": "Staff Kasir",
    "dailySalary": 80000,
    "latePenaltyPerMin": 166.66666666666666,
    "branch": "Kudus"
  },
  {
    "id": 3,
    "name": "Agus (Teknisi Kudus)",
    "position": "Teknisi",
    "dailySalary": 90000,
    "latePenaltyPerMin": 166.66666666666666,
    "branch": "Kudus"
  },
  {
    "id": 4,
    "name": "Joko (Admin Pati)",
    "position": "Admin / Manager",
    "dailySalary": 100000,
    "latePenaltyPerMin": 166.66666666666666,
    "branch": "Pati"
  },
  {
    "id": 5,
    "name": "Rina (Kasir Pati)",
    "position": "Staff Kasir",
    "dailySalary": 80000,
    "latePenaltyPerMin": 166.66666666666666,
    "branch": "Pati"
  }
];
export const initialInventory = [
  {
    "id": 1,
    "code": "L001",
    "name": "LCD iPhone 11 Pro",
    "category": "LCD",
    "price1": 650000,
    "price2": 550000,
    "stock": 50
  },
  {
    "id": 2,
    "code": "L002",
    "name": "LCD Samsung A51",
    "category": "LCD",
    "price1": 450000,
    "price2": 350000,
    "stock": 50
  },
  {
    "id": 3,
    "code": "L003",
    "name": "LCD Xiaomi Note 10",
    "category": "LCD",
    "price1": 300000,
    "price2": 250000,
    "stock": 50
  },
  {
    "id": 4,
    "code": "L004",
    "name": "LCD Oppo F11",
    "category": "LCD",
    "price1": 280000,
    "price2": 230000,
    "stock": 50
  },
  {
    "id": 5,
    "code": "B001",
    "name": "Baterai iPhone 12",
    "category": "Batre",
    "price1": 350000,
    "price2": 280000,
    "stock": 40
  },
  {
    "id": 6,
    "code": "B002",
    "name": "Baterai Samsung S20",
    "category": "Batre",
    "price1": 250000,
    "price2": 200000,
    "stock": 45
  },
  {
    "id": 7,
    "code": "B003",
    "name": "Baterai Xiaomi BM4X",
    "category": "Batre",
    "price1": 150000,
    "price2": 120000,
    "stock": 60
  },
  {
    "id": 8,
    "code": "A001",
    "name": "Tempered Glass V-Gen",
    "category": "Aksesoris",
    "price1": 50000,
    "price2": 30000,
    "stock": 150
  },
  {
    "id": 9,
    "code": "A002",
    "name": "Kabel Data Type-C Fast",
    "category": "Aksesoris",
    "price1": 45000,
    "price2": 25000,
    "stock": 100
  },
  {
    "id": 10,
    "code": "A003",
    "name": "Charger Adaptor 20W",
    "category": "Aksesoris",
    "price1": 120000,
    "price2": 90000,
    "stock": 80
  },
  {
    "id": 11,
    "code": "S001",
    "name": "Speaker iPhone 11 Pro",
    "category": "Speaker",
    "price1": 150000,
    "price2": 120000,
    "stock": 20
  },
  {
    "id": 12,
    "code": "F001",
    "name": "Flexible Charger Samsung A51",
    "category": "Flexible",
    "price1": 95000,
    "price2": 75000,
    "stock": 30
  },
  {
    "id": 13,
    "code": "C001",
    "name": "Kamera Belakang Xiaomi Note 10",
    "category": "Kamera",
    "price1": 250000,
    "price2": 200000,
    "stock": 15
  }
];
export const initialAttendances = [
  {
    "id": 1,
    "date": "2026-01-01",
    "isoDate": "2026-01-01T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 2,
    "date": "2026-01-01",
    "isoDate": "2026-01-01T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 3,
    "date": "2026-01-01",
    "isoDate": "2026-01-01T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 4,
    "date": "2026-01-01",
    "isoDate": "2026-01-01T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 5,
    "date": "2026-01-01",
    "isoDate": "2026-01-01T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 6,
    "date": "2026-01-02",
    "isoDate": "2026-01-02T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 7,
    "date": "2026-01-02",
    "isoDate": "2026-01-02T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 8,
    "date": "2026-01-02",
    "isoDate": "2026-01-02T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 9,
    "date": "2026-01-02",
    "isoDate": "2026-01-02T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 10,
    "date": "2026-01-02",
    "isoDate": "2026-01-02T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 11,
    "date": "2026-01-03",
    "isoDate": "2026-01-03T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 12,
    "date": "2026-01-03",
    "isoDate": "2026-01-03T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 13,
    "date": "2026-01-03",
    "isoDate": "2026-01-03T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 14,
    "date": "2026-01-03",
    "isoDate": "2026-01-03T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 15,
    "date": "2026-01-03",
    "isoDate": "2026-01-03T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:35",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 35
  },
  {
    "id": 16,
    "date": "2026-01-04",
    "isoDate": "2026-01-04T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 17,
    "date": "2026-01-04",
    "isoDate": "2026-01-04T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 18,
    "date": "2026-01-04",
    "isoDate": "2026-01-04T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 19,
    "date": "2026-01-04",
    "isoDate": "2026-01-04T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 20,
    "date": "2026-01-04",
    "isoDate": "2026-01-04T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 21,
    "date": "2026-01-05",
    "isoDate": "2026-01-05T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 22,
    "date": "2026-01-05",
    "isoDate": "2026-01-05T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 23,
    "date": "2026-01-05",
    "isoDate": "2026-01-05T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 24,
    "date": "2026-01-05",
    "isoDate": "2026-01-05T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 25,
    "date": "2026-01-05",
    "isoDate": "2026-01-05T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 26,
    "date": "2026-01-06",
    "isoDate": "2026-01-06T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 27,
    "date": "2026-01-06",
    "isoDate": "2026-01-06T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 28,
    "date": "2026-01-06",
    "isoDate": "2026-01-06T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 29,
    "date": "2026-01-06",
    "isoDate": "2026-01-06T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 30,
    "date": "2026-01-06",
    "isoDate": "2026-01-06T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 31,
    "date": "2026-01-07",
    "isoDate": "2026-01-07T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 32,
    "date": "2026-01-07",
    "isoDate": "2026-01-07T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:17",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 17
  },
  {
    "id": 33,
    "date": "2026-01-07",
    "isoDate": "2026-01-07T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 34,
    "date": "2026-01-07",
    "isoDate": "2026-01-07T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 35,
    "date": "2026-01-07",
    "isoDate": "2026-01-07T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 36,
    "date": "2026-01-08",
    "isoDate": "2026-01-08T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 37,
    "date": "2026-01-08",
    "isoDate": "2026-01-08T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 38,
    "date": "2026-01-08",
    "isoDate": "2026-01-08T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 39,
    "date": "2026-01-08",
    "isoDate": "2026-01-08T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:28",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 28
  },
  {
    "id": 40,
    "date": "2026-01-08",
    "isoDate": "2026-01-08T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 41,
    "date": "2026-01-09",
    "isoDate": "2026-01-09T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 42,
    "date": "2026-01-09",
    "isoDate": "2026-01-09T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 43,
    "date": "2026-01-09",
    "isoDate": "2026-01-09T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 44,
    "date": "2026-01-09",
    "isoDate": "2026-01-09T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 45,
    "date": "2026-01-09",
    "isoDate": "2026-01-09T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 46,
    "date": "2026-01-10",
    "isoDate": "2026-01-10T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 47,
    "date": "2026-01-10",
    "isoDate": "2026-01-10T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 48,
    "date": "2026-01-10",
    "isoDate": "2026-01-10T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 49,
    "date": "2026-01-10",
    "isoDate": "2026-01-10T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 50,
    "date": "2026-01-10",
    "isoDate": "2026-01-10T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 51,
    "date": "2026-01-11",
    "isoDate": "2026-01-11T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 52,
    "date": "2026-01-11",
    "isoDate": "2026-01-11T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 53,
    "date": "2026-01-11",
    "isoDate": "2026-01-11T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 54,
    "date": "2026-01-11",
    "isoDate": "2026-01-11T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 55,
    "date": "2026-01-11",
    "isoDate": "2026-01-11T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 56,
    "date": "2026-01-12",
    "isoDate": "2026-01-12T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 57,
    "date": "2026-01-12",
    "isoDate": "2026-01-12T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 58,
    "date": "2026-01-12",
    "isoDate": "2026-01-12T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 59,
    "date": "2026-01-12",
    "isoDate": "2026-01-12T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 60,
    "date": "2026-01-12",
    "isoDate": "2026-01-12T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 61,
    "date": "2026-01-13",
    "isoDate": "2026-01-13T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 62,
    "date": "2026-01-13",
    "isoDate": "2026-01-13T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 63,
    "date": "2026-01-13",
    "isoDate": "2026-01-13T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 64,
    "date": "2026-01-13",
    "isoDate": "2026-01-13T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 65,
    "date": "2026-01-13",
    "isoDate": "2026-01-13T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 66,
    "date": "2026-01-14",
    "isoDate": "2026-01-14T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:33",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 33
  },
  {
    "id": 67,
    "date": "2026-01-14",
    "isoDate": "2026-01-14T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 68,
    "date": "2026-01-14",
    "isoDate": "2026-01-14T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 69,
    "date": "2026-01-14",
    "isoDate": "2026-01-14T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 70,
    "date": "2026-01-14",
    "isoDate": "2026-01-14T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 71,
    "date": "2026-01-15",
    "isoDate": "2026-01-15T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 72,
    "date": "2026-01-15",
    "isoDate": "2026-01-15T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 73,
    "date": "2026-01-15",
    "isoDate": "2026-01-15T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:27",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 27
  },
  {
    "id": 74,
    "date": "2026-01-15",
    "isoDate": "2026-01-15T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 75,
    "date": "2026-01-15",
    "isoDate": "2026-01-15T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 76,
    "date": "2026-01-16",
    "isoDate": "2026-01-16T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 77,
    "date": "2026-01-16",
    "isoDate": "2026-01-16T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 78,
    "date": "2026-01-16",
    "isoDate": "2026-01-16T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:40",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 40
  },
  {
    "id": 79,
    "date": "2026-01-16",
    "isoDate": "2026-01-16T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 80,
    "date": "2026-01-16",
    "isoDate": "2026-01-16T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 81,
    "date": "2026-01-17",
    "isoDate": "2026-01-17T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:26",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 26
  },
  {
    "id": 82,
    "date": "2026-01-17",
    "isoDate": "2026-01-17T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 83,
    "date": "2026-01-17",
    "isoDate": "2026-01-17T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 84,
    "date": "2026-01-17",
    "isoDate": "2026-01-17T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 85,
    "date": "2026-01-17",
    "isoDate": "2026-01-17T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:26",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 26
  },
  {
    "id": 86,
    "date": "2026-01-18",
    "isoDate": "2026-01-18T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:39",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 39
  },
  {
    "id": 87,
    "date": "2026-01-18",
    "isoDate": "2026-01-18T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 88,
    "date": "2026-01-18",
    "isoDate": "2026-01-18T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 89,
    "date": "2026-01-18",
    "isoDate": "2026-01-18T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 90,
    "date": "2026-01-18",
    "isoDate": "2026-01-18T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 91,
    "date": "2026-01-19",
    "isoDate": "2026-01-19T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 92,
    "date": "2026-01-19",
    "isoDate": "2026-01-19T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 93,
    "date": "2026-01-19",
    "isoDate": "2026-01-19T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 94,
    "date": "2026-01-19",
    "isoDate": "2026-01-19T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:34",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 34
  },
  {
    "id": 95,
    "date": "2026-01-19",
    "isoDate": "2026-01-19T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 96,
    "date": "2026-01-20",
    "isoDate": "2026-01-20T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 97,
    "date": "2026-01-20",
    "isoDate": "2026-01-20T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 98,
    "date": "2026-01-20",
    "isoDate": "2026-01-20T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 99,
    "date": "2026-01-20",
    "isoDate": "2026-01-20T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 100,
    "date": "2026-01-20",
    "isoDate": "2026-01-20T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:44",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 44
  },
  {
    "id": 101,
    "date": "2026-01-21",
    "isoDate": "2026-01-21T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 102,
    "date": "2026-01-21",
    "isoDate": "2026-01-21T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:44",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 44
  },
  {
    "id": 103,
    "date": "2026-01-21",
    "isoDate": "2026-01-21T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 104,
    "date": "2026-01-21",
    "isoDate": "2026-01-21T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 105,
    "date": "2026-01-21",
    "isoDate": "2026-01-21T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 106,
    "date": "2026-01-22",
    "isoDate": "2026-01-22T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 107,
    "date": "2026-01-22",
    "isoDate": "2026-01-22T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 108,
    "date": "2026-01-22",
    "isoDate": "2026-01-22T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 109,
    "date": "2026-01-22",
    "isoDate": "2026-01-22T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 110,
    "date": "2026-01-22",
    "isoDate": "2026-01-22T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 111,
    "date": "2026-01-23",
    "isoDate": "2026-01-23T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 112,
    "date": "2026-01-23",
    "isoDate": "2026-01-23T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 113,
    "date": "2026-01-23",
    "isoDate": "2026-01-23T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 114,
    "date": "2026-01-23",
    "isoDate": "2026-01-23T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 115,
    "date": "2026-01-23",
    "isoDate": "2026-01-23T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:36",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 36
  },
  {
    "id": 116,
    "date": "2026-01-24",
    "isoDate": "2026-01-24T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 117,
    "date": "2026-01-24",
    "isoDate": "2026-01-24T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 118,
    "date": "2026-01-24",
    "isoDate": "2026-01-24T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 119,
    "date": "2026-01-24",
    "isoDate": "2026-01-24T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 120,
    "date": "2026-01-24",
    "isoDate": "2026-01-24T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 121,
    "date": "2026-01-25",
    "isoDate": "2026-01-25T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:28",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 28
  },
  {
    "id": 122,
    "date": "2026-01-25",
    "isoDate": "2026-01-25T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 123,
    "date": "2026-01-25",
    "isoDate": "2026-01-25T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 124,
    "date": "2026-01-25",
    "isoDate": "2026-01-25T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 125,
    "date": "2026-01-25",
    "isoDate": "2026-01-25T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 126,
    "date": "2026-01-26",
    "isoDate": "2026-01-26T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 127,
    "date": "2026-01-26",
    "isoDate": "2026-01-26T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 128,
    "date": "2026-01-26",
    "isoDate": "2026-01-26T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 129,
    "date": "2026-01-26",
    "isoDate": "2026-01-26T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 130,
    "date": "2026-01-26",
    "isoDate": "2026-01-26T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 131,
    "date": "2026-01-27",
    "isoDate": "2026-01-27T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 132,
    "date": "2026-01-27",
    "isoDate": "2026-01-27T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 133,
    "date": "2026-01-27",
    "isoDate": "2026-01-27T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 134,
    "date": "2026-01-27",
    "isoDate": "2026-01-27T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 135,
    "date": "2026-01-27",
    "isoDate": "2026-01-27T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 136,
    "date": "2026-01-28",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 137,
    "date": "2026-01-28",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 138,
    "date": "2026-01-28",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 139,
    "date": "2026-01-28",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 140,
    "date": "2026-01-28",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:29",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 29
  },
  {
    "id": 141,
    "date": "2026-01-29",
    "isoDate": "2026-01-29T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 142,
    "date": "2026-01-29",
    "isoDate": "2026-01-29T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 143,
    "date": "2026-01-29",
    "isoDate": "2026-01-29T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 144,
    "date": "2026-01-29",
    "isoDate": "2026-01-29T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 145,
    "date": "2026-01-29",
    "isoDate": "2026-01-29T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 146,
    "date": "2026-01-30",
    "isoDate": "2026-01-30T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 147,
    "date": "2026-01-30",
    "isoDate": "2026-01-30T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 148,
    "date": "2026-01-30",
    "isoDate": "2026-01-30T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 149,
    "date": "2026-01-30",
    "isoDate": "2026-01-30T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 150,
    "date": "2026-01-30",
    "isoDate": "2026-01-30T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:30",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 30
  },
  {
    "id": 151,
    "date": "2026-01-31",
    "isoDate": "2026-01-31T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 152,
    "date": "2026-01-31",
    "isoDate": "2026-01-31T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 153,
    "date": "2026-01-31",
    "isoDate": "2026-01-31T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 154,
    "date": "2026-01-31",
    "isoDate": "2026-01-31T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 155,
    "date": "2026-01-31",
    "isoDate": "2026-01-31T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 156,
    "date": "2026-02-01",
    "isoDate": "2026-02-01T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 157,
    "date": "2026-02-01",
    "isoDate": "2026-02-01T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 158,
    "date": "2026-02-01",
    "isoDate": "2026-02-01T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 159,
    "date": "2026-02-01",
    "isoDate": "2026-02-01T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 160,
    "date": "2026-02-01",
    "isoDate": "2026-02-01T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 161,
    "date": "2026-02-02",
    "isoDate": "2026-02-02T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 162,
    "date": "2026-02-02",
    "isoDate": "2026-02-02T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 163,
    "date": "2026-02-02",
    "isoDate": "2026-02-02T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 164,
    "date": "2026-02-02",
    "isoDate": "2026-02-02T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 165,
    "date": "2026-02-02",
    "isoDate": "2026-02-02T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 166,
    "date": "2026-02-03",
    "isoDate": "2026-02-03T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 167,
    "date": "2026-02-03",
    "isoDate": "2026-02-03T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 168,
    "date": "2026-02-03",
    "isoDate": "2026-02-03T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 169,
    "date": "2026-02-03",
    "isoDate": "2026-02-03T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 170,
    "date": "2026-02-03",
    "isoDate": "2026-02-03T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 171,
    "date": "2026-02-04",
    "isoDate": "2026-02-04T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 172,
    "date": "2026-02-04",
    "isoDate": "2026-02-04T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 173,
    "date": "2026-02-04",
    "isoDate": "2026-02-04T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 174,
    "date": "2026-02-04",
    "isoDate": "2026-02-04T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 175,
    "date": "2026-02-04",
    "isoDate": "2026-02-04T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 176,
    "date": "2026-02-05",
    "isoDate": "2026-02-05T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 177,
    "date": "2026-02-05",
    "isoDate": "2026-02-05T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 178,
    "date": "2026-02-05",
    "isoDate": "2026-02-05T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 179,
    "date": "2026-02-05",
    "isoDate": "2026-02-05T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 180,
    "date": "2026-02-05",
    "isoDate": "2026-02-05T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 181,
    "date": "2026-02-06",
    "isoDate": "2026-02-06T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 182,
    "date": "2026-02-06",
    "isoDate": "2026-02-06T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 183,
    "date": "2026-02-06",
    "isoDate": "2026-02-06T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 184,
    "date": "2026-02-06",
    "isoDate": "2026-02-06T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 185,
    "date": "2026-02-06",
    "isoDate": "2026-02-06T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 186,
    "date": "2026-02-07",
    "isoDate": "2026-02-07T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 187,
    "date": "2026-02-07",
    "isoDate": "2026-02-07T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 188,
    "date": "2026-02-07",
    "isoDate": "2026-02-07T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 189,
    "date": "2026-02-07",
    "isoDate": "2026-02-07T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 190,
    "date": "2026-02-07",
    "isoDate": "2026-02-07T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 191,
    "date": "2026-02-08",
    "isoDate": "2026-02-08T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 192,
    "date": "2026-02-08",
    "isoDate": "2026-02-08T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 193,
    "date": "2026-02-08",
    "isoDate": "2026-02-08T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 194,
    "date": "2026-02-08",
    "isoDate": "2026-02-08T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 195,
    "date": "2026-02-08",
    "isoDate": "2026-02-08T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 196,
    "date": "2026-02-09",
    "isoDate": "2026-02-09T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:40",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 40
  },
  {
    "id": 197,
    "date": "2026-02-09",
    "isoDate": "2026-02-09T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:44",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 44
  },
  {
    "id": 198,
    "date": "2026-02-09",
    "isoDate": "2026-02-09T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 199,
    "date": "2026-02-09",
    "isoDate": "2026-02-09T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 200,
    "date": "2026-02-09",
    "isoDate": "2026-02-09T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 201,
    "date": "2026-02-10",
    "isoDate": "2026-02-10T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 202,
    "date": "2026-02-10",
    "isoDate": "2026-02-10T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 203,
    "date": "2026-02-10",
    "isoDate": "2026-02-10T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 204,
    "date": "2026-02-10",
    "isoDate": "2026-02-10T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 205,
    "date": "2026-02-10",
    "isoDate": "2026-02-10T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 206,
    "date": "2026-02-11",
    "isoDate": "2026-02-11T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 207,
    "date": "2026-02-11",
    "isoDate": "2026-02-11T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 208,
    "date": "2026-02-11",
    "isoDate": "2026-02-11T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 209,
    "date": "2026-02-11",
    "isoDate": "2026-02-11T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 210,
    "date": "2026-02-11",
    "isoDate": "2026-02-11T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 211,
    "date": "2026-02-12",
    "isoDate": "2026-02-12T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 212,
    "date": "2026-02-12",
    "isoDate": "2026-02-12T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 213,
    "date": "2026-02-12",
    "isoDate": "2026-02-12T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 214,
    "date": "2026-02-12",
    "isoDate": "2026-02-12T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:37",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 37
  },
  {
    "id": 215,
    "date": "2026-02-12",
    "isoDate": "2026-02-12T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 216,
    "date": "2026-02-13",
    "isoDate": "2026-02-13T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 217,
    "date": "2026-02-13",
    "isoDate": "2026-02-13T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 218,
    "date": "2026-02-13",
    "isoDate": "2026-02-13T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 219,
    "date": "2026-02-13",
    "isoDate": "2026-02-13T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 220,
    "date": "2026-02-13",
    "isoDate": "2026-02-13T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 221,
    "date": "2026-02-14",
    "isoDate": "2026-02-14T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 222,
    "date": "2026-02-14",
    "isoDate": "2026-02-14T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 223,
    "date": "2026-02-14",
    "isoDate": "2026-02-14T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 224,
    "date": "2026-02-14",
    "isoDate": "2026-02-14T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 225,
    "date": "2026-02-14",
    "isoDate": "2026-02-14T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 226,
    "date": "2026-02-15",
    "isoDate": "2026-02-15T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 227,
    "date": "2026-02-15",
    "isoDate": "2026-02-15T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:27",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 27
  },
  {
    "id": 228,
    "date": "2026-02-15",
    "isoDate": "2026-02-15T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 229,
    "date": "2026-02-15",
    "isoDate": "2026-02-15T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 230,
    "date": "2026-02-15",
    "isoDate": "2026-02-15T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 231,
    "date": "2026-02-16",
    "isoDate": "2026-02-16T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:41",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 41
  },
  {
    "id": 232,
    "date": "2026-02-16",
    "isoDate": "2026-02-16T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 233,
    "date": "2026-02-16",
    "isoDate": "2026-02-16T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 234,
    "date": "2026-02-16",
    "isoDate": "2026-02-16T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 235,
    "date": "2026-02-16",
    "isoDate": "2026-02-16T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 236,
    "date": "2026-02-17",
    "isoDate": "2026-02-17T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 237,
    "date": "2026-02-17",
    "isoDate": "2026-02-17T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 238,
    "date": "2026-02-17",
    "isoDate": "2026-02-17T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 239,
    "date": "2026-02-17",
    "isoDate": "2026-02-17T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 240,
    "date": "2026-02-17",
    "isoDate": "2026-02-17T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 241,
    "date": "2026-02-18",
    "isoDate": "2026-02-18T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 242,
    "date": "2026-02-18",
    "isoDate": "2026-02-18T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:44",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 44
  },
  {
    "id": 243,
    "date": "2026-02-18",
    "isoDate": "2026-02-18T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 244,
    "date": "2026-02-18",
    "isoDate": "2026-02-18T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 245,
    "date": "2026-02-18",
    "isoDate": "2026-02-18T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 246,
    "date": "2026-02-19",
    "isoDate": "2026-02-19T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 247,
    "date": "2026-02-19",
    "isoDate": "2026-02-19T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 248,
    "date": "2026-02-19",
    "isoDate": "2026-02-19T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 249,
    "date": "2026-02-19",
    "isoDate": "2026-02-19T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 250,
    "date": "2026-02-19",
    "isoDate": "2026-02-19T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 251,
    "date": "2026-02-20",
    "isoDate": "2026-02-20T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 252,
    "date": "2026-02-20",
    "isoDate": "2026-02-20T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:40",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 40
  },
  {
    "id": 253,
    "date": "2026-02-20",
    "isoDate": "2026-02-20T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 254,
    "date": "2026-02-20",
    "isoDate": "2026-02-20T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 255,
    "date": "2026-02-20",
    "isoDate": "2026-02-20T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 256,
    "date": "2026-02-21",
    "isoDate": "2026-02-21T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 257,
    "date": "2026-02-21",
    "isoDate": "2026-02-21T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 258,
    "date": "2026-02-21",
    "isoDate": "2026-02-21T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 259,
    "date": "2026-02-21",
    "isoDate": "2026-02-21T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 260,
    "date": "2026-02-21",
    "isoDate": "2026-02-21T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 261,
    "date": "2026-02-22",
    "isoDate": "2026-02-22T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 262,
    "date": "2026-02-22",
    "isoDate": "2026-02-22T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 263,
    "date": "2026-02-22",
    "isoDate": "2026-02-22T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 264,
    "date": "2026-02-22",
    "isoDate": "2026-02-22T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 265,
    "date": "2026-02-22",
    "isoDate": "2026-02-22T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 266,
    "date": "2026-02-23",
    "isoDate": "2026-02-23T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 267,
    "date": "2026-02-23",
    "isoDate": "2026-02-23T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 268,
    "date": "2026-02-23",
    "isoDate": "2026-02-23T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:43",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 43
  },
  {
    "id": 269,
    "date": "2026-02-23",
    "isoDate": "2026-02-23T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 270,
    "date": "2026-02-23",
    "isoDate": "2026-02-23T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 271,
    "date": "2026-02-24",
    "isoDate": "2026-02-24T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 272,
    "date": "2026-02-24",
    "isoDate": "2026-02-24T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 273,
    "date": "2026-02-24",
    "isoDate": "2026-02-24T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 274,
    "date": "2026-02-24",
    "isoDate": "2026-02-24T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 275,
    "date": "2026-02-24",
    "isoDate": "2026-02-24T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 276,
    "date": "2026-02-25",
    "isoDate": "2026-02-25T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:28",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 28
  },
  {
    "id": 277,
    "date": "2026-02-25",
    "isoDate": "2026-02-25T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:30",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 30
  },
  {
    "id": 278,
    "date": "2026-02-25",
    "isoDate": "2026-02-25T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 279,
    "date": "2026-02-25",
    "isoDate": "2026-02-25T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 280,
    "date": "2026-02-25",
    "isoDate": "2026-02-25T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 281,
    "date": "2026-02-26",
    "isoDate": "2026-02-26T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 282,
    "date": "2026-02-26",
    "isoDate": "2026-02-26T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:22",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 22
  },
  {
    "id": 283,
    "date": "2026-02-26",
    "isoDate": "2026-02-26T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 284,
    "date": "2026-02-26",
    "isoDate": "2026-02-26T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 285,
    "date": "2026-02-26",
    "isoDate": "2026-02-26T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 286,
    "date": "2026-02-27",
    "isoDate": "2026-02-27T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 287,
    "date": "2026-02-27",
    "isoDate": "2026-02-27T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 288,
    "date": "2026-02-27",
    "isoDate": "2026-02-27T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 289,
    "date": "2026-02-27",
    "isoDate": "2026-02-27T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 290,
    "date": "2026-02-27",
    "isoDate": "2026-02-27T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 291,
    "date": "2026-02-28",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 292,
    "date": "2026-02-28",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 293,
    "date": "2026-02-28",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 294,
    "date": "2026-02-28",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 295,
    "date": "2026-02-28",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 296,
    "date": "2026-03-01",
    "isoDate": "2026-03-01T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 297,
    "date": "2026-03-01",
    "isoDate": "2026-03-01T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 298,
    "date": "2026-03-01",
    "isoDate": "2026-03-01T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 299,
    "date": "2026-03-01",
    "isoDate": "2026-03-01T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 300,
    "date": "2026-03-01",
    "isoDate": "2026-03-01T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 301,
    "date": "2026-03-02",
    "isoDate": "2026-03-02T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 302,
    "date": "2026-03-02",
    "isoDate": "2026-03-02T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 303,
    "date": "2026-03-02",
    "isoDate": "2026-03-02T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 304,
    "date": "2026-03-02",
    "isoDate": "2026-03-02T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 305,
    "date": "2026-03-02",
    "isoDate": "2026-03-02T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 306,
    "date": "2026-03-03",
    "isoDate": "2026-03-03T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:26",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 26
  },
  {
    "id": 307,
    "date": "2026-03-03",
    "isoDate": "2026-03-03T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:43",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 43
  },
  {
    "id": 308,
    "date": "2026-03-03",
    "isoDate": "2026-03-03T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:20",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 20
  },
  {
    "id": 309,
    "date": "2026-03-03",
    "isoDate": "2026-03-03T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 310,
    "date": "2026-03-03",
    "isoDate": "2026-03-03T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 311,
    "date": "2026-03-04",
    "isoDate": "2026-03-04T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 312,
    "date": "2026-03-04",
    "isoDate": "2026-03-04T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 313,
    "date": "2026-03-04",
    "isoDate": "2026-03-04T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 314,
    "date": "2026-03-04",
    "isoDate": "2026-03-04T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 315,
    "date": "2026-03-04",
    "isoDate": "2026-03-04T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 316,
    "date": "2026-03-05",
    "isoDate": "2026-03-05T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 317,
    "date": "2026-03-05",
    "isoDate": "2026-03-05T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 318,
    "date": "2026-03-05",
    "isoDate": "2026-03-05T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 319,
    "date": "2026-03-05",
    "isoDate": "2026-03-05T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 320,
    "date": "2026-03-05",
    "isoDate": "2026-03-05T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 321,
    "date": "2026-03-06",
    "isoDate": "2026-03-06T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 322,
    "date": "2026-03-06",
    "isoDate": "2026-03-06T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 323,
    "date": "2026-03-06",
    "isoDate": "2026-03-06T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 324,
    "date": "2026-03-06",
    "isoDate": "2026-03-06T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 325,
    "date": "2026-03-06",
    "isoDate": "2026-03-06T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 326,
    "date": "2026-03-07",
    "isoDate": "2026-03-07T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:22",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 22
  },
  {
    "id": 327,
    "date": "2026-03-07",
    "isoDate": "2026-03-07T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 328,
    "date": "2026-03-07",
    "isoDate": "2026-03-07T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 329,
    "date": "2026-03-07",
    "isoDate": "2026-03-07T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 330,
    "date": "2026-03-07",
    "isoDate": "2026-03-07T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 331,
    "date": "2026-03-08",
    "isoDate": "2026-03-08T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 332,
    "date": "2026-03-08",
    "isoDate": "2026-03-08T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:33",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 33
  },
  {
    "id": 333,
    "date": "2026-03-08",
    "isoDate": "2026-03-08T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:40",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 40
  },
  {
    "id": 334,
    "date": "2026-03-08",
    "isoDate": "2026-03-08T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 335,
    "date": "2026-03-08",
    "isoDate": "2026-03-08T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 336,
    "date": "2026-03-09",
    "isoDate": "2026-03-09T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:44",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 44
  },
  {
    "id": 337,
    "date": "2026-03-09",
    "isoDate": "2026-03-09T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 338,
    "date": "2026-03-09",
    "isoDate": "2026-03-09T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 339,
    "date": "2026-03-09",
    "isoDate": "2026-03-09T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 340,
    "date": "2026-03-09",
    "isoDate": "2026-03-09T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 341,
    "date": "2026-03-10",
    "isoDate": "2026-03-10T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:23",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 23
  },
  {
    "id": 342,
    "date": "2026-03-10",
    "isoDate": "2026-03-10T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 343,
    "date": "2026-03-10",
    "isoDate": "2026-03-10T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 344,
    "date": "2026-03-10",
    "isoDate": "2026-03-10T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 345,
    "date": "2026-03-10",
    "isoDate": "2026-03-10T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 346,
    "date": "2026-03-11",
    "isoDate": "2026-03-11T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 347,
    "date": "2026-03-11",
    "isoDate": "2026-03-11T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 348,
    "date": "2026-03-11",
    "isoDate": "2026-03-11T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 349,
    "date": "2026-03-11",
    "isoDate": "2026-03-11T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 350,
    "date": "2026-03-11",
    "isoDate": "2026-03-11T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:42",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 42
  },
  {
    "id": 351,
    "date": "2026-03-12",
    "isoDate": "2026-03-12T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 352,
    "date": "2026-03-12",
    "isoDate": "2026-03-12T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 353,
    "date": "2026-03-12",
    "isoDate": "2026-03-12T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 354,
    "date": "2026-03-12",
    "isoDate": "2026-03-12T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 355,
    "date": "2026-03-12",
    "isoDate": "2026-03-12T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:42",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 42
  },
  {
    "id": 356,
    "date": "2026-03-13",
    "isoDate": "2026-03-13T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 357,
    "date": "2026-03-13",
    "isoDate": "2026-03-13T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 358,
    "date": "2026-03-13",
    "isoDate": "2026-03-13T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 359,
    "date": "2026-03-13",
    "isoDate": "2026-03-13T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:37",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 37
  },
  {
    "id": 360,
    "date": "2026-03-13",
    "isoDate": "2026-03-13T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 361,
    "date": "2026-03-14",
    "isoDate": "2026-03-14T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 362,
    "date": "2026-03-14",
    "isoDate": "2026-03-14T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 363,
    "date": "2026-03-14",
    "isoDate": "2026-03-14T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 364,
    "date": "2026-03-14",
    "isoDate": "2026-03-14T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 365,
    "date": "2026-03-14",
    "isoDate": "2026-03-14T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 366,
    "date": "2026-03-15",
    "isoDate": "2026-03-15T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 367,
    "date": "2026-03-15",
    "isoDate": "2026-03-15T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 368,
    "date": "2026-03-15",
    "isoDate": "2026-03-15T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 369,
    "date": "2026-03-15",
    "isoDate": "2026-03-15T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 370,
    "date": "2026-03-15",
    "isoDate": "2026-03-15T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 371,
    "date": "2026-03-16",
    "isoDate": "2026-03-16T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:28",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 28
  },
  {
    "id": 372,
    "date": "2026-03-16",
    "isoDate": "2026-03-16T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 373,
    "date": "2026-03-16",
    "isoDate": "2026-03-16T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 374,
    "date": "2026-03-16",
    "isoDate": "2026-03-16T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 375,
    "date": "2026-03-16",
    "isoDate": "2026-03-16T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 376,
    "date": "2026-03-17",
    "isoDate": "2026-03-17T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 377,
    "date": "2026-03-17",
    "isoDate": "2026-03-17T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 378,
    "date": "2026-03-17",
    "isoDate": "2026-03-17T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:34",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 34
  },
  {
    "id": 379,
    "date": "2026-03-17",
    "isoDate": "2026-03-17T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 380,
    "date": "2026-03-17",
    "isoDate": "2026-03-17T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 381,
    "date": "2026-03-18",
    "isoDate": "2026-03-18T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 382,
    "date": "2026-03-18",
    "isoDate": "2026-03-18T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 383,
    "date": "2026-03-18",
    "isoDate": "2026-03-18T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 384,
    "date": "2026-03-18",
    "isoDate": "2026-03-18T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 385,
    "date": "2026-03-18",
    "isoDate": "2026-03-18T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 386,
    "date": "2026-03-19",
    "isoDate": "2026-03-19T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 387,
    "date": "2026-03-19",
    "isoDate": "2026-03-19T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 388,
    "date": "2026-03-19",
    "isoDate": "2026-03-19T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 389,
    "date": "2026-03-19",
    "isoDate": "2026-03-19T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 390,
    "date": "2026-03-19",
    "isoDate": "2026-03-19T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 391,
    "date": "2026-03-20",
    "isoDate": "2026-03-20T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 392,
    "date": "2026-03-20",
    "isoDate": "2026-03-20T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 393,
    "date": "2026-03-20",
    "isoDate": "2026-03-20T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 394,
    "date": "2026-03-20",
    "isoDate": "2026-03-20T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 395,
    "date": "2026-03-20",
    "isoDate": "2026-03-20T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 396,
    "date": "2026-03-21",
    "isoDate": "2026-03-21T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 397,
    "date": "2026-03-21",
    "isoDate": "2026-03-21T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 398,
    "date": "2026-03-21",
    "isoDate": "2026-03-21T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 399,
    "date": "2026-03-21",
    "isoDate": "2026-03-21T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:40",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 40
  },
  {
    "id": 400,
    "date": "2026-03-21",
    "isoDate": "2026-03-21T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:31",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 31
  },
  {
    "id": 401,
    "date": "2026-03-22",
    "isoDate": "2026-03-22T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 402,
    "date": "2026-03-22",
    "isoDate": "2026-03-22T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 403,
    "date": "2026-03-22",
    "isoDate": "2026-03-22T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:19",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 19
  },
  {
    "id": 404,
    "date": "2026-03-22",
    "isoDate": "2026-03-22T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 405,
    "date": "2026-03-22",
    "isoDate": "2026-03-22T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 406,
    "date": "2026-03-23",
    "isoDate": "2026-03-23T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 407,
    "date": "2026-03-23",
    "isoDate": "2026-03-23T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 408,
    "date": "2026-03-23",
    "isoDate": "2026-03-23T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 409,
    "date": "2026-03-23",
    "isoDate": "2026-03-23T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:37",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 37
  },
  {
    "id": 410,
    "date": "2026-03-23",
    "isoDate": "2026-03-23T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 411,
    "date": "2026-03-24",
    "isoDate": "2026-03-24T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 412,
    "date": "2026-03-24",
    "isoDate": "2026-03-24T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 413,
    "date": "2026-03-24",
    "isoDate": "2026-03-24T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 414,
    "date": "2026-03-24",
    "isoDate": "2026-03-24T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 415,
    "date": "2026-03-24",
    "isoDate": "2026-03-24T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 416,
    "date": "2026-03-25",
    "isoDate": "2026-03-25T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 417,
    "date": "2026-03-25",
    "isoDate": "2026-03-25T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 418,
    "date": "2026-03-25",
    "isoDate": "2026-03-25T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 419,
    "date": "2026-03-25",
    "isoDate": "2026-03-25T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 420,
    "date": "2026-03-25",
    "isoDate": "2026-03-25T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 421,
    "date": "2026-03-26",
    "isoDate": "2026-03-26T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 422,
    "date": "2026-03-26",
    "isoDate": "2026-03-26T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 423,
    "date": "2026-03-26",
    "isoDate": "2026-03-26T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 424,
    "date": "2026-03-26",
    "isoDate": "2026-03-26T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 425,
    "date": "2026-03-26",
    "isoDate": "2026-03-26T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 426,
    "date": "2026-03-27",
    "isoDate": "2026-03-27T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 427,
    "date": "2026-03-27",
    "isoDate": "2026-03-27T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 428,
    "date": "2026-03-27",
    "isoDate": "2026-03-27T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 429,
    "date": "2026-03-27",
    "isoDate": "2026-03-27T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 430,
    "date": "2026-03-27",
    "isoDate": "2026-03-27T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 431,
    "date": "2026-03-28",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 432,
    "date": "2026-03-28",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 433,
    "date": "2026-03-28",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 434,
    "date": "2026-03-28",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 435,
    "date": "2026-03-28",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 436,
    "date": "2026-03-29",
    "isoDate": "2026-03-29T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 437,
    "date": "2026-03-29",
    "isoDate": "2026-03-29T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 438,
    "date": "2026-03-29",
    "isoDate": "2026-03-29T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 439,
    "date": "2026-03-29",
    "isoDate": "2026-03-29T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:41",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 41
  },
  {
    "id": 440,
    "date": "2026-03-29",
    "isoDate": "2026-03-29T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 441,
    "date": "2026-03-30",
    "isoDate": "2026-03-30T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 442,
    "date": "2026-03-30",
    "isoDate": "2026-03-30T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 443,
    "date": "2026-03-30",
    "isoDate": "2026-03-30T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 444,
    "date": "2026-03-30",
    "isoDate": "2026-03-30T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 445,
    "date": "2026-03-30",
    "isoDate": "2026-03-30T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 446,
    "date": "2026-03-31",
    "isoDate": "2026-03-31T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 447,
    "date": "2026-03-31",
    "isoDate": "2026-03-31T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 448,
    "date": "2026-03-31",
    "isoDate": "2026-03-31T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 449,
    "date": "2026-03-31",
    "isoDate": "2026-03-31T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 450,
    "date": "2026-03-31",
    "isoDate": "2026-03-31T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 451,
    "date": "2026-04-01",
    "isoDate": "2026-04-01T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 452,
    "date": "2026-04-01",
    "isoDate": "2026-04-01T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 453,
    "date": "2026-04-01",
    "isoDate": "2026-04-01T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 454,
    "date": "2026-04-01",
    "isoDate": "2026-04-01T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 455,
    "date": "2026-04-01",
    "isoDate": "2026-04-01T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 456,
    "date": "2026-04-02",
    "isoDate": "2026-04-02T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 457,
    "date": "2026-04-02",
    "isoDate": "2026-04-02T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:28",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 28
  },
  {
    "id": 458,
    "date": "2026-04-02",
    "isoDate": "2026-04-02T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 459,
    "date": "2026-04-02",
    "isoDate": "2026-04-02T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 460,
    "date": "2026-04-02",
    "isoDate": "2026-04-02T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 461,
    "date": "2026-04-03",
    "isoDate": "2026-04-03T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 462,
    "date": "2026-04-03",
    "isoDate": "2026-04-03T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 463,
    "date": "2026-04-03",
    "isoDate": "2026-04-03T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 464,
    "date": "2026-04-03",
    "isoDate": "2026-04-03T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 465,
    "date": "2026-04-03",
    "isoDate": "2026-04-03T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:29",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 29
  },
  {
    "id": 466,
    "date": "2026-04-04",
    "isoDate": "2026-04-04T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 467,
    "date": "2026-04-04",
    "isoDate": "2026-04-04T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 468,
    "date": "2026-04-04",
    "isoDate": "2026-04-04T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:27",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 27
  },
  {
    "id": 469,
    "date": "2026-04-04",
    "isoDate": "2026-04-04T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 470,
    "date": "2026-04-04",
    "isoDate": "2026-04-04T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 471,
    "date": "2026-04-05",
    "isoDate": "2026-04-05T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 472,
    "date": "2026-04-05",
    "isoDate": "2026-04-05T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 473,
    "date": "2026-04-05",
    "isoDate": "2026-04-05T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 474,
    "date": "2026-04-05",
    "isoDate": "2026-04-05T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 475,
    "date": "2026-04-05",
    "isoDate": "2026-04-05T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 476,
    "date": "2026-04-06",
    "isoDate": "2026-04-06T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 477,
    "date": "2026-04-06",
    "isoDate": "2026-04-06T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 478,
    "date": "2026-04-06",
    "isoDate": "2026-04-06T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 479,
    "date": "2026-04-06",
    "isoDate": "2026-04-06T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 480,
    "date": "2026-04-06",
    "isoDate": "2026-04-06T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 481,
    "date": "2026-04-07",
    "isoDate": "2026-04-07T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 482,
    "date": "2026-04-07",
    "isoDate": "2026-04-07T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 483,
    "date": "2026-04-07",
    "isoDate": "2026-04-07T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 484,
    "date": "2026-04-07",
    "isoDate": "2026-04-07T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 485,
    "date": "2026-04-07",
    "isoDate": "2026-04-07T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 486,
    "date": "2026-04-08",
    "isoDate": "2026-04-08T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:29",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 29
  },
  {
    "id": 487,
    "date": "2026-04-08",
    "isoDate": "2026-04-08T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 488,
    "date": "2026-04-08",
    "isoDate": "2026-04-08T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 489,
    "date": "2026-04-08",
    "isoDate": "2026-04-08T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 490,
    "date": "2026-04-08",
    "isoDate": "2026-04-08T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 491,
    "date": "2026-04-09",
    "isoDate": "2026-04-09T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:20",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 20
  },
  {
    "id": 492,
    "date": "2026-04-09",
    "isoDate": "2026-04-09T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 493,
    "date": "2026-04-09",
    "isoDate": "2026-04-09T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 494,
    "date": "2026-04-09",
    "isoDate": "2026-04-09T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 495,
    "date": "2026-04-09",
    "isoDate": "2026-04-09T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 496,
    "date": "2026-04-10",
    "isoDate": "2026-04-10T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 497,
    "date": "2026-04-10",
    "isoDate": "2026-04-10T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 498,
    "date": "2026-04-10",
    "isoDate": "2026-04-10T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 499,
    "date": "2026-04-10",
    "isoDate": "2026-04-10T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:36",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 36
  },
  {
    "id": 500,
    "date": "2026-04-10",
    "isoDate": "2026-04-10T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 501,
    "date": "2026-04-11",
    "isoDate": "2026-04-11T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 502,
    "date": "2026-04-11",
    "isoDate": "2026-04-11T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:19",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 19
  },
  {
    "id": 503,
    "date": "2026-04-11",
    "isoDate": "2026-04-11T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 504,
    "date": "2026-04-11",
    "isoDate": "2026-04-11T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 505,
    "date": "2026-04-11",
    "isoDate": "2026-04-11T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 506,
    "date": "2026-04-12",
    "isoDate": "2026-04-12T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 507,
    "date": "2026-04-12",
    "isoDate": "2026-04-12T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 508,
    "date": "2026-04-12",
    "isoDate": "2026-04-12T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 509,
    "date": "2026-04-12",
    "isoDate": "2026-04-12T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 510,
    "date": "2026-04-12",
    "isoDate": "2026-04-12T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 511,
    "date": "2026-04-13",
    "isoDate": "2026-04-13T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 512,
    "date": "2026-04-13",
    "isoDate": "2026-04-13T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:35",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 35
  },
  {
    "id": 513,
    "date": "2026-04-13",
    "isoDate": "2026-04-13T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:24",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 24
  },
  {
    "id": 514,
    "date": "2026-04-13",
    "isoDate": "2026-04-13T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 515,
    "date": "2026-04-13",
    "isoDate": "2026-04-13T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 516,
    "date": "2026-04-14",
    "isoDate": "2026-04-14T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 517,
    "date": "2026-04-14",
    "isoDate": "2026-04-14T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 518,
    "date": "2026-04-14",
    "isoDate": "2026-04-14T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 519,
    "date": "2026-04-14",
    "isoDate": "2026-04-14T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 520,
    "date": "2026-04-14",
    "isoDate": "2026-04-14T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 521,
    "date": "2026-04-15",
    "isoDate": "2026-04-15T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 522,
    "date": "2026-04-15",
    "isoDate": "2026-04-15T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 523,
    "date": "2026-04-15",
    "isoDate": "2026-04-15T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 524,
    "date": "2026-04-15",
    "isoDate": "2026-04-15T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 525,
    "date": "2026-04-15",
    "isoDate": "2026-04-15T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 526,
    "date": "2026-04-16",
    "isoDate": "2026-04-16T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 527,
    "date": "2026-04-16",
    "isoDate": "2026-04-16T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 528,
    "date": "2026-04-16",
    "isoDate": "2026-04-16T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 529,
    "date": "2026-04-16",
    "isoDate": "2026-04-16T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 530,
    "date": "2026-04-16",
    "isoDate": "2026-04-16T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 531,
    "date": "2026-04-17",
    "isoDate": "2026-04-17T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:25",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 25
  },
  {
    "id": 532,
    "date": "2026-04-17",
    "isoDate": "2026-04-17T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 533,
    "date": "2026-04-17",
    "isoDate": "2026-04-17T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:36",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 36
  },
  {
    "id": 534,
    "date": "2026-04-17",
    "isoDate": "2026-04-17T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 535,
    "date": "2026-04-17",
    "isoDate": "2026-04-17T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:30",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 30
  },
  {
    "id": 536,
    "date": "2026-04-18",
    "isoDate": "2026-04-18T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:33",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 33
  },
  {
    "id": 537,
    "date": "2026-04-18",
    "isoDate": "2026-04-18T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 538,
    "date": "2026-04-18",
    "isoDate": "2026-04-18T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 539,
    "date": "2026-04-18",
    "isoDate": "2026-04-18T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 540,
    "date": "2026-04-18",
    "isoDate": "2026-04-18T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 541,
    "date": "2026-04-19",
    "isoDate": "2026-04-19T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 542,
    "date": "2026-04-19",
    "isoDate": "2026-04-19T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 543,
    "date": "2026-04-19",
    "isoDate": "2026-04-19T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 544,
    "date": "2026-04-19",
    "isoDate": "2026-04-19T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:44",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 44
  },
  {
    "id": 545,
    "date": "2026-04-19",
    "isoDate": "2026-04-19T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 546,
    "date": "2026-04-20",
    "isoDate": "2026-04-20T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 547,
    "date": "2026-04-20",
    "isoDate": "2026-04-20T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 548,
    "date": "2026-04-20",
    "isoDate": "2026-04-20T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 549,
    "date": "2026-04-20",
    "isoDate": "2026-04-20T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 550,
    "date": "2026-04-20",
    "isoDate": "2026-04-20T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 551,
    "date": "2026-04-21",
    "isoDate": "2026-04-21T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 552,
    "date": "2026-04-21",
    "isoDate": "2026-04-21T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 553,
    "date": "2026-04-21",
    "isoDate": "2026-04-21T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 554,
    "date": "2026-04-21",
    "isoDate": "2026-04-21T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 555,
    "date": "2026-04-21",
    "isoDate": "2026-04-21T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 556,
    "date": "2026-04-22",
    "isoDate": "2026-04-22T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 557,
    "date": "2026-04-22",
    "isoDate": "2026-04-22T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:26",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 26
  },
  {
    "id": 558,
    "date": "2026-04-22",
    "isoDate": "2026-04-22T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 559,
    "date": "2026-04-22",
    "isoDate": "2026-04-22T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 560,
    "date": "2026-04-22",
    "isoDate": "2026-04-22T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 561,
    "date": "2026-04-23",
    "isoDate": "2026-04-23T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 562,
    "date": "2026-04-23",
    "isoDate": "2026-04-23T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:42",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 42
  },
  {
    "id": 563,
    "date": "2026-04-23",
    "isoDate": "2026-04-23T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 564,
    "date": "2026-04-23",
    "isoDate": "2026-04-23T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 565,
    "date": "2026-04-23",
    "isoDate": "2026-04-23T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 566,
    "date": "2026-04-24",
    "isoDate": "2026-04-24T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 567,
    "date": "2026-04-24",
    "isoDate": "2026-04-24T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 568,
    "date": "2026-04-24",
    "isoDate": "2026-04-24T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 569,
    "date": "2026-04-24",
    "isoDate": "2026-04-24T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 570,
    "date": "2026-04-24",
    "isoDate": "2026-04-24T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 571,
    "date": "2026-04-25",
    "isoDate": "2026-04-25T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 572,
    "date": "2026-04-25",
    "isoDate": "2026-04-25T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 573,
    "date": "2026-04-25",
    "isoDate": "2026-04-25T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 574,
    "date": "2026-04-25",
    "isoDate": "2026-04-25T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:22",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 22
  },
  {
    "id": 575,
    "date": "2026-04-25",
    "isoDate": "2026-04-25T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 576,
    "date": "2026-04-26",
    "isoDate": "2026-04-26T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 577,
    "date": "2026-04-26",
    "isoDate": "2026-04-26T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 578,
    "date": "2026-04-26",
    "isoDate": "2026-04-26T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 579,
    "date": "2026-04-26",
    "isoDate": "2026-04-26T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 580,
    "date": "2026-04-26",
    "isoDate": "2026-04-26T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 581,
    "date": "2026-04-27",
    "isoDate": "2026-04-27T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 582,
    "date": "2026-04-27",
    "isoDate": "2026-04-27T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 583,
    "date": "2026-04-27",
    "isoDate": "2026-04-27T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 584,
    "date": "2026-04-27",
    "isoDate": "2026-04-27T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:17",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 17
  },
  {
    "id": 585,
    "date": "2026-04-27",
    "isoDate": "2026-04-27T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 586,
    "date": "2026-04-28",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 587,
    "date": "2026-04-28",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 588,
    "date": "2026-04-28",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 589,
    "date": "2026-04-28",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 590,
    "date": "2026-04-28",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 591,
    "date": "2026-04-29",
    "isoDate": "2026-04-29T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 592,
    "date": "2026-04-29",
    "isoDate": "2026-04-29T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 593,
    "date": "2026-04-29",
    "isoDate": "2026-04-29T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 594,
    "date": "2026-04-29",
    "isoDate": "2026-04-29T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 595,
    "date": "2026-04-29",
    "isoDate": "2026-04-29T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 596,
    "date": "2026-04-30",
    "isoDate": "2026-04-30T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 597,
    "date": "2026-04-30",
    "isoDate": "2026-04-30T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 598,
    "date": "2026-04-30",
    "isoDate": "2026-04-30T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 599,
    "date": "2026-04-30",
    "isoDate": "2026-04-30T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 600,
    "date": "2026-04-30",
    "isoDate": "2026-04-30T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 601,
    "date": "2026-05-01",
    "isoDate": "2026-05-01T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 602,
    "date": "2026-05-01",
    "isoDate": "2026-05-01T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 603,
    "date": "2026-05-01",
    "isoDate": "2026-05-01T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 604,
    "date": "2026-05-01",
    "isoDate": "2026-05-01T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 605,
    "date": "2026-05-01",
    "isoDate": "2026-05-01T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 606,
    "date": "2026-05-02",
    "isoDate": "2026-05-02T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:18",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 18
  },
  {
    "id": 607,
    "date": "2026-05-02",
    "isoDate": "2026-05-02T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 608,
    "date": "2026-05-02",
    "isoDate": "2026-05-02T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 609,
    "date": "2026-05-02",
    "isoDate": "2026-05-02T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 610,
    "date": "2026-05-02",
    "isoDate": "2026-05-02T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 611,
    "date": "2026-05-03",
    "isoDate": "2026-05-03T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 612,
    "date": "2026-05-03",
    "isoDate": "2026-05-03T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 613,
    "date": "2026-05-03",
    "isoDate": "2026-05-03T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 614,
    "date": "2026-05-03",
    "isoDate": "2026-05-03T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 615,
    "date": "2026-05-03",
    "isoDate": "2026-05-03T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 616,
    "date": "2026-05-04",
    "isoDate": "2026-05-04T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 617,
    "date": "2026-05-04",
    "isoDate": "2026-05-04T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 618,
    "date": "2026-05-04",
    "isoDate": "2026-05-04T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 619,
    "date": "2026-05-04",
    "isoDate": "2026-05-04T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 620,
    "date": "2026-05-04",
    "isoDate": "2026-05-04T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 621,
    "date": "2026-05-05",
    "isoDate": "2026-05-05T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 622,
    "date": "2026-05-05",
    "isoDate": "2026-05-05T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 623,
    "date": "2026-05-05",
    "isoDate": "2026-05-05T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 624,
    "date": "2026-05-05",
    "isoDate": "2026-05-05T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 625,
    "date": "2026-05-05",
    "isoDate": "2026-05-05T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 626,
    "date": "2026-05-06",
    "isoDate": "2026-05-06T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 627,
    "date": "2026-05-06",
    "isoDate": "2026-05-06T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 628,
    "date": "2026-05-06",
    "isoDate": "2026-05-06T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 629,
    "date": "2026-05-06",
    "isoDate": "2026-05-06T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 630,
    "date": "2026-05-06",
    "isoDate": "2026-05-06T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 631,
    "date": "2026-05-07",
    "isoDate": "2026-05-07T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 632,
    "date": "2026-05-07",
    "isoDate": "2026-05-07T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 633,
    "date": "2026-05-07",
    "isoDate": "2026-05-07T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 634,
    "date": "2026-05-07",
    "isoDate": "2026-05-07T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 635,
    "date": "2026-05-07",
    "isoDate": "2026-05-07T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:37",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 37
  },
  {
    "id": 636,
    "date": "2026-05-08",
    "isoDate": "2026-05-08T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:38",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 38
  },
  {
    "id": 637,
    "date": "2026-05-08",
    "isoDate": "2026-05-08T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 638,
    "date": "2026-05-08",
    "isoDate": "2026-05-08T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 639,
    "date": "2026-05-08",
    "isoDate": "2026-05-08T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 640,
    "date": "2026-05-08",
    "isoDate": "2026-05-08T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 641,
    "date": "2026-05-09",
    "isoDate": "2026-05-09T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 642,
    "date": "2026-05-09",
    "isoDate": "2026-05-09T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 643,
    "date": "2026-05-09",
    "isoDate": "2026-05-09T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 644,
    "date": "2026-05-09",
    "isoDate": "2026-05-09T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 645,
    "date": "2026-05-09",
    "isoDate": "2026-05-09T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 646,
    "date": "2026-05-10",
    "isoDate": "2026-05-10T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:19",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 19
  },
  {
    "id": 647,
    "date": "2026-05-10",
    "isoDate": "2026-05-10T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 648,
    "date": "2026-05-10",
    "isoDate": "2026-05-10T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 649,
    "date": "2026-05-10",
    "isoDate": "2026-05-10T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 650,
    "date": "2026-05-10",
    "isoDate": "2026-05-10T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 651,
    "date": "2026-05-11",
    "isoDate": "2026-05-11T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 652,
    "date": "2026-05-11",
    "isoDate": "2026-05-11T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:29",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 29
  },
  {
    "id": 653,
    "date": "2026-05-11",
    "isoDate": "2026-05-11T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 654,
    "date": "2026-05-11",
    "isoDate": "2026-05-11T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 655,
    "date": "2026-05-11",
    "isoDate": "2026-05-11T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 656,
    "date": "2026-05-12",
    "isoDate": "2026-05-12T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 657,
    "date": "2026-05-12",
    "isoDate": "2026-05-12T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:23",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 23
  },
  {
    "id": 658,
    "date": "2026-05-12",
    "isoDate": "2026-05-12T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 659,
    "date": "2026-05-12",
    "isoDate": "2026-05-12T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 660,
    "date": "2026-05-12",
    "isoDate": "2026-05-12T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 661,
    "date": "2026-05-13",
    "isoDate": "2026-05-13T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 662,
    "date": "2026-05-13",
    "isoDate": "2026-05-13T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 663,
    "date": "2026-05-13",
    "isoDate": "2026-05-13T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 664,
    "date": "2026-05-13",
    "isoDate": "2026-05-13T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:42",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 42
  },
  {
    "id": 665,
    "date": "2026-05-13",
    "isoDate": "2026-05-13T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 666,
    "date": "2026-05-14",
    "isoDate": "2026-05-14T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 667,
    "date": "2026-05-14",
    "isoDate": "2026-05-14T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 668,
    "date": "2026-05-14",
    "isoDate": "2026-05-14T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 669,
    "date": "2026-05-14",
    "isoDate": "2026-05-14T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 670,
    "date": "2026-05-14",
    "isoDate": "2026-05-14T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 671,
    "date": "2026-05-15",
    "isoDate": "2026-05-15T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 672,
    "date": "2026-05-15",
    "isoDate": "2026-05-15T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 673,
    "date": "2026-05-15",
    "isoDate": "2026-05-15T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 674,
    "date": "2026-05-15",
    "isoDate": "2026-05-15T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 675,
    "date": "2026-05-15",
    "isoDate": "2026-05-15T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 676,
    "date": "2026-05-16",
    "isoDate": "2026-05-16T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 677,
    "date": "2026-05-16",
    "isoDate": "2026-05-16T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 678,
    "date": "2026-05-16",
    "isoDate": "2026-05-16T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 679,
    "date": "2026-05-16",
    "isoDate": "2026-05-16T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 680,
    "date": "2026-05-16",
    "isoDate": "2026-05-16T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 681,
    "date": "2026-05-17",
    "isoDate": "2026-05-17T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 682,
    "date": "2026-05-17",
    "isoDate": "2026-05-17T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 683,
    "date": "2026-05-17",
    "isoDate": "2026-05-17T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 684,
    "date": "2026-05-17",
    "isoDate": "2026-05-17T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 685,
    "date": "2026-05-17",
    "isoDate": "2026-05-17T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 686,
    "date": "2026-05-18",
    "isoDate": "2026-05-18T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 687,
    "date": "2026-05-18",
    "isoDate": "2026-05-18T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 688,
    "date": "2026-05-18",
    "isoDate": "2026-05-18T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 689,
    "date": "2026-05-18",
    "isoDate": "2026-05-18T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 690,
    "date": "2026-05-18",
    "isoDate": "2026-05-18T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 691,
    "date": "2026-05-19",
    "isoDate": "2026-05-19T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 692,
    "date": "2026-05-19",
    "isoDate": "2026-05-19T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 693,
    "date": "2026-05-19",
    "isoDate": "2026-05-19T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 694,
    "date": "2026-05-19",
    "isoDate": "2026-05-19T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 695,
    "date": "2026-05-19",
    "isoDate": "2026-05-19T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 696,
    "date": "2026-05-20",
    "isoDate": "2026-05-20T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 697,
    "date": "2026-05-20",
    "isoDate": "2026-05-20T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 698,
    "date": "2026-05-20",
    "isoDate": "2026-05-20T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 699,
    "date": "2026-05-20",
    "isoDate": "2026-05-20T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 700,
    "date": "2026-05-20",
    "isoDate": "2026-05-20T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 701,
    "date": "2026-05-21",
    "isoDate": "2026-05-21T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 702,
    "date": "2026-05-21",
    "isoDate": "2026-05-21T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 703,
    "date": "2026-05-21",
    "isoDate": "2026-05-21T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:29",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 29
  },
  {
    "id": 704,
    "date": "2026-05-21",
    "isoDate": "2026-05-21T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 705,
    "date": "2026-05-21",
    "isoDate": "2026-05-21T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 706,
    "date": "2026-05-22",
    "isoDate": "2026-05-22T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 707,
    "date": "2026-05-22",
    "isoDate": "2026-05-22T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 708,
    "date": "2026-05-22",
    "isoDate": "2026-05-22T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 709,
    "date": "2026-05-22",
    "isoDate": "2026-05-22T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:25",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 25
  },
  {
    "id": 710,
    "date": "2026-05-22",
    "isoDate": "2026-05-22T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 711,
    "date": "2026-05-23",
    "isoDate": "2026-05-23T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 712,
    "date": "2026-05-23",
    "isoDate": "2026-05-23T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 713,
    "date": "2026-05-23",
    "isoDate": "2026-05-23T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 714,
    "date": "2026-05-23",
    "isoDate": "2026-05-23T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 715,
    "date": "2026-05-23",
    "isoDate": "2026-05-23T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 716,
    "date": "2026-05-24",
    "isoDate": "2026-05-24T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 717,
    "date": "2026-05-24",
    "isoDate": "2026-05-24T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 718,
    "date": "2026-05-24",
    "isoDate": "2026-05-24T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 719,
    "date": "2026-05-24",
    "isoDate": "2026-05-24T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 720,
    "date": "2026-05-24",
    "isoDate": "2026-05-24T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 721,
    "date": "2026-05-25",
    "isoDate": "2026-05-25T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 722,
    "date": "2026-05-25",
    "isoDate": "2026-05-25T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 723,
    "date": "2026-05-25",
    "isoDate": "2026-05-25T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 724,
    "date": "2026-05-25",
    "isoDate": "2026-05-25T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 725,
    "date": "2026-05-25",
    "isoDate": "2026-05-25T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 726,
    "date": "2026-05-26",
    "isoDate": "2026-05-26T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 727,
    "date": "2026-05-26",
    "isoDate": "2026-05-26T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 728,
    "date": "2026-05-26",
    "isoDate": "2026-05-26T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 729,
    "date": "2026-05-26",
    "isoDate": "2026-05-26T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 730,
    "date": "2026-05-26",
    "isoDate": "2026-05-26T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 731,
    "date": "2026-05-27",
    "isoDate": "2026-05-27T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 732,
    "date": "2026-05-27",
    "isoDate": "2026-05-27T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 733,
    "date": "2026-05-27",
    "isoDate": "2026-05-27T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 734,
    "date": "2026-05-27",
    "isoDate": "2026-05-27T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 735,
    "date": "2026-05-27",
    "isoDate": "2026-05-27T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 736,
    "date": "2026-05-28",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 737,
    "date": "2026-05-28",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:29",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 29
  },
  {
    "id": 738,
    "date": "2026-05-28",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 739,
    "date": "2026-05-28",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 740,
    "date": "2026-05-28",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 741,
    "date": "2026-05-29",
    "isoDate": "2026-05-29T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 742,
    "date": "2026-05-29",
    "isoDate": "2026-05-29T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 743,
    "date": "2026-05-29",
    "isoDate": "2026-05-29T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 744,
    "date": "2026-05-29",
    "isoDate": "2026-05-29T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 745,
    "date": "2026-05-29",
    "isoDate": "2026-05-29T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 746,
    "date": "2026-05-30",
    "isoDate": "2026-05-30T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 747,
    "date": "2026-05-30",
    "isoDate": "2026-05-30T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 748,
    "date": "2026-05-30",
    "isoDate": "2026-05-30T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 749,
    "date": "2026-05-30",
    "isoDate": "2026-05-30T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 750,
    "date": "2026-05-30",
    "isoDate": "2026-05-30T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 751,
    "date": "2026-05-31",
    "isoDate": "2026-05-31T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 752,
    "date": "2026-05-31",
    "isoDate": "2026-05-31T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 753,
    "date": "2026-05-31",
    "isoDate": "2026-05-31T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 754,
    "date": "2026-05-31",
    "isoDate": "2026-05-31T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 755,
    "date": "2026-05-31",
    "isoDate": "2026-05-31T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 756,
    "date": "2026-06-01",
    "isoDate": "2026-06-01T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:25",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 25
  },
  {
    "id": 757,
    "date": "2026-06-01",
    "isoDate": "2026-06-01T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 758,
    "date": "2026-06-01",
    "isoDate": "2026-06-01T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 759,
    "date": "2026-06-01",
    "isoDate": "2026-06-01T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 760,
    "date": "2026-06-01",
    "isoDate": "2026-06-01T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 761,
    "date": "2026-06-02",
    "isoDate": "2026-06-02T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:34",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 34
  },
  {
    "id": 762,
    "date": "2026-06-02",
    "isoDate": "2026-06-02T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 763,
    "date": "2026-06-02",
    "isoDate": "2026-06-02T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 764,
    "date": "2026-06-02",
    "isoDate": "2026-06-02T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 765,
    "date": "2026-06-02",
    "isoDate": "2026-06-02T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 766,
    "date": "2026-06-03",
    "isoDate": "2026-06-03T09:00:00.000Z",
    "user": "Budi (Admin Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 767,
    "date": "2026-06-03",
    "isoDate": "2026-06-03T09:00:00.000Z",
    "user": "Siti (Kasir Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 768,
    "date": "2026-06-03",
    "isoDate": "2026-06-03T09:00:00.000Z",
    "user": "Agus (Teknisi Kudus)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 769,
    "date": "2026-06-03",
    "isoDate": "2026-06-03T09:00:00.000Z",
    "user": "Joko (Admin Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  },
  {
    "id": 770,
    "date": "2026-06-03",
    "isoDate": "2026-06-03T09:00:00.000Z",
    "user": "Rina (Kasir Pati)",
    "timeIn": "09:00",
    "timeOut": "17:00",
    "status": "Selesai",
    "lateMins": 0
  }
];
export const initialTransactions = [
  {
    "id": "TRX-20260101-0001",
    "date": "2026-01-01 12:00:00",
    "isoDate": "2026-01-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 250000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260102-0002",
    "date": "2026-01-02 12:00:00",
    "isoDate": "2026-01-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 280000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260103-0003",
    "date": "2026-01-03 12:00:00",
    "isoDate": "2026-01-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 100000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260103-0004",
    "date": "2026-01-03 12:00:00",
    "isoDate": "2026-01-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260104-0005",
    "date": "2026-01-04 12:00:00",
    "isoDate": "2026-01-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260105-0006",
    "date": "2026-01-05 12:00:00",
    "isoDate": "2026-01-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260105-0007",
    "date": "2026-01-05 12:00:00",
    "isoDate": "2026-01-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260105-0008",
    "date": "2026-01-05 12:00:00",
    "isoDate": "2026-01-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 90000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260106-0009",
    "date": "2026-01-06 12:00:00",
    "isoDate": "2026-01-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260106-0010",
    "date": "2026-01-06 12:00:00",
    "isoDate": "2026-01-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 450000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260106-0011",
    "date": "2026-01-06 12:00:00",
    "isoDate": "2026-01-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260107-0012",
    "date": "2026-01-07 12:00:00",
    "isoDate": "2026-01-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260107-0013",
    "date": "2026-01-07 12:00:00",
    "isoDate": "2026-01-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 90000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260108-0014",
    "date": "2026-01-08 12:00:00",
    "isoDate": "2026-01-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260108-0015",
    "date": "2026-01-08 12:00:00",
    "isoDate": "2026-01-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 90000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260108-0016",
    "date": "2026-01-08 12:00:00",
    "isoDate": "2026-01-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260109-0017",
    "date": "2026-01-09 12:00:00",
    "isoDate": "2026-01-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260109-0018",
    "date": "2026-01-09 12:00:00",
    "isoDate": "2026-01-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260110-0019",
    "date": "2026-01-10 12:00:00",
    "isoDate": "2026-01-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260110-0020",
    "date": "2026-01-10 12:00:00",
    "isoDate": "2026-01-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260111-0021",
    "date": "2026-01-11 12:00:00",
    "isoDate": "2026-01-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260111-0022",
    "date": "2026-01-11 12:00:00",
    "isoDate": "2026-01-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 250000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260111-0023-RET",
    "date": "2026-01-11 13:00:00",
    "isoDate": "2026-01-11T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260111-0024",
    "date": "2026-01-11 12:00:00",
    "isoDate": "2026-01-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260112-0025",
    "date": "2026-01-12 12:00:00",
    "isoDate": "2026-01-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 450000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260112-0026-RET",
    "date": "2026-01-12 13:00:00",
    "isoDate": "2026-01-12T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260112-0027",
    "date": "2026-01-12 12:00:00",
    "isoDate": "2026-01-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 240000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 240000
  },
  {
    "id": "TRX-20260112-0028",
    "date": "2026-01-12 12:00:00",
    "isoDate": "2026-01-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 100000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260113-0029",
    "date": "2026-01-13 12:00:00",
    "isoDate": "2026-01-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 450000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260113-0030-RET",
    "date": "2026-01-13 13:00:00",
    "isoDate": "2026-01-13T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 450000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260113-0031",
    "date": "2026-01-13 12:00:00",
    "isoDate": "2026-01-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 45000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260113-0032",
    "date": "2026-01-13 12:00:00",
    "isoDate": "2026-01-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260114-0033",
    "date": "2026-01-14 12:00:00",
    "isoDate": "2026-01-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 120000
  },
  {
    "id": "TRX-20260114-0034",
    "date": "2026-01-14 12:00:00",
    "isoDate": "2026-01-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260114-0035",
    "date": "2026-01-14 12:00:00",
    "isoDate": "2026-01-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260115-0036",
    "date": "2026-01-15 12:00:00",
    "isoDate": "2026-01-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260115-0037",
    "date": "2026-01-15 12:00:00",
    "isoDate": "2026-01-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260115-0038-RET",
    "date": "2026-01-15 13:00:00",
    "isoDate": "2026-01-15T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260116-0039",
    "date": "2026-01-16 12:00:00",
    "isoDate": "2026-01-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 900000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260117-0040",
    "date": "2026-01-17 12:00:00",
    "isoDate": "2026-01-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 190000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260118-0041",
    "date": "2026-01-18 12:00:00",
    "isoDate": "2026-01-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260119-0042",
    "date": "2026-01-19 12:00:00",
    "isoDate": "2026-01-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260119-0043",
    "date": "2026-01-19 12:00:00",
    "isoDate": "2026-01-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 120000
  },
  {
    "id": "TRX-20260120-0044",
    "date": "2026-01-20 12:00:00",
    "isoDate": "2026-01-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260120-0045",
    "date": "2026-01-20 12:00:00",
    "isoDate": "2026-01-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 250000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260120-0046",
    "date": "2026-01-20 12:00:00",
    "isoDate": "2026-01-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260121-0047",
    "date": "2026-01-21 12:00:00",
    "isoDate": "2026-01-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260122-0048",
    "date": "2026-01-22 12:00:00",
    "isoDate": "2026-01-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260123-0049",
    "date": "2026-01-23 12:00:00",
    "isoDate": "2026-01-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260123-0050",
    "date": "2026-01-23 12:00:00",
    "isoDate": "2026-01-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260123-0051",
    "date": "2026-01-23 12:00:00",
    "isoDate": "2026-01-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 120000
  },
  {
    "id": "TRX-20260124-0052",
    "date": "2026-01-24 12:00:00",
    "isoDate": "2026-01-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 90000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260124-0053",
    "date": "2026-01-24 12:00:00",
    "isoDate": "2026-01-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260124-0054",
    "date": "2026-01-24 12:00:00",
    "isoDate": "2026-01-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 600000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260125-0055",
    "date": "2026-01-25 12:00:00",
    "isoDate": "2026-01-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 500000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260125-0056",
    "date": "2026-01-25 12:00:00",
    "isoDate": "2026-01-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260125-0057",
    "date": "2026-01-25 12:00:00",
    "isoDate": "2026-01-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 600000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260126-0058",
    "date": "2026-01-26 12:00:00",
    "isoDate": "2026-01-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 450000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260126-0059-RET",
    "date": "2026-01-26 13:00:00",
    "isoDate": "2026-01-26T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260126-0060",
    "date": "2026-01-26 12:00:00",
    "isoDate": "2026-01-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260126-0061",
    "date": "2026-01-26 12:00:00",
    "isoDate": "2026-01-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260127-0062",
    "date": "2026-01-27 12:00:00",
    "isoDate": "2026-01-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 240000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 240000
  },
  {
    "id": "TRX-20260127-0063",
    "date": "2026-01-27 12:00:00",
    "isoDate": "2026-01-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260128-0064",
    "date": "2026-01-28 12:00:00",
    "isoDate": "2026-01-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260128-0065",
    "date": "2026-01-28 12:00:00",
    "isoDate": "2026-01-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260129-0066",
    "date": "2026-01-29 12:00:00",
    "isoDate": "2026-01-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260129-0067",
    "date": "2026-01-29 12:00:00",
    "isoDate": "2026-01-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260129-0068",
    "date": "2026-01-29 12:00:00",
    "isoDate": "2026-01-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 700000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260129-0069-RET",
    "date": "2026-01-29 13:00:00",
    "isoDate": "2026-01-29T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 350000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260130-0070",
    "date": "2026-01-30 12:00:00",
    "isoDate": "2026-01-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 90000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260131-0071",
    "date": "2026-01-31 12:00:00",
    "isoDate": "2026-01-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260131-0072",
    "date": "2026-01-31 12:00:00",
    "isoDate": "2026-01-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260201-0073",
    "date": "2026-02-01 12:00:00",
    "isoDate": "2026-02-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260201-0074",
    "date": "2026-02-01 12:00:00",
    "isoDate": "2026-02-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 900000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 900000
  },
  {
    "id": "TRX-20260201-0075",
    "date": "2026-02-01 12:00:00",
    "isoDate": "2026-02-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 900000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260202-0076",
    "date": "2026-02-02 12:00:00",
    "isoDate": "2026-02-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260202-0077",
    "date": "2026-02-02 12:00:00",
    "isoDate": "2026-02-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260203-0078",
    "date": "2026-02-03 12:00:00",
    "isoDate": "2026-02-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260203-0079",
    "date": "2026-02-03 12:00:00",
    "isoDate": "2026-02-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 240000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 240000
  },
  {
    "id": "TRX-20260204-0080",
    "date": "2026-02-04 12:00:00",
    "isoDate": "2026-02-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260204-0081",
    "date": "2026-02-04 12:00:00",
    "isoDate": "2026-02-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 650000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260205-0082",
    "date": "2026-02-05 12:00:00",
    "isoDate": "2026-02-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 1300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260205-0083",
    "date": "2026-02-05 12:00:00",
    "isoDate": "2026-02-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260205-0084",
    "date": "2026-02-05 12:00:00",
    "isoDate": "2026-02-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260206-0085",
    "date": "2026-02-06 12:00:00",
    "isoDate": "2026-02-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 700000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260207-0086",
    "date": "2026-02-07 12:00:00",
    "isoDate": "2026-02-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260207-0087",
    "date": "2026-02-07 12:00:00",
    "isoDate": "2026-02-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260208-0088",
    "date": "2026-02-08 12:00:00",
    "isoDate": "2026-02-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260208-0089",
    "date": "2026-02-08 12:00:00",
    "isoDate": "2026-02-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 45000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260209-0090",
    "date": "2026-02-09 12:00:00",
    "isoDate": "2026-02-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260209-0091",
    "date": "2026-02-09 12:00:00",
    "isoDate": "2026-02-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 190000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260210-0092",
    "date": "2026-02-10 12:00:00",
    "isoDate": "2026-02-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260211-0093",
    "date": "2026-02-11 12:00:00",
    "isoDate": "2026-02-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260211-0094",
    "date": "2026-02-11 12:00:00",
    "isoDate": "2026-02-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260211-0095",
    "date": "2026-02-11 12:00:00",
    "isoDate": "2026-02-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260212-0096",
    "date": "2026-02-12 12:00:00",
    "isoDate": "2026-02-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260212-0097",
    "date": "2026-02-12 12:00:00",
    "isoDate": "2026-02-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 280000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260212-0098",
    "date": "2026-02-12 12:00:00",
    "isoDate": "2026-02-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260213-0099",
    "date": "2026-02-13 12:00:00",
    "isoDate": "2026-02-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 900000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 900000
  },
  {
    "id": "TRX-20260214-0100",
    "date": "2026-02-14 12:00:00",
    "isoDate": "2026-02-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 700000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260215-0101",
    "date": "2026-02-15 12:00:00",
    "isoDate": "2026-02-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260216-0102",
    "date": "2026-02-16 12:00:00",
    "isoDate": "2026-02-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260216-0103",
    "date": "2026-02-16 12:00:00",
    "isoDate": "2026-02-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260216-0104",
    "date": "2026-02-16 12:00:00",
    "isoDate": "2026-02-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260217-0105",
    "date": "2026-02-17 12:00:00",
    "isoDate": "2026-02-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260217-0106",
    "date": "2026-02-17 12:00:00",
    "isoDate": "2026-02-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260218-0107",
    "date": "2026-02-18 12:00:00",
    "isoDate": "2026-02-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260219-0108",
    "date": "2026-02-19 12:00:00",
    "isoDate": "2026-02-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260219-0109-RET",
    "date": "2026-02-19 13:00:00",
    "isoDate": "2026-02-19T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260219-0110",
    "date": "2026-02-19 12:00:00",
    "isoDate": "2026-02-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260219-0111-RET",
    "date": "2026-02-19 13:00:00",
    "isoDate": "2026-02-19T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 95000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260219-0112",
    "date": "2026-02-19 12:00:00",
    "isoDate": "2026-02-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260220-0113",
    "date": "2026-02-20 12:00:00",
    "isoDate": "2026-02-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 120000
  },
  {
    "id": "TRX-20260220-0114",
    "date": "2026-02-20 12:00:00",
    "isoDate": "2026-02-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260220-0115",
    "date": "2026-02-20 12:00:00",
    "isoDate": "2026-02-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260221-0116",
    "date": "2026-02-21 12:00:00",
    "isoDate": "2026-02-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 100000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260222-0117",
    "date": "2026-02-22 12:00:00",
    "isoDate": "2026-02-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 240000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 240000
  },
  {
    "id": "TRX-20260222-0118",
    "date": "2026-02-22 12:00:00",
    "isoDate": "2026-02-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260223-0119",
    "date": "2026-02-23 12:00:00",
    "isoDate": "2026-02-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260224-0120",
    "date": "2026-02-24 12:00:00",
    "isoDate": "2026-02-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260225-0121",
    "date": "2026-02-25 12:00:00",
    "isoDate": "2026-02-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260225-0122",
    "date": "2026-02-25 12:00:00",
    "isoDate": "2026-02-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260225-0123",
    "date": "2026-02-25 12:00:00",
    "isoDate": "2026-02-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260226-0124",
    "date": "2026-02-26 12:00:00",
    "isoDate": "2026-02-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260226-0125",
    "date": "2026-02-26 12:00:00",
    "isoDate": "2026-02-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260227-0126",
    "date": "2026-02-27 12:00:00",
    "isoDate": "2026-02-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260227-0127",
    "date": "2026-02-27 12:00:00",
    "isoDate": "2026-02-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260227-0128",
    "date": "2026-02-27 12:00:00",
    "isoDate": "2026-02-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260228-0129",
    "date": "2026-02-28 12:00:00",
    "isoDate": "2026-02-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260228-0130",
    "date": "2026-02-28 12:00:00",
    "isoDate": "2026-02-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260228-0131",
    "date": "2026-02-28 12:00:00",
    "isoDate": "2026-02-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260228-0132-RET",
    "date": "2026-02-28 13:00:00",
    "isoDate": "2026-02-28T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260301-0133",
    "date": "2026-03-01 12:00:00",
    "isoDate": "2026-03-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260301-0134",
    "date": "2026-03-01 12:00:00",
    "isoDate": "2026-03-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260302-0135",
    "date": "2026-03-02 12:00:00",
    "isoDate": "2026-03-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260302-0136-RET",
    "date": "2026-03-02 13:00:00",
    "isoDate": "2026-03-02T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260303-0137",
    "date": "2026-03-03 12:00:00",
    "isoDate": "2026-03-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 45000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260304-0138",
    "date": "2026-03-04 12:00:00",
    "isoDate": "2026-03-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260304-0139",
    "date": "2026-03-04 12:00:00",
    "isoDate": "2026-03-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 50000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260305-0140",
    "date": "2026-03-05 12:00:00",
    "isoDate": "2026-03-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260305-0141",
    "date": "2026-03-05 12:00:00",
    "isoDate": "2026-03-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260306-0142",
    "date": "2026-03-06 12:00:00",
    "isoDate": "2026-03-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260306-0143",
    "date": "2026-03-06 12:00:00",
    "isoDate": "2026-03-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260306-0144-RET",
    "date": "2026-03-06 13:00:00",
    "isoDate": "2026-03-06T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 95000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260307-0145",
    "date": "2026-03-07 12:00:00",
    "isoDate": "2026-03-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 600000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260307-0146",
    "date": "2026-03-07 12:00:00",
    "isoDate": "2026-03-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260308-0147",
    "date": "2026-03-08 12:00:00",
    "isoDate": "2026-03-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260308-0148-RET",
    "date": "2026-03-08 13:00:00",
    "isoDate": "2026-03-08T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 50000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260308-0149",
    "date": "2026-03-08 12:00:00",
    "isoDate": "2026-03-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260308-0150",
    "date": "2026-03-08 12:00:00",
    "isoDate": "2026-03-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 190000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260309-0151",
    "date": "2026-03-09 12:00:00",
    "isoDate": "2026-03-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260309-0152",
    "date": "2026-03-09 12:00:00",
    "isoDate": "2026-03-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 450000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260310-0153",
    "date": "2026-03-10 12:00:00",
    "isoDate": "2026-03-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260310-0154",
    "date": "2026-03-10 12:00:00",
    "isoDate": "2026-03-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 190000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260310-0155",
    "date": "2026-03-10 12:00:00",
    "isoDate": "2026-03-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260311-0156",
    "date": "2026-03-11 12:00:00",
    "isoDate": "2026-03-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260311-0157-RET",
    "date": "2026-03-11 13:00:00",
    "isoDate": "2026-03-11T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260311-0158",
    "date": "2026-03-11 12:00:00",
    "isoDate": "2026-03-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260311-0159",
    "date": "2026-03-11 12:00:00",
    "isoDate": "2026-03-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 50000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260312-0160",
    "date": "2026-03-12 12:00:00",
    "isoDate": "2026-03-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260312-0161",
    "date": "2026-03-12 12:00:00",
    "isoDate": "2026-03-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 50000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260312-0162",
    "date": "2026-03-12 12:00:00",
    "isoDate": "2026-03-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260313-0163",
    "date": "2026-03-13 12:00:00",
    "isoDate": "2026-03-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260314-0164",
    "date": "2026-03-14 12:00:00",
    "isoDate": "2026-03-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 280000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260314-0165",
    "date": "2026-03-14 12:00:00",
    "isoDate": "2026-03-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 45000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260314-0166",
    "date": "2026-03-14 12:00:00",
    "isoDate": "2026-03-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260315-0167",
    "date": "2026-03-15 12:00:00",
    "isoDate": "2026-03-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260315-0168",
    "date": "2026-03-15 12:00:00",
    "isoDate": "2026-03-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 600000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260316-0169",
    "date": "2026-03-16 12:00:00",
    "isoDate": "2026-03-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260316-0170",
    "date": "2026-03-16 12:00:00",
    "isoDate": "2026-03-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260316-0171",
    "date": "2026-03-16 12:00:00",
    "isoDate": "2026-03-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260317-0172",
    "date": "2026-03-17 12:00:00",
    "isoDate": "2026-03-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 100000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260318-0173",
    "date": "2026-03-18 12:00:00",
    "isoDate": "2026-03-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 350000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260319-0174",
    "date": "2026-03-19 12:00:00",
    "isoDate": "2026-03-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 280000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260320-0175",
    "date": "2026-03-20 12:00:00",
    "isoDate": "2026-03-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 700000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260320-0176",
    "date": "2026-03-20 12:00:00",
    "isoDate": "2026-03-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260320-0177",
    "date": "2026-03-20 12:00:00",
    "isoDate": "2026-03-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 240000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260321-0178",
    "date": "2026-03-21 12:00:00",
    "isoDate": "2026-03-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260321-0179",
    "date": "2026-03-21 12:00:00",
    "isoDate": "2026-03-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 1300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260322-0180",
    "date": "2026-03-22 12:00:00",
    "isoDate": "2026-03-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 350000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260322-0181",
    "date": "2026-03-22 12:00:00",
    "isoDate": "2026-03-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 90000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260322-0182-RET",
    "date": "2026-03-22 13:00:00",
    "isoDate": "2026-03-22T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 45000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260323-0183",
    "date": "2026-03-23 12:00:00",
    "isoDate": "2026-03-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260323-0184",
    "date": "2026-03-23 12:00:00",
    "isoDate": "2026-03-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260323-0185",
    "date": "2026-03-23 12:00:00",
    "isoDate": "2026-03-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260324-0186",
    "date": "2026-03-24 12:00:00",
    "isoDate": "2026-03-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260324-0187",
    "date": "2026-03-24 12:00:00",
    "isoDate": "2026-03-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260324-0188-RET",
    "date": "2026-03-24 13:00:00",
    "isoDate": "2026-03-24T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 95000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260324-0189",
    "date": "2026-03-24 12:00:00",
    "isoDate": "2026-03-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260325-0190",
    "date": "2026-03-25 12:00:00",
    "isoDate": "2026-03-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260326-0191",
    "date": "2026-03-26 12:00:00",
    "isoDate": "2026-03-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260326-0192",
    "date": "2026-03-26 12:00:00",
    "isoDate": "2026-03-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260327-0193",
    "date": "2026-03-27 12:00:00",
    "isoDate": "2026-03-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260328-0194",
    "date": "2026-03-28 12:00:00",
    "isoDate": "2026-03-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260328-0195-RET",
    "date": "2026-03-28 13:00:00",
    "isoDate": "2026-03-28T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260329-0196",
    "date": "2026-03-29 12:00:00",
    "isoDate": "2026-03-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260329-0197",
    "date": "2026-03-29 12:00:00",
    "isoDate": "2026-03-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260329-0198",
    "date": "2026-03-29 12:00:00",
    "isoDate": "2026-03-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260330-0199",
    "date": "2026-03-30 12:00:00",
    "isoDate": "2026-03-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260330-0200",
    "date": "2026-03-30 12:00:00",
    "isoDate": "2026-03-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260330-0201",
    "date": "2026-03-30 12:00:00",
    "isoDate": "2026-03-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 500000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260331-0202",
    "date": "2026-03-31 12:00:00",
    "isoDate": "2026-03-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260331-0203",
    "date": "2026-03-31 12:00:00",
    "isoDate": "2026-03-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260331-0204",
    "date": "2026-03-31 12:00:00",
    "isoDate": "2026-03-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260401-0205",
    "date": "2026-04-01 12:00:00",
    "isoDate": "2026-04-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260402-0206",
    "date": "2026-04-02 12:00:00",
    "isoDate": "2026-04-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260402-0207",
    "date": "2026-04-02 12:00:00",
    "isoDate": "2026-04-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260403-0208",
    "date": "2026-04-03 12:00:00",
    "isoDate": "2026-04-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260404-0209",
    "date": "2026-04-04 12:00:00",
    "isoDate": "2026-04-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260405-0210",
    "date": "2026-04-05 12:00:00",
    "isoDate": "2026-04-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 50000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260405-0211",
    "date": "2026-04-05 12:00:00",
    "isoDate": "2026-04-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260405-0212",
    "date": "2026-04-05 12:00:00",
    "isoDate": "2026-04-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260406-0213",
    "date": "2026-04-06 12:00:00",
    "isoDate": "2026-04-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260407-0214",
    "date": "2026-04-07 12:00:00",
    "isoDate": "2026-04-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260407-0215-RET",
    "date": "2026-04-07 13:00:00",
    "isoDate": "2026-04-07T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 300000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260408-0216",
    "date": "2026-04-08 12:00:00",
    "isoDate": "2026-04-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260409-0217",
    "date": "2026-04-09 12:00:00",
    "isoDate": "2026-04-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260410-0218",
    "date": "2026-04-10 12:00:00",
    "isoDate": "2026-04-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260410-0219",
    "date": "2026-04-10 12:00:00",
    "isoDate": "2026-04-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260410-0220",
    "date": "2026-04-10 12:00:00",
    "isoDate": "2026-04-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260411-0221",
    "date": "2026-04-11 12:00:00",
    "isoDate": "2026-04-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260412-0222",
    "date": "2026-04-12 12:00:00",
    "isoDate": "2026-04-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 90000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260412-0223-RET",
    "date": "2026-04-12 13:00:00",
    "isoDate": "2026-04-12T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 45000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260413-0224",
    "date": "2026-04-13 12:00:00",
    "isoDate": "2026-04-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260414-0225",
    "date": "2026-04-14 12:00:00",
    "isoDate": "2026-04-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260414-0226",
    "date": "2026-04-14 12:00:00",
    "isoDate": "2026-04-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 280000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260414-0227",
    "date": "2026-04-14 12:00:00",
    "isoDate": "2026-04-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260415-0228",
    "date": "2026-04-15 12:00:00",
    "isoDate": "2026-04-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 1300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260415-0229",
    "date": "2026-04-15 12:00:00",
    "isoDate": "2026-04-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260415-0230-RET",
    "date": "2026-04-15 13:00:00",
    "isoDate": "2026-04-15T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 280000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260415-0231",
    "date": "2026-04-15 12:00:00",
    "isoDate": "2026-04-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260416-0232",
    "date": "2026-04-16 12:00:00",
    "isoDate": "2026-04-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260416-0233",
    "date": "2026-04-16 12:00:00",
    "isoDate": "2026-04-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260417-0234",
    "date": "2026-04-17 12:00:00",
    "isoDate": "2026-04-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260417-0235",
    "date": "2026-04-17 12:00:00",
    "isoDate": "2026-04-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260417-0236",
    "date": "2026-04-17 12:00:00",
    "isoDate": "2026-04-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 1300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260418-0237",
    "date": "2026-04-18 12:00:00",
    "isoDate": "2026-04-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 250000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260419-0238",
    "date": "2026-04-19 12:00:00",
    "isoDate": "2026-04-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260419-0239",
    "date": "2026-04-19 12:00:00",
    "isoDate": "2026-04-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 1,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 45000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 45000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 45000
  },
  {
    "id": "TRX-20260419-0240",
    "date": "2026-04-19 12:00:00",
    "isoDate": "2026-04-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 90000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260420-0241",
    "date": "2026-04-20 12:00:00",
    "isoDate": "2026-04-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260421-0242",
    "date": "2026-04-21 12:00:00",
    "isoDate": "2026-04-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260421-0243",
    "date": "2026-04-21 12:00:00",
    "isoDate": "2026-04-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260422-0244",
    "date": "2026-04-22 12:00:00",
    "isoDate": "2026-04-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 900000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260422-0245-RET",
    "date": "2026-04-22 13:00:00",
    "isoDate": "2026-04-22T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 450000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260422-0246",
    "date": "2026-04-22 12:00:00",
    "isoDate": "2026-04-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260422-0247",
    "date": "2026-04-22 12:00:00",
    "isoDate": "2026-04-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260423-0248",
    "date": "2026-04-23 12:00:00",
    "isoDate": "2026-04-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 240000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 240000
  },
  {
    "id": "TRX-20260423-0249",
    "date": "2026-04-23 12:00:00",
    "isoDate": "2026-04-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 120000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260423-0250",
    "date": "2026-04-23 12:00:00",
    "isoDate": "2026-04-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260424-0251",
    "date": "2026-04-24 12:00:00",
    "isoDate": "2026-04-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 450000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260424-0252",
    "date": "2026-04-24 12:00:00",
    "isoDate": "2026-04-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260424-0253",
    "date": "2026-04-24 12:00:00",
    "isoDate": "2026-04-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260425-0254",
    "date": "2026-04-25 12:00:00",
    "isoDate": "2026-04-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260425-0255",
    "date": "2026-04-25 12:00:00",
    "isoDate": "2026-04-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 700000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260425-0256",
    "date": "2026-04-25 12:00:00",
    "isoDate": "2026-04-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260426-0257",
    "date": "2026-04-26 12:00:00",
    "isoDate": "2026-04-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260426-0258",
    "date": "2026-04-26 12:00:00",
    "isoDate": "2026-04-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260427-0259",
    "date": "2026-04-27 12:00:00",
    "isoDate": "2026-04-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260428-0260",
    "date": "2026-04-28 12:00:00",
    "isoDate": "2026-04-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260428-0261",
    "date": "2026-04-28 12:00:00",
    "isoDate": "2026-04-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 450000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260428-0262-RET",
    "date": "2026-04-28 13:00:00",
    "isoDate": "2026-04-28T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260429-0263",
    "date": "2026-04-29 12:00:00",
    "isoDate": "2026-04-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260429-0264",
    "date": "2026-04-29 12:00:00",
    "isoDate": "2026-04-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260429-0265",
    "date": "2026-04-29 12:00:00",
    "isoDate": "2026-04-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 600000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260430-0266",
    "date": "2026-04-30 12:00:00",
    "isoDate": "2026-04-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260430-0267",
    "date": "2026-04-30 12:00:00",
    "isoDate": "2026-04-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260430-0268",
    "date": "2026-04-30 12:00:00",
    "isoDate": "2026-04-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260501-0269",
    "date": "2026-05-01 12:00:00",
    "isoDate": "2026-05-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260501-0270",
    "date": "2026-05-01 12:00:00",
    "isoDate": "2026-05-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260501-0271-RET",
    "date": "2026-05-01 13:00:00",
    "isoDate": "2026-05-01T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260501-0272",
    "date": "2026-05-01 12:00:00",
    "isoDate": "2026-05-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 900000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 900000
  },
  {
    "id": "TRX-20260502-0273",
    "date": "2026-05-02 12:00:00",
    "isoDate": "2026-05-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 350000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260503-0274",
    "date": "2026-05-03 12:00:00",
    "isoDate": "2026-05-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260504-0275",
    "date": "2026-05-04 12:00:00",
    "isoDate": "2026-05-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260504-0276",
    "date": "2026-05-04 12:00:00",
    "isoDate": "2026-05-04T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 900000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 900000
  },
  {
    "id": "TRX-20260505-0277",
    "date": "2026-05-05 12:00:00",
    "isoDate": "2026-05-05T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 95000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260506-0278",
    "date": "2026-05-06 12:00:00",
    "isoDate": "2026-05-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260506-0279",
    "date": "2026-05-06 12:00:00",
    "isoDate": "2026-05-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 350000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 350000
  },
  {
    "id": "TRX-20260506-0280",
    "date": "2026-05-06 12:00:00",
    "isoDate": "2026-05-06T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260507-0281",
    "date": "2026-05-07 12:00:00",
    "isoDate": "2026-05-07T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260508-0282",
    "date": "2026-05-08 12:00:00",
    "isoDate": "2026-05-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260508-0283",
    "date": "2026-05-08 12:00:00",
    "isoDate": "2026-05-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260508-0284",
    "date": "2026-05-08 12:00:00",
    "isoDate": "2026-05-08T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260509-0285",
    "date": "2026-05-09 12:00:00",
    "isoDate": "2026-05-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 250000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260509-0286",
    "date": "2026-05-09 12:00:00",
    "isoDate": "2026-05-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 1,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 95000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 95000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 95000
  },
  {
    "id": "TRX-20260509-0287",
    "date": "2026-05-09 12:00:00",
    "isoDate": "2026-05-09T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260510-0288",
    "date": "2026-05-10 12:00:00",
    "isoDate": "2026-05-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 500000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260510-0289",
    "date": "2026-05-10 12:00:00",
    "isoDate": "2026-05-10T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 700000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260511-0290",
    "date": "2026-05-11 12:00:00",
    "isoDate": "2026-05-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 50000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260511-0291",
    "date": "2026-05-11 12:00:00",
    "isoDate": "2026-05-11T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 1300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260512-0292",
    "date": "2026-05-12 12:00:00",
    "isoDate": "2026-05-12T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 2,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 240000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 240000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 240000
  },
  {
    "id": "TRX-20260513-0293",
    "date": "2026-05-13 12:00:00",
    "isoDate": "2026-05-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260513-0294",
    "date": "2026-05-13 12:00:00",
    "isoDate": "2026-05-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260513-0295",
    "date": "2026-05-13 12:00:00",
    "isoDate": "2026-05-13T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 90000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260514-0296",
    "date": "2026-05-14 12:00:00",
    "isoDate": "2026-05-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260514-0297",
    "date": "2026-05-14 12:00:00",
    "isoDate": "2026-05-14T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260515-0298",
    "date": "2026-05-15 12:00:00",
    "isoDate": "2026-05-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260515-0299",
    "date": "2026-05-15 12:00:00",
    "isoDate": "2026-05-15T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 12,
        "code": "F001",
        "name": "Flexible Charger Samsung A51",
        "category": "Flexible",
        "price1": 95000,
        "price2": 75000,
        "stock": 30,
        "qty": 2,
        "price": 95000,
        "isReturn": false
      }
    ],
    "total": 190000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 190000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 190000
  },
  {
    "id": "TRX-20260516-0300",
    "date": "2026-05-16 12:00:00",
    "isoDate": "2026-05-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 280000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260516-0301",
    "date": "2026-05-16 12:00:00",
    "isoDate": "2026-05-16T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 2,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 700000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 700000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 700000
  },
  {
    "id": "TRX-20260517-0302",
    "date": "2026-05-17 12:00:00",
    "isoDate": "2026-05-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 650000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260517-0303",
    "date": "2026-05-17 12:00:00",
    "isoDate": "2026-05-17T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 560000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260518-0304",
    "date": "2026-05-18 12:00:00",
    "isoDate": "2026-05-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260518-0305",
    "date": "2026-05-18 12:00:00",
    "isoDate": "2026-05-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260518-0306",
    "date": "2026-05-18 12:00:00",
    "isoDate": "2026-05-18T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 650000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260519-0307",
    "date": "2026-05-19 12:00:00",
    "isoDate": "2026-05-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 2,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 900000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 900000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 900000
  },
  {
    "id": "TRX-20260519-0308",
    "date": "2026-05-19 12:00:00",
    "isoDate": "2026-05-19T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 50000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260520-0309",
    "date": "2026-05-20 12:00:00",
    "isoDate": "2026-05-20T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 2,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 600000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 600000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 600000
  },
  {
    "id": "TRX-20260521-0310",
    "date": "2026-05-21 12:00:00",
    "isoDate": "2026-05-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 50000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 50000
  },
  {
    "id": "TRX-20260521-0311-RET",
    "date": "2026-05-21 13:00:00",
    "isoDate": "2026-05-21T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 1,
        "price": 50000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 50000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260521-0312",
    "date": "2026-05-21 12:00:00",
    "isoDate": "2026-05-21T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 500000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260522-0313",
    "date": "2026-05-22 12:00:00",
    "isoDate": "2026-05-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 250000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260522-0314",
    "date": "2026-05-22 12:00:00",
    "isoDate": "2026-05-22T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260523-0315",
    "date": "2026-05-23 12:00:00",
    "isoDate": "2026-05-23T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260524-0316",
    "date": "2026-05-24 12:00:00",
    "isoDate": "2026-05-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 1,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 280000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 280000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 280000
  },
  {
    "id": "TRX-20260524-0317",
    "date": "2026-05-24 12:00:00",
    "isoDate": "2026-05-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 300000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260524-0318",
    "date": "2026-05-24 12:00:00",
    "isoDate": "2026-05-24T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 450000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260525-0319",
    "date": "2026-05-25 12:00:00",
    "isoDate": "2026-05-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 3,
        "code": "L003",
        "name": "LCD Xiaomi Note 10",
        "category": "LCD",
        "price1": 300000,
        "price2": 250000,
        "stock": 50,
        "qty": 1,
        "price": 300000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "Qriss/TF",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260525-0320",
    "date": "2026-05-25 12:00:00",
    "isoDate": "2026-05-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260525-0321",
    "date": "2026-05-25 12:00:00",
    "isoDate": "2026-05-25T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260525-0322-RET",
    "date": "2026-05-25 13:00:00",
    "isoDate": "2026-05-25T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 7,
        "code": "B003",
        "name": "Baterai Xiaomi BM4X",
        "category": "Batre",
        "price1": 150000,
        "price2": 120000,
        "stock": 60,
        "qty": 1,
        "price": 150000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 0,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260526-0323",
    "date": "2026-05-26 12:00:00",
    "isoDate": "2026-05-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 500000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260526-0324",
    "date": "2026-05-26 12:00:00",
    "isoDate": "2026-05-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260526-0325",
    "date": "2026-05-26 12:00:00",
    "isoDate": "2026-05-26T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 9,
        "code": "A002",
        "name": "Kabel Data Type-C Fast",
        "category": "Aksesoris",
        "price1": 45000,
        "price2": 25000,
        "stock": 100,
        "qty": 2,
        "price": 45000,
        "isReturn": false
      }
    ],
    "total": 90000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 90000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 90000
  },
  {
    "id": "TRX-20260527-0326",
    "date": "2026-05-27 12:00:00",
    "isoDate": "2026-05-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 450000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260527-0327",
    "date": "2026-05-27 12:00:00",
    "isoDate": "2026-05-27T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 1300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 1300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 1300000
  },
  {
    "id": "TRX-20260528-0328",
    "date": "2026-05-28 12:00:00",
    "isoDate": "2026-05-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260528-0329-RET",
    "date": "2026-05-28 13:00:00",
    "isoDate": "2026-05-28T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 1,
        "price": 150000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260528-0330",
    "date": "2026-05-28 12:00:00",
    "isoDate": "2026-05-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 350000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260528-0331-RET",
    "date": "2026-05-28 13:00:00",
    "isoDate": "2026-05-28T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 350000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260528-0332",
    "date": "2026-05-28 12:00:00",
    "isoDate": "2026-05-28T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 250000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 250000
  },
  {
    "id": "TRX-20260529-0333",
    "date": "2026-05-29 12:00:00",
    "isoDate": "2026-05-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 450000,
        "isReturn": false
      }
    ],
    "total": 450000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 450000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 450000
  },
  {
    "id": "TRX-20260529-0334",
    "date": "2026-05-29 12:00:00",
    "isoDate": "2026-05-29T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 650000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 650000
  },
  {
    "id": "TRX-20260530-0335",
    "date": "2026-05-30 12:00:00",
    "isoDate": "2026-05-30T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 4,
        "code": "L004",
        "name": "LCD Oppo F11",
        "category": "LCD",
        "price1": 280000,
        "price2": 230000,
        "stock": 50,
        "qty": 2,
        "price": 280000,
        "isReturn": false
      }
    ],
    "total": 560000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 560000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 560000
  },
  {
    "id": "TRX-20260531-0336",
    "date": "2026-05-31 12:00:00",
    "isoDate": "2026-05-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260531-0337",
    "date": "2026-05-31 12:00:00",
    "isoDate": "2026-05-31T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 120000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 120000
  },
  {
    "id": "TRX-20260601-0338",
    "date": "2026-06-01 12:00:00",
    "isoDate": "2026-06-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 6,
        "code": "B002",
        "name": "Baterai Samsung S20",
        "category": "Batre",
        "price1": 250000,
        "price2": 200000,
        "stock": 45,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 500000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260601-0339",
    "date": "2026-06-01 12:00:00",
    "isoDate": "2026-06-01T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 11,
        "code": "S001",
        "name": "Speaker iPhone 11 Pro",
        "category": "Speaker",
        "price1": 150000,
        "price2": 120000,
        "stock": 20,
        "qty": 2,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 300000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 300000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 300000
  },
  {
    "id": "TRX-20260602-0340",
    "date": "2026-06-02 12:00:00",
    "isoDate": "2026-06-02T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": false
      }
    ],
    "total": 650000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 650000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260602-0341-RET",
    "date": "2026-06-02 13:00:00",
    "isoDate": "2026-06-02T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 650000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 650000,
    "method": "Qriss/TF",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260603-0342",
    "date": "2026-06-03 12:00:00",
    "isoDate": "2026-06-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 10,
        "code": "A003",
        "name": "Charger Adaptor 20W",
        "category": "Aksesoris",
        "price1": 120000,
        "price2": 90000,
        "stock": 80,
        "qty": 1,
        "price": 120000,
        "isReturn": false
      }
    ],
    "total": 120000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 120000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 120000
  },
  {
    "id": "TRX-20260603-0343",
    "date": "2026-06-03 12:00:00",
    "isoDate": "2026-06-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 8,
        "code": "A001",
        "name": "Tempered Glass V-Gen",
        "category": "Aksesoris",
        "price1": 50000,
        "price2": 30000,
        "stock": 150,
        "qty": 2,
        "price": 50000,
        "isReturn": false
      }
    ],
    "total": 100000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 100000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 100000
  },
  {
    "id": "TRX-20260603-0344",
    "date": "2026-06-03 12:00:00",
    "isoDate": "2026-06-03T12:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 2,
        "price": 250000,
        "isReturn": false
      }
    ],
    "total": 500000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 500000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 500000
  },
  {
    "id": "TRX-20260603-0345-RET",
    "date": "2026-06-03 13:00:00",
    "isoDate": "2026-06-03T14:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 13,
        "code": "C001",
        "name": "Kamera Belakang Xiaomi Note 10",
        "category": "Kamera",
        "price1": 250000,
        "price2": 200000,
        "stock": 15,
        "qty": 1,
        "price": 250000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 250000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260603-9998",
    "date": "2026-06-03 15:00:00",
    "isoDate": "2026-06-03T15:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Siti (Kasir Kudus)",
    "paid": 150000,
    "change": 0,
    "branch": "Kudus",
    "cashReceived": 150000
  },
  {
    "id": "TRX-20260603-9997",
    "date": "2026-06-03 15:10:00",
    "isoDate": "2026-06-03T15:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 50000,
        "isReturn": true
      }
    ],
    "total": 0,
    "returTotal": 50000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 0,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 0
  },
  {
    "id": "TRX-20260603-9999",
    "date": "2026-06-03 15:05:00",
    "isoDate": "2026-06-03T15:00:00.000Z",
    "customer": "Pelanggan Umum",
    "items": [
      {
        "id": 2,
        "code": "L002",
        "name": "LCD Samsung A51",
        "category": "LCD",
        "price1": 450000,
        "price2": 350000,
        "stock": 50,
        "qty": 1,
        "price": 150000,
        "isReturn": false
      }
    ],
    "total": 150000,
    "method": "TUNAI",
    "cashier": "Rina (Kasir Pati)",
    "paid": 150000,
    "change": 0,
    "branch": "Pati",
    "cashReceived": 150000
  }
];
export const initialExpenses = [
  {
    "id": "EXP-KASBON-1",
    "date": "2026-06-01 10:00:00",
    "isoDate": "2026-06-01T10:00:00.000Z",
    "name": "Kasbon Pegawai",
    "amount": 250000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas",
    "isBon": true,
    "bonEmployee": "Agus (Teknisi Kudus)",
    "bonReason": "Pinjam untuk keperluan pribadi"
  },
  {
    "id": "EXP-1",
    "date": "2026-01-01 21:00:00",
    "isoDate": "2026-01-01T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 250000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-2",
    "date": "2026-01-03 14:00:00",
    "isoDate": "2026-01-03T14:00:00.000Z",
    "name": "Parkir",
    "amount": 25968,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-3",
    "date": "2026-01-03 21:00:00",
    "isoDate": "2026-01-03T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 374032,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-4",
    "date": "2026-01-04 21:00:00",
    "isoDate": "2026-01-04T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 150000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-5",
    "date": "2026-01-05 21:00:00",
    "isoDate": "2026-01-05T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 435000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-6",
    "date": "2026-01-06 14:00:00",
    "isoDate": "2026-01-06T14:00:00.000Z",
    "name": "Parkir",
    "amount": 20783,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-7",
    "date": "2026-01-06 21:00:00",
    "isoDate": "2026-01-06T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 579217,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-8",
    "date": "2026-01-07 21:00:00",
    "isoDate": "2026-01-07T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1390000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-9",
    "date": "2026-01-08 21:00:00",
    "isoDate": "2026-01-08T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 470000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-10",
    "date": "2026-01-09 14:00:00",
    "isoDate": "2026-01-09T14:00:00.000Z",
    "name": "Parkir",
    "amount": 25888,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-11",
    "date": "2026-01-09 21:00:00",
    "isoDate": "2026-01-09T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 884112,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-12",
    "date": "2026-01-10 21:00:00",
    "isoDate": "2026-01-10T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 800000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-13",
    "date": "2026-01-11 14:00:00",
    "isoDate": "2026-01-11T14:00:00.000Z",
    "name": "Parkir",
    "amount": 20816,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-14",
    "date": "2026-01-11 21:00:00",
    "isoDate": "2026-01-11T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 379184,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-15",
    "date": "2026-01-12 14:00:00",
    "isoDate": "2026-01-12T14:00:00.000Z",
    "name": "Parkir",
    "amount": 29629,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-16",
    "date": "2026-01-12 21:00:00",
    "isoDate": "2026-01-12T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 310371,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-17",
    "date": "2026-01-13 14:00:00",
    "isoDate": "2026-01-13T14:00:00.000Z",
    "name": "Parkir",
    "amount": 24842,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-18",
    "date": "2026-01-13 21:00:00",
    "isoDate": "2026-01-13T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 320158,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-19",
    "date": "2026-01-14 21:00:00",
    "isoDate": "2026-01-14T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 620000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-20",
    "date": "2026-01-16 14:00:00",
    "isoDate": "2026-01-16T14:00:00.000Z",
    "name": "Parkir",
    "amount": 19664,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-21",
    "date": "2026-01-17 21:00:00",
    "isoDate": "2026-01-17T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 170336,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-22",
    "date": "2026-01-18 14:00:00",
    "isoDate": "2026-01-18T14:00:00.000Z",
    "name": "Parkir",
    "amount": 12250,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-23",
    "date": "2026-01-18 21:00:00",
    "isoDate": "2026-01-18T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 82750,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-24",
    "date": "2026-01-19 14:00:00",
    "isoDate": "2026-01-19T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 18252,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-25",
    "date": "2026-01-19 21:00:00",
    "isoDate": "2026-01-19T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 101748,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-26",
    "date": "2026-01-20 14:00:00",
    "isoDate": "2026-01-20T14:00:00.000Z",
    "name": "Parkir",
    "amount": 17041,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-27",
    "date": "2026-01-20 21:00:00",
    "isoDate": "2026-01-20T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1042959,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-28",
    "date": "2026-01-21 14:00:00",
    "isoDate": "2026-01-21T14:00:00.000Z",
    "name": "Parkir",
    "amount": 15163,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-29",
    "date": "2026-01-22 14:00:00",
    "isoDate": "2026-01-22T14:00:00.000Z",
    "name": "Parkir",
    "amount": 11013,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-30",
    "date": "2026-01-22 21:00:00",
    "isoDate": "2026-01-22T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 68824,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-31",
    "date": "2026-01-23 14:00:00",
    "isoDate": "2026-01-23T14:00:00.000Z",
    "name": "Parkir",
    "amount": 23013,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-32",
    "date": "2026-01-23 21:00:00",
    "isoDate": "2026-01-23T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 656987,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-33",
    "date": "2026-01-24 14:00:00",
    "isoDate": "2026-01-24T14:00:00.000Z",
    "name": "Parkir",
    "amount": 23588,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-34",
    "date": "2026-01-24 21:00:00",
    "isoDate": "2026-01-24T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 816412,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-35",
    "date": "2026-01-25 21:00:00",
    "isoDate": "2026-01-25T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1100000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-36",
    "date": "2026-01-26 14:00:00",
    "isoDate": "2026-01-26T14:00:00.000Z",
    "name": "Parkir",
    "amount": 14730,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-37",
    "date": "2026-01-27 14:00:00",
    "isoDate": "2026-01-27T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 22849,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-38",
    "date": "2026-01-27 21:00:00",
    "isoDate": "2026-01-27T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 502421,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-39",
    "date": "2026-01-28 21:00:00",
    "isoDate": "2026-01-28T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 240000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-40",
    "date": "2026-01-28 10:00:00",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "name": "Gaji Karyawan",
    "amount": 5000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-41",
    "date": "2026-01-28 11:00:00",
    "isoDate": "2026-01-28T09:00:00.000Z",
    "name": "Prive Owner",
    "amount": 2000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-42",
    "date": "2026-01-29 14:00:00",
    "isoDate": "2026-01-29T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 24193,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-43",
    "date": "2026-01-29 21:00:00",
    "isoDate": "2026-01-29T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 625807,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-44",
    "date": "2026-01-31 14:00:00",
    "isoDate": "2026-01-31T14:00:00.000Z",
    "name": "Parkir",
    "amount": 25627,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-45",
    "date": "2026-01-31 21:00:00",
    "isoDate": "2026-01-31T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1524373,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-46",
    "date": "2026-02-01 21:00:00",
    "isoDate": "2026-02-01T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 2200000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-47",
    "date": "2026-02-02 14:00:00",
    "isoDate": "2026-02-02T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 16182,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-48",
    "date": "2026-02-02 21:00:00",
    "isoDate": "2026-02-02T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 783818,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-49",
    "date": "2026-02-03 21:00:00",
    "isoDate": "2026-02-03T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 800000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-50",
    "date": "2026-02-04 14:00:00",
    "isoDate": "2026-02-04T14:00:00.000Z",
    "name": "Parkir",
    "amount": 23284,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-51",
    "date": "2026-02-04 21:00:00",
    "isoDate": "2026-02-04T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 276716,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-52",
    "date": "2026-02-05 21:00:00",
    "isoDate": "2026-02-05T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1650000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-53",
    "date": "2026-02-06 14:00:00",
    "isoDate": "2026-02-06T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 18109,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-54",
    "date": "2026-02-06 21:00:00",
    "isoDate": "2026-02-06T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 681891,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-55",
    "date": "2026-02-07 21:00:00",
    "isoDate": "2026-02-07T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 380000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-56",
    "date": "2026-02-08 14:00:00",
    "isoDate": "2026-02-08T14:00:00.000Z",
    "name": "Parkir",
    "amount": 24443,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-57",
    "date": "2026-02-08 21:00:00",
    "isoDate": "2026-02-08T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 20557,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-58",
    "date": "2026-02-09 21:00:00",
    "isoDate": "2026-02-09T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 690000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-59",
    "date": "2026-02-10 14:00:00",
    "isoDate": "2026-02-10T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 28507,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-60",
    "date": "2026-02-10 21:00:00",
    "isoDate": "2026-02-10T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 271493,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-61",
    "date": "2026-02-11 21:00:00",
    "isoDate": "2026-02-11T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1510000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-62",
    "date": "2026-02-12 14:00:00",
    "isoDate": "2026-02-12T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 20062,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-63",
    "date": "2026-02-12 21:00:00",
    "isoDate": "2026-02-12T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1239938,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-64",
    "date": "2026-02-13 14:00:00",
    "isoDate": "2026-02-13T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 26993,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-65",
    "date": "2026-02-13 21:00:00",
    "isoDate": "2026-02-13T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 873007,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-66",
    "date": "2026-02-14 14:00:00",
    "isoDate": "2026-02-14T14:00:00.000Z",
    "name": "Parkir",
    "amount": 17923,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-67",
    "date": "2026-02-14 21:00:00",
    "isoDate": "2026-02-14T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 682077,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-68",
    "date": "2026-02-15 21:00:00",
    "isoDate": "2026-02-15T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 280000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-69",
    "date": "2026-02-16 21:00:00",
    "isoDate": "2026-02-16T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1345000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-70",
    "date": "2026-02-17 21:00:00",
    "isoDate": "2026-02-17T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 145000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-71",
    "date": "2026-02-18 21:00:00",
    "isoDate": "2026-02-18T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 350000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-72",
    "date": "2026-02-19 21:00:00",
    "isoDate": "2026-02-19T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1095000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-73",
    "date": "2026-02-20 21:00:00",
    "isoDate": "2026-02-20T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 220000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-74",
    "date": "2026-02-21 14:00:00",
    "isoDate": "2026-02-21T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 10443,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-75",
    "date": "2026-02-21 21:00:00",
    "isoDate": "2026-02-21T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 89557,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-76",
    "date": "2026-02-22 21:00:00",
    "isoDate": "2026-02-22T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 240000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-77",
    "date": "2026-02-23 14:00:00",
    "isoDate": "2026-02-23T14:00:00.000Z",
    "name": "Parkir",
    "amount": 13152,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-78",
    "date": "2026-02-23 21:00:00",
    "isoDate": "2026-02-23T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 546848,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-79",
    "date": "2026-02-24 14:00:00",
    "isoDate": "2026-02-24T14:00:00.000Z",
    "name": "Parkir",
    "amount": 19641,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-80",
    "date": "2026-02-25 21:00:00",
    "isoDate": "2026-02-25T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 880359,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-81",
    "date": "2026-02-26 21:00:00",
    "isoDate": "2026-02-26T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 150000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-82",
    "date": "2026-02-27 14:00:00",
    "isoDate": "2026-02-27T14:00:00.000Z",
    "name": "Parkir",
    "amount": 13364,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-83",
    "date": "2026-02-27 21:00:00",
    "isoDate": "2026-02-27T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1011636,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-84",
    "date": "2026-02-28 21:00:00",
    "isoDate": "2026-02-28T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 930000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-85",
    "date": "2026-02-28 10:00:00",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "name": "Gaji Karyawan",
    "amount": 5000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-86",
    "date": "2026-02-28 11:00:00",
    "isoDate": "2026-02-28T09:00:00.000Z",
    "name": "Prive Owner",
    "amount": 2000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-87",
    "date": "2026-03-01 14:00:00",
    "isoDate": "2026-03-01T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 22041,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-88",
    "date": "2026-03-01 21:00:00",
    "isoDate": "2026-03-01T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1037959,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-89",
    "date": "2026-03-03 21:00:00",
    "isoDate": "2026-03-03T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 45000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-90",
    "date": "2026-03-04 14:00:00",
    "isoDate": "2026-03-04T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 13170,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-91",
    "date": "2026-03-04 21:00:00",
    "isoDate": "2026-03-04T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 36830,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-92",
    "date": "2026-03-05 21:00:00",
    "isoDate": "2026-03-05T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1000000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-93",
    "date": "2026-03-06 21:00:00",
    "isoDate": "2026-03-06T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 560000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-94",
    "date": "2026-03-07 14:00:00",
    "isoDate": "2026-03-07T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 23563,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-95",
    "date": "2026-03-07 21:00:00",
    "isoDate": "2026-03-07T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 621437,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-96",
    "date": "2026-03-08 14:00:00",
    "isoDate": "2026-03-08T14:00:00.000Z",
    "name": "Parkir",
    "amount": 22765,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-97",
    "date": "2026-03-08 21:00:00",
    "isoDate": "2026-03-08T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 467235,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-98",
    "date": "2026-03-09 14:00:00",
    "isoDate": "2026-03-09T14:00:00.000Z",
    "name": "Parkir",
    "amount": 28234,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-99",
    "date": "2026-03-09 21:00:00",
    "isoDate": "2026-03-09T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 421766,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-100",
    "date": "2026-03-10 21:00:00",
    "isoDate": "2026-03-10T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 840000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-101",
    "date": "2026-03-11 21:00:00",
    "isoDate": "2026-03-11T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 145000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-102",
    "date": "2026-03-12 14:00:00",
    "isoDate": "2026-03-12T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 20562,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-103",
    "date": "2026-03-12 21:00:00",
    "isoDate": "2026-03-12T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 179438,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-104",
    "date": "2026-03-13 14:00:00",
    "isoDate": "2026-03-13T14:00:00.000Z",
    "name": "Parkir",
    "amount": 13138,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-105",
    "date": "2026-03-13 21:00:00",
    "isoDate": "2026-03-13T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 286862,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-106",
    "date": "2026-03-14 21:00:00",
    "isoDate": "2026-03-14T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 825000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-107",
    "date": "2026-03-15 21:00:00",
    "isoDate": "2026-03-15T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 45000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-108",
    "date": "2026-03-16 14:00:00",
    "isoDate": "2026-03-16T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 20646,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-109",
    "date": "2026-03-16 21:00:00",
    "isoDate": "2026-03-16T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 559354,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-110",
    "date": "2026-03-17 14:00:00",
    "isoDate": "2026-03-17T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 15300,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-111",
    "date": "2026-03-17 21:00:00",
    "isoDate": "2026-03-17T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 84700,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-112",
    "date": "2026-03-18 14:00:00",
    "isoDate": "2026-03-18T14:00:00.000Z",
    "name": "Parkir",
    "amount": 13848,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-113",
    "date": "2026-03-18 21:00:00",
    "isoDate": "2026-03-18T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 336152,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-114",
    "date": "2026-03-19 21:00:00",
    "isoDate": "2026-03-19T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 280000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-115",
    "date": "2026-03-20 14:00:00",
    "isoDate": "2026-03-20T14:00:00.000Z",
    "name": "Parkir",
    "amount": 14996,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-116",
    "date": "2026-03-20 21:00:00",
    "isoDate": "2026-03-20T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 545004,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-117",
    "date": "2026-03-21 21:00:00",
    "isoDate": "2026-03-21T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1600000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-118",
    "date": "2026-03-22 21:00:00",
    "isoDate": "2026-03-22T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 350000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-119",
    "date": "2026-03-23 21:00:00",
    "isoDate": "2026-03-23T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 700000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-120",
    "date": "2026-03-24 21:00:00",
    "isoDate": "2026-03-24T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 45000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-121",
    "date": "2026-03-25 14:00:00",
    "isoDate": "2026-03-25T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 29856,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-122",
    "date": "2026-03-25 21:00:00",
    "isoDate": "2026-03-25T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 15144,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-123",
    "date": "2026-03-26 14:00:00",
    "isoDate": "2026-03-26T14:00:00.000Z",
    "name": "Parkir",
    "amount": 12886,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-124",
    "date": "2026-03-26 21:00:00",
    "isoDate": "2026-03-26T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 737114,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-125",
    "date": "2026-03-27 21:00:00",
    "isoDate": "2026-03-27T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 700000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-126",
    "date": "2026-03-28 21:00:00",
    "isoDate": "2026-03-28T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 250000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-127",
    "date": "2026-03-28 10:00:00",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "name": "Gaji Karyawan",
    "amount": 5000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-128",
    "date": "2026-03-28 11:00:00",
    "isoDate": "2026-03-28T09:00:00.000Z",
    "name": "Prive Owner",
    "amount": 2000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-129",
    "date": "2026-03-29 21:00:00",
    "isoDate": "2026-03-29T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 150000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-130",
    "date": "2026-03-30 14:00:00",
    "isoDate": "2026-03-30T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 17189,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-131",
    "date": "2026-03-30 21:00:00",
    "isoDate": "2026-03-30T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1742811,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-132",
    "date": "2026-03-31 21:00:00",
    "isoDate": "2026-03-31T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 95000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-133",
    "date": "2026-04-01 14:00:00",
    "isoDate": "2026-04-01T14:00:00.000Z",
    "name": "Parkir",
    "amount": 19065,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-134",
    "date": "2026-04-01 21:00:00",
    "isoDate": "2026-04-01T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 540935,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-135",
    "date": "2026-04-02 14:00:00",
    "isoDate": "2026-04-02T14:00:00.000Z",
    "name": "Parkir",
    "amount": 22418,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-136",
    "date": "2026-04-02 21:00:00",
    "isoDate": "2026-04-02T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 427582,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-137",
    "date": "2026-04-03 21:00:00",
    "isoDate": "2026-04-03T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 650000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-138",
    "date": "2026-04-04 14:00:00",
    "isoDate": "2026-04-04T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 29048,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-139",
    "date": "2026-04-04 21:00:00",
    "isoDate": "2026-04-04T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 530952,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-140",
    "date": "2026-04-05 14:00:00",
    "isoDate": "2026-04-05T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 16252,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-141",
    "date": "2026-04-05 21:00:00",
    "isoDate": "2026-04-05T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 428748,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-142",
    "date": "2026-04-06 14:00:00",
    "isoDate": "2026-04-06T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 23164,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-143",
    "date": "2026-04-06 21:00:00",
    "isoDate": "2026-04-06T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 276836,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-144",
    "date": "2026-04-08 21:00:00",
    "isoDate": "2026-04-08T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 280000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-145",
    "date": "2026-04-09 14:00:00",
    "isoDate": "2026-04-09T14:00:00.000Z",
    "name": "Parkir",
    "amount": 24364,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-146",
    "date": "2026-04-09 21:00:00",
    "isoDate": "2026-04-09T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 225636,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-147",
    "date": "2026-04-10 21:00:00",
    "isoDate": "2026-04-10T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1110000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-148",
    "date": "2026-04-11 14:00:00",
    "isoDate": "2026-04-11T14:00:00.000Z",
    "name": "Parkir",
    "amount": 17890,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-149",
    "date": "2026-04-11 21:00:00",
    "isoDate": "2026-04-11T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 282110,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-150",
    "date": "2026-04-12 14:00:00",
    "isoDate": "2026-04-12T14:00:00.000Z",
    "name": "Parkir",
    "amount": 22162,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-151",
    "date": "2026-04-13 21:00:00",
    "isoDate": "2026-04-13T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 167838,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-152",
    "date": "2026-04-14 21:00:00",
    "isoDate": "2026-04-14T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 100000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-153",
    "date": "2026-04-15 21:00:00",
    "isoDate": "2026-04-15T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1580000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-154",
    "date": "2026-04-16 21:00:00",
    "isoDate": "2026-04-16T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 695000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-155",
    "date": "2026-04-17 21:00:00",
    "isoDate": "2026-04-17T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1740000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-156",
    "date": "2026-04-18 21:00:00",
    "isoDate": "2026-04-18T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 250000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-157",
    "date": "2026-04-19 21:00:00",
    "isoDate": "2026-04-19T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 435000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-158",
    "date": "2026-04-20 14:00:00",
    "isoDate": "2026-04-20T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 16940,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-159",
    "date": "2026-04-20 21:00:00",
    "isoDate": "2026-04-20T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 483060,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-160",
    "date": "2026-04-21 14:00:00",
    "isoDate": "2026-04-21T14:00:00.000Z",
    "name": "Parkir",
    "amount": 14202,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-161",
    "date": "2026-04-21 21:00:00",
    "isoDate": "2026-04-21T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 285798,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-162",
    "date": "2026-04-22 14:00:00",
    "isoDate": "2026-04-22T14:00:00.000Z",
    "name": "Parkir",
    "amount": 19954,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-163",
    "date": "2026-04-22 21:00:00",
    "isoDate": "2026-04-22T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 130046,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-164",
    "date": "2026-04-23 14:00:00",
    "isoDate": "2026-04-23T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 22725,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-165",
    "date": "2026-04-23 21:00:00",
    "isoDate": "2026-04-23T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 867275,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-166",
    "date": "2026-04-24 14:00:00",
    "isoDate": "2026-04-24T14:00:00.000Z",
    "name": "Parkir",
    "amount": 23649,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-167",
    "date": "2026-04-24 21:00:00",
    "isoDate": "2026-04-24T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1026351,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-168",
    "date": "2026-04-25 14:00:00",
    "isoDate": "2026-04-25T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 23000,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-169",
    "date": "2026-04-25 21:00:00",
    "isoDate": "2026-04-25T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 677000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-170",
    "date": "2026-04-26 21:00:00",
    "isoDate": "2026-04-26T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1000000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-171",
    "date": "2026-04-27 21:00:00",
    "isoDate": "2026-04-27T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 500000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-172",
    "date": "2026-04-28 14:00:00",
    "isoDate": "2026-04-28T14:00:00.000Z",
    "name": "Parkir",
    "amount": 15182,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-173",
    "date": "2026-04-28 21:00:00",
    "isoDate": "2026-04-28T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 284818,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-174",
    "date": "2026-04-28 10:00:00",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "name": "Gaji Karyawan",
    "amount": 5000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-175",
    "date": "2026-04-28 11:00:00",
    "isoDate": "2026-04-28T09:00:00.000Z",
    "name": "Prive Owner",
    "amount": 2000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-176",
    "date": "2026-04-29 14:00:00",
    "isoDate": "2026-04-29T14:00:00.000Z",
    "name": "Parkir",
    "amount": 12820,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-177",
    "date": "2026-04-29 21:00:00",
    "isoDate": "2026-04-29T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 932180,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-178",
    "date": "2026-04-30 14:00:00",
    "isoDate": "2026-04-30T14:00:00.000Z",
    "name": "Parkir",
    "amount": 16317,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-179",
    "date": "2026-04-30 21:00:00",
    "isoDate": "2026-04-30T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1243683,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-180",
    "date": "2026-05-01 14:00:00",
    "isoDate": "2026-05-01T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 17970,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-181",
    "date": "2026-05-01 21:00:00",
    "isoDate": "2026-05-01T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1182030,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-182",
    "date": "2026-05-02 21:00:00",
    "isoDate": "2026-05-02T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 350000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-183",
    "date": "2026-05-03 21:00:00",
    "isoDate": "2026-05-03T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 500000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-184",
    "date": "2026-05-04 21:00:00",
    "isoDate": "2026-05-04T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 2200000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-185",
    "date": "2026-05-05 21:00:00",
    "isoDate": "2026-05-05T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 95000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-186",
    "date": "2026-05-06 14:00:00",
    "isoDate": "2026-05-06T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 27471,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-187",
    "date": "2026-05-06 21:00:00",
    "isoDate": "2026-05-06T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 752529,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-188",
    "date": "2026-05-07 21:00:00",
    "isoDate": "2026-05-07T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 100000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-189",
    "date": "2026-05-08 21:00:00",
    "isoDate": "2026-05-08T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 580000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-190",
    "date": "2026-05-09 14:00:00",
    "isoDate": "2026-05-09T14:00:00.000Z",
    "name": "Parkir",
    "amount": 14991,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-191",
    "date": "2026-05-09 21:00:00",
    "isoDate": "2026-05-09T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1030009,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-192",
    "date": "2026-05-10 21:00:00",
    "isoDate": "2026-05-10T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1200000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-193",
    "date": "2026-05-11 21:00:00",
    "isoDate": "2026-05-11T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1350000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-194",
    "date": "2026-05-12 14:00:00",
    "isoDate": "2026-05-12T14:00:00.000Z",
    "name": "Parkir",
    "amount": 28451,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-195",
    "date": "2026-05-12 21:00:00",
    "isoDate": "2026-05-12T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 211549,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-196",
    "date": "2026-05-13 14:00:00",
    "isoDate": "2026-05-13T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 17985,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-197",
    "date": "2026-05-13 21:00:00",
    "isoDate": "2026-05-13T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1932015,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-198",
    "date": "2026-05-14 21:00:00",
    "isoDate": "2026-05-14T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1600000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-199",
    "date": "2026-05-15 21:00:00",
    "isoDate": "2026-05-15T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 690000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-200",
    "date": "2026-05-16 14:00:00",
    "isoDate": "2026-05-16T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 29693,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-201",
    "date": "2026-05-16 21:00:00",
    "isoDate": "2026-05-16T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 950307,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-202",
    "date": "2026-05-17 21:00:00",
    "isoDate": "2026-05-17T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 560000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-203",
    "date": "2026-05-18 14:00:00",
    "isoDate": "2026-05-18T14:00:00.000Z",
    "name": "Parkir",
    "amount": 16579,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-204",
    "date": "2026-05-18 21:00:00",
    "isoDate": "2026-05-18T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 633421,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-205",
    "date": "2026-05-19 14:00:00",
    "isoDate": "2026-05-19T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 10925,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-206",
    "date": "2026-05-19 21:00:00",
    "isoDate": "2026-05-19T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 939075,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-207",
    "date": "2026-05-20 21:00:00",
    "isoDate": "2026-05-20T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 600000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-208",
    "date": "2026-05-21 14:00:00",
    "isoDate": "2026-05-21T14:00:00.000Z",
    "name": "Parkir",
    "amount": 20449,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-209",
    "date": "2026-05-21 21:00:00",
    "isoDate": "2026-05-21T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 479551,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-210",
    "date": "2026-05-22 14:00:00",
    "isoDate": "2026-05-22T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 26176,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-211",
    "date": "2026-05-22 21:00:00",
    "isoDate": "2026-05-22T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 223824,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-212",
    "date": "2026-05-23 21:00:00",
    "isoDate": "2026-05-23T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 150000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-213",
    "date": "2026-05-24 21:00:00",
    "isoDate": "2026-05-24T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1030000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-214",
    "date": "2026-05-25 14:00:00",
    "isoDate": "2026-05-25T14:00:00.000Z",
    "name": "Parkir",
    "amount": 25584,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-215",
    "date": "2026-05-25 21:00:00",
    "isoDate": "2026-05-25T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 624416,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-216",
    "date": "2026-05-26 14:00:00",
    "isoDate": "2026-05-26T14:00:00.000Z",
    "name": "Parkir",
    "amount": 25436,
    "cashier": "Rina (Kasir Pati)",
    "branch": "Pati",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-217",
    "date": "2026-05-26 21:00:00",
    "isoDate": "2026-05-26T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1864564,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-218",
    "date": "2026-05-27 14:00:00",
    "isoDate": "2026-05-27T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 17626,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-219",
    "date": "2026-05-27 21:00:00",
    "isoDate": "2026-05-27T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1732374,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-220",
    "date": "2026-05-28 14:00:00",
    "isoDate": "2026-05-28T14:00:00.000Z",
    "name": "Parkir",
    "amount": 14924,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-221",
    "date": "2026-05-28 21:00:00",
    "isoDate": "2026-05-28T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 235076,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-222",
    "date": "2026-05-28 10:00:00",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "name": "Gaji Karyawan",
    "amount": 5000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-223",
    "date": "2026-05-28 11:00:00",
    "isoDate": "2026-05-28T09:00:00.000Z",
    "name": "Prive Owner",
    "amount": 2000000,
    "cashier": "Owner",
    "branch": "Kudus",
    "wallet": "Dana Bebas"
  },
  {
    "id": "EXP-224",
    "date": "2026-05-29 14:00:00",
    "isoDate": "2026-05-29T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 28071,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-225",
    "date": "2026-05-29 21:00:00",
    "isoDate": "2026-05-29T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 1071929,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-226",
    "date": "2026-05-30 21:00:00",
    "isoDate": "2026-05-30T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 560000,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-227",
    "date": "2026-05-31 14:00:00",
    "isoDate": "2026-05-31T14:00:00.000Z",
    "name": "Konsumsi Karyawan",
    "amount": 14543,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-228",
    "date": "2026-05-31 21:00:00",
    "isoDate": "2026-05-31T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 405457,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-229",
    "date": "2026-06-01 14:00:00",
    "isoDate": "2026-06-01T14:00:00.000Z",
    "name": "Parkir",
    "amount": 28077,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-230",
    "date": "2026-06-01 21:00:00",
    "isoDate": "2026-06-01T21:00:00.000Z",
    "name": "Setoran Tutup Toko (Ke Dana Bebas)",
    "amount": 771923,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  },
  {
    "id": "EXP-231",
    "date": "2026-06-02 14:00:00",
    "isoDate": "2026-06-02T14:00:00.000Z",
    "name": "Parkir",
    "amount": 27594,
    "cashier": "Siti (Kasir Kudus)",
    "branch": "Kudus",
    "wallet": "Dana Laci"
  }
];
export const initialPiutang = [
  {
    "id": "TRX-20260601-PIU1",
    "date": "2026-06-01 13:00:00",
    "isoDate": "2026-06-01T13:00:00.000Z",
    "customer": "Toko Langganan 1",
    "items": [
      {
        "id": 1,
        "code": "L001",
        "name": "LCD iPhone 11 Pro",
        "category": "LCD",
        "price1": 650000,
        "price2": 550000,
        "stock": 50,
        "qty": 2,
        "price": 550000,
        "isReturn": false
      }
    ],
    "total": 1100000,
    "paid": 0,
    "method": "PIUTANG",
    "sisa": 1100000,
    "returTotal": 0,
    "globalDiscount": 0,
    "branch": "Kudus",
    "note": "Piutang LCD"
  }
];
export const initialOrderData = [];
export const initialPendingTransactions = [
  {
    "id": "20260602120000-PENDING-PELANGGAN UMUM",
    "time": "12:00:00",
    "dateString": "02 Jun 2026",
    "customerName": "Pelanggan Umum",
    "customerId": 1,
    "sales": "Siti (Kasir Kudus) (Kudus)",
    "items": [
      {
        "id": 5,
        "code": "B001",
        "name": "Baterai iPhone 12",
        "category": "Batre",
        "price1": 350000,
        "price2": 280000,
        "stock": 40,
        "qty": 1,
        "price": 350000,
        "isReturn": false
      }
    ],
    "total": 350000
  }
];
export const initialLeaveRequests = [
  {
    "id": "REQ-20260602-001",
    "employeeName": "Budi (Admin Kudus)",
    "startDate": "2026-06-10",
    "endDate": "2026-06-12",
    "reason": "Acara keluarga di kampung halaman",
    "status": "Menunggu",
    "requestDate": "2026-06-02T09:00:00.000Z"
  }
];
