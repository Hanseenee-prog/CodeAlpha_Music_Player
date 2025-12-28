import { Search, X, Clock } from "lucide-react";
import { useSearchContext } from "../Contexts/SearchContext";
import { useEffect, useRef } from "react";
import { useAudio } from "../Contexts/AudioContext";
import handleSongClick from "../utils/handleSongClick";

const SearchBar = () => {
    const { 
        searchQuery, setSearchQuery, runSearch, 
        searchResults, recentSearches, addRecentSearch,
        isSearchOpen, setIsSearchOpen, clearSearch,
        searchSource
    } = useSearchContext();

    const { playSong } = useAudio();
    const dropdownRef = useRef(null);

    // Get context-aware placeholder
    const getPlaceholder = () => {
        const context = searchSource.context;
        
        if (context === 'Favorites') {
            return '🔍 Search in your favorites...';
        }
        if (context === 'Playlist') {
            return '🔍 Search in this playlist...';
        }
        return '🔍 Search songs, artists, albums...';
    };

    // Auto-run search when query changes
    useEffect(() => {
        runSearch();
    }, [searchQuery, searchSource]);

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSongSelect = (song) => {
        // Play from the current search source context
        handleSongClick(song, searchSource.data, playSong);
        addRecentSearch(searchQuery);
        clearSearch();
    };

    const handleRecentClick = (query) => {
        setSearchQuery(query);
        setIsSearchOpen(true);
    };

    return (
        <div className="z-50 bg-gray-50/80 backdrop-blur-md sticky top-0 py-4" ref={dropdownRef}>
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />

                <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchOpen(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                            addRecentSearch(searchQuery);
                        }
                    }}
                    placeholder={getPlaceholder()}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all shadow-sm"
                />

                {searchQuery && (
                    <button 
                        onClick={clearSearch} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}

                {/* Glassmorphism Dropdown */}
                {isSearchOpen && (searchQuery || recentSearches.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 max-h-96 overflow-y-auto">

                        {/* Context Badge */}
                        <div className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                                Searching in: {searchSource.context} ({searchSource.data.length} songs)
                            </p>
                        </div>

                        {/* Results Section */}
                        {searchQuery && (
                            <div className="p-2">
                                <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Results
                                </p>
                                {searchResults.length > 0 ? (
                                    searchResults.slice(0, 6).map((song) => (
                                        <div 
                                            key={song.id} 
                                            onClick={() => handleSongSelect(song)}
                                            className="flex items-center gap-3 p-2 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors group"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                                <img 
                                                    src={song.coverImage} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                                                    alt={song.title} 
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate text-gray-900">
                                                    {song.title}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {song.artist} {song.album && `• ${song.album}`}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {song.duration}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-3 py-8 text-center">
                                        <p className="text-sm text-gray-500 font-medium">
                                            No results found for "{searchQuery}"
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Try a different search term
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Recent Searches Section */}
                        {!searchQuery && recentSearches.length > 0 && (
                            <div className="p-2 border-t border-gray-50 bg-gray-50/50">
                                <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Recent Searches
                                </p>
                                {recentSearches.map((query, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => handleRecentClick(query)}
                                        className="flex items-center gap-3 p-2 hover:bg-white rounded-xl cursor-pointer group transition-colors"
                                    >
                                        <Clock size={16} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                                        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">
                                            {query}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;