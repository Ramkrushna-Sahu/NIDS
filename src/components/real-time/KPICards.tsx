"use client";
export default function KPICards({ liveStats, isMonitoring }: { liveStats: any; isMonitoring: boolean }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Monitoring Status</p>
                <p className={`text-3xl font-bold mt-3 ${isMonitoring ? 'text-green-600' : 'text-red-500'}`}>
                    {isMonitoring ? 'ACTIVE' : 'STOPPED'}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Flows</p>
                <p className="text-4xl font-bold mt-3">{liveStats?.total_flows || 0}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Normal Traffic</p>
                <p className="text-4xl font-bold mt-3 text-green-600">{liveStats?.benign_flows || 0}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Active Attacks</p>
                <p className="text-4xl font-bold mt-3 text-red-600">{liveStats?.attack_flows || 0}</p>
            </div>
        </div>
    );
}