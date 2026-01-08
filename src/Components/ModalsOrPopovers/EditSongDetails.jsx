import { useState } from 'react';
import { X, Music, User, Image as ImageIcon, Save, Check } from 'lucide-react';
import { useAudio } from '../../Contexts/AudioContext';

const EditSongDetails = ({ currentSongToEdit, setIsEditingSong }) => {
    const { setOriginalQueue, setActiveQueue, setLibrarySongs, setHistory } = useAudio();


    // Local state for form handling
    const [formData, setFormData] = useState({
        id: currentSongToEdit?.id || null,
        title: currentSongToEdit?.title || "",
        artist: currentSongToEdit?.artist || "",
        coverImage: currentSongToEdit?.coverImage || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Data:", formData);

        const updateSongInList = (list) => list.map(song => song?.id === currentSongToEdit?.id ? { ...song, ...formData } : song)

        setOriginalQueue(updateSongInList);
        setLibrarySongs(updateSongInList);
        setActiveQueue(updateSongInList);
        setHistory(updateSongInList);
        setIsEditingSong(false);
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
                onClick={() => setIsEditingSong(false)}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">Edit Song Details</h2>
                    <button 
                        onClick={() => setIsEditingSong(false)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* Cover Image Preview/Input */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100">
                            <img 
                                src={formData.coverImage || "/api/placeholder/128/128"} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <ImageIcon className="text-white" size={24} />
                            </div>
                        </div>
                        <input 
                            type="text" 
                            name="coverImage"
                            placeholder="Paste Image URL"
                            value={formData.coverImage}
                            onChange={handleChange}
                            className="w-full text-xs text-center text-blue-500 hover:underline outline-none bg-transparent"
                        />
                    </div>

                    {/* Title Input */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Song Title</label>
                            <span className={`text-[10px] font-mono ${formData.title.length > 40 ? 'text-red-500' : 'text-gray-400'}`}>
                                {formData.title.length}/50
                            </span>
                        </div>
                        <div className="relative">
                            <Music className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                maxLength={50}
                                placeholder="Enter title..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Artist Input */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Artist Name</label>
                            <span className="text-[10px] font-mono text-gray-400">
                                {formData.artist.length}/30
                            </span>
                        </div>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text"
                                name="artist"
                                value={formData.artist}
                                onChange={handleChange}
                                maxLength={30}
                                placeholder="Enter artist..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button"
                            onClick={() => setIsEditingSong(false)}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSongDetails;