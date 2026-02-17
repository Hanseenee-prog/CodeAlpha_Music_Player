import { useState } from 'react';
import Library from '../Components/Library';
import { Sparkles, Smartphone, Globe, Bookmark } from 'lucide-react';

const LibraryPage = () => {
    // State for the Main Source Tab
    const [activeSource, setActiveSource] = useState('all');

    const sourceTabs = [
        { id: 'all', label: 'All Music', icon: Globe },
        { id: 'collection', label: 'Collections', icon: Bookmark }, // Updated to Bookmark
        { id: 'device', label: 'On Device', icon: Smartphone },
    ];

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Header & Main Source Tabs */}
            <div className="flex flex-col gap-4 px-2 pt-2">
                <h1 className="text-3xl font-black text-gray-900 px-2">Your Music</h1>
                
                {/* 2025 Liquid Tab Bar - Main Sources */}
                <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl w-full sm:w-fit overflow-x-auto no-scrollbar">
                    {sourceTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSource(tab.id)}
                            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap flex-1 sm:flex-none ${
                                activeSource === tab.id 
                                ? 'bg-white text-blue-600 shadow-md shadow-gray-200 scale-[1.02]' 
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                        >
                            <tab.icon size={18} strokeWidth={2.5} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden rounded-t-3xl bg-white border-t border-r border-l border-gray-100 shadow-sm relative">
                <Library source={activeSource} />
            </div>
        </div>
    );
};

export default LibraryPage;