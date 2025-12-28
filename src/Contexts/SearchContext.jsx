import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFavsContext } from './FavoritesContext';
import { useAudio } from './AudioContext';

/* eslint-disable react-refresh/only-export-components */

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const runSearch = (data = []) => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        
        const lowerCaseQuery = searchQuery.toLowerCase();

        const filtered = data.filter(item => {
            const searchTarget = item.title || item.name || "";
            const artistTarget = item.artist || "";
            return (
                searchTarget.toLowerCase().includes(lowerCaseQuery) ||
                artistTarget.toLowerCase().includes(lowerCaseQuery)
            );
        });

        setSearchResults(filtered);
    };

    const addRecentSearch = (query) => {
        if (!query.trim()) return;
        setRecentSearches(prev => {
            const filtered = prev.filter(q => q !== query);
            return [query, ...filtered].slice(0, 5); // Limit to 5
        });
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
    };

    const value = {
        searchQuery, setSearchQuery,
        recentSearches, setRecentSearches,
        searchResults, setSearchResults,
        isSearchOpen, setIsSearchOpen,
        clearSearch, runSearch, addRecentSearch    
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};


export const useSearchContext = () => useContext(SearchContext);