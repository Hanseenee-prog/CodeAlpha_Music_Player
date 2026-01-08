import { Play, Heart, Plus, MoreVertical, Pause, Edit2, Trash2, Share2 } from "lucide-react";
import { useAudio } from "../Contexts/AudioContext";
import { useFavsContext } from "../Contexts/FavoritesContext";
import { usePlaylistContext } from "../Contexts/PlaylistContext";
import { useOutletContext } from "react-router-dom";
import { useRef, useEffect } from "react";

const Song = ({ song, onPlay }) => {
    const { id, title, artist, duration, coverImage } = song;
    const { currentSongIndex, isPlaying, getPlaybackQueue } = useAudio();
    const { isFavorite, toggleFavorite } = useFavsContext();
    const { setIsOpenModal, setSelectedSong } = usePlaylistContext();
    
    // Dropdown State
    const { currentMenuId, setCurrentMenuId, dismissMenu, setIsEditingSong, setCurrentSongToEdit } = useOutletContext();
    const menuRef = useRef(null);
    const buttonRef = useRef(null); // Reference to the MoreVertical button 

    const queue = getPlaybackQueue();
    const isActive = queue[currentSongIndex]?.id === song.id;

    // Close menu when clicking outside
    useEffect(() => {
        if (!currentMenuId) return;

        const handleClickOutside = (e) => {
            if (
                menuRef.current && buttonRef &&
                !menuRef.current.contains(e.target) && 
                !buttonRef.current.contains(e.target)
            ) dismissMenu();
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [currentMenuId, dismissMenu]);

    return (
        <div 
            className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer
                ${isActive ? 'bg-blue-50/80 shadow-sm' : 'hover:bg-gray-50'}`}
            onClick={() => onPlay()}
        >
            {/* Left: Artwork & Info */}
            <div className="flex items-center gap-4 min-w-0">
                <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden shadow-sm">
                    <img 
                        src={coverImage} 
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 
                            ${isActive && isPlaying ? 'brightness-50' : ''}`}
                        alt={title} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isActive && isPlaying ? (
                            <Pause className="text-white fill-white" size={20} />
                        ) : (
                            <Play className="text-white fill-white ml-1" size={20} />
                        )}
                    </div>
                </div>

                <div className="min-w-0">
                    <h2 className={`text-sm font-bold truncate ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                        {title}
                    </h2>
                    <p className="text-xs text-gray-500 truncate">{artist}</p>
                </div>
            </div>

            {/* Right: Actions & Duration */}
            <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(id) }}
                        className={`p-2 hover:text-red-500 transition-colors ${isFavorite(id) ? 'text-red-500' : 'text-gray-400'}`}
                    >
                        <Heart size={18} fill={isFavorite(id) ? 'red' : 'transparent'} />
                    </button>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsOpenModal(true); setSelectedSong(song); }}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                        <Plus size={18} />
                    </button>

                    {/* Options Menu Wrapper */}
                    <div className="relative">
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation();
                                setCurrentMenuId(prevId => prevId === id ? null : id); 
                            }}
                            ref={buttonRef}
                            className={`p-2 transition-colors rounded-lg ${(currentMenuId === id) ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Card */}
                        {(currentMenuId === id) && (
                            <div 
                                ref={menuRef}
                                className="absolute right-0 top-full mb-2 w-48 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setIsEditingSong(true); setCurrentSongToEdit(song); setCurrentMenuId(null); }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Edit2 size={16} /> Edit Details
                                </button>
                                
                                <button 
                                    onClick={(e) => { e.stopPropagation(); console.log("Share:", title); setCurrentMenuId(null); }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Share2 size={16} /> Share Song
                                </button>

                                <div className="h-px bg-gray-100 my-1 mx-2" />

                                <button 
                                    onClick={(e) => { e.stopPropagation(); console.log("Delete:", id); setCurrentMenuId(null); }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={16} /> Delete Song
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <span className="text-xs font-mono text-gray-400 tabular-nums">
                    {duration}
                </span>
            </div>
        </div>
    );
};

export default Song;
