import { parseSongFile } from "../utils/parseSongFile";
import { get, set } from "idb-keyval";
import { useEffect, useState } from "react";

/* eslint-disable react-hooks/exhaustive-deps */
const useLocalMusic = () => {
    const [deviceSongs, setDeviceSongs] = useState([]);

    // Load saved songs automatically when the app starts.
    useEffect(() => {
        const loadSongs = async () => {
            try {
                const savedSongs = await get("device-songs");

                if (!savedSongs) return;

                const hydratedSongs = savedSongs.map(song => {
                    // Safety check: ensure file object survived
                    if (song.file instanceof Blob) {
                        console.log("coverImage", song.title);
                        return {
                            ...song, 
                            audioSrc: URL.createObjectURL(song.file), // Generate the playable source from file Blob
                        }
                    }

                    console.warn("Skipping corrupt song entry:", song.title);
                    return null;  
                })
                .filter(Boolean) // Remove any null/corrupt entries

                setDeviceSongs(hydratedSongs);
            } 
            catch (err) {
                console.error("Error loading songs:", err);
            }
        };

        loadSongs();

        return () => deviceSongs.forEach(song => URL.revokeObjectURL(song.audioSrc));
    }, []);

    // Add song(s) to indexedDB
    const addSongs = async (files) => {
        if (!files) return;
        const filesArray = Array.from(files);

        const newSongs = await Promise.all(filesArray.map(parseSongFile));

        // Update Database
        const existingSongs = (await get('device-songs')) || [];

        // Don't save the audio source to indexedDB
        // It loops through the array and then removes the audioSrc and returns the rest of the items in the array
        // eslint-disable-next-line no-unused-vars
        const songsToSave = [...existingSongs, ...newSongs].map(({ audioSrc, ...remainingProps }) => remainingProps)
        await set('device-songs', songsToSave);

        // Update the state
        setDeviceSongs((prev) => [...prev, ...newSongs]);
    }

    // Remove song(s) from indexedDB
    const removeSongs = async (songIds) => {
        const songIdsToRemove = Array.from(songIds);

        const existingSongIds = await get('device-songs');
        const songsToSave = existingSongIds.filter(id => !songIdsToRemove.includes(id));
        await set('device-songs', songsToSave);

        // Update State
        setDeviceSongs(prev => prev.filter(song => !songIdsToRemove.includes(song.id)));
    }

    return {
        deviceSongs, setDeviceSongs,
        addSongs, removeSongs
    }
}

export default useLocalMusic;