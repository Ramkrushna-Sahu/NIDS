'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrafficTrendChart({ data }: { data: any }) {
    const chartData = Object.entries(data || {}).map(([time, value]: any) => ({
        time,
        flows: value.flows || 0,
        attacks: value.attacks || 0
    }));

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">Live Traffic Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Line type="monotone" dataKey="flows" stroke="#3B82F6" strokeWidth={3} name="Total Flows" />
                    <Line type="monotone" dataKey="attacks" stroke="#EF4444" strokeWidth={3} name="Attacks" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}