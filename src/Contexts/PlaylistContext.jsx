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
    const { librarySongs, setActiveQueue, setOriginalQueue } = useAudio();

    useEffect(() => {
        if (!isOpenModal) setPlaylistName("");
    }, [isOpenModal])

    const playlistSongs = useCallback((currentPlaylist) => {
        if (!currentPlaylist) return [];

        return (librarySongs || []).filter(song => currentPlaylist?.songs.includes((song.id)));
    }, [librarySongs, playlists])

    const addToPlaylist = (playlistId, incomingSongs) => {
        // Convert single object to array if it isn't one already
        const songsToAdd = Array.isArray(incomingSongs) ? incomingSongs : [incomingSongs];

        setPlaylists(prev => {
            const updated = prev.map(pl => {
                if (pl.playlistId !== playlistId) return pl;

                // Filter out IDs that are already in the playlist to prevent duplicates
                const newUniqueIds = songsToAdd
                    .map(s => s.id)
                    .filter(id => !pl.songs.includes(id));

                // If no new songs are actually being added, return original playlist
                if (newUniqueIds.length === 0) {
                    console.log('All selected songs already exist in this playlist');
                    return pl;
                }

                // Create the updated playlist object
                const updatedPlaylist = {
                    ...pl,
                    songs: [...newUniqueIds, ...pl.songs] // Newest additions at the top
                };

                // --- APPWRITE SYNC STEP ---
                // If user is logged in, you would call your Appwrite service here:
                // updatePlaylistInAppwrite(playlistId, updatedPlaylist.songs);
                
                return updatedPlaylist;
            });

            // 4. Update LocalStorage (Acts as your local cache)
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

    const removeFromPlaylist = (songId, playlistId) => {
        const updatedPlaylists = playlists.map(pl => {
            if (pl.playlistId !== playlistId) return pl;
            return {
                ...pl,
                songs: pl.songs.filter(id => id !== songId)
            };
        });

        setPlaylists(updatedPlaylists);
        
        const removeFilter = (list) => list.filter(song => song?.id !== songId);
        setOriginalQueue(removeFilter);
        setActiveQueue(removeFilter);

        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    };

    const value = {
        playlists, setPlaylists,
        isOpenModal, setIsOpenModal,
        selectedSong, setSelectedSong,
        view, setView,
        playlistName, setPlaylistName,
        addToPlaylist, addPlaylist,
        deletePlaylist, editPlaylistName,
        playlistSongs, removeFromPlaylist
    }

    return (
        <PlaylistContext.Provider value={value}>
            { children }
        </PlaylistContext.Provider>
    )
}

export const usePlaylistContext = () => useContext(PlaylistContext)