import { createContext, useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useFavsContext } from './FavoritesContext';
import { useAudio } from './AudioContext';
import { usePlaylistContext } from './PlaylistContext'; 

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
    const { playlists } = usePlaylistContext(); 

    const getSearchSource = () => {
        const path = location.pathname;
        
        // Favorites page
        if (path === '/favorites') {
            return { 
                data: favoriteSongs, 
                context: 'Favorites',
                type: 'songs'
            };
        }
        
        // Individual playlist page: /playlist/:id
        if (path.startsWith('/playlists/') && path.split('/').length === 3) {
            const playlistId = path.split('/')[2];
            const playlist = playlists.find(pl => pl.playlistId === playlistId);
            
            return { 
                data: playlist?.songs || [], 
                context: playlist?.name || 'Playlist',
                type: 'songs'
            };
        }
        
        // Playlists overview page: /playlists
        if (path === '/playlists') {
            const allPlaylists = playlists || [];
            
            return { 
                data: allPlaylists, 
                context: 'Playlists',
                type: 'playlists'
            };
        }
        
        // Default: Library/Home
        return { 
            data: librarySongs, 
            context: 'Library',
            type: 'songs'
        };
    };

    /* eslint-disable react-hooks/exhaustive-deps */ 
    const searchSource = useMemo(() => getSearchSource(), [
        location.pathname, 
        librarySongs, 
        favoriteSongs,
        playlists
    ]);

    const runSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        const { data, type } = searchSource;

        if (type === 'playlists') {
            // Search playlist NAMES
            const filtered = data.filter(playlist => {
                const nameMatch = (playlist.name || '').toLowerCase().includes(lowerCaseQuery);
                return nameMatch;
            });
            setSearchResults(filtered);
        } else {
            // Search SONGS (title, artist, album)
            const filtered = data.filter(song => {
                const titleMatch = (song.title || '').toLowerCase().includes(lowerCaseQuery);
                const artistMatch = (song.artist || '').toLowerCase().includes(lowerCaseQuery);
                const albumMatch = (song.album || '').toLowerCase().includes(lowerCaseQuery);
                
                return titleMatch || artistMatch || albumMatch;
            });
            setSearchResults(filtered);
        }
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
        searchQuery, setSearchQuery,
        recentSearches, setRecentSearches,
        searchResults, setSearchResults,
        isSearchOpen, setIsSearchOpen,
        searchSource,
        clearSearch, 
        runSearch, 
        addRecentSearch    
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => useContext(SearchContext);