'use client';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadAreaProps {
    onFileUpload: (file: File) => void;
    loading: boolean;
}

export default function FileUploadArea({ onFileUpload, loading }: FileUploadAreaProps) {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) onFileUpload(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileUpload(file);
    };

    return (
        <div 
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-3xl p-8 md:p-12 text-center hover:border-blue-500 dark:hover:border-blue-600 transition-colors bg-white dark:bg-gray-900"
        >
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-2xl flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Upload Network Traffic File</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">CSV, TXT, XLSX, PCAP, PCAPNG supported</p>

            <label className="cursor-pointer inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all">
                {loading ? "Analyzing..." : "Choose File"}
                <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileSelect}
                    disabled={loading}
                />
            </label>

            <p className="text-xs text-gray-400 mt-4">or drag and drop file here</p>
        </div>
    );
}