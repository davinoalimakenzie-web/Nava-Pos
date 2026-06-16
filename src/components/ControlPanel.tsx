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
  | 'attendances' 
  | 'appUsers' 
  | 'piutang' 
  | 'order' 
  | 'hutangSupplier';

type Tab = 'Browse' | 'Structure' | 'SQL' | 'Search' | 'Insert' | 'Export' | 'Import' | 'Operations';

export const ControlPanel: React.FC = () => {
  const context = useAppContext();
  
  const collections: { key: CollectionKey; name: string; icon: any; initial: any[] }[] = [
    { key: 'inventory', name: 'Stock Inventory', icon: TableIcon, initial: initialInventory },
    { key: 'transactions', name: 'Transaksi Penjualan', icon: TableIcon, initial: initialTransactions },
    { key: 'customers', name: 'Daftar Pelanggan', icon: TableIcon, initial: initialCustomers },
    { key: 'suppliers', name: 'Daftar Supplier', icon: TableIcon, initial: initialSuppliers },
    { key: 'expenses', name: 'Pengeluaran Toko', icon: TableIcon, initial: initialExpenses },
    { key: 'attendances', name: 'Daftar Absensi', icon: TableIcon, initial: initialAttendances },
    { key: 'appUsers', name: 'Akun Pengguna/Kasir', icon: TableIcon, initial: initialUsers },
    { key: 'piutang', name: 'Data Piutang', icon: TableIcon, initial: initialPiutang },
    { key: 'order', name: 'Data Pre-Order (PO)', icon: TableIcon, initial: initialOrderData },
    { key: 'hutangSupplier', name: 'Hutang ke Supplier', icon: TableIcon, initial: [] }
  ];

  const [selectedKey, setSelectedKey] = useState<CollectionKey>('inventory');
  const [activeTab, setActiveTab] = useState<Tab>('Browse');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for the selected grid
  const [gridData, setGridData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  
  // Edit Modal State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load data into local grid on selection changes
  useEffect(() => {
    const data = getContextData(selectedKey);
    setGridData(Array.isArray(data) ? [...data] : []);
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
      case 'attendances': return context.attendances;
      case 'appUsers': return context.appUsers;
      case 'piutang': return context.piutangData;
      case 'order': return context.orderData;
      case 'hutangSupplier': return context.hutangSupplier;
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
      case 'attendances': context.setAttendances(sortedData); break;
      case 'appUsers': context.setAppUsers(sortedData); break;
      case 'piutang': context.setPiutangData(sortedData); break;
      case 'order': context.setOrderData(sortedData); break;
      case 'hutangSupplier': context.setHutangSupplier(sortedData); break;
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
      notify(`MySQL returned an empty result set (i.e. zero rows). Data restored.`, 'success');
    }
  };

  return (
    <div className="flex-1 bg-[#f3f3f3] flex h-full font-sans text-[#333333] relative">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[240px] border-r border-[#ccc] bg-[#f3f3f3] flex flex-col shrink-0">
        <div className="p-3 text-center border-b border-[#ccc] bg-[#e5e5e5]">
          <div className="font-bold text-lg text-[#ef6c00] tracking-tight">Database<span className="text-[#235a81]">Nava</span></div>
        </div>
        <div className="p-2 border-b border-[#ccc] bg-white flex justify-center gap-4">
          <Home className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" />
          <LogOut className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" />
          <Database className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" />
          <Server className="w-4 h-4 cursor-pointer text-[#444] hover:text-[#235a81]" />
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto text-[13px]">
          <div className="mb-2 text-[#444] flex items-center gap-1 font-semibold">
            <span className="text-gray-500 font-bold">−</span> 
            <Database className="w-4 h-4 text-[#ef6c00]" />
            Nava_POS
          </div>
          
          <div className="pl-4 flex flex-col gap-1.5 ml-1 border-l hover:border-gray-400 border-gray-300">
            {collections.map(col => (
              <div 
                key={col.key} 
                onClick={() => { setSelectedKey(col.key); setActiveTab('Browse'); setSearchQuery(''); setEditingIndex(null); }}
                className={`flex items-center gap-2 px-1 cursor-pointer hover:bg-[#e5e5e5] rounded group ${selectedKey === col.key ? 'bg-[#d3dce3] text-[#235a81] font-semibold' : 'text-[#235a81]'}`}
              >
                <TableIcon className={`w-3.5 h-3.5 ${selectedKey === col.key ? 'text-[#235a81]' : 'text-gray-400'} group-hover:text-[#235a81]`} />
                <span className="truncate">{col.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT DIV */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden text-[13px]">
        {/* Top Breadcrumb Header */}
        <div className="bg-[#f3f3f3] border-b border-[#ccc] px-4 py-2 flex items-center text-[#444] gap-1">
          <Server className="w-3.5 h-3.5 text-[#235a81]" />
          Server: <span className="text-[#235a81]">127.0.0.1</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
          <Database className="w-3.5 h-3.5 text-[#ef6c00]" />
          Database: <span className="text-[#235a81]">Nava_POS</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
          <TableIcon className="w-3.5 h-3.5 text-gray-400" />
          Table: <span className="text-[#235a81]">{collections.find(c => c.key === selectedKey)?.name}</span>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#f3f3f3] px-2 pt-2 border-b border-[#ccc] flex gap-1 font-semibold text-[#444]">
          {(['Browse', 'Structure', 'SQL', 'Search', 'Insert', 'Export', 'Import', 'Operations'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'SQL') {
                  setJsonText(JSON.stringify(gridData, null, 2));
                  setShowJsonModal(true);
                  return;
                }
                if (tab === 'Insert') {
                  handleAddNewRow();
                  return;
                }
                if (tab === 'Export') {
                  handleExportJSON();
                  return;
                }
                if (tab === 'Operations') {
                  handleFactoryResetCollection();
                  return;
                }
                setActiveTab(tab);
              }}
              className={`px-4 py-1.5 rounded-t-lg border border-b-0 cursor-pointer flex items-center gap-1.5 transition-colors
                ${activeTab === tab && tab !== 'SQL' && tab !== 'Export' && tab !== 'Operations' && !showJsonModal
                  ? 'bg-white border-[#ccc] text-black shadow-[0_2px_0_0_white]' 
                  : 'bg-[#e5e5e5] border-[#ccc] hover:bg-white text-[#235a81]'}`}
              style={activeTab === tab && tab !== 'SQL' && tab !== 'Export' && tab !== 'Operations' && !showJsonModal ? { zIndex: 10, position: 'relative', marginBottom: '-1px' } : {}}
            >
              {tab === 'Browse' && <TableIcon className="w-3.5 h-3.5" />}
              {tab === 'SQL' && <FileCode className="w-3.5 h-3.5" />}
              {tab === 'Search' && <Search className="w-3.5 h-3.5" />}
              {tab === 'Insert' && <PlusCircle className="w-3.5 h-3.5" />}
              {tab === 'Export' && <Download className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="m-4 p-2 bg-[#d4edda] text-[#155724] border border-[#c3e6cb] rounded flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold">{notification.message}</span>
          </div>
        )}

        {/* Tab Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-white relative">
          
          {/* ================ BROWSE TAB ================ */}
          {activeTab === 'Browse' && !isAddingNew && (
            <>
              {/* Extra Bar with Search/Query info */}
              <div className="mb-4 bg-[#e5e5e5] p-2 border border-[#ccc] rounded text-[#444] font-mono whitespace-pre flex flex-wrap gap-2 items-center text-xs">
                <span className="text-[#888]">SELECT * FROM</span> <span className="text-black">`{selectedKey}`</span>
                {searchQuery && (
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

              <div className="mb-2">
                <span className="font-bold">Showing rows 0 - {filteredRows.length > 0 ? filteredRows.length - 1 : 0} (Total {gridData.length}, Query took 0.0001 sec)</span>
              </div>

              {filteredRows.length === 0 ? (
                <div className="p-4 bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb] rounded text-center">
                  MySQL returned an empty result set (i.e. zero rows).
                </div>
              ) : (
                <div className="border border-[#ccc] overflow-x-auto shadow-sm">
                  <table className="w-full text-left border-collapse whitespace-nowrap text-[#000]">
                    <thead className="bg-[#e5e5e5] border-b border-[#ccc] font-bold text-[#444]">
                      <tr>
                        <th className="px-2 py-1.5 border-r border-[#ccc] text-center w-8">
                          <input type="checkbox" />
                        </th>
                        <th className="px-3 py-1.5 border-r border-[#ccc]">Options</th>
                        {columns.map(col => (
                          <th key={col} className="px-3 py-1.5 border-r border-[#ccc] hover:bg-[#d3dce3] cursor-pointer text-[#235a81]">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((row, idx) => (
                        <tr key={idx} className={`border-b border-[#eee] hover:bg-[#d3dce3] ${idx % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f3f3f3]'}`}>
                          <td className="px-2 py-1.5 border-r border-[#ccc] text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-[#ccc] bg-[#f9f9f9]">
                            <div className="flex items-center gap-3 justify-center text-[#235a81]">
                              <button onClick={() => handleEditRow(idx)} className="flex items-center gap-1 hover:text-[#ef6c00]"><Edit2 className="w-3 h-3"/> Edit</button>
                              <button onClick={() => handleCopyRow(idx)} className="flex items-center gap-1 hover:text-[#ef6c00]"><Copy className="w-3 h-3"/> Copy</button>
                              <button onClick={() => handleDeleteRow(idx)} className="flex items-center gap-1 text-[#b10000] hover:text-[#ff0000]"><Trash2 className="w-3 h-3"/> Delete</button>
                            </div>
                          </td>
                          {columns.map(col => {
                            const val = row[col];
                            const isNull = val === null || val === undefined;
                            return (
                              <td key={col} className={`px-3 py-1.5 border-r border-[#ccc] max-w-xs truncate ${isNull ? 'italic text-gray-400' : ''}`}>
                                {renderCellValue(val)}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {filteredRows.length > 0 && (
                <div className="mt-2 flex gap-3 items-center text-[#444]">
                  <span className="flex items-center gap-1"><img src={`data:image/svg+xml;utf8,<svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2L5 18M5 18L1 14M5 18L9 14" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`} alt="With selected" className="inline w-3 h-3 rotate-[180deg] text-[#235a81]" /> With selected:</span>
                  <button className="flex items-center gap-1 hover:text-[#235a81]"><Edit2 className="w-3.5 h-3.5"/> Edit</button>
                  <button className="flex items-center gap-1 hover:text-[#235a81]"><Copy className="w-3.5 h-3.5"/> Copy</button>
                  <button className="flex items-center gap-1 text-[#b10000]"><Trash2 className="w-3.5 h-3.5"/> Delete</button>
                  <button className="flex items-center gap-1 hover:text-[#235a81]"><Download className="w-3.5 h-3.5"/> Export</button>
                </div>
              )}
            </>
          )}

          {/* ================ INSERT / EDIT TAB ================ */}
          {(activeTab === 'Insert' || isAddingNew || editingRow) && !showJsonModal && (
             <div>
               <div className="font-bold text-lg mb-4 text-[#444]">
                  {isAddingNew ? `Insert into \`${selectedKey}\`` : `Edit row in \`${selectedKey}\``}
               </div>

               <div className="border border-[#ccc] bg-[#f9f9f9] shadow-sm max-w-4xl">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-[#e5e5e5] border-b border-[#ccc] text-[#444] font-bold">
                     <tr>
                       <th className="px-4 py-2 border-r border-[#ccc] w-48">Column</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-24">Type</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-24">Function</th>
                       <th className="px-4 py-2 w-full">Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     {Object.keys(editingRow || {}).map((key, idx) => {
                       const val = editingRow[key];
                       const isObj = val && typeof val === 'object';
                       const strVal = isObj ? JSON.stringify(val) : String(val === null || val === undefined ? '' : val);

                       return (
                         <tr key={key} className={`border-b border-[#eee] hover:bg-[#d3dce3] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f3f3f3]'}`}>
                           <td className="px-4 py-2 border-r border-[#ccc] font-bold text-[#444]">{key}</td>
                           <td className="px-4 py-2 border-r border-[#ccc] text-gray-600 font-mono text-xs text-center">{isObj ? 'json' : typeof val === 'number' ? 'int' : typeof val === 'boolean' ? 'tinyint' : 'varchar'}</td>
                           <td className="px-4 py-2 border-r border-[#ccc]">
                             <select className="border border-[#ccc] w-full p-1 bg-white text-xs">
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
                                 className="border border-[#ccc] p-2 w-full h-20 outline-none focus:border-[#235a81] font-mono text-xs"
                               />
                             ) : (
                               <input 
                                 type="text" 
                                 value={strVal}
                                 onChange={(e) => handleFieldChange(key, e.target.value)}
                                 className="border border-[#ccc] p-1.5 w-full outline-none focus:border-[#235a81] font-mono"
                               />
                             )}
                           </td>
                         </tr>
                       )
                     })}
                   </tbody>
                 </table>
                 <div className="p-3 bg-[#e5e5e5] border-t border-[#ccc] flex justify-end gap-3">
                   <button 
                     onClick={() => { setEditingIndex(null); setEditingRow(null); setIsAddingNew(false); setActiveTab('Browse'); }}
                     className="px-4 py-1.5 bg-[#f3f3f3] hover:bg-white border text-[#444] border-[#ccc] rounded shadow-sm font-semibold cursor-pointer"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleSaveRow}
                     className="px-4 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded shadow-sm font-semibold cursor-pointer"
                   >
                     Go
                   </button>
                 </div>
               </div>
             </div>
          )}

          {/* ================ JSON / SQL TAB MODAL MOCK ================ */}
          {showJsonModal && (
            <div>
               <div className="font-bold text-lg mb-4 text-[#444]">
                  Run SQL query/parameter JSON on database `Nava_POS`:
               </div>
               <div className="border border-[#ccc] bg-[#fdfdfd] shadow-sm max-w-4xl p-0">
                 <div className="p-1 bg-[#e5e5e5] border-b border-[#ccc]"><strong className="pl-2 text-[#444] text-xs font-mono">SQL Query Box </strong></div>
                 <div className="p-2">
                  <textarea 
                    value={jsonText}
                    onChange={e => setJsonText(e.target.value)}
                    className="w-full bg-[#f3f3f3] border-2 border-[#ccc] p-3 h-[300px] font-mono text-sm outline-none focus:border-[#235a81]"
                    spellCheck={false}
                  />
                 </div>
                 <div className="p-3 bg-[#e5e5e5] border-t border-[#ccc] flex justify-end gap-3">
                   <button 
                     onClick={() => { setShowJsonModal(false); setActiveTab('Browse'); }}
                     className="px-4 py-1.5 bg-[#f3f3f3] hover:bg-white border border-[#ccc] rounded shadow-sm text-[#444] font-semibold cursor-pointer"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleSaveJsonText}
                     className="px-4 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded shadow-sm font-bold cursor-pointer"
                   >
                     Go
                   </button>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'Structure' && !showJsonModal && (
             <div className="text-[#444]">
               <div className="font-bold text-lg mb-4">Table structure: {selectedKey}</div>
               <table className="w-full text-left border-collapse border border-[#ccc] bg-white">
                 <thead className="bg-[#e5e5e5] border-b border-[#ccc]">
                   <tr>
                     <th className="px-3 py-2 border-r border-[#ccc]">Name</th>
                     <th className="px-3 py-2 border-r border-[#ccc]">Type</th>
                     <th className="px-3 py-2 border-r border-[#ccc]">Null</th>
                     <th className="px-3 py-2">Default</th>
                   </tr>
                 </thead>
                 <tbody>
                   {columns.map((col, idx) => (
                     <tr key={col} className={`border-b border-[#eee] ${idx % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f3f3f3]'}`}>
                       <td className="px-3 py-1.5 text-[#235a81] font-bold border-r border-[#ccc]">{col}</td>
                       <td className="px-3 py-1.5 text-gray-600 font-mono border-r border-[#ccc]">varchar(255)</td>
                       <td className="px-3 py-1.5 border-r border-[#ccc]">Yes</td>
                       <td className="px-3 py-1.5 italic text-gray-500">NULL</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}

          {activeTab === 'Search' && !showJsonModal && (
             <div className="text-[#444]">
               <div className="font-bold text-lg mb-4">Search in table `{selectedKey}`</div>
               <div className="border border-[#ccc] bg-[#f9f9f9] shadow-sm max-w-4xl">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-[#e5e5e5] border-b border-[#ccc]">
                     <tr>
                       <th className="px-4 py-2 border-r border-[#ccc] w-48">Column</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-24">Type</th>
                       <th className="px-4 py-2 border-r border-[#ccc] w-32">Operator</th>
                       <th className="px-4 py-2 w-full">Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     {columns.map((col, idx) => (
                       <tr key={col} className={`border-b border-[#eee] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f3f3f3]'}`}>
                         <td className="px-4 py-2 border-r border-[#ccc] font-bold">{col}</td>
                         <td className="px-4 py-2 border-r border-[#ccc] text-center text-xs">varchar</td>
                         <td className="px-4 py-2 border-r border-[#ccc]">
                           <select className="border border-[#ccc] w-full p-1 bg-white text-xs">
                             <option>LIKE %...%</option>
                             <option>=</option>
                             <option>!=</option>
                           </select>
                         </td>
                         <td className="px-4 py-2">
                           <input type="text" className="border border-[#ccc] p-1.5 w-full outline-none focus:border-[#235a81] font-mono" />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 <div className="p-3 bg-[#e5e5e5] border-t border-[#ccc] flex justify-end">
                   <button className="px-4 py-1.5 bg-[#ef6c00] hover:bg-[#ff8400] text-white border border-[#c35800] rounded shadow-sm font-semibold cursor-pointer">
                     Go
                   </button>
                 </div>
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};
