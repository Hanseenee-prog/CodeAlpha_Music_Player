import { Play, Heart, Plus, MoreVertical, Pause } from "lucide-react";
import { useAudio } from "../Contexts/AudioContext";
import { useFavsContext } from "../Contexts/FavoritesContext";
import { usePlaylistContext } from "../Contexts/PlaylistContext";
import { useOutletContext } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import DeleteConfirmModal from "./ModalsOrPopovers/DeleteConfirmModal";
import { useSongCover } from "../Hooks/useSongCover";
import SongOptionsMenu from "./ModalsOrPopovers/SongOptionsMenu"; // Import the new component
import { timeHandler } from "../utils/formatTime";

const Song = ({ song, onPlay }) => {
    const { id, title, artist, duration, coverImage } = song;
    const { formatted } = timeHandler(duration);
    
    // Context Hooks
    const { currentSongIndex, isPlaying, getPlaybackQueue, deleteSong } = useAudio();
    const { isFavorite, toggleFavorite } = useFavsContext();
    const { setIsOpenModal, setSelectedSong, removeFromPlaylist } = usePlaylistContext();
    
    // Local State
    const { coverSrc } = useSongCover(id, coverImage);

    const [isDeleteSongModalOpen, setIsDeleteSongModalOpen] = useState(false);
    
    // Dropdown Context (from Outlet)
    const { 
        currentMenuId, 
        setCurrentMenuId, 
        dismissMenu, 
        setIsEditingSong, 
        setCurrentSongToEdit,
    } = useOutletContext();

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const queue = getPlaybackQueue();
    const isActive = queue[currentSongIndex]?.id === song.id;
    const isMenuOpen = currentMenuId === id;

    // Close menu when clicking outside
    useEffect(() => {
        if (!currentMenuId) return;
        const handleClickOutside = (e) => {
            if (
                menuRef.current && buttonRef.current &&
                !menuRef.current.contains(e.target) && 
                !buttonRef.current.contains(e.target)
            ) dismissMenu();
        };
        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [currentMenuId, dismissMenu]);

    // Handlers to pass to the dropdown
    const menuHandlers = {
        onEdit: (song) => { setIsEditingSong(true); setCurrentSongToEdit(song); },
        onDelete: () => setIsDeleteSongModalOpen(true),
        onShare: (title) => console.log("Sharing:", title),
        onToggleFavorite: toggleFavorite,
        isFavorite: isFavorite(id),
        onAddToPlaylist: (song) => { setIsOpenModal(true); setSelectedSong(song); },
        onRemoveFromPlaylist: (songId, playlistId) => removeFromPlaylist(songId, playlistId) 
    };

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
                        src={coverSrc} 
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
                    
                    {/* These buttons are now HIDDEN on small screens (lg:flex) */}
                    <div className="hidden lg:flex items-center gap-2">
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
                    </div>

                    {/* Options Menu Wrapper */}
                    <div className="relative">
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation();
                                setCurrentMenuId(prevId => prevId === id ? null : id); 
                            }}
                            ref={buttonRef}
                            className={`p-2 transition-colors rounded-lg ${isMenuOpen ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            <MoreVertical size={18} />
                        </button>

                        <SongOptionsMenu 
                            isOpen={isMenuOpen}
                            onClose={() => setCurrentMenuId(null)}
                            menuRef={menuRef}
                            song={song}
                            handlers={menuHandlers}
                        />
                    </div>
                </div>
                
                <span className="text-xs font-mono text-gray-400 tabular-nums">
                    {formatted}
                </span>
            </div>

            <DeleteConfirmModal 
                isOpen={isDeleteSongModalOpen}
                songName={title}
                onClose={() => setIsDeleteSongModalOpen(false)}
                onConfirm={() => { deleteSong(id); setIsDeleteSongModalOpen(false); }}
            />
        </div>
    );
};

export default Song;