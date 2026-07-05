'use client';
import { Play, Square, Loader2 } from 'lucide-react';

export default function RealTimeControls({ 
    isMonitoring, 
    onStart, 
    onStop, 
    loading 
}: { 
    isMonitoring: boolean; 
    onStart: () => void; 
    onStop: () => void; 
    loading: boolean; 
}) {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            
            <button 
                onClick={onStart}
                disabled={isMonitoring || loading}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-100 dark:disabled:bg-slate-800/50 disabled:text-gray-400 dark:disabled:text-slate-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed border border-emerald-700/20 shadow-sm shadow-emerald-900/10"
            >
                {loading && !isMonitoring ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : (
                    <Play size={14} fill="currentColor" />
                )}
                <span>{loading && !isMonitoring ? 'Starting...' : 'Start Engine'}</span>
            </button>

            <button 
                onClick={onStop}
                disabled={!isMonitoring || loading}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-gray-100 dark:disabled:bg-slate-800/50 disabled:text-gray-400 dark:disabled:text-slate-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed border border-red-700/20 shadow-sm shadow-red-900/10"
            >
                {loading && isMonitoring ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : (
                    <Square size={13} fill="currentColor" />
                )}
                <span>{loading && isMonitoring ? 'Stopping...' : 'Stop Engine'}</span>
            </button>

            {isMonitoring && !loading && (
                <div className="flex items-center gap-2 ml-1 px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono animate-pulse">
                        LIVE LISTENING
                    </span>
                </div>
            )}
            
        </div>
    );
}