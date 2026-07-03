'use client';
import { useState } from 'react';
import axios from 'axios';
import FileUploadArea from './FileUploadArea';
import SummaryCards from './SummaryCards';
import AnalysisCharts from './AnalysisCharts';
import SuspiciousTable from './SuspiciousTable';
import AlertAnalysisModal from '../ui/AlertAnalysisModal';

export default function FileAnalysisClient() {
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAlert, setSelectedAlert] = useState<any>(null);
    
    const handleFileUpload = async (file: File) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/services/analyze-file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                setAnalysisResult(res.data);
            } else {
                setError(res.data.message || "Analysis failed");
            }
        } catch (err: any) {
            console.error(err);
            setError("Failed to analyze file");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">File Analysis</h1>

                <FileUploadArea onFileUpload={handleFileUpload} loading={loading} />

                {error && <div className="bg-red-50 dark:bg-red-950 p-4 rounded-2xl text-red-600">{error}</div>}

                {analysisResult && (
                    <>
                        <SummaryCards result={analysisResult.data} />
                        <AnalysisCharts result={analysisResult.data} />
                        <SuspiciousTable 
                            records={analysisResult.data.top_suspicious_data || []} 
                            onView={setSelectedAlert} 
                        />
                    </>
                )}
            </div>

            <AlertAnalysisModal 
                isOpen={!!selectedAlert} 
                onClose={() => setSelectedAlert(null)} 
                alertData={selectedAlert} 
            />
        </div>
    );
}