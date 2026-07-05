'use client';

import { useState } from 'react';
import { ShieldAlert, Clock, Activity, Eye } from 'lucide-react';
import AlertAnalysisModal from '../ui/AlertAnalysisModal';

interface RecentAlertsTableProps {
    alerts: any[];
}

export default function RecentAlertsTable({ alerts }: RecentAlertsTableProps) {
    const [selectedAlert, setSelectedAlert] = useState<any>(null);

    const getSeverityStyle = (severity: string) => {
        const s = severity?.toLowerCase();
        if (s === 'high') return 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40';
        if (s === 'medium') return 'bg-orange-100 dark:bg-amber-950/60 text-orange-700 dark:text-amber-400 border border-orange-200 dark:border-amber-900/40';
        return 'bg-yellow-100 dark:bg-blue-950/60 text-yellow-700 dark:text-blue-400 border border-yellow-200 dark:border-blue-900/40';
    };

    return (
        <>
            <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm overflow-hidden md:px-9 px-3">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-[#1e293b]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert size={18} className="text-red-500 animate-pulse" />
                        <h3 className="font-bold text-base tracking-tight text-gray-900 dark:text-white">
                            Recent Security Alerts
                        </h3>
                    </div>
                </div>
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
                    <table className="w-full text-left border-collapse min-w-150">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-slate-800/80 text-gray-400 dark:text-slate-400 text-xs md:text-sm font-bold uppercase tracking-wider bg-gray-50/20 dark:bg-slate-900/10">
                                <th className="py-3 px-6"><span className="flex items-center gap-1.5"><Clock size={12}/> Time</span></th>
                                <th className="py-3 px-6"><span className="flex items-center gap-1.5"><Activity size={12}/> Attack Type</span></th>
                                <th className="py-3 px-6">Confidence</th>
                                <th className="py-3 px-6">Severity</th>
                                <th className="py-3 px-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-slate-800/40 text-xs sm:text-sm">
                            {!alerts || alerts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-gray-400 dark:text-slate-500 font-medium">
                                        No historical threat signatures logged inside this viewport context.
                                    </td>
                                </tr>
                            ) : (
                                alerts.map((alert, index) => (
                                    <tr 
                                        key={alert.flow_id || index} 
                                        className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/30 transition-colors group"
                                    >
                                        <td className="py-4 px-6 text-gray-500 dark:text-slate-400 whitespace-nowrap">
                                            {alert.timestamp}
                                        </td>
                                        
                                        <td className="py-4 px-6 font-bold text-red-600 dark:text-red-400 tracking-tight whitespace-nowrap">
                                            {alert.prediction || alert.attackType}
                                        </td>
                                        
                                        <td className="py-4 px-6 font-semibold text-gray-800 dark:text-slate-200 whitespace-nowrap">
                                            {alert.confidence}%
                                        </td>
                                        
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${getSeverityStyle(alert.severity)}`}>
                                                {alert.severity}
                                            </span>
                                        </td>
                                        
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <button 
                                                onClick={() => setSelectedAlert(alert)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm group-hover:border-indigo-500/20"
                                            >
                                                <Eye size={13} className="text-violet-500" />
                                                <span>Analyze</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AlertAnalysisModal 
                isOpen={!!selectedAlert} 
                onClose={() => setSelectedAlert(null)} 
                alertData={selectedAlert} 
            />
        </>
    );
}



//////////////////////////////////////////////////////////////

// 'use client';
// import { useState } from 'react';
// import AlertAnalysisModal from '../ui/AlertAnalysisModal';

// const recentAlerts = [
//   {
//     flow_id: "FLOW-1001",
//     timestamp: "2026-07-03 10:42:15",
//     prediction: "DoS",
//     confidence: 98.7,
//     severity: "High",
//     features: {
//       "Average Packet Size": 1248.6,
//       "Max Packet Length": 1514,
//       "Flow Duration": 84231,
//       "Destination Port": 80,
//     },
//   },
//   {
//     flow_id: "FLOW-1002",
//     timestamp: "2026-07-03 10:39:48",
//     prediction: "PortScan",
//     confidence: 94.3,
//     severity: "Medium",
//     features: {
//       "Average Packet Size": 82.4,
//       "Max Packet Length": 128,
//       "Flow Duration": 13572,
//       "Destination Port": 22,
//     },
//   },
//   {
//     flow_id: "FLOW-1003",
//     timestamp: "2026-07-03 10:35:10",
//     prediction: "Bot",
//     confidence: 91.8,
//     severity: "Medium",
//     features: {
//       "Average Packet Size": 512.9,
//       "Max Packet Length": 1024,
//       "Flow Duration": 56781,
//       "Destination Port": 443,
//     },
//   },
//   {
//     flow_id: "FLOW-1004",
//     timestamp: "2026-07-03 10:31:56",
//     prediction: "DoS",
//     confidence: 99.4,
//     severity: "High",
//     features: {
//       "Average Packet Size": 1398.3,
//       "Max Packet Length": 1514,
//       "Flow Duration": 102315,
//       "Destination Port": 8080,
//     },
//   },
//   {
//     flow_id: "FLOW-1005",
//     timestamp: "2026-07-03 10:27:41",
//     prediction: "PortScan",
//     confidence: 87.9,
//     severity: "Low",
//     features: {
//       "Average Packet Size": 71.6,
//       "Max Packet Length": 96,
//       "Flow Duration": 9210,
//       "Destination Port": 21,
//     },
//   },
//   {
//     flow_id: "FLOW-1006",
//     timestamp: "2026-07-03 10:23:18",
//     prediction: "Bot",
//     confidence: 96.5,
//     severity: "High",
//     features: {
//       "Average Packet Size": 689.7,
//       "Max Packet Length": 1460,
//       "Flow Duration": 74862,
//       "Destination Port": 53,
//     },
//   },
// ];

// export default function RecentAlertsTable({ alerts }: { alerts: any[] }) {
//     const [selectedAlert, setSelectedAlert] = useState<any>(null);

//     const getSeverityStyle = (severity: string) => {
//         if (severity === 'High') return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
//         if (severity === 'Medium') return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400';
//         return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400';
//     };

//     alerts = recentAlerts
//     return (
//         <>
//             <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6">
//                 <h2 className="text-sm font-semibold mb-6 text-gray-900 dark:text-white">Recent Alerts</h2>

//                 {/* Mobile Cards */}
//                 <div className="block md:hidden space-y-4">
//                     {alerts.length === 0 ? (
//                         <p className="text-center py-12 text-gray-500 dark:text-gray-400">No alerts detected yet</p>
//                     ) : (
//                         alerts.map((alert, index) => (
//                             <div key={index} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl">
//                                 <div className="flex justify-between items-start mb-3">
//                                     <div>
//                                         <p className="font-semibold text-gray-900 dark:text-white">
//                                             {alert.prediction || alert.attackType}
//                                         </p>
//                                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                             {alert.timestamp}
//                                         </p>
//                                     </div>
//                                     <span className={`px-4 py-1 rounded-full text-xs font-medium ${getSeverityStyle(alert.severity)}`}>
//                                         {alert.severity}
//                                     </span>
//                                 </div>

//                                 <p className="text-sm mb-4">
//                                     Confidence: <span className="font-medium">{alert.confidence}%</span>
//                                 </p>

//                                 <button 
//                                     onClick={()=>setSelectedAlert(alert)}
//                                     className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition"
//                                 >
//                                     View Analysis
//                                 </button>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Desktop Table */}
//                 <div className="hidden md:block overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 md:text-sm text-xs">
//                                 <th className="py-4 text-left">Time</th>
//                                 <th className="py-4 text-left">Attack Type</th>
//                                 <th className="py-4 text-left">Confidence</th>
//                                 <th className="py-4 text-left">Severity</th>
//                                 <th className="py-4 text-left">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                             {alerts.map((alert, index) => (
//                                 <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
//                                     <td className="py-5 text-gray-600 dark:text-gray-300">{alert.timestamp}</td>
//                                     <td className="py-5 font-medium">{alert.prediction || alert.attackType}</td>
//                                     <td className="py-5">{alert.confidence}%</td>
//                                     <td className="py-5">
//                                         <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${getSeverityStyle(alert.severity)}`}>
//                                             {alert.severity}
//                                         </span>
//                                     </td>
//                                     <td className="py-5">
//                                         <button 
//                                             onClick={()=>setSelectedAlert(alert)}
//                                             className="text-violet-600 cursor-pointer dark:text-violet-400 hover:underline font-medium"
//                                         >
//                                             View Analysis
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             <AlertAnalysisModal 
//                 isOpen={!!selectedAlert} 
//                 onClose={() => setSelectedAlert(null)} 
//                 alertData={selectedAlert} 
//             />
//         </>
//     );
// }