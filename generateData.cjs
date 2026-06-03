const fs = require('fs');

const defaultDate = new Date().toISOString().split('T')[0];
const todayStrDisplay = `${defaultDate} 10:00:00`;
const todayIso = new Date().toISOString();

const initialUsers = [
  { id: 'u0', username: 'owner', password: '123', name: 'Owner', role: 'owner', branch: 'Kudus' },
  { id: 'u1', username: 'admin', password: '123', name: 'Budi (Admin Kudus)', role: 'admin', branch: 'Kudus' },
  { id: 'u2', username: 'kasir', password: '123', name: 'Siti (Kasir Kudus)', role: 'kasir', branch: 'Kudus' },
  { id: 'u3', username: 'admin2', password: '123', name: 'Joko (Admin Pati)', role: 'admin', branch: 'Pati' },
  { id: 'u4', username: 'kasir2', password: '123', name: 'Rina (Kasir Pati)', role: 'kasir', branch: 'Pati' }
];

const initialCustomers = [
  { id: 1, name: 'Pelanggan Umum', address: '-', phone: '-', level: 1 },
  { id: 2, name: 'Toko Langganan 1', address: 'Jl. Melati', phone: '081', level: 2 },
  { id: 3, name: 'Toko Langganan 2', address: 'Jl. Mawar', phone: '082', level: 2 },
];

const initialEmployees = [
  { "id": 1, "name": "Budi (Admin Kudus)", "position": "Admin / Manager", "dailySalary": 100000, "latePenaltyPerMin": 10000/60, "branch": "Kudus" },
  { "id": 2, "name": "Siti (Kasir Kudus)", "position": "Staff Kasir", "dailySalary": 80000, "latePenaltyPerMin": 10000/60, "branch": "Kudus" },
  { "id": 3, "name": "Agus (Teknisi Kudus)", "position": "Teknisi", "dailySalary": 90000, "latePenaltyPerMin": 10000/60, "branch": "Kudus" },
  { "id": 4, "name": "Joko (Admin Pati)", "position": "Admin / Manager", "dailySalary": 100000, "latePenaltyPerMin": 10000/60, "branch": "Pati" },
  { "id": 5, "name": "Rina (Kasir Pati)", "position": "Staff Kasir", "dailySalary": 80000, "latePenaltyPerMin": 10000/60, "branch": "Pati" }
];

const initialInventory = [
  { "id": 1, "code": "L001", "name": "LCD iPhone 11 Pro", "category": "LCD", "price1": 650000, "price2": 550000, "stock": 50 },
  { "id": 2, "code": "L002", "name": "LCD Samsung A51", "category": "LCD", "price1": 450000, "price2": 350000, "stock": 50 },
  { "id": 3, "code": "L003", "name": "LCD Xiaomi Note 10", "category": "LCD", "price1": 300000, "price2": 250000, "stock": 50 },
  { "id": 4, "code": "L004", "name": "LCD Oppo F11", "category": "LCD", "price1": 280000, "price2": 230000, "stock": 50 },
  { "id": 5, "code": "B001", "name": "Baterai iPhone 12", "category": "Batre", "price1": 350000, "price2": 280000, "stock": 40 },
  { "id": 6, "code": "B002", "name": "Baterai Samsung S20", "category": "Batre", "price1": 250000, "price2": 200000, "stock": 45 },
  { "id": 7, "code": "B003", "name": "Baterai Xiaomi BM4X", "category": "Batre", "price1": 150000, "price2": 120000, "stock": 60 },
  { "id": 8, "code": "A001", "name": "Tempered Glass V-Gen", "category": "Aksesoris", "price1": 50000, "price2": 30000, "stock": 150 },
  { "id": 9, "code": "A002", "name": "Kabel Data Type-C Fast", "category": "Aksesoris", "price1": 45000, "price2": 25000, "stock": 100 },
  { "id": 10, "code": "A003", "name": "Charger Adaptor 20W", "category": "Aksesoris", "price1": 120000, "price2": 90000, "stock": 80 },
  { "id": 11, "code": "S001", "name": "Speaker iPhone 11 Pro", "category": "Speaker", "price1": 150000, "price2": 120000, "stock": 20 },
  { "id": 12, "code": "F001", "name": "Flexible Charger Samsung A51", "category": "Flexible", "price1": 95000, "price2": 75000, "stock": 30 },
  { "id": 13, "code": "C001", "name": "Kamera Belakang Xiaomi Note 10", "category": "Kamera", "price1": 250000, "price2": 200000, "stock": 15 }
];


