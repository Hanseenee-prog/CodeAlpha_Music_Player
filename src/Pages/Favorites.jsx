import { useFavsContext } from "../Contexts/FavoritesContext";
import { useAudio } from "../Contexts/AudioContext";
import { Heart, Play, Music } from 'lucide-react';
import Song from '../Components/Song';
import handleSongClick from "../utils/handleSongClick";

const Favorites = () => {
    const { favoriteSongs } = useFavsContext();
    const { playSong, setRepeat} = useAudio();

    // Logic to play all the first song in favorites starting from the first
    const handlePlayAll = () => {
        if (favoriteSongs.length > 0) {
            setRepeat('all')
            playSong(0, favoriteSongs, 'Favorites');
        }
    };

    return (
        <section className="flex flex-col h-125 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="sticky top-0 z-30 p-6 bg-white/90 backdrop-blur-md border-b border-gray-50 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <Heart className="text-red-500 fill-red-500" size={24} />
                        Favorites
                    </h1>
                    <p className="text-xs text-gray-500 font-medium tracking-tight">
                        {favoriteSongs.length} Songs you love
                    </p>
                </div>
                
                <div className="flex items-center gap-2">
                    {favoriteSongs.length > 0 && (
                        <button 
                            onClick={handlePlayAll}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-100"
                        >
                            <Play size={16} fill="white" />
                            <span className="hidden sm:block">Play All</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable List - Reusing the Song Component */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {favoriteSongs.length > 0 ? (
                    favoriteSongs.map((song, index) => (
                        <Song 
                            key={song.id || index} 
                            song={song} 
                            // When clicked, it plays from the "Favorites" context
                            onPlay={() => {
                                handleSongClick(song, favoriteSongs, playSong, 'Favorites')
                            }}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Music className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">No favorites yet</h3>
                        <p className="text-xs text-gray-400 mt-1 max-w-50">
                            Tap the heart on any song to save it here.
                        </p>
                    </div>
                )}
                {/* Spacer for bottom navigation if needed */}
                <div className="h-24" />
            </div>
        </section>
    );
}

export default Favorites;
