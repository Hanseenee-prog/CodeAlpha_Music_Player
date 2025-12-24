import { createContext, useContext, useState, useMemo } from 'react';
import { useAudio } from './AudioContext';

const FavsContext = createContext();

/* eslint-disable react-refresh/only-export-components */

export const FavsProvider = ({ children }) => {
    const { originalQueue } = useAudio();
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

    const toggleFavorite = (songId) => {
        setFavorites(prev => {
            const updates = prev.includes(songId)
                ? prev.filter(id => id !== songId)
                : [songId, ...prev];

            localStorage.setItem('favorites', JSON.stringify(updates))
            return updates;
        })
    }

    // Check if the current song is a favorite
    const isFavorite = (songId) => favorites.includes(songId);

    // Get favorite songs
    const favoriteSongs = useMemo(() => {
        return originalQueue.filter(song => favorites.includes(song.id));
    }, [favorites, originalQueue])

    const value = {
        favorites, setFavorites,
        toggleFavorite, isFavorite,
        favoriteSongs
    }

    return (
        <FavsContext.Provider value={value}>
            {children}
        </FavsContext.Provider>
    )
}

export const useFavsContext = () => useContext(FavsContext);