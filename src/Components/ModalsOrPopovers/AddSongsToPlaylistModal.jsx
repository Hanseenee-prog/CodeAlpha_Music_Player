import { useState, useEffect } from 'react'
import { useAudio } from '../../Contexts/AudioContext';

const AddSongsToPlaylistModal = ({ isOpen, onClose, onConfirm, currentPlaylistSongs }) => {
    const { librarySongs } = useAudio(); 
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        if(isOpen) setSelectedIds([]);
    }, [isOpen]);

    // Filter out songs already in the playlist
    const availableSongs = librarySongs.filter(song => 
        !currentPlaylistSongs.find(pSong => pSong.id === song.id)
    );

    const toggleSong = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
            onClick={onClose}
        >
            <div 
                className="bg-white w-full max-w-sm max-h-125 md:max-h-[60vh] rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Header - More Compact */}
                <div className="p-4 border-b border-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Add Songs</h2>
                    <p className="text-xs text-gray-500">Select tracks for this playlist</p>
                </div>

                {/* Scrollable Song List - Optimized Padding */}
                <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar bg-gray-50/30">
                    {availableSongs.length > 0 ? (
                        availableSongs.map(song => (
                            <div 
                                key={song.id} 
                                onClick={() => toggleSong(song.id)}
                                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all mb-1 ${
                                    selectedIds.includes(song.id) 
                                    ? 'bg-indigo-50 border border-indigo-100' 
                                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                                }`}
                            >
                                {/* Checkbox Indicator */}
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                                    selectedIds.includes(song.id) 
                                    ? 'bg-indigo-600 border-indigo-600' 
                                    : 'border-gray-300 bg-white'
                                }`}>
                                    {selectedIds.includes(song.id) && (
                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                </div>

                                {/* Song Info - Smaller Image */}
                                <img src={song.coverImage} alt="" className="w-10 h-10 rounded-md object-cover shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{song.title}</p>
                                    <p className="text-[11px] text-gray-400 truncate">{song.artist || 'Unknown Artist'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-xs text-gray-400">All songs are already added.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-gray-50 flex items-center justify-between">
                    <button 
                        onClick={onClose}
                        className="text-xs font-semibold text-gray-500 hover:text-gray-700 p-2"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onConfirm(selectedIds)}
                        disabled={selectedIds.length === 0}
                        className="px-5 py-2 bg-indigo-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full text-xs font-bold shadow-md shadow-indigo-100 transition-all active:scale-95"
                    >
                        Add {selectedIds.length > 0 && selectedIds.length} {selectedIds.length === 1 ? 'Song' : 'Songs'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSongsToPlaylistModal;