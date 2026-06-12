export const formatRp = (angka: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

export const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return '-- -- --';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = d.toLocaleDateString('id-ID', { weekday: 'long' });
  const date = d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${day} , ${date}`;
};

export const calculateJatuhTempo = (isoDate: string, method: string) => {
  if (method === 'TUNAI' || method === 'Qriss/TF') return '-';
  const d = new Date(isoDate);
  if (method === '1 Minggu') d.setDate(d.getDate() + 7);
  else if (method === 'DP') d.setDate(d.getDate() + 14); 
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Safe parser for alphanumeric/currency/number values
const getSortValue = (val: any): string | number => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'number') return val;
  
  const str = String(val).trim();
  
  // If string contains only digits (or dots/commas looking like a formatted number)
  // Let's check for currency formatting or numeric strings
  const cleanNum = str.replace(/[^\d\-]/g, '');
  if (str.startsWith('Rp') && !isNaN(Number(cleanNum)) && cleanNum !== '') {
    return Number(cleanNum);
  }

  // If it's a numeric string like "150" or "4000.5"
  if (!isNaN(Number(str)) && str !== '') {
    return Number(str);
  }
  
  // If it looks like ID-ID date "DD/MM/YYYY" or "YYYY-MM-DD"
  const dateRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
  const match = str.match(dateRegex);
  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);
    const dateObj = new Date(year, month, day);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.getTime();
    }
  }
  
  return str.toLowerCase();
};

export const smartSort = <T>(array: T[], key: string, direction: 'asc' | 'desc'): T[] => {
  if (!key) return array;
  
  return [...array].sort((a: any, b: any) => {
    // Nested path resolution (e.g. "supplier.name" or "items[0].name")
    let valA = key.split('.').reduce((o, i) => (o ? o[i] : undefined), a);
    let valB = key.split('.').reduce((o, i) => (o ? o[i] : undefined), b);
    
    const parsedA = getSortValue(valA);
    const parsedB = getSortValue(valB);
    
    if (typeof parsedA === 'number' && typeof parsedB === 'number') {
      return direction === 'asc' ? parsedA - parsedB : parsedB - parsedA;
    }
    
    const strA = String(parsedA);
    const strB = String(parsedB);
    
    const compare = strA.localeCompare(strB, 'id', { numeric: true, sensitivity: 'base' });
    return direction === 'asc' ? compare : -compare;
  });
};