// GENERATE DATA
let transactions = [];
let expenses = [];
let piutangData = [];
let attendances = [];
let pendingTransactions = [];
let leaveRequests = [];

// ADD DUMMY DATA FOR PIUTANG
piutangData.push({
  id: "TRX-20260601-PIU1",
  date: "2026-06-01 13:00:00",
  isoDate: "2026-06-01T13:00:00.000Z",
  customer: "Toko Langganan 1",
  items: [{
    ...initialInventory[0],
    qty: 2,
    price: initialInventory[0].price2,
    isReturn: false
  }],
  total: initialInventory[0].price2 * 2,
  paid: 0,
  method: "PIUTANG",
  sisa: initialInventory[0].price2 * 2,
  returTotal: 0,
  globalDiscount: 0,
  branch: "Kudus",
  note: "Piutang LCD"
});

// ADD DUMMY DATA FOR PENDING TRANSACTIONS
pendingTransactions.push({
  id: "20260602120000-PENDING-PELANGGAN UMUM",
  time: "12:00:00",
  dateString: "02 Jun 2026",
  customerName: "Pelanggan Umum",
  customerId: 1,
  sales: "Siti (Kasir Kudus) (Kudus)",
  items: [{
    ...initialInventory[4],
    qty: 1,
    price: initialInventory[4].price1,
    isReturn: false
  }],
  total: initialInventory[4].price1
});

// ADD DUMMY DATA FOR KASBON
expenses.push({
  id: `EXP-KASBON-1`,
  date: `2026-06-01 10:00:00`,
  isoDate: "2026-06-01T10:00:00.000Z",
  name: "Kasbon Pegawai",
  amount: 250000,
  cashier: "Owner",
  branch: "Kudus",
  wallet: "Dana Bebas",
  isBon: true,
  bonEmployee: "Agus (Teknisi Kudus)",
  bonReason: "Pinjam untuk keperluan pribadi"
});

// ADD DUMMY DATA FOR LEAVE REQUEST
leaveRequests.push({
  id: "REQ-20260602-001",
  employeeName: "Budi (Admin Kudus)",
  startDate: "2026-06-10",
  endDate: "2026-06-12",
  reason: "Acara keluarga di kampung halaman",
  status: "Menunggu",
  requestDate: "2026-06-02T09:00:00.000Z"
});

let danaLaci = 500000;
let danaBebas = 10000000; // Modal awal dana bebas

let currentDate = new Date('2026-01-01T09:00:00Z');
let endDate = new Date('2026-06-03T10:00:00Z');

let trxIdCounter = 1;
let expIdCounter = 1;
let attIdCounter = 1;

