'use client';

import { ShieldAlert, Eye, Terminal } from 'lucide-react';

export default function SuspiciousTable({ records, onView }: { records: any[], onView: (record: any) => void }) {
    
    const formatForModal = (record: any) => {
        const confidence = Number(record.confidence || 0);
        return {
            ...record,
            flow_id: record.record_id !== undefined ? `REC-${record.record_id}` : 'REC-UNKNOWN',
            prediction: record.prediction,
            confidence: confidence,
            severity: confidence >= 90 ? "High" : confidence >= 70 ? "Medium" : "Low",
            timestamp: Date.now().toFixed(), 
            features: {
                "Average Packet Size": record.average_packet_size,
                "Max Packet Length": record.max_packet_length,
                "Flow Duration": record.flow_duration,
                "Destination Port": record.destination_port
            }
        };
    };

    const getSeverityStyles = (confidence: number) => {
        if (confidence >= 90) return 'text-red-600 dark:text-red-400 font-bold';
        if (confidence >= 70) return 'text-yellow-600 dark:text-yellow-400 font-bold';
        return 'text-green-600 dark:text-green-400 font-bold';
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden md:px-9 px-3">
            
            <div className="px-5 py-4 border-b border-slate-50 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <div>
                        <h3 className="font-bold md:text-sm text-xs tracking-wide text-slate-800 dark:text-slate-200 uppercase">
                            Suspicious Activity Log
                        </h3>
                    </div>
                </div>
                <span className="px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                    Total: {records.length}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 md:text-sm text-xs font-bold uppercase tracking-wider bg-slate-50/10 dark:bg-slate-900/5">
                            <th className="py-3 px-5">Record ID</th>
                            <th className="py-3 px-4">Attack Vector Type</th>
                            <th className="py-3 px-4">Confidence</th>
                            <th className="py-3 px-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-12 text-slate-400 dark:text-slate-500 italic text-md">
                                    No immediate anomalous signatures flagged inside this timeframe.
                                </td>
                            </tr>
                        ) : (
                            records.map((record, i) => {
                                const confValue = Number(record.confidence || 0);
                                return (
                                    <tr 
                                        key={i} 
                                        className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors group md:text-md text-sm"
                                    >
                                        <td className="py-3 px-5  font-semibold text-slate-600 dark:text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-3.5 h-3.5 opacity-40 text-slate-600 dark:text-slate-400" />
                                                <span>REC-{(Number(record.record_id) || 0) + 1}</span>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-4">
                                            <span className={`${getSeverityStyles(confValue)}`}>
                                                {record.prediction || 'Unknown Threat'}
                                            </span>
                                        </td>
                                        
                                        <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                            {confValue}%
                                        </td>
                                        
                                        <td className="py-3 px-5 text-right">
                                            <button 
                                                onClick={() => onView(formatForModal(record))}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors cursor-pointer"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>View</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}