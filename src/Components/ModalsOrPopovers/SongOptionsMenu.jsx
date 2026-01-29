import { Edit2, Trash2, Share2, Heart, Plus, MinusCircle, ListX } from "lucide-react";
import { useLocation } from "react-router-dom";
// import { useEffect, useRef } from "react";

const SongOptionsMenu = ({ 
    isOpen, 
    onClose, 
    menuRef,
    song, 
    handlers 
}) => {
    const { id, title } = song;
    const { 
        onEdit, 
        onDelete, 
        onShare, 
        onToggleFavorite, 
        isFavorite, 
        onAddToPlaylist,
        onRemoveFromPlaylist 
    } = handlers;

    const location = useLocation();
    const playlistId = location.pathname.split('/playlists/')[1];

    // Determine Context based on Path
    const isFavoritesPage = location.pathname.includes('/favorites');
    const isPlaylistPage = location.pathname.startsWith('/playlists')

    if (!isOpen) return null;

    return (
        <div 
            ref={menuRef}
            className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right"
        >
            {/* --- MOBILE ONLY ACTIONS (lg:hidden) --- */}
            <div className="lg:hidden pb-2 mb-2 border-b border-gray-100">
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(id); onClose(); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} /> 
                    {isFavorite ? 'Unfavorite' : 'Add to Favorites'}
                </button>

                <button 
                    onClick={(e) => { e.stopPropagation(); onAddToPlaylist(song); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <Plus size={16} /> Add to Playlist
                </button>
            </div>

            {/* --- CONTEXT SPECIFIC ACTIONS --- */}
            {isPlaylistPage && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onRemoveFromPlaylist(id, playlistId); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
                >
                    <ListX size={16} /> Remove from this Playlist
                </button>
            )}

            {isFavoritesPage && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(id); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
                >
                    <MinusCircle size={16} /> Remove from Favorites
                </button>
            )}

            {/* --- STANDARD ACTIONS --- */}
            <button 
                onClick={(e) => { e.stopPropagation(); onEdit(song); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
                <Edit2 size={16} /> Edit Details
            </button>
            
            <button 
                onClick={(e) => { e.stopPropagation(); onShare(title); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
                <Share2 size={16} /> Share Song
            </button>

            <div className="h-px bg-gray-100 my-1 mx-2" />

            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
                <Trash2 size={16} /> Delete from Library
            </button>
        </div>
    );
};

export default SongOptionsMenu;