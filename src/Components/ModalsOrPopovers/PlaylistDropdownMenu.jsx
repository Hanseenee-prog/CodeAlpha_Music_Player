import { Play, MoreHorizontal, Music2, ArrowLeft, Clock, Trash2, Edit2, PlusCircle } from 'lucide-react';

const PlaylistDropdownMenu = ({ 
    showMenu, setShowMenu,
    setIsAddSongsModalOpen, setIsDeleteModalOpen,
    setIsEditing
}) => {
    return ( 
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
                            onClick={() => { 
                                setShowMenu(false); 
                                setIsAddSongsModalOpen(true);
                            }}
                        >
                            <PlusCircle size={16} className="text-gray-400" />
                            Add Songs
                        </button>
                        
                        <div className="h-px bg-gray-100 mx-2" />

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
    );
}
 
export default PlaylistDropdownMenu;