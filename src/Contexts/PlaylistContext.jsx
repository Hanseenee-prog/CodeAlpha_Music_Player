import { useContext, createContext, useState } from 'react';
import { playLists } from '../data/playlists';

/* eslint-disable react-refresh/only-export-components */
const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(() => JSON.parse(localStorage.getItem('playlists')) || playLists);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null); // song to pass into the add to playlist func or delete func

    const addToPlaylist = (playlistId, song) => {
        setPlaylists(prev => {
            const updated = prev.map(pl => {
                if (pl.playlistId !== playlistId) return pl;

                // Check if a song exists to prevent duplication
                const exists = pl.songs.some(s => s.id === song.id)
                if (exists){
                    console.log('song exists');
                    return pl;
                };

                console.log(song)
                return {
                    ...pl,
                    songs: [song, ...pl.songs]
                } 
            });

            console.log('added', playlists)
            localStorage.setItem('playlists', JSON.stringify(updated));
            return updated;
        });
    };

    const value = {
        playlists, setPlaylists,
        isOpenModal, setIsOpenModal,
        selectedSong, setSelectedSong,
        addToPlaylist,
    }

    return (
        <PlaylistContext.Provider value={value}>
            { children }
        </PlaylistContext.Provider>
    )
}

export const usePlaylistContext = () => useContext(PlaylistContext)