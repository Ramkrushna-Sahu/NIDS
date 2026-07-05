'use client';
import { Clock, Activity, Eye, Loader2 } from 'lucide-react';

export default function AlertsTable({ 
    alerts, 
    loading, 
    onView 
}: { 
    alerts: any[], 
    loading: boolean, 
    onView: (alert: any) => void 
}) {
    const getSeverityStyle = (severity: string) => {
        if (severity === 'High') return 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40';
        if (severity === 'Medium') return 'bg-orange-100 dark:bg-amber-950/60 text-orange-700 dark:text-amber-400 border border-orange-200 dark:border-amber-900/40';
        return 'bg-yellow-100 dark:bg-blue-950/60 text-yellow-700 dark:text-blue-400 border border-yellow-200 dark:border-blue-900/40';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-slate-500 gap-3">
                <Loader2 size={24} className="animate-spin text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-widest font-mono">Querying Archive Data...</span>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 md:px-9 px-3">
            <table className="w-full text-left border-collapse min-w-150">
                <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-800/80 text-gray-400 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-gray-50/20 dark:bg-slate-900/10 md:text-sm text-xs">
                        <th className="py-3 px-6"><span className="flex items-center gap-1.5"><Clock size={12}/> Time</span></th>
                        <th className="py-3 px-6"><span className="flex items-center gap-1.5"><Activity size={12}/> Attack Type</span></th>
                        <th className="py-3 px-6">Confidence</th>
                        <th className="py-3 px-6">Severity</th>
                        <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800/40 text-xs sm:text-sm">
                    {alerts.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-16 text-gray-400 dark:text-slate-500 font-medium">
                                No historical threat signatures logged inside this viewport context.
                            </td>
                        </tr>
                    ) : (
                        alerts.map((alert, index) => (
                            <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/30 transition-colors group">
                                <td className="py-4 px-6 font-mono text-gray-500 dark:text-slate-400 whitespace-nowrap">
                                    {new Date(alert.timestamp).toLocaleString()}
                                </td>
                                <td className="py-4 px-6 font-bold text-red-600 dark:text-red-400 tracking-tight whitespace-nowrap">
                                    {alert.attackType || alert.prediction}
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
                                        onClick={() => onView(alert)}
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
    );
}




// export default function AlertsTable({ alerts, loading, onView }: { 
//     alerts: any[], 
//     loading: boolean, 
//     onView: (alert: any) => void 
// }) {
//     const getSeverityStyle = (severity: string) => {
//         if (severity === 'High') return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
//         if (severity === 'Medium') return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400';
//         return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400';
//     };

//     if (loading) return <div className="text-center py-20">Loading alerts...</div>;

//     return (
//         <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
//             <div className="overflow-x-auto">
//                 <table className="w-full">
//                     <thead>
//                         <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm">
//                             <th className="py-4 text-left pl-6">Timestamp</th>
//                             <th className="py-4 text-left">Attack Type</th>
//                             <th className="py-4 text-left">Confidence</th>
//                             <th className="py-4 text-left">Severity</th>
//                             <th className="py-4 text-left">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                         {alerts.length === 0 ? (
//                             <tr>
//                                 <td colSpan={5} className="text-center py-20 text-gray-500 dark:text-gray-400">
//                                     No alerts found
//                                 </td>
//                             </tr>
//                         ) : (
//                             alerts.map((alert, index) => (
//                                 <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
//                                     <td className="py-5 pl-6 text-gray-600 dark:text-gray-300 whitespace-nowrap">
//                                         {new Date(alert.timestamp).toLocaleString()}
//                                     </td>
//                                     <td className="py-5 font-medium text-red-600">{alert.attackType || alert.prediction}</td>
//                                     <td className="py-5">{alert.confidence}%</td>
//                                     <td className="py-5">
//                                         <span className={`px-4 py-1 rounded-full text-xs font-medium ${getSeverityStyle(alert.severity)}`}>
//                                             {alert.severity}
//                                         </span>
//                                     </td>
//                                     <td className="py-5">
//                                         <button 
//                                             onClick={() => onView(alert)}
//                                             className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
//                                         >
//                                             View Analysis
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }