import { createContext, useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useFavsContext } from './FavoritesContext';
import { useAudio } from './AudioContext';

/* eslint-disable react-refresh/only-export-components */

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState(() => 
        JSON.parse(localStorage.getItem('recent-searches')) || []
    );
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const location = useLocation();
    const { librarySongs } = useAudio();
    const { favoriteSongs } = useFavsContext();

    // Get the right data source based on current path
    const getSearchSource = () => {
        const path = location.pathname;
        
        if (path.includes('/favorites')) {
            return { data: favoriteSongs, context: 'Favorites' };
        }
        
        if (path.includes('/playlist/')) {
            // TODO: Get current playlist songs
            // const playlistId = path.split('/').pop();
            // const playlist = playlists.find(p => p.id === playlistId);
            // return { data: playlist?.songs || [], context: playlist?.name || 'Playlist' };
            return { data: [], context: 'Playlist' };
        }
        
        // Default: Library/Home
        return { data: librarySongs, context: 'Library' };
    };

    // Auto-filter results when query or location changes
    const searchSource = useMemo(() => getSearchSource(), [location.pathname, librarySongs, favoriteSongs]);

    const runSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        const { data } = searchSource;

        const filtered = data.filter(item => {
            const titleMatch = (item.title || '').toLowerCase().includes(lowerCaseQuery);
            const artistMatch = (item.artist || '').toLowerCase().includes(lowerCaseQuery);
            const albumMatch = (item.album || '').toLowerCase().includes(lowerCaseQuery);
            
            return titleMatch || artistMatch || albumMatch;
        });

        setSearchResults(filtered);
    };

    const addRecentSearch = (query) => {
        if (!query.trim()) return;
        
        setRecentSearches(prev => {
            const filtered = prev.filter(q => q !== query);
            const updated = [query, ...filtered].slice(0, 5);
            localStorage.setItem('recent-searches', JSON.stringify(updated));
            return updated;
        });
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearchOpen(false);
    };

    const value = {
        searchQuery, 
        setSearchQuery,
        recentSearches, 
        setRecentSearches,
        searchResults, 
        setSearchResults,
        isSearchOpen, 
        setIsSearchOpen,
        searchSource, // Expose current context
        clearSearch, 
        runSearch, 
        addRecentSearch    
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => useContext(SearchContext);