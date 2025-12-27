import { useContext, createContext, useState } from 'react';
import { playLists } from '../data/playlists';
import { generateUniqueID } from '../utils/generateUniqueID';

/* eslint-disable react-refresh/only-export-components */
const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(() => JSON.parse(localStorage.getItem('playlists')) || playLists);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null); // song to pass into the add to playlist func or delete func
    const [view, setView] = useState("select"); 
    const [playlistName, setPlaylistName] = useState("");

    // Adds a song to an existing playlist
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

            localStorage.setItem('playlists', JSON.stringify(updated));
            return updated;
        });
    };

    // Creates a new playlist 
    const addPlaylist = (playlistName, song) => {
        const newPlaylist = {
            playlistId: generateUniqueID(),
            name: playlistName,
            songs: song ? [song] : [] // If song exists put it
        }

        setPlaylists(prev => [newPlaylist, ...prev]);
        setSelectedSong(null);
        setView('select');
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
            const updated = prev.map(pl => {
                if (pl.playlistId !== playlistId) return pl;

                return {
                    ...pl,
                    name: playlistName,
                } 
            });

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
        deletePlaylist, editPlaylistName
    }

    return (
        <PlaylistContext.Provider value={value}>
            { children }
        </PlaylistContext.Provider>
    )
}

export const usePlaylistContext = () => useContext(PlaylistContext)