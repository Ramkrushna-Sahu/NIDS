'use client';
import { useState, useRef } from 'react';
import { Upload, FileText, X, RefreshCw } from 'lucide-react';

interface FileUploadAreaProps {
    onFileUpload: (file: File) => void;
    loading: boolean;
}

export default function FileUploadArea({ onFileUpload, loading }: FileUploadAreaProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (loading) return;
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            onFileUpload(file);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            onFileUpload(file);
        }
    };

    const handleClearFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
        }
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    return (
        <div className="w-full max-w-2xl mx-auto transition-all duration-300">
            {!selectedFile ? (
                <label 
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="block border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 text-center hover:border-violet-500 dark:hover:border-violet-600 transition-all bg-white dark:bg-[#0f172a] shadow-sm cursor-pointer group select-none"
                >
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        onChange={handleFileSelect}
                        disabled={loading}
                        accept=".csv,.txt,.xlsx,.pcap,.pcapng"
                    />

                    <div className="mx-auto w-14 h-14 bg-violet-50 dark:bg-violet-950/50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                        <Upload className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>

                    <h3 className="text-sm font-bold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-1">
                        Upload Network Traffic
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
                        Supported: CSV, TXT, XLSX, PCAP, PCAPNG
                    </p>

                    <div className="inline-flex items-center px-6 py-2.5 bg-violet-600 group-hover:bg-violet-700 text-white rounded-xl text-xs font-semibold shadow-sm group-hover:shadow-violet-500/10 transition-all">
                        {loading ? "Analyzing..." : "Choose File"}
                    </div>

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 font-medium">
                        or drag and drop data package anywhere inside this window
                    </p>
                </label>
            ) : (
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 shadow-sm flex items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-2.5 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl shrink-0">
                            {loading ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <FileText className="w-5 h-5" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate pr-2">
                                {selectedFile.name}
                            </p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                                {formatBytes(selectedFile.size)} • {loading ? 'Analyzing streams...' : 'Ready for diagnostics'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleClearFile}
                        disabled={loading}
                        className="p-2 text-slate-600 hover:font-bold hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Remove file"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////

// 'use client';
// import { Upload, FileText, AlertCircle } from 'lucide-react';

// interface FileUploadAreaProps {
//     onFileUpload: (file: File) => void;
//     loading: boolean;
// }

// export default function FileUploadArea({ onFileUpload, loading }: FileUploadAreaProps) {
//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         const file = e.dataTransfer.files[0];
//         if (file) onFileUpload(file);
//     };

//     const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) onFileUpload(file);
//     };

//     return (
//         <div 
//             onDrop={handleDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-3xl p-8 md:p-12 text-center hover:border-blue-500 dark:hover:border-blue-600 transition-colors bg-white dark:bg-gray-900"
//         >
//             <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-2xl flex items-center justify-center mb-6">
//                 <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//             </div>

//             <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Upload Network Traffic File</h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6">CSV, TXT, XLSX, PCAP, PCAPNG supported</p>

//             <label className="cursor-pointer inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all">
//                 {loading ? "Analyzing..." : "Choose File"}
//                 <input 
//                     type="file" 
//                     className="hidden" 
//                     onChange={handleFileSelect}
//                     disabled={loading}
//                 />
//             </label>

//             <p className="text-xs text-gray-400 mt-4">or drag and drop file here</p>
//         </div>
//     );
// }