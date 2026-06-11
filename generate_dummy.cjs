const fs = require('fs');

const data = fs.readFileSync('src/data.ts', 'utf8');

const attendancesIdx = data.indexOf('export const initialAttendances = ');
const beforeAttendances = data.substring(0, attendancesIdx);

const newLogic = `
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
    const timeInStr = \`\${timeInHours.toString().padStart(2, '0')}:\${timeInMins.toString().padStart(2, '0')}\`;

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
          date: \`\${dateStr} 12:00:00\`,
          isoDate: d.toISOString(),
          name: \`Bon - \${emp.name} : Kebutuhan Pribadi\`,
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
        id: \`TRX-\${dateStr.replace(/-/g,'')}-\${i.toString().padStart(4, '0')}\`,
        date: \`\${dateStr} 10:00:00\`,
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
        date: \`\${dateStr} 14:00:00\`,
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
`;

fs.writeFileSync('src/data.ts', beforeAttendances + newLogic);
console.log('Done writing src/data.ts');
