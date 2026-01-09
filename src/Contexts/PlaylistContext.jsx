import { useContext, createContext, useState, useCallback, useEffect } from 'react';
import { generateUniqueID } from '../utils/generateUniqueID';
import { useAudio } from './AudioContext';

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(() => JSON.parse(localStorage.getItem('playlists')) || []);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null); // song to pass into the add to playlist func or delete func
    const [view, setView] = useState("select"); 
    const [playlistName, setPlaylistName] = useState("");
    const { librarySongs } = useAudio();

    useEffect(() => {
        if (!isOpenModal) setPlaylistName("");
    }, [isOpenModal])

    const playlistSongs = useCallback((currentPlaylist) => {
        if (!currentPlaylist) return [];

        return (librarySongs || []).filter(song => currentPlaylist?.songs.includes((song.id)));
    }, [librarySongs, playlists])

    // Adds a song to an existing playlist
    const addToPlaylist = (playlistId, song) => {
        setPlaylists(prev => {
            const updated = prev.map(pl => {
                if (pl.playlistId !== playlistId) return pl;

                // Check if a song exists to prevent duplication
                const exists = pl.songs.includes(song.id)
                if (exists){
                    console.log('song exists');
                    return pl;
                };

                return {
                    ...pl,
                    songs: [song.id, ...pl.songs]
                } 
            });

            localStorage.setItem('playlists', JSON.stringify(updated));
            return updated;
        });
    };

    // Creates a new playlist 
    const addPlaylist = (playlistName) => {
        const newPlaylist = {
            playlistId: generateUniqueID(),
            name: playlistName,
            songs: selectedSong ? [selectedSong.id] : [] // If song exists put it
        }

        setPlaylists(prev => [newPlaylist, ...prev]);
        setSelectedSong(null);
        setView('select');
        setPlaylistName("");
        localStorage.setItem('playlists', JSON.stringify([newPlaylist, ...playlists]));
    }

    const deletePlaylist = (playlistId) => {
        setPlaylists(prev => {
            const updated = prev.filter(pl => pl.playlistId !== playlistId);

            localStorage.setItem('playlists', JSON.stringify(updated));
            return updated;
        });
    };

    const editPlaylistName = (playlistId, playlistName) => {
        setPlaylists(prev => {
            const updated = prev.map(pl => pl.playlistId === playlistId ? { ...pl, name: playlistName } : pl);
            console.log(updated)

            localStorage.setItem('playlists', JSON.stringify(updated));
            return updated;
        });

        setPlaylistName("");
    }

    const value = {
        playlists, setPlaylists,
        isOpenModal, setIsOpenModal,
        selectedSong, setSelectedSong,
        view, setView,
        playlistName, setPlaylistName,
        addToPlaylist, addPlaylist,
        deletePlaylist, editPlaylistName,
        playlistSongs
    }

    return (
        <PlaylistContext.Provider value={value}>
            { children }
        </PlaylistContext.Provider>
    )
}

export const usePlaylistContext = () => useContext(PlaylistContext)