import PlaylistCard from '../Components/Navigations/PlayListCard.jsx';
import { ListMusic, Plus, FolderHeart } from 'lucide-react';
import { useCallback } from 'react';
import { usePlaylistContext } from '../Contexts/PlaylistContext.jsx';

const PlayLists = () => {
    const { playlists, setIsOpenModal, setView, setSelectedSong } = usePlaylistContext();

    const renderPlaylists = useCallback(() => {
        if (playlists.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-80 text-center p-8">
                    <FolderHeart className="text-gray-200 mb-4" size={56} />
                    <h3 className="text-base font-bold text-gray-900">No Playlists Found</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-50">Create your first playlist to start organizing your collection.</p>
                </div>
            );
        }

        return (
            /* Responsive Grid: 2 cols mobile, 3 cols tablet, 4-5 cols desktop */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4 md:p-6">
                {playlists.map((playlist) => (
                    <PlaylistCard 
                        key={playlist.playlistId} 
                        playlist={playlist} 
                    />
                ))}
            </div>
        );
    }, [playlists]);

    return (
        <section className="flex flex-col h-full min-h-125 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-30 p-5 md:p-8 bg-white/95 backdrop-blur-lg border-b border-gray-50 flex items-center justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-3">
                        <ListMusic className="text-indigo-600" size={28} />
                        PlayLists
                    </h1>
                    <p className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">
                        {playlists.length} Collections
                    </p>
                </div>
                
                <button 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                    onClick={() => { setView('create'); setIsOpenModal(true); setSelectedSong(null); }}
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">New Playlist</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {renderPlaylists()}
                <div className="h-32" />
            </div>
        </section>
    );
}

export default PlayLists;
