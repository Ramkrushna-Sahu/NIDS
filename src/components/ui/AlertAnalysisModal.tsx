'use client';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom'; 
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, } from 'recharts';
import { X, ShieldAlert, Cpu, BarChart3, Clock, Percent, Activity, Network, ChevronDown, ChevronUp, Eye, Globe, MapPin, Server, Zap } from 'lucide-react';

interface AlertAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    alertData: any;
}

export default function AlertAnalysisModal({ isOpen, onClose, alertData }: AlertAnalysisModalProps) {
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [showRawFeatures, setShowRawFeatures] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const fetchAnalysis = useCallback(async () => {
        if (!alertData?.features) {
            setError("No feature data available");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const features = alertData.features;
            const payload = {
                average_packet_size: features["Average Packet Size"],
                max_packet_length: features["Max Packet Length"],
                flow_duration: features["Flow Duration"] || 0,
                destination_port: features["Destination Port"] || 0
            };

            const res = await axios.post('/api/services/predict', payload);
            if (res.data.success) {
                setAnalysis(res.data.data || res.data);
            }
        } catch (err: any) {
            console.error(err);
            setError("Failed to generate SHAP analysis");
        } finally {
            setLoading(false);
        }
    }, [alertData]);

    useEffect(() => {
        if (isOpen && alertData) {
            fetchAnalysis();
            setShowRawFeatures(false); 
        }
    }, [isOpen, alertData, fetchAnalysis]);

    if (!isOpen || !alertData || !mounted) return null;

    const chartData = analysis?.top_features?.map((item: any) => ({
        feature: item.feature.length > 15 
            ? item.feature.substring(0, 15) + "..." 
            : item.feature,
        impact: Number(item.impact),
        color: item.impact > 0 ? "#ef4444" : "#10b981"
    })) || [];

    return createPortal(
        <div 
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 w-screen h-screen bg-slate-950/75 backdrop-blur-md z-999999 flex items-center justify-center p-2 sm:p-4"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-slate-800/80 rounded-2xl w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-slate-800/80 flex justify-between items-center bg-gray-50/50 dark:bg-[#1e293b]/30 sticky top-0 z-10 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 text-red-500 rounded-xl hidden sm:block">
                            <ShieldAlert size={22} className="animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                Deep Attack Investigation
                            </h2>
                            <p className="text-[11px] sm:text-xs font-mono text-gray-400 dark:text-slate-400 mt-0.5 truncate max-w-55 sm:max-w-md">
                                Flow Signature: {alertData.flow_id || alertData.flowId || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="p-3.5 bg-gray-50 dark:bg-[#1e293b]/40 border border-gray-100 dark:border-slate-800/60 rounded-xl flex items-center gap-3">
                            <Clock size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <div>
                                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">Timestamp</p>
                                <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-slate-200 mt-0.5">{alertData.timestamp}</p>
                            </div>
                        </div>

                        <div className="p-3.5 bg-gray-50 dark:bg-[#1e293b]/40 border border-gray-100 dark:border-slate-800/60 rounded-xl flex items-center gap-3">
                            <Activity size={16} className="text-red-500 shrink-0" />
                            <div>
                                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">Attack Classification</p>
                                <p className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 mt-0.5">{alertData.prediction || alertData.attackType}</p>
                            </div>
                        </div>

                        <div className="p-3.5 bg-gray-50 dark:bg-[#1e293b]/40 border border-gray-100 dark:border-slate-800/60 rounded-xl flex items-center gap-3">
                            <Percent size={16} className="text-amber-500 shrink-0" />
                            <div>
                                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">Confidence Metric</p>
                                <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-100 mt-0.5">{alertData.confidence}%</p>
                            </div>
                        </div>

                        <div className="p-3.5 bg-gray-50 dark:bg-[#1e293b]/40 border border-gray-100 dark:border-slate-800/60 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Network size={16} className="text-indigo-400 shrink-0" />
                                <div>
                                    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">Severity Layer</p>
                                    <div className="mt-0.5">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold tracking-wide uppercase ${
                                            alertData.severity === 'High' ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40' : 
                                            alertData.severity === 'Medium' ? 'bg-orange-100 dark:bg-amber-950/60 text-orange-700 dark:text-amber-400 border border-orange-200 dark:border-amber-900/40' : 
                                            'bg-yellow-100 dark:bg-blue-950/60 text-yellow-700 dark:text-blue-400 border border-yellow-200 dark:border-blue-900/40'
                                        }`}>
                                            {alertData.severity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {alertData.flow_info && (
                        <div className="p-4 sm:p-5 bg-gray-50 dark:bg-[#1e293b]/40 border border-gray-100 dark:border-slate-800/60 rounded-xl">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400 flex items-center gap-2 mb-4">
                                <Server size={14} /> Network Flow Context
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-300">
                                        <Globe size={14} className="text-slate-400" />
                                        <span className="text-gray-400">Source IP:</span> 
                                        <span className="font-mono font-bold text-gray-800 dark:text-white">{alertData.flow_info.source_ip}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-300">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span className="text-gray-400">Destination IP:</span> 
                                        <span className="font-mono font-bold text-gray-800 dark:text-white">{alertData.flow_info.destination_ip}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-300">
                                        <Zap size={14} className="text-slate-400" />
                                        <span className="text-gray-400">Destination Port:</span> 
                                        <span className="font-mono font-bold text-gray-800 dark:text-white">{alertData.flow_info.destination_port}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-300">
                                        <Network size={14} className="text-slate-400" />
                                        <span className="text-gray-400">Protocol:</span> 
                                        <span className="font-mono font-bold uppercase text-gray-800 dark:text-white">{alertData.flow_info.protocol}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16 space-y-3">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-slate-400 animate-pulse">Loading...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-4 text-center text-sm font-medium text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {analysis?.top_features && !loading && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            <div className="lg:col-span-7 space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400 flex items-center gap-2">
                                    <BarChart3 size={14} /> Explainable AI Feature Impact Weights (SHAP)
                                </h3>
                                <div className="h-64 sm:h-72 md:h-80 bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-slate-800/60 rounded-xl p-1.5 sm:p-4 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart 
                                            data={chartData} 
                                            layout="vertical" 
                                            margin={{ left: -25, right: 5, top: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.15} />
                                            <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} />
                                            <YAxis 
                                                type="category" 
                                                dataKey="feature" 
                                                width={95} 
                                                fontSize={10}
                                                stroke="#64748b"
                                                tickLine={false}
                                            />
                                            <Tooltip 
                                                cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }}
                                                contentStyle={{ 
                                                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                                                    borderColor: '#334155', 
                                                    borderRadius: '8px',
                                                    fontSize: '11px',
                                                    padding: '8px 12px'
                                                }} 
                                                labelStyle={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '4px' }}
                                                itemStyle={{ color: '#f8fafc' }}
                                            />
                                            <Bar dataKey="impact" radius={4} barSize={14}>
                                                {chartData.map((entry: any, index: number) => (
                                                    <Cell key={index} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400 flex items-center gap-2">
                                    <Cpu size={14} /> Metric Contribution Breakdown
                                </h3>
                                <div className="space-y-2.5 max-h-65 lg:max-h-80 overflow-y-auto pr-1">
                                    {analysis.top_features.map((item: any, i: number) => {
                                        const isMaliciousPush = item.impact > 0;
                                        return (
                                            <div 
                                                key={i} 
                                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1e293b]/30 border border-gray-100 dark:border-slate-800/40 rounded-xl"
                                            >
                                                <div className="flex-1 pr-3">
                                                    <p className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-slate-200 tracking-tight">{item.feature}</p>
                                                    <p className={`text-[10px] font-medium mt-0.5 capitalize tracking-wide ${isMaliciousPush ? 'text-red-500/90' : 'text-emerald-500/90'}`}>
                                                        {item.direction.replace('_', ' ')}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-mono text-sm sm:text-base font-bold ${isMaliciousPush ? 'text-red-500' : 'text-emerald-500'}`}>
                                                        {isMaliciousPush ? '+' : ''}{item.impact}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border border-gray-100 dark:border-slate-800/80 rounded-xl overflow-hidden bg-white dark:bg-slate-900/40">
                        <button 
                            onClick={() => setShowRawFeatures(!showRawFeatures)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/30 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <Eye size={14}/> Complete Telemetry Raw Features Payload ({Object.keys(alertData.features || {}).length})
                            </span>
                            {showRawFeatures ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        {showRawFeatures && (
                            <div className="p-4 border-t border-gray-100 dark:border-slate-800/60 bg-gray-50/20 dark:bg-slate-900/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.entries(alertData.features || {}).map(([key, val]) => (
                                    <div key={key} className="p-2.5 bg-white dark:bg-[#1a2333] border border-gray-100 dark:border-slate-800/40 rounded-lg flex flex-col justify-between">
                                        <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium truncate mb-1" title={key}>
                                            {key}
                                        </span>
                                        <span className="text-xs font-mono font-bold truncate text-gray-700 dark:text-slate-300">
                                            {typeof val === 'number' ? Number(val.toFixed(4)) : String(val)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="px-4 sm:px-6 py-3.5 bg-gray-50/50 dark:bg-[#1e293b]/20 border-t border-gray-100 dark:border-slate-800/80 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}