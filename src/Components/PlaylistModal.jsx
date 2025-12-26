import { useState } from "react";
import { usePlaylistContext } from '../Contexts/PlaylistContext';
import { Plus, ListMusic, ArrowLeft, X } from 'lucide-react';

const PlaylistModal = () => {
    const { isOpenModal, playlists, setIsOpenModal } = usePlaylistContext();
    const [view, setView] = useState("select"); 
    
    // New states for input handling
    const [playlistName, setPlaylistName] = useState("");
    const MAX_LENGTH = 25;

    if (!isOpenModal) return null;

    return (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={() => setIsOpenModal(false)}
            />

            <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {view === "create" && (
                            <button onClick={() => { setView("select"); setPlaylistName(""); }} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>
                        )}
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                            {view === "select" ? "Add to Playlist" : "New Playlist"}
                        </h2>
                    </div>
                    <button onClick={() => setIsOpenModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {view === "select" ? (
                        <div className="space-y-3">
                            <button 
                                onClick={() => setView("create")}
                                className="w-full flex items-center gap-4 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all group"
                            >
                                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                                    <Plus size={24} />
                                </div>
                                <span className="font-bold text-indigo-700 text-sm">Create New Playlist</span>
                            </button>

                            <div className="pt-2">
                                {playlists.length > 0 ? (
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-2">Recent Playlists</p>
                                        {playlists.map((pl, index) => (
                                            <button 
                                                key={`${pl.name}-${index}`}
                                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                        <ListMusic size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-bold text-gray-900">{pl.name}</p>
                                                        <p className="text-[10px] text-gray-500 font-medium">{pl.songs?.length || 0} songs</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center py-8 text-xs text-gray-400 font-medium italic">You haven't created any playlists yet.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* CREATE NEW PLAYLIST SECTION */
                        <div className="space-y-6 py-4 animate-in slide-in-from-right-4 duration-300">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end px-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Playlist Name</label>
                                    <span className={`text-[10px] font-bold tracking-tighter ${playlistName.length >= MAX_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
                                        {playlistName.length} / {MAX_LENGTH}
                                    </span>
                                </div>
                                <input 
                                    autoFocus
                                    type="text" 
                                    maxLength={MAX_LENGTH}
                                    value={playlistName}
                                    onChange={(e) => setPlaylistName(e.target.value)}
                                    placeholder="Enter name..." 
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            
                            <div className="flex items-center gap-3 pt-4">
                                <button 
                                    onClick={() => { setView("select"); setPlaylistName(""); }}
                                    className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    disabled={playlistName.length === 0}
                                    className={`flex-2 py-4 rounded-2xl text-sm font-black shadow-lg active:scale-95 transition-all
                                        ${playlistName.length > 0 
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100' 
                                            : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'
                                        }`}
                                >
                                    Create Playlist
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default PlaylistModal;