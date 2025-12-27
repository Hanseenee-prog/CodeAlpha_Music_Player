import { Check, X } from 'lucide-react';
import { useState } from 'react';

const PlaylistNameEditor = ({ initialName, onSave, onCancel }) => {
    const [newName, setNewName] = useState(initialName);
    const MAX_LENGTH = 25;

    return (
        <div className="flex flex-col gap-2 animate-in slide-in-from-top-1 duration-200">
            <div className="relative group">
                <input 
                    autoFocus
                    type="text"
                    maxLength={MAX_LENGTH}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-3xl md:text-5xl font-black text-gray-900 bg-gray-50 border-b-2 border-indigo-500 focus:outline-none pb-1"
                />
                <span className="absolute -bottom-6 right-0 text-[10px] font-bold text-gray-400">
                    {newName.length} / {MAX_LENGTH}
                </span>
            </div>
            
            <div className="flex gap-2 mt-4">
                <button 
                    onClick={() => onSave(newName)}
                    disabled={!newName.trim()}
                    className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold disabled:opacity-50 transition-all active:scale-90"
                >
                    <Check size={14} /> Save Name
                </button>
                <button 
                    onClick={onCancel}
                    className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-500 rounded-full text-xs font-bold hover:bg-gray-200 transition-all"
                >
                    <X size={14} /> Cancel
                </button>
            </div>
        </div>
    );
};

export default PlaylistNameEditor;