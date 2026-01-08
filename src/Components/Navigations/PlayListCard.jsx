import { useNavigate } from 'react-router-dom';
import { Play, Music } from 'lucide-react';
import { usePlaylistContext } from '../../Contexts/PlaylistContext';

const PlaylistCard = ({ playlist }) => {
    const navigate = useNavigate();
    const { playlistId, name } = playlist;

    const { playlistSongs } = usePlaylistContext();
    const songs = playlistSongs(playlist);
    
    // Use the first song's cover as the playlist artwork
    const coverImage = songs?.[0]?.coverImage;

    return (
        <div 
            onClick={() => navigate(`/playlists/${playlistId}`)}
            className="group cursor-pointer flex flex-col gap-3 transition-all duration-300"
        >
            {/* Thumbnail Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                {coverImage ? (
                    <img 
                        src={coverImage} 
                        alt={name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                        <Music className="text-indigo-200" size={32} />
                    </div>
                )}

                {/* Floating Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={20} className="text-indigo-600 fill-indigo-600 ml-0.5" />
                    </div>
                </div>

                {/* Badge for track count */}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-wider">
                    {songs?.length || 0} tracks
                </div>
            </div>

            {/* Text Details */}
            <div className="px-1">
                <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {name}
                </h3>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                    Updated recently
                </p>
            </div>
        </div>
    );
};

export default PlaylistCard;