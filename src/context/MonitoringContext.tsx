"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface MonitoringContextType {
    liveStats: any;
    trafficTrend: any;
    isMonitoring: boolean;
    loading: boolean;
    startMonitoring: () => Promise<void>;
    stopMonitoring: () => Promise<void>;
    refreshData: () => Promise<void>;
}

export const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export function MonitoringProvider({ children }: { children: ReactNode }) {
    const [liveStats, setLiveStats] = useState<any>(null);
    const [trafficTrend, setTrafficTrend] = useState<any>({});
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('/api/services/live-stats');
            if (statsRes.data.success) {
                const stats = statsRes.data.data;
                setLiveStats(stats);
                setIsMonitoring(stats.monitoring || false);
            }

            try {
                const trendRes = await axios.get('/api/services/traffic-trend');
                if (trendRes.data.success) {
                    setTrafficTrend(trendRes.data.data);
                }
            } catch (trendErr) {
                console.warn("Traffic trend fetch failed");
            }
        } catch (err) {
            console.error("Monitoring data fetch failed", err);
            toast.error("Failed to fetch live data");
        } finally {
            setLoading(false);
        }
    };

    const startMonitoring = async () => {
        try {
            const res = await axios.post('/api/services/start-monitoring');
            if (res.data.success) {
                setIsMonitoring(true);
                toast.success('Monitoring Started Successfully');
                fetchData();
            } else {
                toast.error(res.data.message || "Monitoring already running");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to start monitoring");
        }
    };

    const stopMonitoring = async () => {
        try {
            const res = await axios.post('/api/services/stop-monitoring');
            if (res.data.success) {
                setIsMonitoring(false);
                setLiveStats(null);
                setTrafficTrend({});
                toast.success('Monitoring Stopped');
            } else {
                toast.error("Monitoring is not running");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to stop monitoring");
        }
    };

    useEffect(() => {
        fetchData();

        let interval: NodeJS.Timeout;
        if (isMonitoring) {
            interval = setInterval(fetchData, 3000);
        }
        return () => clearInterval(interval);
    }, [isMonitoring]);

    return (
        <MonitoringContext.Provider value={{
            liveStats,
            trafficTrend,
            isMonitoring,
            loading,
            startMonitoring,
            stopMonitoring,
            refreshData: fetchData
        }}>
            {children}
        </MonitoringContext.Provider>
    );
}