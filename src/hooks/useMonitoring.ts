import { useContext } from 'react';
import { MonitoringContext } from '@/context/MonitoringContext';

export const useMonitoring = () => {
    const context = useContext(MonitoringContext);
    if (context === undefined) {
        throw new Error('useMonitoring must be used within a MonitoringProvider');
    }
    return context;
};