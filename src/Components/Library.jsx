import Song from "./Song";
import songs from "../data/songs";
import React from "react";
import { useAudio } from "../Contexts/AudioContext";
import { Library as LibraryIcon, ListFilter, Shuffle } from "lucide-react";

const Library = React.memo(() => {
    const { playSong } = useAudio();

    // Randomizes song selection (Optional logic for button)
    const handleShuffle = () => {
        const randomIndex = Math.floor(Math.random() * songs.length);
        playSong(randomIndex);
    };

    return (
        <section className="flex flex-col h-125 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* The Unified Sticky Header */}
            <div className="sticky top-0 z-30 p-6 bg-white/90 backdrop-blur-md border-b border-gray-50 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <LibraryIcon className="text-blue-600" size={24} />
                        Your Library
                    </h1>
                    <p className="text-xs text-gray-500 font-medium tracking-tight">
                        {songs.length} Tracks Collected
                    </p>
                </div>
                
                <div className="flex items-center gap-2">
                    {/* Shuffle Button beside Sort */}
                    <button 
                        onClick={handleShuffle}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
                    >
                        <Shuffle size={16} />
                        <span className="hidden sm:block">Shuffle</span>
                    </button>

                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                        <ListFilter size={20} />
                    </button>
                </div>
            </div>

            {/* Scrollable Song List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {songs.map((song, index) => (
                    <Song 
                        key={song.id || index} 
                        index={index}
                        song={song} 
                        onPlay={() => playSong(index)}
                    />
                ))}
                {/* Bottom Padding to ensure last song is visible above MiniBar */}
                <div className="h-24" />
            </div>
        </section>
    );
});

export default Library;