'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AlertsTable from './AlertsTable';
import AlertAnalysisModal from '../ui/AlertAnalysisModal';
import { Download, ChevronLeft, ChevronRight, History } from 'lucide-react';

export default function AlertsHistoryClient() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAlert, setSelectedAlert] = useState<any>(null);
    const [filters, setFilters] = useState({ severity: '', attackType: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchAlerts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                ...(filters.severity && { severity: filters.severity }),
                ...(filters.attackType && { attackType: filters.attackType })
            });

            const res = await axios.get(`/api/services/fetch-alerts?${params}`);
            if (res.data.success) {
                // UNIVERSAL NORMALIZATION LAYER
                const normalizedAlerts = res.data.alerts.map((alert: any) => {
                    const rawTime = alert.timestamp?.['$date'] || alert.timestamp || alert.createdAt?.['$date'] || alert.createdAt || '';
                    const parsedTimestamp = rawTime ? new Date(rawTime).toLocaleString() : 'Unknown';

                    // 1. Clear out the internal MongoDB object ID from features
                    const cleanFeatures = { ...alert.features };
                    delete cleanFeatures._id;

                    // 2. Fallback check for the root data object 
                    const rawFlow = alert.flowInfo || alert.flow_info || {};

                    // Extract values safely, defaulting to an empty string if missing or if IPs are empty
                    const sIp = rawFlow.sourceIp ?? rawFlow["Source IP"] ?? rawFlow.source_ip ?? "";
                    const dIp = rawFlow.destinationIp ?? rawFlow["Destination IP"] ?? rawFlow.destination_ip ?? "";
                    const dPort = rawFlow.destinationPort ?? rawFlow["Destination Port"] ?? rawFlow.destination_port ?? "";
                    const proto = rawFlow.protocol ?? rawFlow["Protocol"] ?? rawFlow.protocol ?? "";

                    // 3. Multi-Mapping Strategy: Provide both camelCase, snake_case, and Capitalized keys
                    // This guarantees that whatever key your rigid modal loop is checking for, it won't be empty!
                    const cleanFlowInfo = {
                        // Human-Readable Labels
                        "Source IP": sIp || "N/A",
                        "Destination IP": dIp || "N/A",
                        "Destination Port": dPort !== undefined && dPort !== null ? String(dPort) : "N/A",
                        "Protocol": proto || "N/A",

                        // camelCase Fallbacks (Database names)
                        sourceIp: sIp || "N/A",
                        destinationIp: dIp || "N/A",
                        destinationPort: dPort !== undefined && dPort !== null ? dPort : "N/A",
                        protocol: proto || "N/A",

                        // snake_case Fallbacks
                        source_ip: sIp || "N/A",
                        destination_ip: dIp || "N/A",
                        destination_port: dPort !== undefined && dPort !== null ? dPort : "N/A"
                    };

                    return {
                        ...alert,
                        flow_id: alert.flowId || alert.flow_id || 'N/A',
                        timestamp: parsedTimestamp,
                        features: cleanFeatures,
                        flow_info: cleanFlowInfo 
                    };
                });

                setAlerts(normalizedAlerts);
                setTotalPages(res.data.pagination.pages);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, [page, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    // CSV GENERATION ENGINE (Using exact naming configurations requested)
    const handleExportCSV = () => {
        if (!alerts || alerts.length === 0) return;

        const targetFeatures = [
            "Average Packet Size",
            "Max Packet Length",
            "Flow Duration",
            "Destination Port"
        ];

        const flowInfoLabels = [
            "Source IP",
            "Destination IP",
            "Destination Port",
            "Protocol"
        ];

        // Headers generated with the exact property syntax (No prefixes)
        const csvHeaders = [
            'Timestamp',
            'Flow ID',
            'Attack Type',
            'Confidence (%)',
            'Severity',
            ...flowInfoLabels,
            ...targetFeatures
        ];

        const csvRows = alerts.map(item => {
            const rowData = [
                item.timestamp || '',
                item.flow_id || '',
                item.attackType || item.prediction || '',
                item.confidence ?? '0',
                item.severity || ''
            ];

            // Safely fetch normalized network variables
            flowInfoLabels.forEach(label => {
                const val = item.flow_info?.[label] ?? '';
                rowData.push(val);
            });

            // Safely fetch ML features
            targetFeatures.forEach(featureName => {
                const val = item.features?.[featureName] ?? '';
                rowData.push(val);
            });

            return rowData.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
        });

        const csvContent = "data:text/csv;charset=utf-8," + [csvHeaders.join(','), ...csvRows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `alerts_history_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#020617] p-4 md:p-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header Action Control Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
                            <History size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Alerts History</h1>
                            <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">Filter, inspect, and export archived network anomalies.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        {/* <div className="relative flex-1 md:flex-initial min-w-35">
                            <select 
                                onChange={(e) => handleFilterChange('severity', e.target.value)}
                                className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-[#1e293b]/40 dark:hover:bg-[#1e293b]/70 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer focus:outline-none focus:border-indigo-500/50 appearance-none"
                            >
                                <option value="">All Severities</option>
                                <option value="High">🔴 High</option>
                                <option value="Medium">🟠 Medium</option>
                                <option value="Low">🟡 Low</option>
                            </select>
                        </div> */}

                        <div className="relative flex-1 md:flex-initial min-w-40 group">
                            <select 
                                onChange={(e) => handleFilterChange('severity', e.target.value)}
                                className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-[#1e293b]/40 dark:hover:bg-[#1e293b]/70 border border-gray-200 dark:border-slate-800/80 text-gray-700 dark:text-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 appearance-none shadow-sm backdrop-blur-sm"
                            >
                                <option value="" className="bg-white dark:bg-[#0f172a] text-gray-700 dark:text-slate-300">⚡ All Severities</option>
                                <option value="High" className="bg-white dark:bg-[#0f172a] text-red-600 dark:text-red-400 font-bold">🔴 High</option>
                                <option value="Medium" className="bg-white dark:bg-[#0f172a] text-orange-600 dark:text-orange-400 font-bold">🟠 Medium</option>
                                <option value="Low" className="bg-white dark:bg-[#0f172a] text-yellow-600 dark:text-yellow-400 font-bold">🟡 Low</option>
                            </select>
                            
                            {/* Custom Dropdown Chevron Indicator */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                <svg 
                                    className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-y-px" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <button 
                            onClick={handleExportCSV}
                            disabled={alerts.length === 0 || loading}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-slate-800 dark:hover:bg-violet-700 border border-transparent text-white dark:text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Download size={14} /> 
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>

                {/* Table Layout Structure */}
                <div className="shadow-sm border border-gray-100 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-[#0f172a]">
                    <AlertsTable 
                        alerts={alerts} 
                        loading={loading} 
                        onView={setSelectedAlert} 
                    />
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-slate-800/80 rounded-2xl px-6 py-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400 font-mono">
                        Page {page} <span className="opacity-40">/</span> {totalPages}
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700/60 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={14} />
                            <span>Prev</span>
                        </button>
                        
                        <button 
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700/60 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span>Next</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <AlertAnalysisModal 
                isOpen={!!selectedAlert} 
                onClose={() => setSelectedAlert(null)} 
                alertData={selectedAlert} 
            />
        </div>
    );
}




// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import AlertsTable from './AlertsTable';
// import AlertAnalysisModal from '../ui/AlertAnalysisModal';
// import { Filter, Download } from 'lucide-react';

// export default function AlertsHistoryClient() {
//     const [alerts, setAlerts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedAlert, setSelectedAlert] = useState<any>(null);
//     const [filters, setFilters] = useState({ severity: '', attackType: '' });
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const fetchAlerts = async () => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams({
//                 page: page.toString(),
//                 limit: '20',
//                 ...(filters.severity && { severity: filters.severity }),
//                 ...(filters.attackType && { attackType: filters.attackType })
//             });

//             const res = await axios.get(`/api/services/fetch-alerts?${params}`);
//             if (res.data.success) {
//                 setAlerts(res.data.alerts);
//                 setTotalPages(res.data.pagination.pages);
//             }
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchAlerts();
//     }, [page, filters]);

//     const handleFilterChange = (key: string, value: string) => {
//         setFilters(prev => ({ ...prev, [key]: value }));
//         setPage(1);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
//             <div className="max-w-7xl mx-auto space-y-8">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Alerts History</h1>
//                     <div className="flex gap-3">
//                         <select 
//                             onChange={(e) => handleFilterChange('severity', e.target.value)}
//                             className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm"
//                         >
//                             <option value="">All Severities</option>
//                             <option value="High">High</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Low">Low</option>
//                         </select>

//                         <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//                             <Download size={16} /> Export CSV
//                         </button>
//                     </div>
//                 </div>

//                 <AlertsTable 
//                     alerts={alerts} 
//                     loading={loading} 
//                     onView={setSelectedAlert} 
//                 />

//                 {/* Pagination */}
//                 <div className="flex justify-center gap-2 mt-8">
//                     <button 
//                         onClick={() => setPage(p => Math.max(1, p - 1))}
//                         disabled={page === 1}
//                         className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl disabled:opacity-50"
//                     >
//                         Previous
//                     </button>
//                     <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
//                         Page {page} of {totalPages}
//                     </span>
//                     <button 
//                         onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                         disabled={page === totalPages}
//                         className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//             <AlertAnalysisModal 
//                 isOpen={!!selectedAlert} 
//                 onClose={() => setSelectedAlert(null)} 
//                 alertData={selectedAlert} 
//             />
//         </div>
//     );
// }