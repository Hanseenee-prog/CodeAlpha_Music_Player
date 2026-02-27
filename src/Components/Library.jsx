import { useRef, useState } from 'react';
import Song from "./Song";
import { useAudio } from "../Contexts/AudioContext";
import { 
    Shuffle, Play, 
    Mic2, Disc, 
    Music, Filter,
    Plus,FolderPlus
} from "lucide-react";
import handleSongClick from "../utils/handleSongClick";
import { useOutletContext } from "react-router-dom";
import useLocalMusic from '../Hooks/useLocalMusic';

const Library = ({ source }) => {
    const { playSong, currentSongIndex, librarySongs } = useAudio();
    const { dismissMenu } = useOutletContext();
    const { deviceSongs, addSongs } = useLocalMusic();
    const [activeFilter, setActiveFilter] = useState('songs');
    const fileInputRef = useRef(null);

    const currentList = source === 'device' ? deviceSongs : librarySongs; 
    const queueSource = source === 'device' ? "device" : "library"; 
    
    // Check if we are in the device tab and it is empty
    const isDeviceEmpty = source === 'device' && currentList.length === 0;

    const filters = [
        { id: 'songs', label: 'Songs', icon: Music },
        { id: 'artists', label: 'Artists', icon: Mic2 },
        { id: 'albums', label: 'Albums', icon: Disc },
    ];

    const handleShuffle = () => {
        if (currentList.length === 0) return;
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * currentList.length);
        } while (randomIndex === currentSongIndex && currentList.length > 1);
        playSong(randomIndex, currentList, queueSource);
    };

    const handlePlayAll = () => {
        if (currentList.length > 0) {
            playSong(0, currentList, queueSource);
        }
    };

    const handleImportFromDevice = (files) => {
        console.log("About to add the song(s)");
        addSongs(files);
    };

    return (
        <section className="flex flex-col h-full bg-white relative">
            
            {/* Unified Sticky Header */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
                <div className="p-4 flex flex-col gap-4">
                    
                    {/* Top Row: Context Title & Actions */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                {source === 'all' ? 'Global Library' : source === 'collection' ? 'My Collection' : 'Local Storage'}
                            </h2>
                            <p className="text-xs text-gray-400 font-medium">
                                {currentList.length} Items
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* 1. PLAY ALL BUTTON (Only visible when filter is 'songs' and list is not empty) */}
                            {activeFilter === 'songs' && currentList.length > 0 && (
                                <button 
                                    onClick={handlePlayAll}
                                    className="p-2 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-colors"
                                    title="Play All"
                                >
                                    <Play size={18} fill="currentColor" />
                                </button>
                            )}

                            {/* 2. SHUFFLE BUTTON (Always visible if items exist) */}
                            {currentList.length > 0 && (
                                <button 
                                    onClick={handleShuffle}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
                                >
                                    <Shuffle size={14} />
                                    <span className="hidden sm:inline">Shuffle</span>
                                </button>
                            )}

                            {/* 3. DEVICE IMPORT BUTTON (Small version) 
                               Only visible if we are in 'device' tab AND we already have songs (list not empty) 
                            */}
                            {source === 'device' && !isDeviceEmpty && (
                                <button 
                                    onClick={() => fileInputRef.current.click()}
                                    className="p-2 border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                                    title="Import More"
                                >
                                    <Plus size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Hidden input element that opens the files tab on the device */}
                    <input 
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="audio/*"
                        hidden
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) handleImportFromDevice(files);
                        }}
                    />

                    {/* Bottom Row: Filters (Only show if we have content or if it's not the empty device state) */}
                    {!isDeviceEmpty && (
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 whitespace-nowrap ${
                                        activeFilter === filter.id
                                        ? 'bg-gray-900 border-gray-900 text-white'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                                    }`}
                                >
                                    <filter.icon size={12} />
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div 
                className="flex-1 overflow-y-auto p-2 custom-scrollbar"
                onScroll={dismissMenu}
            >
                {/* STATE 1: Device Tab is Empty -> Show Big Centered Button */}
                {isDeviceEmpty ? (
                    <div className="flex flex-col items-center justify-center h-full pb-20 text-center px-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border-2 border-dashed border-gray-200">
                            <FolderPlus size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No Local Music Found</h3>
                        <p className="text-gray-500 mb-8 max-w-xs text-sm">
                            Import MP3s from your device storage to play them offline.
                        </p>
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <Plus size={20} />
                            Add Songs From Device
                        </button>
                    </div>
                ) : (
                    /* STATE 2: Normal List View */
                    <>
                        {activeFilter === 'songs' ? (
                            <div className="space-y-1">
                                {currentList.map((song, index) => (
                                    <Song 
                                        key={song.id || index} 
                                        song={song} 
                                        onPlay={() => handleSongClick(song, currentList, playSong, queueSource)}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Placeholder for Artists/Albums */
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm">
                                <Filter size={32} className="mb-2 opacity-50" />
                                <p>No {activeFilter} found in {source}.</p>
                            </div>
                        )}
                    </>
                )}
                
                <div className="h-32" />
            </div>
        </section>
    );
}

export default Library;