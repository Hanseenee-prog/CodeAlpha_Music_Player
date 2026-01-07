import { useState } from 'react';
import { Play, MoreHorizontal, Music2, ArrowLeft, Clock, Trash2, Edit2 } from 'lucide-react';
import Song from './Song';
import DeleteConfirmModal from './Popovers/DeleteConfirmModal.jsx';
import PlaylistNameEditor from './Popovers/PlaylistNameEditor.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useAudio } from "../Contexts/AudioContext";
import handleSongClick from "../utils/handleSongClick";
import { usePlaylistContext } from '../Contexts/PlaylistContext.jsx';
import { useOutletContext } from "react-router-dom";

const PlayList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playSong } = useAudio();
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { dismissMenu } = useOutletContext();
    
    const { playlists, deletePlaylist, editPlaylistName } = usePlaylistContext();

    const playlist = playlists.find(pl => pl.playlistId === id);

    const handleSaveName = (newName) => {
        editPlaylistName(playlist.playlistId, newName);
        setIsEditing(false);
    };

    const handleDeleteConfirm = () => {
        deletePlaylist(playlist.playlistId);
        navigate('/playlists');
    };

    
    if (!playlist) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-10 text-gray-500">
                <p>Playlist not found</p>
                <button onClick={() => navigate('/playlists')} className="mt-4 text-blue-500 underline">Go Back</button>
            </div>
        );
    }

    const { name, songs } = playlist;
    const displayCover = songs[0]?.coverImage;

    return (
        <section className="flex flex-col h-200 md:h-125 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Sticky Header */}
            <div className="sticky top-0 z-30 p-4 bg-white/90 backdrop-blur-md border-b border-gray-50 flex items-center gap-4">
                <button 
                    onClick={() => navigate('/playlists')} 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-sm font-bold text-gray-900 truncate">Playlist: {name}</h1>
            </div>

            <div 
                className="flex-1 overflow-y-auto custom-scrollbar"
                onScroll={dismissMenu}
            >
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
                        
                        {isEditing ? (
                            <PlaylistNameEditor 
                                initialName={playlist.name} 
                                onSave={handleSaveName} 
                                onCancel={() => setIsEditing(false)} 
                            />
                        ) : (
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">{playlist.name}</h2>
                        )}

                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <span>{songs.length} Tracks</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> Updated Dec 2025</span>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                            <button 
                                onClick={() => handleSongClick(songs[0], songs, playSong, `"${name}"`)}
                                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                            >
                                <Play size={18} fill="white" /> Play All
                            </button>

                            {/* DROPDOWN MENU CONTAINER */}
                            <div className="relative">
                                <button 
                                    className={`p-3 border rounded-full transition-all duration-200 ${showMenu ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-inner' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {showMenu && (
                                    <>
                                        {/* Invisible backdrop to close menu when clicking away */}
                                        <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                                        
                                        {/* Dropdown Content */}
                                        <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top-left md:origin-top-right">
                                            <button 
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => { setShowMenu(false); setIsEditing(true); }}
                                            >
                                                <Edit2 size={16} className="text-gray-400" />
                                                Edit Playlist Name
                                            </button>
                                            <div className="h-px bg-gray-100 mx-2" />
                                            <button 
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                                                onClick={() => { 
                                                    setShowMenu(false); 
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                <Trash2 size={16} className="text-red-400" />
                                                Delete Playlist
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Song List Rendering */}
                <div className="px-2 py-4 space-y-1">
                    {songs.map((song, index) => (
                        <Song 
                            key={song.id || index} 
                            song={song} 

                            onPlay={() => handleSongClick(song, songs, playSong, `"${name}"`)}
                        />
                    ))}
                </div>

                <div className="h-24" />
            </div>

            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                playlistName={playlist.name}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </section>
    );
}

export default PlayList;
