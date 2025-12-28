import { Search, X, Clock, Music } from "lucide-react";
import { useSearchContext } from "../Contexts/SearchContext";
import { useEffect, useRef } from "react";
import { useAudio } from "../Contexts/AudioContext";

const SearchBar = () => {
    const { 
        searchQuery, setSearchQuery, runSearch, 
        searchResults, recentSearches, addRecentSearch,
        isSearchOpen, setIsSearchOpen, clearSearch 
    } = useSearchContext();

    const { librarySongs } = useAudio();
    
    const dropdownRef = useRef(null);

    // Auto-run search when query changes
    useEffect(() => {
        runSearch(librarySongs);
    }, [searchQuery]);

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

    return (
        <div className="z-50 bg-gray-50/80 backdrop-blur-md sticky top-0 py-4" ref={dropdownRef}>
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                
                <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchOpen(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addRecentSearch(searchQuery)}
                    placeholder="Search songs, artists..."
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all shadow-sm"
                />

                {searchQuery && (
                    <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                )}

                {/* 2025 Glassmorphism Dropdown */}
                {isSearchOpen && (searchQuery || recentSearches.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        
                        {/* Results Section */}
                        {searchQuery && (
                            <div className="p-2">
                                <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Results</p>
                                {searchResults.length > 0 ? (
                                    searchResults.slice(0, 5).map((song) => (
                                        <div 
                                            key={song.id} 
                                            onClick={() => {
                                                addRecentSearch(searchQuery);
                                                setIsSearchOpen(false);
                                                // Trigger your playSong(song) logic here
                                            }}
                                            className="flex items-center gap-3 p-2 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                <img src={song.coverImage} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold truncate">{song.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="px-3 py-4 text-sm text-gray-500 italic">No results found for "{searchQuery}"</p>
                                )}
                            </div>
                        )}

                        {/* Recent Searches Section */}
                        {recentSearches.length > 0 && (
                            <div className="p-2 border-t border-gray-50 bg-gray-50/50">
                                <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recents</p>
                                {recentSearches.map((query, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setSearchQuery(query)}
                                        className="flex items-center justify-between p-2 hover:bg-white rounded-xl cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Clock size={16} className="text-gray-400" />
                                            <span className="text-sm text-gray-600">{query}</span>
                                        </div>
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
