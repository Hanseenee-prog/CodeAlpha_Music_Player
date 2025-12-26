import { useContext, createContext, useState } from 'react';
import { playLists } from '../data/playlists';

/* eslint-disable react-refresh/only-export-components */
const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(() => JSON.parse(localStorage.getItem('playlists')) || playLists);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const value = {
        playlists, setPlaylists,
        isOpenModal, setIsOpenModal
    }

    return (
        <PlaylistContext.Provider value={value}>
            { children }
        </PlaylistContext.Provider>
    )
}

export const usePlaylistContext = () => useContext(PlaylistContext)