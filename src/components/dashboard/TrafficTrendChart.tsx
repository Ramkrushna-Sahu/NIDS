'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity } from 'lucide-react';

export default function TrafficTrendChart({ data }: { data: any }) {
    const chartData = Object.entries(data || {}).map(([time, value]: any) => ({
        time,
        flows: value.flows || 0,
        attacks: value.attacks || 0
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-950/95 border border-slate-800/80 backdrop-blur-md px-3 py-2.5 rounded-xl shadow-xl text-xs">
                    <p className="font-mono text-slate-400 mb-2 border-b border-slate-800 pb-1 flex items-center gap-1">
                        <span>Time:</span>
                        <span className="text-slate-200 font-bold">{label}</span>
                    </p>
                    <div className="space-y-1.5 font-mono">
                        {payload.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.stroke }} />
                                    <span className="text-slate-400 text-[11px]">{item.name}:</span>
                                </div>
                                <span className="font-bold text-white text-right">
                                    {item.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow hover:shadow-violet-400">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        Live Traffic Trend
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                        Volume anomaly detection across chronological intervals
                    </p>
                </div>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        data={chartData} 
                        margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid 
                            strokeDasharray="4 4" 
                            stroke="currentColor" 
                            className="text-slate-100 dark:text-slate-800/60" 
                            vertical={false}
                        />
                        
                        <XAxis 
                            dataKey="time" 
                            stroke="currentColor"
                            className="text-slate-400 dark:text-slate-600 text-xs"
                            dy={10}
                            tickLine={false}
                        />
                        
                        <YAxis 
                            stroke="currentColor"
                            className="text-slate-400 dark:text-slate-600 text-xs"
                            dx={-5}
                            tickLine={false}
                            axisLine={false}
                        />
                        
                        <Tooltip content={<CustomTooltip />} />
                        
                        <Line 
                            type="monotone" 
                            dataKey="flows" 
                            stroke="#3B82F6" 
                            strokeWidth={2.5} 
                            dot={false}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            name="Total Flows" 
                        />
                        
                        <Line 
                            type="monotone" 
                            dataKey="attacks" 
                            stroke="#EF4444" 
                            strokeWidth={2.5} 
                            dot={false}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            name="Attacks" 
                        />

                        <Legend 
                            verticalAlign="top" 
                            align="right"
                            height={36}
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => (
                                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-sans px-1">
                                    {value}
                                </span>
                            )}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


///////////////////////////////////////////////////////////////////////////

// 'use client';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export default function TrafficTrendChart({ data }: { data: any }) {
//     const chartData = Object.entries(data || {}).map(([time, value]: any) => ({
//         time,
//         flows: value.flows || 0,
//         attacks: value.attacks || 0
//     }));

//     return (
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
//             <h2 className="text-xl font-semibold mb-6">Live Traffic Trend</h2>
//             <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                     <XAxis dataKey="time" stroke="#9CA3AF" />
//                     <YAxis stroke="#9CA3AF" />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="flows" stroke="#3B82F6" strokeWidth={3} name="Total Flows" />
//                     <Line type="monotone" dataKey="attacks" stroke="#EF4444" strokeWidth={3} name="Attacks" />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }