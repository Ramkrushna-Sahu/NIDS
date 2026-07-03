'use client';
import { 
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
    Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';

export default function AnalysisCharts({ result }: { result: any }) {
    const benignCount = result.benign_items || 0;
    const attackCount = result.attack_items || 0;
    const totalCount = benignCount + attackCount;

    const pieData = [
        { name: 'Normal Traffic', value: benignCount, color: '#8B5CF6' }, 
        { name: 'Malicious Threats', value: attackCount, color: '#663399' }, 
    ];

    // Premium multi-shade Violet matrix matching your application primary brand
    const attackColors = [
        '#7c3aed', 
        '#a78bfa', 
        '#6d28d9', 
        '#c4b5fd', 
        '#4c1d95', 
        '#8b5cf6'  
    ];

    const barData = Object.entries(result.attack_distribution || {}).map(([type, count], index) => ({
        type,
        count: count as number,
        color: attackColors[index % attackColors.length]
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-slate-950/95 border border-slate-800/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl text-xs">
                    <p className="font-bold text-slate-200 mb-1">{data.type}</p>
                    <div className="flex items-center gap-2 font-mono">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                        <span className="text-slate-400">{data.name}</span>
                        <span className="font-bold text-white">{Number(data.value).toLocaleString()}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-5 bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400">
                        Traffic Distribution
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">Ratio of clean to anomalous network streams</p>
                </div>

                <div className="h-65 w-full relative flex items-center justify-center my-2">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                        <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-gray-900 dark:text-white">
                            {totalCount}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
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
                                outerRadius={100} 
                                paddingAngle={4}
                                dataKey="value"
                                cornerRadius={4}
                            >
                                {pieData.map((entry, i) => (
                                    <Cell 
                                        key={i} 
                                        fill={entry.color} 
                                        className="transition-all duration-300 opacity-90 hover:opacity-100 cursor-pointer outline-none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-center gap-6 border-t border-gray-50 dark:border-slate-800/60 pt-4">
                    {pieData.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-800 dark:text-slate-400 leading-none">{item.name}</span>
                                <span className="text-sm font-bold font-mono text-gray-800 dark:text-slate-200 mt-0.5">
                                    {totalCount > 0 ? ((item.value / totalCount) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400">
                        Attack Vector Classification
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">Volume signature across detected threat variations</p>
                </div>

                {barData.length === 0 ? (
                    <div className="h-70 w-full flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-500 italic">
                        No signature attack metrics recorded in current tracking window.
                    </div>
                ) : (
                    <div className="h-70 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={barData} 
                                margin={{ top: 15, right: 10, left: -25, bottom: 15 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.08} />
                                <XAxis 
                                    dataKey="type" 
                                    stroke="#64748b" 
                                    fontSize={10} 
                                    fontWeight={500}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={8}
                                    angle={-15} 
                                    interval={0}
                                />
                                <YAxis 
                                    stroke="#64748b" 
                                    fontSize={10} 
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.03)', radius: 6 }} />
                                <Bar 
                                    dataKey="count" 
                                    radius={[6, 6, 0, 0]} 
                                    barSize={50}
                                    background={{ fill: 'rgba(124, 58, 237, 0.03)', radius: 6 }}
                                    label={{ 
                                        position: 'top', 
                                        fill: '#7c3aed', 
                                        fontSize: 10, 
                                        fontWeight: 'bold',
                                        fontFamily: 'monospace',
                                        dy: -8
                                    }}
                                >
                                    {barData.map((entry, idx) => (
                                        <Cell 
                                            key={idx} 
                                            fill={entry.color}
                                            className="transition-all duration-300 hover:opacity-80 cursor-pointer" 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

        </div>
    );
}


// 'use client';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// export default function AnalysisCharts({ result }: { result: any }) {
//     const pieData = [
//         { name: 'Normal', value: result.benign_items || 0, color: '#22c55e' },
//         { name: 'Attack', value: result.attack_items || 0, color: '#ef4444' },
//     ];

//     const barData = Object.entries(result.attack_distribution || {}).map(([type, count]) => ({
//         type,
//         count: count as number
//     }));

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
//                 <h3 className="font-semibold mb-6">Traffic Distribution</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                         <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value">
//                             {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//             <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
//                 <h3 className="font-semibold mb-6">Attack Distribution</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={barData}>
//                         <XAxis dataKey="type" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="count" fill="#3b82f6" radius={6} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }