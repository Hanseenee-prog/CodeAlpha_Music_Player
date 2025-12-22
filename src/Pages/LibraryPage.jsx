import { useState } from 'react';
import Library from '../Components/Library';
import { Sparkles, HardDrive, Music } from 'lucide-react';

const LibraryPage = () => {
    const [activeTab, setActiveTab] = useState('library');

    const tabs = [
        { id: 'library', label: 'All Music', icon: Music },
        { id: 'discover', label: 'Discover', icon: Sparkles },
        { id: 'device', label: 'On Device', icon: HardDrive },
    ];

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-black text-gray-900">Your Music</h1>
                
                {/* 2025 Liquid Tab Bar */}
                <div className="flex gap-2 p-1 bg-gray-200/50 rounded-2xl w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                                activeTab === tab.id 
                                ? 'bg-white text-blue-600 shadow-sm scale-105' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content Rendering */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'library' && <Library />}
                
                {activeTab === 'discover' && (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-gray-300 p-8 text-center">
                        <Sparkles size={48} className="text-blue-400 mb-4 animate-pulse" />
                        <h2 className="text-xl font-bold">New For You</h2>
                        <p className="text-gray-500">AI-powered recommendations based on your taste.</p>
                    </div>
                )}

                {activeTab === 'device' && (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-gray-300 p-8 text-center">
                        <HardDrive size={48} className="text-amber-400 mb-4" />
                        <h2 className="text-xl font-bold">Local Files</h2>
                        <p className="text-gray-500">Scan your device to find MP3 files saved locally.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibraryPage;
