'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Shield, AlertTriangle } from 'lucide-react';

const COLORS = ['#10B981', '#EF4444'];

export default function AttackDistributionChart({ liveStats }: { liveStats: any }) {
    const benign = liveStats?.benign_flows || 0;
    const attacks = liveStats?.attack_flows || 0;
    const totalFlows = benign + attacks;

    const pieData = [
        { name: 'Normal Traffic', value: benign, color: COLORS[0], icon: Shield },
        { name: 'Attacks', value: attacks, color: COLORS[1], icon: AlertTriangle },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-slate-950/95 border border-slate-800/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl text-xs">
                    <p className="font-bold text-slate-200 mb-1">{data.name}</p>
                    <div className="flex items-center gap-2 font-mono">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                        {/* <span className="text-slate-400">Flows:</span> */}
                        <span className="font-bold text-white">{data.value.toLocaleString()}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow hover:shadow-violet-400">
            <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300">
                    Traffic Distribution
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Real-time telemetry stream inspection ratio</p>
            </div>

            <div className="h-64 w-full relative flex items-center justify-center my-2">
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {totalFlows.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Total Flows
                    </span>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={95}
                            paddingAngle={4}
                            dataKey="value"
                            cornerRadius={4}
                        >
                            {pieData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    className="transition-all duration-300 opacity-90 hover:opacity-100 cursor-pointer outline-none"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-slate-800/60 pt-4">
                {pieData.map((item, index) => {
                    const Icon = item.icon;
                    const percentage = totalFlows > 0 ? ((item.value / totalFlows) * 100).toFixed(1) : '0.0';
                    
                    return (
                        <div key={index} className="flex items-center gap-2.5 bg-slate-50/40 dark:bg-slate-900/20 p-2 rounded-xl border border-transparent dark:border-slate-800/30">
                            <div 
                                className="p-1.5 rounded-lg text-white" 
                                style={{ backgroundColor: `${item.color}15`, color: item.color }}
                            >
                                <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-medium text-slate-400 truncate leading-none">
                                    {item.name}
                                </p>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                                    {item.value.toLocaleString()} <span className="text-xs text-slate-400 font-normal">({percentage}%)</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


///////////////////////////////

// 'use client';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// const COLORS = ['#10B981', '#EF4444'];

// export default function AttackDistributionChart({ liveStats }: { liveStats: any }) {
//     const benign = liveStats?.benign_flows || 0;
//     const attacks = liveStats?.attack_flows || 0;

//     const pieData = [
//         { name: 'Normal Traffic', value: benign, color: COLORS[0] },
//         { name: 'Attacks', value: attacks, color: COLORS[1] },
//     ];

//     return (
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
//             <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Traffic Distribution</h2>
//             <ResponsiveContainer width="100%" height={280}>
//                 <PieChart>
//                     <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={80}
//                         outerRadius={120}
//                         dataKey="value"
//                     >
//                         {pieData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }