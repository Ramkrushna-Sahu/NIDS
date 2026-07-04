"use client";

export default function SummaryCards({ result }: { result: any }) {
    // console.log(result.data)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400 cursor-pointer">
                <p className="text-gray-500 dark:text-gray-400">Total Records</p>
                <p className="text-4xl font-bold mt-3">{result.total_items || 0}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400 cursor-pointer">
                <p className="text-gray-500 dark:text-gray-400">Normal Traffic</p>
                <p className="text-4xl font-bold mt-3 text-green-600">{result.benign_items || 0}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400 cursor-pointer">
                <p className="text-gray-500 dark:text-gray-400">Attacks Detected</p>
                <p className="text-4xl font-bold mt-3 text-red-600">{result.attack_items || 0}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow hover:shadow-violet-400 cursor-pointer">
                <p className="text-gray-500 dark:text-gray-400">Avg Confidence</p>
                <p className="text-4xl font-bold mt-3">{result.confidence_summary?.avg_confidence?.toFixed(1) || 0}%</p>
            </div>
        </div>
    );
}