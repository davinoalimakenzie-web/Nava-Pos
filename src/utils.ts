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
