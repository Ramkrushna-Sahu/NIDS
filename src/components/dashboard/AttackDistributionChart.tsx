'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#22C55E', '#EF4444'];

export default function AttackDistributionChart({ liveStats }: { liveStats: any }) {
    const benign = liveStats?.benign_flows || 0;
    const attacks = liveStats?.attack_flows || 0;

    const pieData = [
        { name: 'Normal Traffic', value: benign, color: COLORS[0] },
        { name: 'Attacks', value: attacks, color: COLORS[1] },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Traffic Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}