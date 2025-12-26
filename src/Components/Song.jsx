import { Play, Heart, Plus, MoreVertical, Pause } from "lucide-react";
import { useAudio } from "../Contexts/AudioContext";
import { useFavsContext } from "../Contexts/FavoritesContext";
import { usePlaylistContext } from "../Contexts/PlaylistContext";

const Song = ({ song, onPlay }) => {
    const { id, title, artist, duration, coverImage } = song;
    const { currentSongIndex, isPlaying, getPlaybackQueue } = useAudio();
    const { isFavorite, toggleFavorite } = useFavsContext();
    
    const queue = getPlaybackQueue();
    const isActive = queue[currentSongIndex]?.id === song.id;
    const { setIsOpenModal } = usePlaylistContext();

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
                    {/* Hover Play Overlay */}
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
                {/* Actions (Visible on hover/active) */}
                <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(id) }}
                        className={`
                            p-2 hover:text-red-500 transition-colors
                            ${isFavorite(id) ? 'text-red-500' : 'text-gray-400'}
                        `}
                        title="Add to Favorites"
                    >
                        <Heart 
                            size={18}
                            fill={isFavorite(id) ? 'red' : 'transparent'} 
                        />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsOpenModal(true) }}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Add to Queue"
                    >
                        <Plus size={18} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); /* More Logic */ }}
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <MoreVertical size={18} />
                    </button>
                </div>
                
                <span className="text-xs font-mono text-gray-400 tabular-nums">
                    {duration}
                </span>
            </div>
        </div>
    );
};

export default Song;
