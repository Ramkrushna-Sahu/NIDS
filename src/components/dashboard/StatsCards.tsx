"use client";
export default function StatsCards({ liveStats }: { liveStats: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { label: "Total Live Flows", value: liveStats?.total_flows || 0, color: "text-gray-900 dark:text-white" },
                { label: "Active Attacks", value: liveStats?.attack_flows || 0, color: "text-red-600 dark:text-red-500" },
                { label: "Normal Traffic", value: liveStats?.benign_flows || 0, color: "text-green-600 dark:text-green-500" },   
                { label: "Alerts Today", value: liveStats?.recent_alerts?.length || 0, color: "text-orange-600 dark:text-orange-500" }
            ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all cursor-pointer hover:shadow hover:shadow-violet-400">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.label}</p>
                    <p className={`text-5xl font-bold mt-4 ${item.color}`}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
}