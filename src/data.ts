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

// Clean list of 4 Suppliers, including "Buana Jaya / BJ"
export const initialSuppliers = [
  { id: "sup_bj", name: "Buana Jaya / BJ", contact: "0812-4455-6677", address: "Jl. Pemuda No. 45, Kudus" },
  { id: "sup_aj", name: "Antara Jaya / AJ", contact: "0819-1122-3344", address: "Kawasan Industri Terboyo, Semarang" },
  { id: "sup_ca", name: "Cahaya Abadi / CA", contact: "0811-9988-7766", address: "Klandasan Trade Center, Surabaya" },
  { id: "sup_st", name: "Suryatama / ST", contact: "0813-5566-7788", address: "Ruko ITC Cempaka Mas, Jakarta" }
];

// Seed 50 Items per Supplier with variety of categories, average stock 2pcs
const categories = ['BATRE', 'LCD', 'AKSESORIS', 'SPAREPART', 'CHARGER', 'CASING'];
const productBrands = ['iPhone', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Asus'];

const tempInventory: any[] = [];
let itemIdCounter = 1;

initialSuppliers.forEach((sup) => {
  const shortCode = sup.id.replace('sup_', '').toUpperCase();
  for (let i = 1; i <= 50; i++) {
    const category = categories[i % categories.length];
    const brand = productBrands[i % productBrands.length];
    let name = '';
    let cost = 50000 + (i * 4500) % 150000;
    
    switch (category) {
      case 'BATRE':
        name = `Baterai ${brand} ${i % 2 === 0 ? 'Pro' : 'Max'} Model ${100 + i}`;
        cost = 75000 + (i * 3500) % 100000;
        break;
      case 'LCD':
        name = `LCD Screen ${brand} ${15 + i % 5} Series`;
        cost = 180000 + (i * 8500) % 300000;
        break;
      case 'AKSESORIS':
        name = `Tempered Glass 9D ${brand} ${i % 2 === 0 ? 'Full Cover' : 'Clear View'}`;
        cost = 12000 + (i * 1200) % 10000;
        break;
      case 'SPAREPART':
        name = `Flexible Charger Port ${brand} Neo ${i}`;
        cost = 25000 + (i * 2500) % 35000;
        break;
      case 'CHARGER':
        name = `Adaptor SuperVOOC 45W ${brand} Edition`;
        cost = 90000 + (i * 4000) % 50000;
        break;
      case 'CASING':
        name = `Armor Case Shockproof ${brand} Elegant ${i}`;
        cost = 15000 + (i * 1500) % 20000;
        break;
    }

    cost = Math.round(cost / 100) * 100; // Round to hundreds
    const margin1 = 1.30; // 30% margin level 1
    const margin2 = 1.15; // 15% margin level 2
    const p1 = Math.round((cost * margin1) / 1000) * 1000; // Round to thousands
    const p2 = Math.round((cost * margin2) / 1000) * 1000;

    // Remaining stock: 1, 2, or 3 pcs (average is exactly 2.0 pcs!)
    const stock = (i % 3) + 1; 

    // Star some items as best sellers
    const isBestSeller = i % 4 === 1; 

    tempInventory.push({
      id: `inv-${itemIdCounter++}`,
      code: `${shortCode}-${100 + i}`,
      name: name.toUpperCase(),
      category: category,
      stock: stock,
      price1: p1,
      price2: p2,
      supplierPrice: cost,
      supplier: sup.name,
      isBestSeller: isBestSeller
    });
  }
});

export const initialInventory = tempInventory;

// Pre-seed 50 PO active queues per Supplier in Order Data based on these low stocks
const tempOrders: any[] = [];
let orderIdCounter = 1;

initialInventory.forEach((item) => {
  // If stock is <= 3, it should be in the order queue!
  if (item.stock <= 3) {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - (orderIdCounter % 5));
    const orderDateStr = dateObj.toISOString().split('T')[0];
    
    tempOrders.push({
      id: `PO-${String(10000 + orderIdCounter).substring(1)}`,
      date: orderDateStr,
      supplier: item.supplier,
      item: item.name,
      sisaStock: item.stock,
      targetOrder: 10 + (orderIdCounter % 4) * 5,
      status: 'Pending'
    });
    orderIdCounter++;
  }
});

export const initialOrderData = tempOrders;

export const initialAttendances: any[] = [];
export const initialTransactions: any[] = [];
export const initialExpenses: any[] = [];
export const initialPiutang: any[] = [];
export const initialPendingTransactions: any[] = [];
export const initialLeaveRequests: any[] = [];