while (currentDate <= endDate) {
  const dateStr = currentDate.toISOString().split('T')[0];
  
  // Attendances
  initialEmployees.forEach((emp, index) => {
      // randomly make employee late
      const isLate = Math.random() > 0.9;
      const lateMins = isLate ? Math.floor(Math.random() * 30) + 15 : 0;
      let timeInStr = '09:00';
      if (isLate) {
          const h = 9 + Math.floor(lateMins / 60);
          const m = lateMins % 60;
          timeInStr = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      }

      attendances.push({
          id: attIdCounter++,
          date: dateStr,
          isoDate: currentDate.toISOString(),
          user: emp.name,
          timeIn: timeInStr,
          timeOut: '17:00',
          status: 'Selesai',
          lateMins: lateMins
      });
  });

  // Daily transactions (1 to 3 per day)
  const numTrx = Math.floor(Math.random() * 3) + 1;
  let dailySales = 0;
  for (let i = 0; i < numTrx; i++) {
     const isPati = Math.random() > 0.6;
     const branch = isPati ? 'Pati' : 'Kudus';
     const cashier = isPati ? 'Rina (Kasir Pati)' : 'Siti (Kasir Kudus)';
     const inv = initialInventory[Math.floor(Math.random() * initialInventory.length)];
     const qty = Math.floor(Math.random() * 2) + 1;
     const paymentMethod = Math.random() > 0.8 ? 'Qriss/TF' : 'TUNAI'; 
     const trxTotal = inv.price1 * qty;
     
     transactions.push({
        id: `TRX-${dateStr.replace(/-/g, '')}-${String(trxIdCounter++).padStart(4, '0')}`,
        date: `${dateStr} 12:00:00`,
        isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 3).toISOString(),
        customer: 'Pelanggan Umum',
        items: [{
            ...inv,
            qty,
            price: inv.price1,
            isReturn: false
        }],
        total: trxTotal,
        method: paymentMethod,
        cashier: cashier,
        paid: trxTotal,
        change: 0,
        branch: branch,
        cashReceived: paymentMethod === 'TUNAI' ? trxTotal : 0
     });

     // 10% chance to generate a return transaction for this day
     if (Math.random() > 0.90) {
         transactions.push({
            id: `TRX-${dateStr.replace(/-/g, '')}-${String(trxIdCounter++).padStart(4, '0')}-RET`,
            date: `${dateStr} 13:00:00`,
            isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 5).toISOString(),
            customer: 'Pelanggan Umum',
            items: [{
                ...inv,
                qty: 1,
                price: inv.price1,
                isReturn: true
            }],
            total: 0,
            returTotal: inv.price1,
            method: paymentMethod,
            cashier: cashier,
            paid: 0,
            change: 0,
            branch: branch,
            cashReceived: 0
         });
         danaLaci -= (paymentMethod === 'TUNAI' ? inv.price1 : 0);
     }

     if (paymentMethod === 'TUNAI') {
         danaLaci += trxTotal;
         dailySales += trxTotal;
     } else {
         danaBebas += trxTotal; // Assuming Qriss goes to dana bebas directly
     }
  }

  // Daily small expenses from Laci (parkir, makan)
  if (Math.random() > 0.5) {
      const isPati = Math.random() > 0.6;
      const branch = isPati ? 'Pati' : 'Kudus';
      const cashier = isPati ? 'Rina (Kasir Pati)' : 'Siti (Kasir Kudus)';
      const expAmount = 10000 + Math.floor(Math.random() * 20000); // 10k - 30k
      expenses.push({
          id: `EXP-${expIdCounter++}`,
          date: `${dateStr} 14:00:00`,
          isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 5).toISOString(),
          name: Math.random() > 0.5 ? 'Parkir' : 'Konsumsi Karyawan',
          amount: expAmount,
          cashier: cashier,
          branch: branch,
          wallet: 'Dana Laci'
      });
      danaLaci -= expAmount;
  }

  // End of day (Tutup Toko)
  let isLastDay = currentDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0];
  if (isLastDay) {
      const extraGains = 150000;
      transactions.push({
        id: `TRX-${dateStr.replace(/-/g, '')}-9998`,
        date: `${dateStr} 15:00:00`,
        isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 6).toISOString(),
        customer: 'Pelanggan Umum',
        items: [{
            ...initialInventory[0],
            qty: 1,
            price: extraGains,
            isReturn: false
        }],
        total: extraGains,
        method: 'TUNAI',
        cashier: 'Siti (Kasir Kudus)',
        paid: extraGains,
        change: 0,
        branch: 'Kudus',
        cashReceived: extraGains
     });
     
     transactions.push({
        id: `TRX-${dateStr.replace(/-/g, '')}-9997`,
        date: `${dateStr} 15:10:00`,
        isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 6).toISOString(),
        customer: 'Pelanggan Umum',
        items: [{
            ...initialInventory[1],
            qty: 1,
            price: 50000,
            isReturn: true
        }],
        total: 0,
        returTotal: 50000,
        method: 'TUNAI',
        cashier: 'Rina (Kasir Pati)',
        paid: 0,
        change: 0,
        branch: 'Pati',
        cashReceived: 0
     });
     
     transactions.push({
        id: `TRX-${dateStr.replace(/-/g, '')}-9999`,
        date: `${dateStr} 15:05:00`,
        isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 6).toISOString(),
        customer: 'Pelanggan Umum',
        items: [{
            ...initialInventory[1],
            qty: 1,
            price: extraGains,
            isReturn: false
        }],
        total: extraGains,
        method: 'TUNAI',
        cashier: 'Rina (Kasir Pati)',
        paid: extraGains,
        change: 0,
        branch: 'Pati',
        cashReceived: extraGains
     });
     danaLaci += (extraGains * 2);
  }
  
  if (danaLaci > 500000 && !isLastDay) {
      const setorAmount = danaLaci - 500000;
      expenses.push({
          id: `EXP-${expIdCounter++}`,
          date: `${dateStr} 21:00:00`,
          isoDate: new Date(currentDate.getTime() + 1000 * 60 * 60 * 12).toISOString(),
          name: 'Setoran Tutup Toko (Ke Dana Bebas)',
          amount: setorAmount,
          cashier: 'Siti (Kasir Kudus)',
          branch: 'Kudus',
          wallet: 'Dana Laci' // It acts as expense from laci, but technically it goes to Bebas. We model it via 2 separate logs if we want, or just one.
      });
      danaLaci = 500000;
      danaBebas += setorAmount;
  }

  // Monthly Expenses (Gaji, Sewa) at end of month (28th for simplicity)
  if (currentDate.getDate() === 28) {
     const gaji = 5000000;
     expenses.push({
          id: `EXP-${expIdCounter++}`,
          date: `${dateStr} 10:00:00`,
          isoDate: currentDate.toISOString(),
          name: 'Gaji Karyawan',
          amount: gaji,
          cashier: 'Owner',
          branch: 'Kudus',
          wallet: 'Dana Bebas'
     });
     danaBebas -= gaji;
     
     const prive = 2000000;
     if (danaBebas > prive + 1000000) {
          expenses.push({
               id: `EXP-${expIdCounter++}`,
               date: `${dateStr} 11:00:00`,
               isoDate: currentDate.toISOString(),
               name: 'Prive Owner',
               amount: prive,
               cashier: 'Owner',
               branch: 'Kudus',
               wallet: 'Dana Bebas'
          });
          danaBebas -= prive;
     }
  }

  currentDate.setDate(currentDate.getDate() + 1);
}

const content = `
export const defaultDate = '${defaultDate}';
export const currentMonthStr = '${defaultDate.substring(0, 7)}';
export const todayStrDisplay = '${todayStrDisplay}';
export const todayIso = '${todayIso}';

export const initialUsers = ${JSON.stringify(initialUsers, null, 2)};
export const initialCustomers = ${JSON.stringify(initialCustomers, null, 2)};
export const initialEmployees = ${JSON.stringify(initialEmployees, null, 2)};
export const initialInventory = ${JSON.stringify(initialInventory, null, 2)};
export const initialAttendances = ${JSON.stringify(attendances, null, 2)};
export const initialTransactions = ${JSON.stringify(transactions, null, 2)};
export const initialExpenses = ${JSON.stringify(expenses, null, 2)};
export const initialPiutang = ${JSON.stringify(piutangData, null, 2)};
export const initialOrderData = [];
export const initialPendingTransactions = ${JSON.stringify(pendingTransactions, null, 2)};
export const initialLeaveRequests = ${JSON.stringify(leaveRequests, null, 2)};
`;

fs.writeFileSync('src/data.ts', content);
console.log("FINAL DANA BEBAS: " + danaBebas);
console.log("FINAL DANA LACI: " + danaLaci);
