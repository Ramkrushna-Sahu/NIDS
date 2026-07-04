'use client';

import { useState } from 'react';
import { ShieldAlert, Clock, Activity, Eye } from 'lucide-react';
import AlertAnalysisModal from '../ui/AlertAnalysisModal';

interface RecentAlertsTableProps {
    alerts: any[];
}
const recentAlerts = [
  {
    flow_id: "FLOW-1001",
    timestamp: "2026-07-03 10:42:15",
    prediction: "DoS",
    confidence: 98.7,
    severity: "High",
    features: {
      "Average Packet Size": 1248.6,
      "Max Packet Length": 1514,
      "Flow Duration": 84231,
      "Destination Port": 80,
    },
  },
  {
    flow_id: "FLOW-1002",
    timestamp: "2026-07-03 10:39:48",
    prediction: "PortScan",
    confidence: 94.3,
    severity: "Medium",
    features: {
      "Average Packet Size": 82.4,
      "Max Packet Length": 128,
      "Flow Duration": 13572,
      "Destination Port": 22,
    },
  },
  {
    flow_id: "FLOW-1003",
    timestamp: "2026-07-03 10:35:10",
    prediction: "Bot",
    confidence: 91.8,
    severity: "Medium",
    features: {
      "Average Packet Size": 512.9,
      "Max Packet Length": 1024,
      "Flow Duration": 56781,
      "Destination Port": 443,
    },
  },
  {
    flow_id: "FLOW-1004",
    timestamp: "2026-07-03 10:31:56",
    prediction: "DoS",
    confidence: 99.4,
    severity: "High",
    features: {
      "Average Packet Size": 1398.3,
      "Max Packet Length": 1514,
      "Flow Duration": 102315,
      "Destination Port": 8080,
    },
  },
  {
    flow_id: "FLOW-1005",
    timestamp: "2026-07-03 10:27:41",
    prediction: "PortScan",
    confidence: 87.9,
    severity: "Low",
    features: {
      "Average Packet Size": 71.6,
      "Max Packet Length": 96,
      "Flow Duration": 9210,
      "Destination Port": 21,
    },
  },
  {
    flow_id: "FLOW-1006",
    timestamp: "2026-07-03 10:23:18",
    prediction: "Bot",
    confidence: 96.5,
    severity: "High",
    features: {
      "Average Packet Size": 689.7,
      "Max Packet Length": 1460,
      "Flow Duration": 74862,
      "Destination Port": 53,
    },
  },
];
export default function RecentAlertsTable({ alerts }: RecentAlertsTableProps) {
    const [selectedAlert, setSelectedAlert] = useState<any>(null);

    const getCleanSeverityColor = (severity: string) => {
        const s = severity?.toLowerCase();
        if (s === 'high') return 'text-rose-600 dark:text-rose-400 font-bold';
        if (s === 'medium') return 'text-amber-600 dark:text-amber-400 font-bold';
        return 'text-green-600 dark:text-green-400 font-bold';
    };

    const getSeverityStyle = (severity: string) => {
        const s = severity?.toLowerCase();
        if (s === 'high') return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
        if (s === 'medium') return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400';
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400';
    };
    // alerts = recentAlerts
    return (
        <>
            <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden md:px-9 px-3">
                <div className="px-5 py-4 border-b border-slate-50 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <h3 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-200 uppercase">
                            Recent Security Alerts
                        </h3>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        Total: {alerts?.length || 0}
                    </span>
                </div>

                <div className="block md:hidden p-4 space-y-3">
                    {!alerts || alerts.length === 0 ? (
                        <p className="text-center py-12 text-slate-400 dark:text-slate-500 italic text-sm">No alerts detected yet</p>
                    ) : (
                        alerts.map((alert, index) => (
                            <div 
                                key={alert.flow_id || index} 
                                className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 p-4 rounded-xl flex flex-col gap-3"
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">
                                            {alert.prediction || alert.attackType}
                                        </p>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {alert.timestamp}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getSeverityStyle(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-2 text-xs">
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Confidence: <span className=" font-bold text-slate-700 dark:text-slate-300">{alert.confidence}%</span>
                                    </p>
                                    <button 
                                        onClick={() => setSelectedAlert(alert)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>View Analysis</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-500 md:text-sm text-xs font-bold uppercase tracking-wider bg-slate-50/10 dark:bg-slate-900/5">
                                <th className="py-3 px-5">Time</th>
                                <th className="py-3 px-4">Attack Type</th>
                                <th className="py-3 px-4">Confidence</th>
                                <th className="py-3 px-4">Severity</th>
                                <th className="py-3 px-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
                            {!alerts || alerts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-slate-600 dark:text-slate-500 italic">
                                        No threats detected inside current validation context.
                                    </td>
                                </tr>
                            ) : (
                                alerts.map((alert, index) => (
                                    <tr 
                                        key={alert.flow_id || index} 
                                        className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors group"
                                    >
                                        <td className="py-3 px-5 text-md text-gray-600 dark:text-slate-400 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 opacity-40" />
                                                <span>{alert.timestamp}</span>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                                            {alert.prediction || alert.attackType}
                                        </td>
                                        
                                        <td className="py-3 px-4  text-slate-600 dark:text-slate-400">
                                            {alert.confidence}%
                                        </td>
                                        
                                        <td className="py-3 px-4">
                                            <span className={getCleanSeverityColor(alert.severity)}>
                                                {alert.severity}
                                            </span>
                                        </td>
                                        
                                        <td className="py-3 px-5 text-right whitespace-nowrap">
                                            <button 
                                                onClick={() => setSelectedAlert(alert)}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors cursor-pointer"
                                            >
                                                <Activity className="w-3.5 h-3.5" />
                                                <span>View Analysis</span>
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