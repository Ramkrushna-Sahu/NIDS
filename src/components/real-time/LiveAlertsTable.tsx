'use client';
import { Clock, ShieldAlert, Activity, Eye } from 'lucide-react';

export default function LiveAlertsTable({ alerts, onView }: { alerts: any[], onView: (alert: any) => void }) {
    const getSeverityStyle = (severity: string) => {
        if (severity === 'High') return 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40';
        if (severity === 'Medium') return 'bg-orange-100 dark:bg-amber-950/60 text-orange-700 dark:text-amber-400 border border-orange-200 dark:border-amber-900/40';
        return 'bg-yellow-100 dark:bg-blue-950/60 text-yellow-700 dark:text-blue-400 border border-yellow-200 dark:border-blue-900/40';
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm overflow-hidden md:px-9 px-3">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-[#1e293b]/30 flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500 animate-pulse" />
                <h3 className="font-bold text-base tracking-tight text-gray-900 dark:text-white">Live Intrusion Alerts</h3>
            </div>
            
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
                <table className="w-full text-left border-collapse">
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
                        {alerts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-16 text-gray-400 dark:text-slate-500 font-medium">
                                    No live network anomalies recorded yet.
                                </td>
                            </tr>
                        ) : (
                            alerts.map((alert, i) => (
                                <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/30 transition-colors group">
                                    <td className="py-4 px-6 text-gray-500 dark:text-slate-400">
                                        {alert.timestamp}
                                    </td>
                                    <td className="py-4 px-6 font-bold text-red-600 dark:text-red-400 tracking-tight">
                                        {alert.prediction || alert.attackType}
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-800 dark:text-slate-200">
                                        {alert.confidence}%
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${getSeverityStyle(alert.severity)}`}>
                                            {alert.severity}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
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
        </div>
    );
}