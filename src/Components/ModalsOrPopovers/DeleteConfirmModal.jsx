import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, playlistName, songName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            
            {/* Modal */}
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                        <Trash2 size={32} />
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-black text-gray-900 leading-tight">Delete {playlistName ? 'Playlist' : 'song'}?</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            This will permanently remove <span className="font-bold text-gray-900">"{playlistName || songName}"</span>. This action cannot be undone.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-8">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onConfirm(); }}
                        className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-100 transition-all active:scale-95"
                    >
                        Yes, Delete {playlistName ? 'Playlist' : 'song'}
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl font-bold transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;