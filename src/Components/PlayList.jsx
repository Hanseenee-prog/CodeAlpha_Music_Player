import { Play, MoreHorizontal, Music2, ArrowLeft, Clock } from 'lucide-react';
import Song from './Song'; // Your Song component
import { useParams, useNavigate } from 'react-router-dom';
import { useAudio } from "../Contexts/AudioContext";
import handleSongClick from "../utils/handleSongClick";
import { usePlaylistContext } from '../Contexts/PlaylistContext.jsx';

const PlayList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playSong } = useAudio();
    
    // Find the specific playlist
    const { playlists } = usePlaylistContext();
    const playlist = playlists.find(pl => pl.playlistId === id);
    
    if (!playlist) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-10 text-gray-500">
                <p>Playlist not found</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">Go Back</button>
            </div>
        );
    }

    const { name, songs } = playlist;
    const displayCover = songs[0]?.coverImage;

    return (
        <section className="flex flex-col h-125 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Sticky Header with Back Button */}
            <div className="sticky top-0 z-30 p-4 bg-white/90 backdrop-blur-md border-b border-gray-50 flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-sm font-bold text-gray-900 truncate">Playlist: {name}</h1>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Playlist Info Section */}
                <div className="p-6 flex flex-col md:flex-row items-center md:items-end gap-6 bg-linear-to-b from-gray-50 to-white">
                    <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden shadow-2xl">
                        {displayCover ? (
                            <img src={displayCover} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                                <Music2 className="text-indigo-300" size={60} />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">Playlist</span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">{name}</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <span>{songs.length} Tracks</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> Updated recently</span>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                            <button 
                                onClick={() => handleSongClick(songs[0], songs, playSong)}
                                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                            >
                                <Play size={18} fill="white" /> Play All
                            </button>
                            <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Song List Rendering */}
                <div className="px-2 py-4 space-y-1">
                    {songs.map((song, index) => (
                        <Song 
                            key={song.id || index} 
                            song={song} 
                            onPlay={() => handleSongClick(song, songs, playSong)}
                        />
                    ))}
                </div>

                {/* Spacer for player visibility */}
                <div className="h-24" />
            </div>
        </section>
    );
}

export default PlayList;
