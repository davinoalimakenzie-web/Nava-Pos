
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

export const initialAttendances: any[] = [];
export const initialTransactions: any[] = [];
export const initialExpenses: any[] = [];
export const initialPiutang: any[] = [];
export const initialOrderData: any[] = [];
export const initialPendingTransactions: any[] = [];
export const initialLeaveRequests: any[] = [];

// Generate dummy data from Jan 1 2026 to May 31 2026
const startDate = new Date(2026, 0, 1); // Jan 1 2026
const endDate = new Date(2026, 4, 31); // May 31 2026

let attId = 1;
let trxId = 1;
let expId = 1;

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const dateStr = d.toISOString().split('T')[0];
  const isWeekend = d.getDay() === 0;

  // Absensi & Bon
  initialEmployees.forEach(emp => {
    if (isWeekend) {
      initialAttendances.push({
        id: attId++,
        date: dateStr,
        isoDate: d.toISOString(),
        user: emp.name,
        timeIn: "-",
        timeOut: "-",
        status: "Libur",
        lateMins: 0
      });
      return;
    }

    const isLate = Math.random() < 0.3; // 30% chance late
    const lateMins = isLate ? Math.floor(Math.random() * 60) + 1 : 0;
    const timeInHours = 9 + Math.floor(lateMins / 60);
    const timeInMins = lateMins % 60;
    const timeInStr = `${timeInHours.toString().padStart(2, '0')}:${timeInMins.toString().padStart(2, '0')}`;

    initialAttendances.push({
      id: attId++,
      date: dateStr,
      isoDate: d.toISOString(),
      user: emp.name,
      timeIn: timeInStr,
      timeOut: "17:00",
      status: "Selesai",
      lateMins: lateMins
    });

    // Random Bon
    const hasBon = Math.random() < 0.05; // 5% chance bon today
    if (hasBon) {
       initialExpenses.push({
          id: 'EXP-' + expId++,
          date: `${dateStr} 12:00:00`,
          isoDate: d.toISOString(),
          name: `Bon - ${emp.name} : Kebutuhan Pribadi`,
          amount: (Math.floor(Math.random() * 5) + 1) * 50000,
          cashier: "Admin",
          branch: emp.branch,
          isBon: true,
          status: "belum lunas",
          bonEmployee: emp.name,
          bonReason: "Kebutuhan",
          wallet: "Dana Bebas",
          category: "Kasbon"
       });
    }
  });

  // Cashflow Harian (Transactions)
  // Let's create 2-5 transactions per day
  const numTrx = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < numTrx; i++) {
     const isTunai = Math.random() < 0.7; // 70% tunai
     const total = (Math.floor(Math.random() * 10) + 1) * 50000;
     const method = isTunai ? 'TUNAI' : (Math.random() < 0.5 ? 'TRANSFER' : 'QRIS');
     
     // Random Return
     const hasReturn = Math.random() < 0.1; // 10% chance return
     const returTotal = hasReturn ? Math.floor(total * 0.2) : 0;

     initialTransactions.push({
        id: `TRX-${dateStr.replace(/-/g,'')}-${i.toString().padStart(4, '0')}`,
        date: `${dateStr} 10:00:00`,
        isoDate: d.toISOString(),
        customer: "Pelanggan Umum",
        items: [],
        timestamp: d.getTime(),
        type: 'PENJUALAN',
        method: method,
        total: total,
        payment: total,
        change: 0,
        branch: "Pusat",
        cashier: "Admin",
        status: "Selesai",
        isReturn: hasReturn,
        returTotal: returTotal,
        paymentMethod: method
     });
  }

  // Random Pengeluaran (Non-Bon)
  const hasExp = Math.random() < 0.5;
  if (hasExp) {
     initialExpenses.push({
        id: 'EXP-' + expId++,
        date: `${dateStr} 14:00:00`,
        isoDate: d.toISOString(),
        name: "Beli Perlengkapan Toko",
        amount: (Math.floor(Math.random() * 5) + 1) * 20000,
        cashier: "Admin",
        branch: "Pusat",
        wallet: "Dana Bebas",
        category: "Operasional"
     });
  }
}
