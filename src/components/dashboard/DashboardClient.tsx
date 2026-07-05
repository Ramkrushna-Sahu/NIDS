'use client';
import { useMonitoring } from '@/hooks/useMonitoring';
import StatsCards from './StatsCards';
import TrafficTrendChart from './TrafficTrendChart';
import AttackDistributionChart from './AttackDistributionChart';
import RecentAlertsTable from './RecentAlertsTable';

export default function DashboardClient() {
    const { liveStats, trafficTrend, loading } = useMonitoring();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <p className="text-xl text-gray-500 dark:text-gray-400">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 transition-colors">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        System Overview
                    </h1>
                    
                    <div className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 w-fit ${
                        liveStats?.monitoring 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                        ● {liveStats?.monitoring ? 'MONITORING ACTIVE' : 'MONITORING STOPPED'}
                    </div>
                </div>

                <StatsCards liveStats={liveStats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TrafficTrendChart data={trafficTrend} />
                    <AttackDistributionChart liveStats={liveStats} />
                </div>

                <RecentAlertsTable alerts={liveStats?.recent_alerts || []} />
            </div>
        </div>
    );
}




// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import StatsCards from './StatsCards';
// import TrafficTrendChart from './TrafficTrendChart';
// import AttackDistributionChart from './AttackDistributionChart';
// import RecentAlertsTable from './RecentAlertsTable';

// export default function DashboardClient() {
//     const [liveStats, setLiveStats] = useState<any>(null);
//     const [trafficTrend, setTrafficTrend] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     const fetchDashboardData = async () => {
//         try {
//             const statsRes = await axios.get('/api/services/live-stats');
            
//             if (statsRes.data.success) {
//                 setLiveStats(statsRes.data.data);
//             }

//             try {
//                 const trendRes = await axios.get('/api/services/traffic-trend');
//                 if (trendRes.data.success) {
//                     setTrafficTrend(trendRes.data.data);
//                 }
//             } catch (trendErr) {
//                 console.warn("Traffic trend fetch failed, continuing without it");
//             }
//         } catch (error) {
//             console.error("Dashboard fetch error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDashboardData();
//         const interval = setInterval(fetchDashboardData, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
//                 <p className="text-xl text-gray-500 dark:text-gray-400">Loading Dashboard...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 transition-colors">
//             <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//                         System Overview
//                     </h1>
                    
//                     <div className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 w-fit ${
//                         liveStats?.monitoring 
//                             ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
//                             : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
//                     }`}>
//                         ● {liveStats?.monitoring ? 'MONITORING ACTIVE' : 'MONITORING STOPPED'}
//                     </div>
//                 </div>

                
//                 <StatsCards liveStats={liveStats} />

                
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <TrafficTrendChart data={trafficTrend} />
//                     <AttackDistributionChart liveStats={liveStats} />
//                 </div>

                
//                 <RecentAlertsTable alerts={liveStats?.recent_alerts || []} />
//             </div>
//         </div>
//     );
// }