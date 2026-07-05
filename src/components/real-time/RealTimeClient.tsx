'use client';
import { useMonitoring } from '@/hooks/useMonitoring';
import RealTimeControls from './RealTimeControls';
import KPICards from './KPICards';
import LiveCharts from './LiveCharts';
import LiveAlertsTable from './LiveAlertsTable';
import AlertAnalysisModal from '../ui/AlertAnalysisModal';
import { useState } from 'react';

export default function RealTimeClient() {
    const { 
        liveStats, 
        trafficTrend, 
        isMonitoring, 
        loading,
        startMonitoring, 
        stopMonitoring 
    } = useMonitoring();

    const [selectedAlert, setSelectedAlert] = useState<any>(null);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Real-Time Monitoring</h1>
                    <RealTimeControls 
                        isMonitoring={isMonitoring} 
                        onStart={startMonitoring} 
                        onStop={stopMonitoring}
                        loading={loading} 
                    />
                </div>

                <KPICards liveStats={liveStats} isMonitoring={isMonitoring} />

                <LiveCharts liveStats={liveStats} trafficTrend={trafficTrend} />

                <LiveAlertsTable 
                    alerts={liveStats?.recent_alerts || []} 
                    onView={setSelectedAlert} 
                />
            </div>

            <AlertAnalysisModal 
                isOpen={!!selectedAlert} 
                onClose={() => setSelectedAlert(null)} 
                alertData={selectedAlert} 
            />
        </div>
    );
}