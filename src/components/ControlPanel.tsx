import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Database, 
  Search, 
  Trash2, 
  Save, 
  RefreshCw, 
  Download, 
  CheckCircle, 
  FileCode,
  Edit2,
  Home,
  LogOut,
  ChevronRight,
  Server,
  Table as TableIcon,
  PlusCircle,
  Copy
} from 'lucide-react';
import { 
  initialInventory, 
  initialCustomers, 
  initialTransactions, 
  initialExpenses, 
  initialPiutang, 
  initialOrderData,
  initialEmployees,
  initialAttendances,
  initialUsers,
  initialSuppliers
} from '../data';

type CollectionKey = 
  | 'inventory' 
  | 'transactions' 
  | 'customers' 
  | 'suppliers' 
  | 'expenses' 
  | 'employees'
  | 'attendances' 
  | 'appUsers' 
  | 'piutang' 
  | 'order' 
  | 'hutangSupplier'
  | 'leaveRequests'
  | 'waitingPayments'
  | 'pendingTransactions';

type Tab = 'Browse' | 'Structure' | 'SQL' | 'Search' | 'Insert' | 'Export' | 'Import' | 'Operations';

export const ControlPanel: React.FC = () => {
  const context = useAppContext();
  
  const collections: { key: CollectionKey; name: string; icon: any; initial: any[] }[] = [
    { key: 'inventory', name: 'Stock Inventory (inventory)', icon: TableIcon, initial: initialInventory },
    { key: 'transactions', name: 'Transaksi Penjualan (transactions)', icon: TableIcon, initial: initialTransactions },
    { key: 'customers', name: 'Daftar Pelanggan (customers)', icon: TableIcon, initial: initialCustomers },
    { key: 'suppliers', name: 'Daftar Supplier (suppliers)', icon: TableIcon, initial: initialSuppliers },
    { key: 'expenses', name: 'Pengeluaran Toko (expenses)', icon: TableIcon, initial: initialExpenses },
    { key: 'employees', name: 'Daftar Karyawan (employees)', icon: TableIcon, initial: initialEmployees },
    { key: 'attendances', name: 'Absensi Karyawan (attendances)', icon: TableIcon, initial: initialAttendances },
    { key: 'appUsers', name: 'Akun Pengguna/Kasir (appUsers)', icon: TableIcon, initial: initialUsers },
    { key: 'piutang', name: 'Piutang Pelanggan (piutang)', icon: TableIcon, initial: initialPiutang },
    { key: 'order', name: 'Pre-Order PO (order)', icon: TableIcon, initial: initialOrderData },
    { key: 'hutangSupplier', name: 'Hutang Supplier (hutangSupplier)', icon: TableIcon, initial: [] },
    { key: 'leaveRequests', name: 'Pengajuan Cuti (leaveRequests)', icon: TableIcon, initial: [] },
    { key: 'waitingPayments', name: 'Menunggu Pembayaran (waitingPayments)', icon: TableIcon, initial: [] },
    { key: 'pendingTransactions', name: 'Pending Order (pendingTransactions)', icon: TableIcon, initial: [] }
  ];

  const [selectedKey, setSelectedKey] = useState<CollectionKey>('inventory');
  const [activeTab, setActiveTab] = useState<Tab>('Browse');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for the selected grid
  const [gridData, setGridData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  
  // Custom states for phpMyAdmin functionalities
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({});
  const [searchConditions, setSearchConditions] = useState<Record<string, { operator: string; value: string }>>({});
  const [sqlQuery, setSqlQuery] = useState('');
  const [sqlFilterDesc, setSqlFilterDesc] = useState('');
  const [sqlQueryResult, setSqlQueryResult] = useState<any[] | null>(null);
  const [sqlAffectedCount, setSqlAffectedCount] = useState<number | null>(null);
  
  // Import Options
  const [importMode, setImportMode] = useState<'APPEND' | 'OVERWRITE'>('APPEND');
  const [importJsonText, setImportJsonText] = useState('');
  
  // Export Options
  const [exportType, setExportType] = useState<'JSON' | 'CSV' | 'SQL'>('JSON');

  // Edit Modal State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // States for Database Table alias customization
  const [editingAliasKey, setEditingAliasKey] = useState<CollectionKey | null>(null);
  const [tempAliasValue, setTempAliasValue] = useState<string>('');
  const [tableAliases, setTableAliases] = useState<Record<CollectionKey, string>>(() => {
    const saved = localStorage.getItem('navapos_table_aliases');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback below
      }
    }
    return {
      inventory: 'Stock Inventory',
      transactions: 'Transaksi Penjualan',
      customers: 'Daftar Pelanggan',
      suppliers: 'Daftar Supplier',
      expenses: 'Pengeluaran Toko',
      employees: 'Daftar Karyawan',
      attendances: 'Absensi Karyawan',
      appUsers: 'Akun Pengguna/Kasir',
      piutang: 'Piutang Pelanggan',
      order: 'Pre-Order PO',
      hutangSupplier: 'Hutang Supplier',
      leaveRequests: 'Pengajuan Cuti',
      waitingPayments: 'Menunggu Pembayaran',
      pendingTransactions: 'Pending Order'
    };
  });

  const saveAlias = (key: CollectionKey, value: string) => {
    const next = { ...tableAliases, [key]: value.trim() || key };
    setTableAliases(next);
    localStorage.setItem('navapos_table_aliases', JSON.stringify(next));
    setEditingAliasKey(null);
    notify(`Nama tampilan database diperbarui ke: ${value}`, 'success');
  };

  // Load data into local grid on selection changes
  useEffect(() => {
    const data = getContextData(selectedKey);
    setGridData(Array.isArray(data) ? [...data] : []);
    // Reset secondary filtering
    setSqlQueryResult(null);
    setSqlAffectedCount(null);
    setSqlFilterDesc('');
    setSelectedRowIds({});
    // Prepopulate SQL box with standard inquiry
    setSqlQuery(`SELECT * FROM \`${selectedKey}\` WHERE 1;`);
  }, [selectedKey, context]);

  // Derive unique keys (columns)
  useEffect(() => {
    if (gridData.length > 0) {
      const allKeys = new Set<string>();
      gridData.forEach(row => {
        if (row && typeof row === 'object') {
          Object.keys(row).forEach(k => allKeys.add(k));
        }
      });
      const sortedCols = Array.from(allKeys).sort((a, b) => {
        const priorityKeys = ['id', 'code', 'name', 'date', 'type', 'title'];
        const aIdx = priorityKeys.indexOf(a);
        const bIdx = priorityKeys.indexOf(b);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return a.localeCompare(b);
      });
      setColumns(sortedCols);
    } else {
      setColumns([]);
    }
  }, [gridData]);

  // Notifications
  const notify = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const getContextData = (key: CollectionKey) => {
    switch (key) {
      case 'inventory': return context.inventory;
      case 'transactions': return context.transactions;
      case 'customers': return context.customers;
      case 'suppliers': return context.suppliers;
      case 'expenses': return context.expenses;
      case 'employees': return context.employees;
      case 'attendances': return context.attendances;
      case 'appUsers': return context.appUsers;
      case 'piutang': return context.piutangData;
      case 'order': return context.orderData;
      case 'hutangSupplier': return context.hutangSupplier;
      case 'leaveRequests': return context.leaveRequests || [];
      case 'waitingPayments': return context.waitingPayments || [];
      case 'pendingTransactions': return context.pendingTransactions || [];
      default: return [];
    }
  };

  const setContextData = (key: CollectionKey, data: any[]) => {
    const sortedData = [...data];
    switch (key) {
      case 'inventory': context.setInventory(sortedData); break;
      case 'transactions': context.setTransactions(sortedData); break;
      case 'customers': context.setCustomers(sortedData); break;
      case 'suppliers': context.setSuppliers(sortedData); break;
      case 'expenses': context.setExpenses(sortedData); break;
      case 'employees': context.setEmployees ? context.setEmployees(sortedData) : null; break;
      case 'attendances': context.setAttendances(sortedData); break;
      case 'appUsers': context.setAppUsers(sortedData); break;
      case 'piutang': context.setPiutangData(sortedData); break;
      case 'order': context.setOrderData(sortedData); break;
      case 'hutangSupplier': context.setHutangSupplier(sortedData); break;
      case 'leaveRequests': context.setLeaveRequests ? context.setLeaveRequests(sortedData) : null; break;
      case 'waitingPayments': context.setWaitingPayments ? context.setWaitingPayments(sortedData) : null; break;
      case 'pendingTransactions': context.setPendingTransactions ? context.setPendingTransactions(sortedData) : null; break;
    }
  };

  const renderCellValue = (val: any) => {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'object') return `[JSON]`;
    return String(val);
  };

  const filteredRows = gridData.filter((row) => {
    if (!searchQuery) return true;
    if (!row) return false;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEditRow = (indexInGrid: number) => {
    const trueIndex = gridData.findIndex(item => item === filteredRows[indexInGrid]);
    if (trueIndex === -1) return;
    setEditingIndex(trueIndex);
    setEditingRow({ ...gridData[trueIndex] });
    setIsAddingNew(false);
  };
  
  const handleCopyRow = (indexInGrid: number) => {
    const trueIndex = gridData.findIndex(item => item === filteredRows[indexInGrid]);
    if (trueIndex === -1) return;
    const copiedItem = { ...gridData[trueIndex], id: Date.now().toString().slice(-6) + "_copy" };
    setEditingIndex(gridData.length);
    setEditingRow(copiedItem);
    setIsAddingNew(true);
    setActiveTab('Insert');
  };

  const handleAddNewRow = () => {
    const blankRow: any = {};
    columns.forEach(col => {
      if (col === 'id') blankRow[col] = Date.now().toString().slice(-6);
      else if (['price', 'stock', 'qty', 'total', 'amount'].includes(col)) blankRow[col] = 0;
      else blankRow[col] = '';
    });
    if (!blankRow.id) blankRow.id = Date.now().toString();
    setEditingRow(blankRow);
    setEditingIndex(gridData.length);
    setIsAddingNew(true);
    setActiveTab('Insert');
  };

  const handleFieldChange = (key: string, value: string) => {
    let parsedValue: any = value;
    if (value === 'true') parsedValue = true;
    else if (value === 'false') parsedValue = false;
    else if (!isNaN(Number(value)) && value.trim() !== '') parsedValue = Number(value);
    setEditingRow({ ...editingRow, [key]: parsedValue });
  };

  const handleSaveRow = () => {
    if (editingIndex === null || !editingRow) return;
    let updatedData = [...gridData];
    if (isAddingNew) updatedData.push(editingRow);
    else updatedData[editingIndex] = editingRow;
    
    setGridData(updatedData);
    setContextData(selectedKey, updatedData);
    setEditingIndex(null);
    setEditingRow(null);
    setActiveTab('Browse');
    notify(`Rows inserted/updated: 1`, 'success');
  };

  const handleDeleteRow = (indexInGrid: number) => {
    const trueIndex = gridData.findIndex(item => item === filteredRows[indexInGrid]);
    if (trueIndex === -1) return;
    if (window.confirm(`Do you really want to execute "DELETE FROM \`${selectedKey}\` WHERE id = '${gridData[trueIndex].id}'"?`)) {
      let updatedData = [...gridData];
      updatedData.splice(trueIndex, 1);
      setGridData(updatedData);
      setContextData(selectedKey, updatedData);
      notify(`1 row deleted.`, 'info');
    }
  };

  const handleExportJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gridData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `navapos_${selectedKey}_export.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      notify(`Export successful.`, 'success');
    } catch (e) {
      notify("Export failed", 'error');
    }
  };

  const handleSaveJsonText = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) return alert("JSON must be an array of objects");
      setGridData(parsed);
      setContextData(selectedKey, parsed);
      setShowJsonModal(false);
      notify(`Your SQL query has been executed successfully.`, 'success');
      setActiveTab('Browse');
    } catch (e) {
      alert("Invalid JSON format!");
    }
  };

  const handleFactoryResetCollection = () => {
    const targetCol = collections.find(c => c.key === selectedKey);
    if (!targetCol) return;
    if (window.confirm(`Do you really want to execute "TRUNCATE \`${selectedKey}\`" and restore defaults?`)) {
      const defaultData = targetCol.initial;
      setGridData([...defaultData]);
      setContextData(selectedKey, defaultData);
      setSelectedRowIds({});
      notify(`MySQL returned an empty result set (i.e. zero rows). Data restored.`, 'success');
    }
  };

  // phpMyAdmin Interactive SQL Parser
  const executeSqlQuery = (query: string) => {
    try {
      const q = query.trim();
      if (!q) {
        notify("Query empty!", "error");
        return;
      }

      // Check if it's a JSON array
      if (q.startsWith('[') && q.endsWith(']')) {
        const parsed = JSON.parse(q);
        if (Array.isArray(parsed)) {
          setGridData(parsed);
          setContextData(selectedKey, parsed);
          setSqlQueryResult(null);
          setSqlAffectedCount(parsed.length);
          notify(`Imported/Updated ${parsed.length} rows from raw JSON array`, 'success');
          setActiveTab('Browse');
          return;
        }
      }

      const upperQ = q.toUpperCase();

      // UPDATE Query
      if (upperQ.startsWith('UPDATE ')) {
        const match = q.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)\s+WHERE\s+(.+)/i);
        if (match) {
          const tableName = match[1];
          const setClause = match[2];
          const whereClause = match[3];

          let tableKey: CollectionKey = selectedKey;
          const foundCol = collections.find(c => c.key === tableName || c.key.toLowerCase() === tableName.toLowerCase());
          if (foundCol) tableKey = foundCol.key;

          const currentRows = [...getContextData(tableKey)];

          const assignments: Record<string, any> = {};
          setClause.split(',').forEach(part => {
            const [k, v] = part.split('=').map(x => x.trim());
            let cleanVal: any = v.replace(/^['"]|['"]$/g, '');
            if (!isNaN(Number(cleanVal)) && cleanVal !== '') cleanVal = Number(cleanVal);
            if (cleanVal === 'true') cleanVal = true;
            if (cleanVal === 'false') cleanVal = false;
            assignments[k] = cleanVal;
          });

          const [whereCol, whereValRaw] = whereClause.split('=').map(x => x.trim());
          const cleanWhereVal = whereValRaw.replace(/^['"]|['"]$/g, '').replace(/;/g, '').trim();

          let affected = 0;
          const updatedRows = currentRows.map(row => {
            if (String(row[whereCol] || '') === cleanWhereVal) {
              affected++;
              return { ...row, ...assignments };
            }
            return row;
          });

          setGridData(updatedRows);
          setContextData(tableKey, updatedRows);
          setSqlAffectedCount(affected);
          setSqlQueryResult(null);
          notify(`SQL Query complete: ${affected} row(s) updated in '${tableKey}'`, 'success');
          setActiveTab('Browse');
          return;
        }
      }

      // INSERT Query
      if (upperQ.startsWith('INSERT INTO ')) {
        const match = q.match(/INSERT\s+INTO\s+(\w+)\s*\((.+?)\)\s*VALUES\s*\((.+?)\)/i);
        if (match) {
          const tableName = match[1];
          const colsStr = match[2];
          const valsStr = match[3];

          let tableKey: CollectionKey = selectedKey;
          const foundCol = collections.find(c => c.key === tableName || c.key.toLowerCase() === tableName.toLowerCase());
          if (foundCol) tableKey = foundCol.key;

          const columnsList = colsStr.split(',').map(x => x.trim().replace(/[`'"[\]]/g, ''));
          const valuesList = valsStr.split(',').map(x => {
            const trimVal = x.trim();
            let cleanVal: any = trimVal.replace(/^['"]|['"]$/g, '').replace(/;/g, '').trim();
            if (!isNaN(Number(cleanVal)) && cleanVal !== '') cleanVal = Number(cleanVal);
            if (cleanVal === 'true') cleanVal = true;
            if (cleanVal === 'false') cleanVal = false;
            return cleanVal;
          });

          const newRow: any = {};
          columnsList.forEach((col, index) => {
            newRow[col] = valuesList[index];
          });
          if (!newRow.id) newRow.id = Date.now().toString().slice(-6);

          const currentRows = [...getContextData(tableKey)];
          currentRows.push(newRow);

          setGridData(currentRows);
          setContextData(tableKey, currentRows);
          setSqlAffectedCount(1);
          setSqlQueryResult(null);
          notify(`SQL Query complete: 1 row inserted into '${tableKey}'`, 'success');
          setActiveTab('Browse');
          return;
        }
      }

      // DELETE Query
      if (upperQ.startsWith('DELETE FROM ')) {
        const match = q.match(/DELETE\s+FROM\s+(\w+)\s+WHERE\s+(.+)/i);
        if (match) {
          const tableName = match[1];
          const whereClause = match[2];

          let tableKey: CollectionKey = selectedKey;
          const foundCol = collections.find(c => c.key === tableName || c.key.toLowerCase() === tableName.toLowerCase());
          if (foundCol) tableKey = foundCol.key;

          const currentRows = [...getContextData(tableKey)];
          const [whereCol, whereValRaw] = whereClause.split('=').map(x => x.trim());
          const cleanWhereVal = whereValRaw.replace(/^['"]|['"]$/g, '').replace(/;/g, '').trim();

          const filtered = currentRows.filter(row => String(row[whereCol] || '') !== cleanWhereVal);
          const affected = currentRows.length - filtered.length;

          setGridData(filtered);
          setContextData(tableKey, filtered);
          setSqlAffectedCount(affected);
          setSqlQueryResult(null);
          notify(`SQL Query complete: ${affected} row(s) deleted from '${tableKey}'`, 'success');
          setActiveTab('Browse');
          return;
        }
      }

      // SELECT Query
      if (upperQ.startsWith('SELECT ')) {
        const match = q.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
        if (match) {
          const tableName = match[2];
          const whereClause = match[3];

          let tableKey: CollectionKey = selectedKey;
          const foundCol = collections.find(c => c.key === tableName || c.key.toLowerCase() === tableName.toLowerCase());
          if (foundCol) {
            tableKey = foundCol.key;
            setSelectedKey(foundCol.key);
          }

          const currentRows = getContextData(tableKey);
          let filtered = [...currentRows];

          if (whereClause) {
            const cleanWhere = whereClause.replace(/;/g, '').trim();
            if (cleanWhere.includes('=')) {
              const [whereCol, whereValRaw] = cleanWhere.split('=').map(x => x.trim());
              const cleanWhereVal = whereValRaw.replace(/^['"]|['"]$/g, '');
              filtered = filtered.filter(row => String(row[whereCol] || '') === cleanWhereVal);
              setSqlFilterDesc(`WHERE ${whereCol} = '${cleanWhereVal}'`);
            } else if (cleanWhere.toLowerCase().includes(' like ')) {
              const parts = cleanWhere.match(/(.+?)\s+LIKE\s+['"]%?(.+?)%?['"]/i);
              if (parts) {
                const whereCol = parts[1].trim();
                const likeVal = parts[2].trim();
                filtered = filtered.filter(row => String(row[whereCol] || '').toLowerCase().includes(likeVal.toLowerCase()));
                setSqlFilterDesc(`WHERE ${whereCol} LIKE '%${likeVal}%'`);
              }
            } else {
              setSqlFilterDesc(`WHERE ${cleanWhere}`);
            }
          } else {
            setSqlFilterDesc('');
          }

          setSqlQueryResult(filtered);
          setSqlAffectedCount(filtered.length);
          notify(`SELECT matching rows loaded: ${filtered.length}`, 'success');
          setActiveTab('Browse');
          return;
        }
      }

      // If generic JSON text structure was given, try parsing it as a whole table
      const parsed = JSON.parse(q);
      if (Array.isArray(parsed)) {
        setGridData(parsed);
        setContextData(selectedKey, parsed);
        setSqlAffectedCount(parsed.length);
        notify(`Raw data synchronized.`, 'success');
        setActiveTab('Browse');
      } else {
        alert("SQL query couldn't be evaluated automatically. Try formal syntax like: \n\nSELECT * FROM `inventory` WHERE code = 'BRG10001'\nUPDATE `inventory` SET stock = 150 WHERE id = 'xyz'");
      }
    } catch (err: any) {
      alert("Error evaluating input: " + err.message);
    }
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    const selectedIds = Object.keys(selectedRowIds).filter(id => selectedRowIds[id]);
    if (selectedIds.length === 0) return alert("Please select at least one row checkbox!");
    if (window.confirm(`Do you really want to run "DELETE FROM \`${selectedKey}\` WHERE id IN (${selectedIds.map(id => `'${id}'`).join(', ')})"?`)) {
      const remaining = gridData.filter(row => !selectedRowIds[row.id]);
      setGridData(remaining);
      setContextData(selectedKey, remaining);
      setSelectedRowIds({});
      notify(`Bulk deleted: ${selectedIds.length} rows.`, 'info');
    }
  };

  const handleBulkCopy = () => {
    const selectedRowsList = gridData.filter(row => selectedRowIds[row.id]);
    if (selectedRowsList.length === 0) return alert("Please select at least one row checkbox!");
    const copiedRows = selectedRowsList.map(row => ({
      ...row,
      id: Date.now().toString().slice(-6) + "_" + Math.floor(Math.random() * 900 + 100)
    }));
    const updated = [...gridData, ...copiedRows];
    setGridData(updated);
    setContextData(selectedKey, updated);
    setSelectedRowIds({});
    notify(`Bulk duplicated: ${copiedRows.length} rows.`, 'success');
  };

  const handleBulkExport = () => {
    const selectedRowsList = gridData.filter(row => selectedRowIds[row.id]);
    if (selectedRowsList.length === 0) return alert("Please select at least one row checkbox!");
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedRowsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `navapos_bulk_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify(`Exported ${selectedRowsList.length} rows.`, 'success');
  };

  // Structured export helper
  const executeDataExport = () => {
    try {
      let content = '';
      let filename = '';
      let mimeType = 'text/plain';

      if (exportType === 'JSON') {
        content = JSON.stringify(gridData, null, 2);
        filename = `navapos_export_${selectedKey}.json`;
        mimeType = 'application/json';
      } else if (exportType === 'CSV') {
        if (gridData.length === 0) return alert("The table has no records to structure as CSV!");
        const csvLines = [columns.join(',')];
        gridData.forEach(row => {
          const cells = columns.map(col => {
            const cellVal = row[col];
            if (cellVal === null || cellVal === undefined) return 'NULL';
            const strVal = typeof cellVal === 'object' ? JSON.stringify(cellVal) : String(cellVal);
            return `"${strVal.replace(/"/g, '""')}"`;
          });
          csvLines.push(cells.join(','));
        });
        content = csvLines.join('\n');
        filename = `navapos_export_${selectedKey}.csv`;
        mimeType = 'text/csv';
      } else if (exportType === 'SQL') {
        if (gridData.length === 0) return alert("The table has no records to parse as SQL insert queries!");
        const sqlLines = [
          `-- phpMyAdmin structured SQL dump`,
          `-- Host: 127.0.0.1`,
          `-- Generation Time: ${new Date().toISOString()}`,
          `-- Database: \`Nava_POS\``,
          `-- Table structure: \`${selectedKey}\``,
          `-- --------------------------------------------------------`,
          ''
        ];
        gridData.forEach(row => {
          const names = columns.map(c => `\`${c}\``).join(', ');
          const vals = columns.map(c => {
            const cellVal = row[c];
            if (cellVal === null || cellVal === undefined) return 'NULL';
            if (typeof cellVal === 'number') return cellVal;
            if (typeof cellVal === 'boolean') return cellVal ? 1 : 0;
            const strVal = typeof cellVal === 'object' ? JSON.stringify(cellVal) : String(cellVal);
            return `'${strVal.replace(/'/g, "''")}'`;
          }).join(', ');
          sqlLines.push(`INSERT INTO \`${selectedKey}\` (${names}) VALUES (${vals});`);
        });
        content = sqlLines.join('\n');
        filename = `navapos_dump_${selectedKey}.sql`;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      notify(`Export finished on ${exportType}.`, 'success');
    } catch (e: any) {
      alert("Error outputting standard: " + e.message);
    }
  };

  // Structured import helper (Append or Over-write)
  const executeDataImport = () => {
    try {
      if (!importJsonText.trim()) return alert("Please copy-paste some custom row JSON array data inside the textbox.");
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) return alert("Structure error: DatabaseNava expects standard JSON array rows like `[ { 'id': '...' } ]` !");

      let finalRows = [];
      if (importMode === 'OVERWRITE') {
        finalRows = parsed;
      } else {
        const idMap = new Map<string, any>();
        gridData.forEach(r => idMap.set(String(r.id), r));
        parsed.forEach(row => {
          const cleanId = row.id ? String(row.id) : (Date.now().toString().slice(-6) + "_" + Math.floor(Math.random() * 100));
          idMap.set(cleanId, { ...row, id: cleanId });
        });
        finalRows = Array.from(idMap.values());
      }

      setGridData(finalRows);
      setContextData(selectedKey, finalRows);
      setImportJsonText('');
      notify(`Import successful: ${parsed.length} row(s) read.`, 'success');
      setActiveTab('Browse');
    } catch (e: any) {
      alert("Unable to decode parameters: " + e.message);
    }
  };

  // Schema Modifier (Structures ALTER TABLE / DROP COLUMN)
  const handleAddNewColumn = (colName: string) => {
    const cleanColName = colName.trim().replace(/[^a-zA-Z0-9_]/g, '');
    if (!cleanColName) return alert("Please enter a valid alphanumeric name!");
    if (columns.includes(cleanColName)) return alert("This column name already exists in active structure!");

    const updatedRows = gridData.map(row => ({
      ...row,
      [cleanColName]: ''
    }));

    setGridData(updatedRows);
    setContextData(selectedKey, updatedRows);
    notify(`ALTER TABLE \`${selectedKey}\` ADD COLUMN \`${cleanColName}\` complete.`, 'success');
  };

  const handleDropColumn = (colName: string) => {
    if (!window.confirm(`Do you really want to drop/delete column \`${colName}\` across every item in \`${selectedKey}\`?`)) return;
    const updatedRows = gridData.map(row => {
      const copy = { ...row };
      delete copy[colName];
      return copy;
    });

    setGridData(updatedRows);
    setContextData(selectedKey, updatedRows);
    notify(`ALTER TABLE \`${selectedKey}\` DROP COLUMN \`${colName}\` complete.`, 'info');
  };

  // Operations and Truncations
  const handleTruncateTable = () => {
    if (!window.confirm(`Execute: "TRUNCATE TABLE \`${selectedKey}\`"?\n\nWarning: This deletes all rows instantly!`)) return;
    setGridData([]);
    setContextData(selectedKey, []);
    setSelectedRowIds({});
    notify(`Truncated table \`${selectedKey}\`. Zero records remaining.`, 'success');
  };

  const handleCopyTable = (targetColKey: CollectionKey, schemaOnly: boolean) => {
    if (targetColKey === selectedKey) return alert("Target database table must be different!");
    let payload = [];
    if (!schemaOnly) {
      payload = gridData.map(row => ({
        ...row,
        id: Date.now().toString().slice(-6) + "_" + Math.floor(Math.random() * 100) + "_copied"
      }));
    }
    setContextData(targetColKey, payload);
    notify(`Copied ${schemaOnly ? 'structure' : `${gridData.length} active rows`} to \`${targetColKey}\` table.`, 'success');
  };

  // Handle Search Condition triggers
  const handleSearchRowsSubmit = () => {
    let filtered = [...getContextData(selectedKey)];
    let filterDescriptionParts = [];

    Object.keys(searchConditions).forEach(col => {
      const { operator, value } = searchConditions[col];
      if (!value.trim()) return;

      if (operator === '=') {
        filtered = filtered.filter(row => String(row[col] || '') === value.trim());
        filterDescriptionParts.push(`\`${col}\` = '${value.trim()}'`);
      } else if (operator === '!=') {
        filtered = filtered.filter(row => String(row[col] || '') !== value.trim());
        filterDescriptionParts.push(`\`${col}\` != '${value.trim()}'`);
      } else if (operator === 'LIKE %...%') {
        filtered = filtered.filter(row => String(row[col] || '').toLowerCase().includes(value.trim().toLowerCase()));
        filterDescriptionParts.push(`\`${col}\` LIKE '%${value.trim()}%'`);
      }
    });

    setSqlQueryResult(filtered);
    setSqlFilterDesc(filterDescriptionParts.length > 0 ? `WHERE ${filterDescriptionParts.join(' AND ')}` : '');
    setSqlAffectedCount(filtered.length);
    setActiveTab('Browse');
    notify(`Search returned ${filtered.length} matching rows.`, 'success');
  };

  // Toggle selection
  const handleToggleRowSelection = (rowId: string) => {
    setSelectedRowIds(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const handleToggleAllSelections = () => {
    const isAllSelected = filteredRows.every(r => selectedRowIds[r.id]);
    const nextMap: Record<string, boolean> = {};
    if (!isAllSelected) {
      filteredRows.forEach(r => { nextMap[r.id] = true; });
    }
    setSelectedRowIds(nextMap);
  };

  const rowsToRender = sqlQueryResult !== null ? sqlQueryResult : filteredRows;

  return (
    <div className="flex-1 bg-[#f3f3f3] flex h-full font-sans text-[#333333] relative select-none">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[240px] border-r border-[#ccc] bg-[#f3f3f3] flex flex-col shrink-0 text-xs">
        <div className="p-3 text-center border-b border-[#ccc] bg-[#e5e5e5]">
          <div className="font-bold text-lg text-[#ef6c00] tracking-tight">Database<span className="text-[#235a81]">Nava</span></div>
        </div>
        <div className="p-2 border-b border-[#ccc] bg-white flex justify-center gap-4">
          <Home className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" title="Home" />
          <LogOut className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" title="Exit Panel" onClick={() => context.setActiveTab('pos')} />
          <Database className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" title="SQL Database" />
          <Server className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" title="Admin Server Status" />
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto">
          <div className="mb-2 text-[#444] flex items-center gap-1 font-semibold">
            <span className="text-gray-500 font-bold">−</span> 
            <Database className="w-4 h-4 text-[#ef6c00]" />
            Nava_POS
          </div>
          
          <div className="pl-4 flex flex-col gap-1.5 ml-1 border-l hover:border-gray-400 border-gray-300">
            {collections.map(col => {
              const isSelected = selectedKey === col.key;
              const aliasName = tableAliases[col.key] || col.key;
              return (
                <div 
                  key={col.key} 
                  onClick={() => { 
                    setSelectedKey(col.key); 
                    setActiveTab('Browse'); 
                    setSearchQuery(''); 
                    setEditingIndex(null); 
                    setSearchConditions({});
                  }}
                  className={`flex items-center justify-between gap-1 px-1 py-1 cursor-pointer hover:bg-[#e5e5e5] rounded group ${isSelected ? 'bg-[#d3dce3] text-[#235a81] font-semibold' : 'text-[#235a81]'}`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <TableIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#235a81]' : 'text-gray-400'} group-hover:text-[#235a81]`} />
                    {editingAliasKey === col.key ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveAlias(col.key, tempAliasValue);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center flex-1 min-w-0"
                      >
                        <input
                          type="text"
                          value={tempAliasValue}
                          onChange={(e) => setTempAliasValue(e.target.value)}
                          className="bg-white border border-[#235a81] px-1 py-0.5 text-[11px] rounded w-full outline-none font-sans font-normal text-black"
                          autoFocus
                          onBlur={() => saveAlias(col.key, tempAliasValue)}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') setEditingAliasKey(null);
                          }}
                        />
                      </form>
                    ) : (
                      <span className="truncate flex-1" title={`${aliasName} (${col.key})`}>
                        {aliasName} <span className="text-[10px] text-gray-500 font-normal">({col.key})</span>
                      </span>
                    )}
                  </div>
                  
                  {editingAliasKey !== col.key && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAliasKey(col.key);
                        setTempAliasValue(aliasName);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#ccc] rounded text-gray-500 hover:text-black cursor-pointer transition-opacity shrink-0"
                      title="Edit Nama Tampilan"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT DIV */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Top Breadcrumb Header */}
        <div className="bg-[#f3f3f3] border-b border-[#ccc] px-4 py-2 flex items-center text-[#444] gap-1 text-xs whitespace-nowrap">
          <Server className="w-3.5 h-3.5 text-[#235a81]" />
          Server: <span className="text-[#235a81]">127.0.0.1</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
          <Database className="w-3.5 h-3.5 text-[#ef6c00]" />
          Database: <span className="text-[#235a81]">Nava_POS</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
          <TableIcon className="w-3.5 h-3.5 text-gray-400" />
          Table: <span className="text-[#235a81]">{tableAliases[selectedKey]} ({selectedKey})</span>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#f3f3f3] px-2 pt-2 border-b border-[#ccc] flex gap-1 font-semibold text-[#444] text-xs">
          {(['Browse', 'Structure', 'SQL', 'Search', 'Insert', 'Export', 'Import', 'Operations'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'Insert') {
                  handleAddNewRow();
                  return;
                }
                setActiveTab(tab);
              }}
              className={`px-4 py-1.5 rounded-t-lg border border-b-0 cursor-pointer flex items-center gap-1.5 transition-colors
                ${activeTab === tab 
                  ? 'bg-white border-[#ccc] text-black shadow-[0_2px_0_0_white]' 
                  : 'bg-[#e5e5e5] border-[#ccc] hover:bg-white text-[#235a81]'}`}
              style={activeTab === tab ? { zIndex: 10, position: 'relative', marginBottom: '-1px' } : {}}
            >
              {tab === 'Browse' && <TableIcon className="w-3.5 h-3.5" />}
              {tab === 'Structure' && <Server className="w-3.5 h-3.5" />}
              {tab === 'SQL' && <FileCode className="w-3.5 h-3.5" />}
              {tab === 'Search' && <Search className="w-3.5 h-3.5" />}
              {tab === 'Insert' && <PlusCircle className="w-3.5 h-3.5" />}
              {tab === 'Export' && <Download className="w-3.5 h-3.5" />}
              {tab === 'Import' && <Copy className="w-3.5 h-3.5" />}
              {tab === 'Operations' && <RefreshCw className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="m-4 p-2 bg-[#d4edda] text-[#155724] border border-[#c3e6cb] rounded flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold">{notification.message}</span>
          </div>
        )}

        {/* Tab Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-white relative">
          
          {/* ================ BROWSE TAB ================ */}
          {activeTab === 'Browse' && (
            <>
              {/* Extra Bar with Search/Query info */}
              <div className="mb-4 bg-[#e5e5e5] p-2 border border-[#ccc] rounded text-[#444] font-mono whitespace-pre flex flex-wrap gap-2 items-center text-xs">
                <span className="text-[#888]">SELECT * FROM</span> <span className="text-black">`{selectedKey}`</span>
                {sqlFilterDesc && <span className="text-purple-700 font-bold"> {sqlFilterDesc}</span>}
                {searchQuery && !sqlFilterDesc && (
                   <><span className="text-purple-700 font-bold"> WHERE</span> <span className="text-orange-600">ANY_COL</span> <span className="text-blue-600">LIKE</span> <span className="text-green-600">'%{searchQuery}%'</span></>
                )}
                <div className="ml-auto flex items-center bg-white px-2 py-1 border border-[#ccc] shadow-inner font-sans rounded-sm gap-2 w-64">
                   <Search className="w-3.5 h-3.5 text-gray-500" />
                   <input 
                     type="text" 
                     placeholder="Filter rows..." 
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                     className="bg-transparent border-none outline-none text-black w-full"
                   />
                </div>
              </div>

              {sqlQueryResult !== null && (
                <div className="mb-2.5 bg-[#eaf2f8] border border-[#b4cbe0] p-1.5 rounded text-xs flex items-center justify-between text-[#235a81]">
                  <span>Active subset filtered by SQL Query / Multi-Search parameters</span>
                  <button 
                    onClick={() => { setSqlQueryResult(null); setSqlFilterDesc(''); setSqlAffectedCount(null); }}
                    className="bg-white hover:bg-gray-150 py-0.5 px-2 border rounded font-semibold cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}

              <div className="mb-2 text-xs">
                <span className="font-bold text-gray-700">Showing rows 0 - {rowsToRender.length > 0 ? rowsToRender.length - 1 : 0} (Total {gridData.length}, Query took 0.0001 sec)</span>
              </div>

              {rowsToRender.length === 0 ? (
                <div className="p-4 bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb] rounded text-center text-xs">
                  MySQL returned an empty result set (i.e. zero rows match the query or data is empty).
                </div>
              ) : (
                <div className="border border-[#ccc] overflow-x-auto shadow-sm text-xs">
                  <table className="w-full text-left border-collapse whitespace-nowrap text-[#000]">
                    <thead className="bg-[#e5e5e5] border-b border-[#ccc] font-bold text-[#444]">
                      <tr>
                        <th className="px-2 py-1.5 border-r border-[#ccc] text-center w-8">
                          <input 
                            type="checkbox" 
                            checked={rowsToRender.length > 0 && rowsToRender.every(r => selectedRowIds[r.id])}
                            onChange={handleToggleAllSelections}
                          />
                        </th>
                        <th className="px-3 py-1.5 border-r border-[#ccc] text-center w-[150px]">Options</th>
                        {columns.map(col => (
                          <th key={col} className="px-3 py-1.5 border-r border-[#ccc] hover:bg-[#d3dce3] cursor-pointer text-[#235a81]">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rowsToRender.map((row, idx) => (
                        <tr key={idx} className={`border-b border-[#eee] hover:bg-[#d3dce3] ${selectedRowIds[row.id] ? 'bg-[#fffae6]' : idx % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f3f3f3]'}`}>
                          <td className="px-2 py-1.5 border-r border-[#ccc] text-center">
                            <input 
                              type="checkbox" 
                              checked={!!selectedRowIds[row.id]} 
                              onChange={() => handleToggleRowSelection(row.id)}
                            />
                          </td>
                          <td className="px-2 py-1.5 border-r border-[#ccc] bg-[#f9f9f9]">
                            <div className="flex items-center gap-3 justify-center text-[#235a81]">
                              <button onClick={() => {
                                setEditingIndex(gridData.findIndex(x => x.id === row.id));
                                setEditingRow({ ...row });
                                setIsAddingNew(false);
                                setActiveTab('Insert');
                              }} className="flex items-center gap-1 hover:text-[#ef6c00] cursor-pointer font-semibold"><Edit2 className="w-3 h-3"/> Edit</button>
                              <button onClick={() => handleCopyRow(gridData.findIndex(x => x.id === row.id))} className="flex items-center gap-1 hover:text-[#ef6c00] cursor-pointer font-semibold"><Copy className="w-3 h-3"/> Copy</button>
                              <button onClick={() => handleDeleteRow(gridData.findIndex(x => x.id === row.id))} className="flex items-center gap-1 text-[#b10000] hover:text-[#ff0000] cursor-pointer font-semibold"><Trash2 className="w-3 h-3"/> Delete</button>
                            </div>
                          </td>
                          {columns.map(col => {
                            const val = row[col];
                            const isNull = val === null || val === undefined;
                            return (
                              <td key={col} className={`px-3 py-1.5 border-r border-[#ccc] max-w-xs truncate ${isNull ? 'italic text-gray-400' : ''}`}>
                                {renderCellValue(val)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {rowsToRender.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4 items-center text-[#444] text-xs leading-none">
                  <span className="flex items-center gap-1 font-bold">With selected:</span>
                  <button onClick={handleBulkCopy} className="flex items-center gap-1 hover:bg-[#e5e5e5] px-2 py-1 border border-gray-300 rounded hover:text-[#235a81] cursor-pointer"><Copy className="w-3.5 h-3.5"/> Copy/Duplicate</button>
                  <button onClick={handleBulkDelete} className="flex items-center gap-1 hover:bg-red-50 text-[#b10000] border border-red-300 px-2 py-1 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5"/> Delete</button>
                  <button onClick={handleBulkExport} className="flex items-center gap-1 hover:bg-[#e5e5e5] px-2 py-1 border border-gray-300 rounded hover:text-[#235a81] cursor-pointer"><Download className="w-3.5 h-3.5"/> Export</button>
                </div>
              )}
            </>
          )}

          {/* ================ STRUCTURE TAB ================ */}
          {activeTab === 'Structure' && (
             <div className="text-[#444] text-xs">
               <div className="font-bold text-base mb-3">Table Schema Structure for table: <span className="font-mono text-black">`{selectedKey}`</span></div>
               <div className="border border-[#ccc] shadow-sm overflow-hidden mb-6 bg-white rounded-sm">
                 <table className="w-full text-left border-collapse bg-white">
                   <thead className="bg-[#e5e5e5] border-b border-[#ccc] font-bold">
                     <tr>
                       <th className="px-4 py-2 border-r border-[#ccc]">#</th>
                       <th className="px-4 py-2 border-r border-[#ccc] text-[#235a81]">Column Name</th>
                       <th className="px-4 py-2 border-r border-[#ccc]">Inferred Type</th>
                       <th className="px-4 py-2 border-r border-[#ccc]">Nullability</th>
                       <th className="px-4 py-2 border-r border-[#ccc]">Key Attributes</th>
                       <th className="px-4 py-2">Alter Operations</th>
                     </tr>
                   </thead>
                   <tbody>
                     {columns.map((col, idx) => {
                       const matchesNumeric = col === 'stock' || col === 'price' || col === 'qty' || col === 'total' || col === 'amount';
                       const isPrimaryId = col === 'id';
                       return (
                         <tr key={col} className={`border-b border-[#eee] ${idx % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f3f3f3]'}`}>
                           <td className="px-4 py-2 border-r border-[#ccc] text-gray-500 font-mono text-right w-12">{idx + 1}</td>
                           <td className="px-4 py-2 border-r border-[#ccc] text-[#235a81] font-bold font-mono">{col}</td>
                           <td className="px-4 py-2 border-r border-[#ccc] text-gray-600 font-mono text-[11px]">{isPrimaryId ? 'varchar(50)' : matchesNumeric ? 'int(11)' : 'text'}</td>
                           <td className="px-4 py-2 border-r border-[#ccc]">{isPrimaryId ? 'No' : 'Yes'}</td>
                           <td className="px-4 py-2 border-r border-[#ccc] font-mono text-orange-600 text-[10px]">{isPrimaryId ? 'PRIMARY KEY (UUID)' : ''}</td>
                           <td className="px-4 py-2">
                             <button
                               onClick={() => handleDropColumn(col)}
                               disabled={isPrimaryId}
                               className={`text-[11px] font-semibold flex items-center gap-1 ${isPrimaryId ? 'text-gray-300 cursor-not-allowed' : 'text-[#b10000] hover:text-red-600 cursor-pointer'}`}
                             >
                               <Trash2 className="w-3 h-3" /> ALTER: Drop Column
                             </button>
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>

               {/* Alter Addition Field panel */}
               <div className="bg-[#f9f9f9] border border-[#ccc] p-3 rounded-sm max-w-xl">
                 <h4 className="font-bold mb-2 text-[#ef6c00] flex items-center gap-1">
                   <PlusCircle className="w-4 h-4"/> Add custom column field dynamically (ALTER TABLE ADD)
                 </h4>
                 <p className="text-[11px] text-gray-650 mb-3 leading-normal">
                   This adds an extra key to every document inside the <strong>{selectedKey}</strong> dataset in real-time. Recommended alphanumeric format: lowercase (e.g. <code>notes_tag</code>).
                 </p>
                 <form 
                   onSubmit={(e) => {
                     e.preventDefault();
                     const input = (e.currentTarget.elements.namedItem('new_col_name') as HTMLInputElement);
                     if (input.value) {
                       handleAddNewColumn(input.value);
                       input.value = '';
                     }
                   }}
                   className="flex gap-2"
                 >
                   <input
                     name="new_col_name"
                     type="text"
                     placeholder="e.g. brand_attribute"
                     className="bg-white border border-[#ccc] p-1.5 focus:border-[#ef6c00] outline-none font-mono text-xs rounded-sm flex-1"
                   />
                   <button
                     type="submit"
                     className="bg-[#ef6c00] hover:bg-[#cc5800] text-white px-4 py-1.5 font-bold border border-[#a24500] rounded-sm cursor-pointer shadow-sm text-xs"
                   >
                     ALTER TABLE ADD
                   </button>
                 </form>
               </div>
             </div>
          )}

          {/* ================ SQL TAB CONTENT ================ */}
          {activeTab === 'SQL' && (
             <div className="text-[#333] text-xs">
               <div className="font-bold text-base mb-1">Run formal SQL syntax / override JSON parameters on <span className="font-mono text-black text-sm bg-gray-100 px-1 py-0.5 rounded">`Nava_POS`</span>:</div>
               <p className="text-[11px] text-gray-600 mb-3 leading-normal">
                 You can execute standard queries like <code>SELECT * FROM `table` WHERE column = 'value'</code> or <code>SELECT * FROM `table` WHERE column LIKE '%search%'</code>. You can also paste an entire JSON array of rows to overwrite the database structure or bulk insert. Try standard query modifiers here!
               </p>

               <div className="border border-[#ccc] bg-[#f9f9f9] shadow-sm max-w-4xl rounded-sm">
                 <div className="p-1.5 bg-[#e5e5e5] border-b border-[#ccc] font-bold text-[#444] font-mono text-xs flex justify-between items-center">
                   <span>Nava Query Analyzer Box (SQL Editor)</span>
                   <button 
                     onClick={() => setSqlQuery(`SELECT * FROM \`${selectedKey}\` WHERE 1;`)}
                     className="px-2 py-0.5 bg-white text-[10px] border rounded hover:bg-gray-50 cursor-pointer font-sans font-normal"
                   >
                     Reset Standard Template
                   </button>
                 </div>
                 <div className="p-3">
                   <textarea
                     value={sqlQuery}
                     onChange={(e) => setSqlQuery(e.target.value)}
                     className="w-full bg-[#1e1e1e] text-[#a9dc76] border border-[#ccc] p-3 h-[240px] font-mono text-xs outline-none focus:border-[#235a81] rounded-sm leading-relaxed"
                     spellCheck={false}
                   />
                 </div>
                 <div className="p-3 bg-[#e5e5e5] border-t border-[#ccc] flex justify-between items-center">
                   <span className="text-[10px] text-gray-550 leading-tight">
                     Supported inputs: <code>SELECT</code>, <code>UPDATE</code>, <code>INSERT</code>, <code>DELETE</code> or raw <code>JSON Array</code>.
                   </span>
                   <div className="flex gap-2">
                     <button
                       onClick={() => setSqlQuery('')}
                       className="px-4 py-1.5 bg-white hover:bg-gray-100 border border-[#ccc] text-[#444] font-bold rounded-sm cursor-pointer text-xs"
                     >
                       Clear
                     </button>
                     <button
                       onClick={() => executeSqlQuery(sqlQuery)}
                       className="px-6 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded-sm font-bold cursor-pointer text-xs shadow-sm"
                     >
                       Go (Execute Query)
                     </button>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* ================ SEARCH TAB ================ */}
          {activeTab === 'Search' && (
             <div className="text-[#444] text-xs">
               <div className="font-bold text-base mb-3">Table Search Operator Form: <span className="font-mono text-black">`{selectedKey}`</span></div>
               
               <div className="border border-[#ccc] bg-white shadow-sm max-w-4xl rounded-sm">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-[#e5e5e5] border-b border-[#ccc] text-[#444] font-bold text-[11px]">
                     <tr>
                       <th className="px-4 py-2 border-r border-[#ccc] w-48">Table Column Field</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-32">Type</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-48">Operator Method</th>
                       <th className="px-4 py-2">Comparison Field Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     {columns.map((col, idx) => {
                       const condition = searchConditions[col] || { operator: 'LIKE %...%', value: '' };
                       return (
                         <tr key={idx} className={`border-b border-[#eee] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f3f3f3]'}`}>
                           <td className="px-4 py-2 border-r border-[#ccc] font-bold font-mono text-[#235a81]">{col}</td>
                           <td className="px-4 py-2 border-r border-[#ccc] text-gray-500 text-[11px] font-mono">
                             {col === 'id' ? 'varchar' : (col === 'price' || col === 'stock' || col === 'qty') ? 'int' : 'text'}
                           </td>
                           <td className="px-4 py-2 border-r border-[#ccc]">
                             <select 
                               value={condition.operator}
                               onChange={(e) => setSearchConditions(prev => ({
                                 ...prev,
                                 [col]: { ...condition, operator: e.target.value }
                               }))}
                               className="border border-[#ccc] w-full p-1 bg-white text-xs text-[#000]"
                             >
                               <option>LIKE %...%</option>
                               <option value="=">=</option>
                               <option value="!=">!=</option>
                             </select>
                           </td>
                           <td className="px-4 py-2">
                             <input 
                               type="text" 
                               placeholder={`Search custom ${col}...`}
                               value={condition.value}
                               onChange={(e) => setSearchConditions(prev => ({
                                 ...prev,
                                 [col]: { ...condition, value: e.target.value }
                               }))}
                               className="border border-[#ccc] p-1.5 w-full outline-none focus:border-[#ef6c00] font-mono text-xs"
                             />
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
                 <div className="p-3 bg-[#e5e5e5] border-t border-[#ccc] flex justify-end gap-2.5">
                   <button 
                     onClick={() => setSearchConditions({})}
                     className="px-4 py-1.5 bg-white hover:bg-gray-150 border border-[#ccc] text-black font-bold rounded-sm text-xs cursor-pointer"
                   >
                     Reset Form fields
                   </button>
                   <button 
                     onClick={handleSearchRowsSubmit}
                     className="px-6 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded-sm font-bold text-xs cursor-pointer shadow-sm"
                   >
                     Go (Perform Multi-Search)
                   </button>
                 </div>
               </div>
             </div>
          )}

          {/* ================ INSERT / EDIT TAB ================ */}
          {(activeTab === 'Insert' || isAddingNew || editingRow) && (
             <div className="text-xs text-[#444]">
               <div className="font-bold text-base mb-3">
                  {isAddingNew ? `INSERT INTO \`${selectedKey}\` VALUES (1 row)` : `UPDATE ROW IN \`${selectedKey}\` WHERE PRIMARY KEY`}
               </div>

               <div className="border border-[#ccc] bg-[#fdfdfd] shadow-sm max-w-4xl rounded-sm">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-[#e5e5e5] border-b border-[#ccc] text-[#444] font-bold text-[11px]">
                     <tr>
                       <th className="px-4 py-2 border-r border-[#ccc] w-48">Table Column</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-24">Type</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-32">Func Matcher</th>
                       <th className="px-4 py-2 w-full">Input Field Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     {Object.keys(editingRow || {}).map((key, idx) => {
                       const val = editingRow[key];
                       const isObj = val && typeof val === 'object';
                       const strVal = isObj ? JSON.stringify(val) : String(val === null || val === undefined ? '' : val);

                       return (
                         <tr key={key} className={`border-b border-[#eee] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f3f3f3]'}`}>
                           <td className="px-4 py-2 border-r border-[#ccc] font-bold font-mono text-[#235a81]">{key}</td>
                           <td className="px-4 py-2 border-r border-[#ccc] text-gray-500 font-mono text-[11px] text-center">{isObj ? 'json' : typeof val === 'number' ? 'int' : typeof val === 'boolean' ? 'tinyint' : 'varchar'}</td>
                           <td className="px-4 py-2 border-r border-[#ccc]">
                             <select className="border border-[#ccc] w-full p-0.5 bg-white text-xs disabled:opacity-50" disabled>
                               <option></option>
                               <option>MD5</option>
                               <option>NOW()</option>
                               <option>UUID()</option>
                             </select>
                           </td>
                           <td className="px-4 py-2">
                             {isObj ? (
                               <textarea 
                                 value={strVal}
                                 onChange={(e) => {
                                   try {
                                     const parsed = JSON.parse(e.target.value);
                                     setEditingRow({ ...editingRow, [key]: parsed });
                                   } catch (err) {
                                     setEditingRow({ ...editingRow, [key]: e.target.value });
                                   }
                                 }}
                                 className="border border-[#ccc] p-1.5 w-full h-16 outline-none focus:border-[#ef6c00] font-mono text-xs bg-white rounded-xs"
                               />
                             ) : (
                               <input 
                                 type="text" 
                                 value={strVal}
                                 disabled={key === 'id' && !isAddingNew}
                                 onChange={(e) => handleFieldChange(key, e.target.value)}
                                 className="border border-[#ccc] p-1.5 w-full outline-none focus:border-[#ef6c00] font-mono text-xs bg-white rounded-xs disabled:bg-gray-100 disabled:text-gray-500"
                               />
                             )}
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
                 <div className="p-3 bg-[#e5e5e5] border-t border-[#ccc] flex justify-end gap-2.5">
                   <button 
                     onClick={() => { setEditingIndex(null); setEditingRow(null); setIsAddingNew(false); setActiveTab('Browse'); }}
                     className="px-4 py-1.5 bg-white hover:bg-gray-100 border text-[#444] border-[#ccc] rounded-sm font-bold cursor-pointer transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleSaveRow}
                     className="px-6 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded-sm font-bold cursor-pointer transition-colors shadow-sm"
                   >
                     Go (Save Record)
                   </button>
                 </div>
               </div>
             </div>
          )}

          {/* ================ EXPORT TAB ================ */}
          {activeTab === 'Export' && (
             <div className="text-xs text-[#444]">
               <div className="font-bold text-base mb-3">Structured Table Export format from: <span className="font-mono text-black bg-gray-100 px-1">`{selectedKey}`</span></div>
               
               <div className="border border-[#ccc] bg-[#f9f9f9] shadow-sm max-w-2xl p-4 rounded-sm">
                 <h4 className="font-bold text-sm text-[#ef6c00] mb-3">Export Method / Options</h4>
                 
                 <div className="flex flex-col gap-3 mb-4">
                   <div className="flex items-center gap-2">
                     <label className="font-bold w-32">Export Format Type:</label>
                     <div className="flex gap-4">
                       <label className="flex items-center gap-1 cursor-pointer">
                         <input type="radio" name="expFormat" checked={exportType === 'JSON'} onChange={() => setExportType('JSON')} /> JSON Dump File
                       </label>
                       <label className="flex items-center gap-1 cursor-pointer">
                         <input type="radio" name="expFormat" checked={exportType === 'CSV'} onChange={() => setExportType('CSV')} /> CSV Spreadsheet Column
                       </label>
                       <label className="flex items-center gap-1 cursor-pointer">
                         <input type="radio" name="expFormat" checked={exportType === 'SQL'} onChange={() => setExportType('SQL')} /> MySQL Insert Statements
                       </label>
                     </div>
                   </div>
                   
                   <p className="text-[11px] text-gray-650 italic">
                     {exportType === 'JSON' && 'Generates complete documents array as an immediate .json file backup.'}
                     {exportType === 'CSV' && 'Outputs comma-separated columns, matching default Excel formats.'}
                     {exportType === 'SQL' && 'Produces direct INSERT queries compatible with custom relational tables.'}
                   </p>
                 </div>
                 
                 <div className="border-t border-[#ccc] pt-3 flex justify-end">
                   <button
                     onClick={executeDataExport}
                     className="px-6 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded-sm font-bold text-xs cursor-pointer shadow-sm flex items-center gap-1"
                   >
                     <Download className="w-3.5 h-3.5"/> Download Raw Export File
                   </button>
                 </div>
               </div>
             </div>
          )}

          {/* ================ IMPORT TAB ================ */}
          {activeTab === 'Import' && (
             <div className="text-xs text-[#444]">
               <div className="font-bold text-base mb-3">Structured Import into table: <span className="font-mono text-black">`{selectedKey}`</span></div>
               <p className="text-[#666] leading-normal mb-4">
                 Import data safely from an external JSON backup file. You can paste custom JSON structure logs directly inside the analyzer box and select append or overwrite modes below.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
                 <div className="bg-[#f9f9f9] border border-[#ccc] p-3 rounded-sm flex flex-col gap-3 h-fit">
                   <h4 className="font-bold text-[#ef6c00]">1. Import Option Parameters</h4>
                   
                   <div>
                     <label className="font-bold block mb-1">Conflict Resolution Mode:</label>
                     <div className="flex flex-col gap-1 text-[11px]">
                       <label className="flex items-center gap-1 cursor-pointer">
                         <input type="radio" checked={importMode === 'APPEND'} onChange={() => setImportMode('APPEND')} /> Append & Update (Skip Duplicates)
                       </label>
                       <label className="flex items-center gap-1 cursor-pointer">
                         <input type="radio" checked={importMode === 'OVERWRITE'} onChange={() => setImportMode('OVERWRITE')} /> Erase & Override completely
                       </label>
                     </div>
                   </div>
                   
                   <div className="border-t border-[#ccc] pt-2">
                     <label className="font-bold block mb-1">Local JSON File Loader:</label>
                     <input
                       type="file"
                       accept=".json"
                       onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                           const reader = new FileReader();
                           reader.onload = (evt) => {
                             if (evt.target?.result) setImportJsonText(evt.target.result as string);
                           };
                           reader.readAsText(file);
                         }
                       }}
                       className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[11px] file:font-semibold file:bg-[#e5e5e5] file:text-[#333] hover:file:bg-white cursor-pointer"
                     />
                   </div>
                 </div>

                 <div className="bg-white border border-[#ccc] p-3 rounded-sm col-span-2 flex flex-col gap-2 shadow-sm">
                   <h4 className="font-bold text-[#235a81] font-mono">2. Pasted JSON content input area</h4>
                   <textarea
                     value={importJsonText}
                     onChange={(e) => setImportJsonText(e.target.value)}
                     placeholder="Format: [ { 'id': '...', 'name': '...' } ]"
                     className="w-full bg-[#fafafa] border border-[#ccc] p-2 h-[200px] outline-none font-mono text-[11px] leading-tight resize-none"
                   />
                   
                   <div className="flex justify-end pt-2">
                     <button
                       onClick={executeDataImport}
                       className="px-6 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded-sm font-bold text-xs cursor-pointer shadow-sm"
                     >
                       Go (Execute Data Import)
                     </button>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* ================ OPERATIONS TAB ================ */}
          {activeTab === 'Operations' && (
             <div className="text-xs text-[#444]">
               <div className="font-bold text-base mb-3">Maintenance Operations for table: <span className="font-mono text-black">`{selectedKey}`</span></div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                 
                 {/* Table Copy box */}
                 <div className="border border-[#ccc] bg-[#f9f9f9] p-4 rounded-sm flex flex-col gap-3 shadow-sm">
                   <h4 className="font-bold text-[#ef6c00] text-sm flex items-center gap-1">
                     <Copy className="w-4 h-4"/> Copy table copy/clone operations
                   </h4>
                   <p className="text-[11px] text-gray-650 leading-normal">
                     Copies active records or empty schema structures inside this workspace into another selected key dynamically!
                   </p>
                   
                   <div className="flex flex-col gap-2">
                     <label className="font-bold">Target Destination Table:</label>
                     <select id="copy_target_select" className="bg-white border p-1 rounded-sm text-xs font-mono">
                       {collections.filter(c => c.key !== selectedKey).map(c => (
                         <option key={c.key} value={c.key}>{c.key} ({c.name})</option>
                       ))}
                     </select>
                   </div>
                   
                   <div className="flex gap-2 justify-end pt-2 border-t border-[#ccc]">
                     <button
                       onClick={() => {
                         const select = document.getElementById('copy_target_select') as HTMLSelectElement;
                         if (select?.value) handleCopyTable(select.value as CollectionKey, true);
                       }}
                       className="bg-white hover:bg-gray-100 border text-black font-semibold px-3 py-1.5 rounded-sm text-xs cursor-pointer"
                     >
                       Copy structure only
                     </button>
                     <button
                       onClick={() => {
                         const select = document.getElementById('copy_target_select') as HTMLSelectElement;
                         if (select?.value) handleCopyTable(select.value as CollectionKey, false);
                       }}
                       className="bg-[#235a81] hover:bg-[#1a4462] text-white font-bold px-4 py-1.5 rounded-sm text-xs border border-[#14334b] cursor-pointer"
                     >
                       Copy Structure & Data
                     </button>
                   </div>
                 </div>

                 {/* Reset, Truncate, Erase box */}
                 <div className="border border-red-300 bg-red-50/35 p-4 rounded-sm flex flex-col gap-3 shadow-sm h-full">
                   <h4 className="font-bold text-[#b10000] text-sm flex items-center gap-1">
                     <Trash2 className="w-4 h-4"/> Dangerous Structural Operators
                   </h4>
                   <p className="text-[11px] text-gray-700 leading-normal">
                     Execute TRUNCATE or DROP functions on the active memory space. These will delete or reset changes immediately.
                   </p>
                   
                   <div className="flex flex-col gap-2.5 pt-2 border-t border-red-200 mt-auto">
                     <button
                       onClick={handleTruncateTable}
                       className="w-full bg-[#b10000] hover:bg-red-600 text-white font-bold py-2 rounded-sm text-xs shadow-sm cursor-pointer border border-[#890000]"
                     >
                       Empty/Truncate Table (TRUNCATE `{selectedKey}`)
                     </button>
                     
                     <button
                       onClick={handleFactoryResetCollection}
                       className="w-full bg-white hover:bg-gray-100 text-gray-700 font-bold py-1.5 rounded-sm text-xs border border-gray-300 shadow-sm cursor-pointer"
                     >
                       Restore Factory Defaults (RESET DUMMY VALUES)
                     </button>
                   </div>
                 </div>

               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

