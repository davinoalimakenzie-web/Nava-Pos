export const defaultDate = new Date().toISOString().split('T')[0];
export const currentMonthStr = defaultDate.substring(0, 7);
export const todayStrDisplay = `${defaultDate} 10:00:00`;
export const todayIso = new Date().toISOString();

export const initialUsers = [
  { id: 'u0', username: 'owner', password: '123', name: 'Owner', role: 'owner' },
  { id: 'u1', username: 'admin', password: '123', name: 'Administrator', role: 'admin' },
  { id: 'u2', username: 'kasir', password: '123', name: 'Kasir Pagi', role: 'kasir' },
  { id: 'u3', username: 'kasir2', password: '123', name: 'Kasir Malam', role: 'kasir' }
];

export const initialCustomers = [
  { id: 1, name: 'Pelanggan Umum', address: '-', phone: '-', level: 1 },
  { id: 2, name: 'Toko Budi (Grosir)', address: 'Jl. Melati No 12', phone: '08123456789', level: 2 },
  { id: 3, name: 'Toko Jaya', address: 'Pasar Baru Blok A', phone: '08567891234', level: 2 },
];

export const initialEmployees = [
  { id: 1, name: 'Administrator', position: 'Admin / Manager', dailySalary: 100000, latePenaltyPerMin: 10000, branch: 'Pusat' },
  { id: 2, name: 'Kasir Pagi', position: 'Staff Kasir', dailySalary: 80000, latePenaltyPerMin: 10000, branch: 'Pusat' },
  { id: 3, name: 'Kasir Malam', position: 'Staff Kasir', dailySalary: 80000, latePenaltyPerMin: 10000, branch: 'Pusat' }
];

export const initialAttendances = [
  { id: 1, date: defaultDate, isoDate: todayIso, user: 'Kasir Pagi', timeIn: '08:30', timeOut: '-', status: 'Clock In', lateMins: 0 },
  { id: 2, date: '2026-05-20', isoDate: '2026-05-20T00:00:00.000Z', user: 'Kasir Pagi', timeIn: '09:15', timeOut: '15:00', status: 'Selesai', lateMins: 15 },
  { id: 3, date: '2026-05-20', isoDate: '2026-05-20T00:00:00.000Z', user: 'Kasir Malam', timeIn: '14:50', timeOut: '22:00', status: 'Selesai', lateMins: 0 }
];

export const initialInventory = [
  { id: 1, code: 'B001', name: 'Buku Tulis Sinar Dunia', category: 'Buku', price1: 5000, price2: 4500, stock: 50 },
  { id: 2, code: 'P001', name: 'Pensil 2B Faber Castell', category: 'Alat Tulis', price1: 3000, price2: 2500, stock: 100 },
  { id: 3, code: 'P002', name: 'Penghapus Joyko', category: 'Alat Tulis', price1: 2000, price2: 1500, stock: 40 },
  { id: 4, code: 'M001', name: 'Penggaris Besi 30cm', category: 'Alat Tulis', price1: 7500, price2: 7000, stock: 15 },
  { id: 5, code: 'S001', name: 'Spidol Boardmarker', category: 'Alat Tulis', price1: 8000, price2: 7500, stock: 2 },
  { id: 6, code: 'T001', name: 'Tipe-X Kenko (Correction Pen)', category: 'Alat Tulis', price1: 6500, price2: 6000, stock: 30 },
  { id: 7, code: 'K001', name: 'Kertas HVS A4 80gr PaperOne', category: 'Kertas', price1: 55000, price2: 52000, stock: 20 },
  { id: 8, code: 'M002', name: 'Map Plastik Clear Folder', category: 'Aksesoris', price1: 4000, price2: 3500, stock: 60 },
  { id: 9, code: 'S002', name: 'Stapler Kecil Joyko', category: 'Aksesoris', price1: 12000, price2: 11000, stock: 25 },
  { id: 10, code: 'I001', name: 'Isi Stapler No.10', category: 'Aksesoris', price1: 2500, price2: 2000, stock: 150 },
];

export const initialTransactions = [
  { id: 'TRX-901', date: todayStrDisplay, isoDate: todayIso, customer: 'Pelanggan Umum', items: [{id: 1, code: 'B001', name: 'Buku Tulis Sinar Dunia', category: 'Buku', qty: 2, price: 5000}], total: 10000, paid: 10000, change: 0, cashier: 'Administrator', type: 'LUNAS', method: 'TUNAI', sisa: 0, returTotal: 0 },
  { id: 'TRX-902', date: todayStrDisplay, isoDate: todayIso, customer: 'Toko Budi (Grosir)', items: [{id: 7, code: 'K001', name: 'Kertas HVS A4 80gr PaperOne', category: 'Kertas', qty: 10, price: 52000}], total: 520000, paid: 0, change: 0, cashier: 'Administrator', type: 'PIUTANG', method: '1 Minggu', sisa: 520000, returTotal: 0 },
  { id: 'TRX-903', date: todayStrDisplay, isoDate: todayIso, customer: 'Toko Jaya', items: [{id: 9, code: 'S002', name: 'Stapler Kecil Joyko', category: 'Aksesoris', qty: 5, price: 11000}], total: 55000, paid: 20000, change: 0, cashier: 'Administrator', type: 'PIUTANG', method: 'DP', sisa: 35000, returTotal: 0 },
  { id: 'TRX-904', date: todayStrDisplay, isoDate: todayIso, customer: 'Pelanggan Umum', items: [{id: 5, code: 'S001', name: 'Spidol Boardmarker', category: 'Alat Tulis', qty: 2, price: 8000}], total: 16000, paid: 16000, change: 0, cashier: 'Kasir Pagi', type: 'PIUTANG', method: 'Qriss/TF', sisa: 16000, returTotal: 0 },
];

export const initialPiutang = [
  { id: 'TRX-902', date: todayStrDisplay, isoDate: todayIso, customer: 'Toko Budi (Grosir)', items: [], total: 520000, paid: 0, change: 0, cashier: 'Administrator', type: 'PIUTANG', method: '1 Minggu', sisa: 520000 },
  { id: 'TRX-903', date: todayStrDisplay, isoDate: todayIso, customer: 'Toko Jaya', items: [], total: 55000, paid: 20000, change: 0, cashier: 'Administrator', type: 'PIUTANG', method: 'DP', sisa: 35000 },
  { id: 'TRX-904', date: todayStrDisplay, isoDate: todayIso, customer: 'Pelanggan Umum', items: [], total: 16000, paid: 16000, change: 0, cashier: 'Kasir Pagi', type: 'PIUTANG', method: 'Qriss/TF', sisa: 16000 },
];

export const initialExpenses = [
  { id: 'EXP-101', date: todayStrDisplay, isoDate: todayIso, name: 'Beli Galon Air', amount: 20000, cashier: 'Administrator' },
  { id: 'EXP-102', date: todayStrDisplay, isoDate: todayIso, name: 'Sapu Lantai', amount: 15000, cashier: 'Administrator' }
];

export const initialOrderData = [
  { id: 'ORD-AUTO-011', date: defaultDate, supplier: 'Auto Supplier (AI)', item: 'Spidol Boardmarker', sisaStock: 2, targetOrder: 20, status: 'Pending' }
];
