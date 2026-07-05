'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, BarChart3 } from 'lucide-react';

export default function LiveCharts({ liveStats, trafficTrend }: { liveStats: any; trafficTrend: any }) {
    const trendData = Object.entries(trafficTrend || {}).map(([time, data]: any) => ({
        time,
        flows: data.flows || 0,
        attacks: data.attacks || 0
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-[#1e293b]/30 flex items-center gap-2">
                    <Activity size={18} className="text-blue-500" />
                    <h3 className="font-bold text-base tracking-tight text-gray-900 dark:text-white">Live Traffic Trend</h3>
                </div>
                
                <div className="p-6 flex-1 min-h-85">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#64748b" opacity={0.15} />
                            <XAxis 
                                dataKey="time" 
                                stroke="#64748b" 
                                fontSize={11} 
                                tickLine={false} 
                                dy={10}
                            />
                            <YAxis 
                                stroke="#64748b" 
                                fontSize={11} 
                                tickLine={false} 
                                dx={-5}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                                    borderColor: '#334155', 
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    padding: '10px 14px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }} 
                                labelStyle={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '6px' }}
                                itemStyle={{ padding: '2px 0' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="flows" 
                                stroke="#3b82f6" 
                                name="Total Flows"
                                strokeWidth={3} 
                                dot={{ r: 3, strokeWidth: 1 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="attacks" 
                                stroke="#ef4444" 
                                name="Malicious Attacks"
                                strokeWidth={3} 
                                dot={{ r: 3, strokeWidth: 1 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-[#1e293b]/30 flex items-center gap-2">
                    <BarChart3 size={18} className="text-red-500" />
                    <h3 className="font-bold text-base tracking-tight text-gray-900 dark:text-white">Attack Frequency</h3>
                </div>
                
                <div className="p-6 flex-1 min-h-85">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#64748b" opacity={0.15} vertical={false} />
                            <XAxis 
                                dataKey="time" 
                                stroke="#64748b" 
                                fontSize={11} 
                                tickLine={false} 
                                dy={10}
                            />
                            <YAxis 
                                stroke="#64748b" 
                                fontSize={11} 
                                tickLine={false} 
                                dx={-5}
                            />
                            <Tooltip 
                                cursor={{ fill: 'rgba(148, 163, 184, 0.06)' }}
                                contentStyle={{ 
                                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                                    borderColor: '#334155', 
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    padding: '10px 14px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }} 
                                labelStyle={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '6px' }}
                            />
                            <Bar 
                                dataKey="attacks" 
                                name="Attacks Blocked"
                                fill="#ef4444" 
                                radius={[6, 6, 0, 0]} 
                                maxBarSize={32}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}